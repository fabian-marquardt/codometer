// Parameters for graphical animation
var c = document.getElementById("keyboardCanvas");
var ctx = c.getContext("2d");
var key_size = 64;
var key_outline_color = "#EEEEEE";
var key_bg_color = "#FFFFFF";
var key_bg_shade_color = "#DDDDDD";
var key_text_color = "#444444";
var key_font_style = "18px Sans";
var finger_color = ["#ca8142","#cac542","#8bca42","#47ca42","#42ca81","#42cac5","#428bca","#4247ca","#8142ca","#c542ca"];

// Keyboard layouts array is initially empty, populated by layout-specific js files
var layouts = [];

// Actual layout definitions which are used by the processing functions
var key_positions = {};
var finger_mapping = {};
var finger_positions_start = [];
var finger_positions_current = [];
var key_displaytexts = {};
var keyboard_layout = {};

// Textarea for text input
var input_text = document.getElementById("inputText");

// Distances
var finger_distances = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var total_distance = 0;

// Output fields
var finger_outputs = [document.getElementById("l1"),
    document.getElementById("l2"), 
    document.getElementById("l3"),
    document.getElementById("l4"),
    document.getElementById("l5"),
    document.getElementById("r1"),
    document.getElementById("r2"),
    document.getElementById("r3"),
    document.getElementById("r4"),
    document.getElementById("r5")];

var total = document.getElementById("total");

// Get keys that need to be pressed to type a character
function get_keys_for_character(character){
    return keyboard_layout[character];
};

// Get the finger that presses a specific key
function get_finger_for_key(key){
    return finger_mapping[key];
};

// Get key where finger is currently positioned
function get_finger_position_key(finger){
    return finger_positions_current[finger];
};

// Move finger to key
function set_finger_to_key(finger,key){
    finger_positions_current[finger] = key;
}

// Get the dimensions of a key
function get_key_dimensions(key){
    return key_positions[key];
}

// Get the labels of a key
function get_key_displaytexts(key){
    return key_displaytexts[key];
}

// Calculate the distance between two keys
function get_coordinate_distance(x1,y1,x2,y2){
    var x_difference = Math.abs(x1 - x2);
    var y_difference = Math.abs(y1 - y2);

    return Math.sqrt(x_difference*x_difference + y_difference*y_difference);
};

// Draw the keyboard to a canvas element
function draw_keyboard(){

    ctx.clearRect(0, 0, c.width, c.height);

    var keys = Object.keys(key_positions);
    var len = keys.length;

    for (var i = 0; i < len; i++) {
        // Draw the key outlines
        var coordinates = get_key_dimensions(keys[i]);

        // Default colors
        ctx.fillStyle = key_bg_shade_color;
        ctx.strokeStyle = key_outline_color;

        ctx.fillRect(coordinates[0]*key_size+2,coordinates[1]*key_size+2,coordinates[2]*key_size-4,coordinates[3]*key_size-4);
        ctx.strokeRect(coordinates[0]*key_size+2,coordinates[1]*key_size+2,coordinates[2]*key_size-4,coordinates[3]*key_size-4);

        ctx.fillStyle = key_bg_color;

        // Highlight keys where fingers are positioned
        for (var j = 0; j <= 9; j++) {
            if(keys[i] == get_finger_position_key(j))
                ctx.fillStyle = finger_color[j];
        }

        ctx.fillRect(coordinates[0]*key_size+4,coordinates[1]*key_size+4,coordinates[2]*key_size-11,coordinates[3]*key_size-11);
        //ctx.strokeRect(coordinates[0]*key_size+2,coordinates[1]*key_size+2,coordinates[2]*key_size-4,coordinates[3]*key_size-4);

        // Draw the key texts
        var texts = get_key_displaytexts(keys[i]);
        ctx.fillStyle = key_text_color;
        ctx.font = key_font_style;

        ctx.fillText(texts[0],coordinates[0]*key_size + 9,coordinates[1]*key_size + 50);
        ctx.fillText(texts[1],coordinates[0]*key_size + 9,coordinates[1]*key_size + 25);
        ctx.fillText(texts[2],coordinates[0]*key_size + 37,coordinates[1]*key_size + 50);
        ctx.fillText(texts[3],coordinates[0]*key_size + 37,coordinates[1]*key_size + 25);
    }

}

// Process one character of the text
function process_character(text, index){

    // Get the current character
    character = text[index];
    var keys = get_keys_for_character(character);

    if (keys == undefined) {
        alert("Unknown character detected. Aborting.");
        return;
    }

    // Mark character in textarea
    input_text.setSelectionRange(index, index+1);

    var len = keys.length;
    for (var i = 0; i < len; i++) {

        // Which finger needs to be moved?
        var finger = get_finger_for_key(keys[i]);

        if (finger == undefined) {
            alert("No finger known for key. Aborting.");
            return;
        }

        // Calculate current position of finger
        var finger_before_key = get_finger_position_key(finger);
        var finger_before_dimensions = get_key_dimensions(finger_before_key);
        // Assume finger on center of key
        var before_x = finger_before_dimensions[0] + finger_before_dimensions[2]/2.0;
        var before_y = finger_before_dimensions[1] + finger_before_dimensions[3]/2.0;

        // Set new finger position
        set_finger_to_key(finger,keys[i]);

        // Calculate next position of finger
        var finger_after_key = get_finger_position_key(finger);
        var finger_after_dimensions = get_key_dimensions(finger_after_key);
        // Assume finger on center of key
        var after_x = finger_after_dimensions[0] + finger_after_dimensions[2]/2.0;
        var after_y = finger_after_dimensions[1] + finger_after_dimensions[3]/2.0;

        // Calculate the distance and update counters.
        var distance = get_coordinate_distance(before_x,before_y,after_x,after_y);

        finger_distances[finger] += distance;
        finger_outputs[finger].value = Math.round(finger_distances[finger]*10)/10.0;

        total_distance += distance;
        total.value = Math.round(total_distance*10)/10.0;

        // Update the keyboard canvas
        draw_keyboard();

        //alert("Finger moving from " + finger_before_key + " to " + finger_after_key + " - distance " + distance);

        // Continue processing if not at end of text
        if (index < text.length - 1) {
            window.setTimeout(function() { process_character(text,index+1); },200);
        }
    }
};

// Start processing of a text
function process_text(text){
    reset();
    window.setTimeout(function() { process_character(text,0); },0);
};

// Reset everything to a "zero" state
function reset(){
    finger_positions_current = finger_positions_start;
    finger_distances = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    total_distance = 0;
    finger_outputs[0].value = 0;
    finger_outputs[1].value = 0;
    finger_outputs[2].value = 0;
    finger_outputs[3].value = 0;
    finger_outputs[4].value = 0;
    finger_outputs[5].value = 0;
    finger_outputs[6].value = 0;
    finger_outputs[7].value = 0;
    finger_outputs[8].value = 0;
    finger_outputs[9].value = 0;
    total.value = 0;
}

// Set keyboard layout to use
function set_layout(layout){
    key_positions = layouts[layout][1];
    finger_mapping = layouts[layout][2];
    finger_positions_start = layouts[layout][3].slice();
    key_displaytexts = layouts[layout][4];
    keyboard_layout = layouts[layout][5];
    reset();
    draw_keyboard();
};