// Parameters for graphical animation
var c = document.getElementById("keyboardCanvas");
var ctx = c.getContext("2d");
var key_size = 64;
var key_outline_color = "#333333";
var key_bg_color = "#FFFFFF";
var key_text_color = "#000000";
var key_font_style = "20px Sans";
var finger_color = ["#428bca","#A0D3FF","#53AFFF","#50697F","#438CCC","#7F5E29","#FFDA9F","#FFBD53","#7F6D50","#CC9742"];

// Textarea for text input
var input_text = document.getElementById("inputText");

// Positions and sizes of all keys
var key_positions = {
    KEY_GRAVE: [0,0,1,1],
    KEY_1: [1,0,1,1],
    KEY_2: [2,0,1,1],
    KEY_3: [3,0,1,1],
    KEY_4: [4,0,1,1],
    KEY_5: [5,0,1,1],
    KEY_6: [6,0,1,1],
    KEY_7: [7,0,1,1],
    KEY_8: [8,0,1,1],
    KEY_9: [9,0,1,1],
    KEY_0: [10,0,1,1],
    KEY_DASH: [11,0,1,1],
    KEY_EQUALS: [12,0,1,1],
    KEY_BACKSPACE: [13,0,2,1],
    KEY_TAB: [0,1,1.5,1],
    KEY_Q: [1.5,1,1,1],
    KEY_W: [2.5,1,1,1],
    KEY_E: [3.5,1,1,1],
    KEY_R: [4.5,1,1,1],
    KEY_T: [5.5,1,1,1],
    KEY_Y: [6.5,1,1,1],
    KEY_U: [7.5,1,1,1],
    KEY_I: [8.5,1,1,1],
    KEY_O: [9.5,1,1,1],
    KEY_P: [10.5,1,1,1],
    KEY_LSQUARE: [11.5,1,1,1],
    KEY_RSQUARE: [12.5,1,1,1],
    KEY_ENTER: [13.5,1,1.5,2],
    KEY_CAPS: [0,2,1.75,1],
    KEY_A: [1.75,2,1,1],
    KEY_S: [2.75,2,1,1],
    KEY_D: [3.75,2,1,1],
    KEY_F: [4.75,2,1,1],
    KEY_G: [5.75,2,1,1],
    KEY_H: [6.75,2,1,1],
    KEY_J: [7.75,2,1,1],
    KEY_K: [8.75,2,1,1],
    KEY_L: [9.75,2,1,1],
    KEY_SEMICOLON: [10.75,2,1,1],
    KEY_APOSTROPHE: [11.75,2,1,1],
    KEY_HASH: [12.75,2,1,1],
    KEY_SHIFT_L: [0,3,1.25,1],
    KEY_BACKSLASH: [1.25,3,1,1],
    KEY_Z: [2.25,3,1,1],
    KEY_X: [3.25,3,1,1],
    KEY_C: [4.25,3,1,1],
    KEY_V: [5.25,3,1,1],
    KEY_B: [6.25,3,1,1],
    KEY_N: [7.25,3,1,1],
    KEY_M: [8.25,3,1,1],
    KEY_COMMA: [9.25,3,1,1],
    KEY_POINT: [10.25,3,1,1],
    KEY_SLASH: [11.25,3,1,1],
    KEY_SHIFT_R: [12.25,3,2.75,1],
    KEY_CTRL_L: [0,4,1.5,1],
    KEY_WIN_L: [1.5,4,1,1],
    KEY_ALT_L: [2.5,4,1.5,1],
    KEY_SPACE: [4,4,6,1],
    KEY_ALT_R: [10,4,1.5,1],
    KEY_WIN_R: [11.5,4,1,1],
    KEY_MENU: [12.5,4,1,1],
    KEY_CTRL_R: [13.5,4,1.5,1]
};

// Text to display on the keys. Only used for visualization
var key_displaytexts = {
    KEY_GRAVE: ["^","°","",""],
    KEY_1: ["1","!","",""],
    KEY_2: ["2","\"","²",""],
    KEY_3: ["3","§","³",""],
    KEY_4: ["4","$","",""],
    KEY_5: ["5","%","",""],
    KEY_6: ["6","&","",""],
    KEY_7: ["7","/","{",""],
    KEY_8: ["8","(","[",""],
        KEY_9: ["9",")","]",""],
KEY_0: ["0","=","}",""],
KEY_DASH: ["ß","?","\\",""],
KEY_EQUALS: ["´","`","",""],
KEY_BACKSPACE: ["⌫","","",""],
KEY_TAB: ["⇥","⇤","",""],
KEY_Q: ["","Q","@",""],
KEY_W: ["","W","",""],
KEY_E: ["","E","€",""],
KEY_R: ["","R","",""],
KEY_T: ["","T","",""],
KEY_Y: ["","Z","",""],
KEY_U: ["","U","",""],
KEY_I: ["","I","",""],
KEY_O: ["","O","",""],
KEY_P: ["","P","",""],
KEY_LSQUARE: ["","Ü","",""],
KEY_RSQUARE: ["+","*","~",""],
KEY_ENTER: ["⏎","","",""],
KEY_CAPS: ["⇪","","",""],
KEY_A: ["","A","",""],
KEY_S: ["","S","",""],
KEY_D: ["","D","",""],
KEY_F: ["","F","",""],
KEY_G: ["","G","",""],
KEY_H: ["","H","",""],
KEY_J: ["","J","",""],
KEY_K: ["","K","",""],
KEY_L: ["","L","",""],
KEY_SEMICOLON: ["","Ö","",""],
KEY_APOSTROPHE: ["","Ä","",""],
KEY_HASH: ["#","'","",""],
KEY_SHIFT_L: ["⇧","","",""],
KEY_BACKSLASH: ["<",">","|",""],
KEY_Z: ["","Y","",""],
KEY_X: ["","X","",""],
KEY_C: ["","C","",""],
KEY_V: ["","V","",""],
KEY_B: ["","B","",""],
KEY_N: ["","N","",""],
KEY_M: ["","M","µ",""],
KEY_COMMA: [",",";","",""],
KEY_POINT: [".",":","",""],
KEY_SLASH: ["-","_","",""],
KEY_SHIFT_R: ["⇧","","",""],
KEY_CTRL_L: ["Strg","","",""],
KEY_WIN_L: ["","","",""],
KEY_ALT_L: ["Alt","","",""],
KEY_SPACE: ["","","",""],
KEY_ALT_R: ["Alt Gr","","",""],
KEY_WIN_R: ["","","",""],
KEY_MENU: ["","","",""],
KEY_CTRL_R: ["Strg","","",""]
};

// Mapping of which finger presses which key
var finger_mapping = {
    KEY_GRAVE: 0,
    KEY_1: 0,
    KEY_2: 0,
    KEY_3: 1,
    KEY_4: 2,
    KEY_5: 3,
    KEY_6: 3,
    KEY_7: 6,
    KEY_8: 6,
    KEY_9: 7,
    KEY_0: 8,
    KEY_DASH: 9,
    KEY_EQUALS: 9,
    KEY_BACKSPACE: 9,
    KEY_TAB: 0,
    KEY_Q: 0,
    KEY_W: 1,
    KEY_E: 2,
    KEY_R: 3,
    KEY_T: 3,
    KEY_Y: 6,
    KEY_U: 6,
    KEY_I: 7,
    KEY_O: 8,
    KEY_P: 9,
    KEY_LSQUARE: 9,
    KEY_RSQUARE: 9,
    KEY_ENTER: 9,
    KEY_CAPS: 0,
    KEY_A: 0,
    KEY_S: 1,
    KEY_D: 2,
    KEY_F: 3,
    KEY_G: 3,
    KEY_H: 6,
    KEY_J: 6,
    KEY_K: 7,
    KEY_L: 8,
    KEY_SEMICOLON: 9,
    KEY_APOSTROPHE: 9,
    KEY_HASH: 9,
    KEY_SHIFT_L: 0,
    KEY_BACKSLASH: 0,
    KEY_Z: 0,
    KEY_X: 1,
    KEY_C: 2,
    KEY_V: 3,
    KEY_B: 3,
    KEY_N: 6,
    KEY_M: 6,
    KEY_COMMA: 7,
    KEY_POINT: 8,
    KEY_SLASH: 9,
    KEY_SHIFT_R: 9,
    KEY_CTRL_L: 0,
    KEY_WIN_L: 0,
    KEY_ALT_L: 4,
    KEY_SPACE: 4,
    KEY_ALT_R: 5,
    KEY_WIN_R: 5,
    KEY_MENU: 9,
    KEY_CTRL_R: 9
};


var finger_positions = [ "KEY_A","KEY_S","KEY_D","KEY_F","KEY_SPACE","KEY_ALT_R","KEY_J","KEY_K","KEY_L","KEY_SEMICOLON" ];

var keyboard_layout = {
    "^": ["KEY_GRAVE"],
    "1": ["KEY_1"],
    "2": ["KEY_2"],
    "3": ["KEY_3"],
    "4": ["KEY_4"],
    "5": ["KEY_5"],
    "6": ["KEY_6"],
    "7": ["KEY_7"],
    "8": ["KEY_8"],
    "9": ["KEY_9"],
    "0": ["KEY_0"],
    "ß": ["KEY_DASH"],
    "´": ["KEY_EQUALS"],
    "q": ["KEY_Q"],
    "w": ["KEY_W"],
    "e": ["KEY_E"],
    "r": ["KEY_R"],
    "t": ["KEY_T"],
    "z": ["KEY_Y"],
    "u": ["KEY_U"],
    "i": ["KEY_I"],
    "o": ["KEY_O"],
    "p": ["KEY_P"],
    "ü": ["KEY_LSQUARE"],
    "+": ["KEY_RSQUARE"],
    "a": ["KEY_A"],
    "s": ["KEY_S"],
    "d": ["KEY_D"],
    "f": ["KEY_F"],
    "g": ["KEY_G"],
    "h": ["KEY_H"],
    "j": ["KEY_J"],
    "k": ["KEY_K"],
    "l": ["KEY_L"],
    "ö": ["KEY_SEMICOLON"],
    "ä": ["KEY_APOSTROPHE"],
    "#": ["KEY_HASH"],
    "<": ["KEY_BACKSLASH"],
    "y": ["KEY_Z"],
    "x": ["KEY_X"],
    "c": ["KEY_C"],
    "v": ["KEY_V"],
    "b": ["KEY_B"],
    "n": ["KEY_N"],
    "m": ["KEY_M"],
    ",": ["KEY_COMMA"],
    ".": ["KEY_POINT"],
    "-": ["KEY_SLASH"],
    "°": ["KEY_GRAVE","KEY_SHIFT_R"],
    "!": ["KEY_1","KEY_SHIFT_R"],
    "\"": ["KEY_2","KEY_SHIFT_R"],
    "§": ["KEY_3","KEY_SHIFT_R"],
    "$": ["KEY_4","KEY_SHIFT_R"],
    "%": ["KEY_5","KEY_SHIFT_R"],
    "&": ["KEY_6","KEY_SHIFT_R"],
    "/": ["KEY_7","KEY_SHIFT_L"],
    "(": ["KEY_8","KEY_SHIFT_L"],
        ")": ["KEY_9","KEY_SHIFT_L"],
"=": ["KEY_0","KEY_SHIFT_L"],
"?": ["KEY_DASH","KEY_SHIFT_L"],
"`": ["KEY_EQUALS","KEY_SHIFT_L"],
"Q": ["KEY_Q","KEY_SHIFT_R"],
"W": ["KEY_W","KEY_SHIFT_R"],
"E": ["KEY_E","KEY_SHIFT_R"],
"R": ["KEY_R","KEY_SHIFT_R"],
"T": ["KEY_T","KEY_SHIFT_R"],
"Z": ["KEY_Y","KEY_SHIFT_L"],
"U": ["KEY_U","KEY_SHIFT_L"],
"I": ["KEY_I","KEY_SHIFT_L"],
"O": ["KEY_O","KEY_SHIFT_L"],
"P": ["KEY_P","KEY_SHIFT_L"],
"Ü": ["KEY_LSQUARE","KEY_SHIFT_L"],
"*": ["KEY_RSQUARE","KEY_SHIFT_L"],
"A": ["KEY_A","KEY_SHIFT_R"],
"S": ["KEY_S","KEY_SHIFT_R"],
"D": ["KEY_D","KEY_SHIFT_R"],
"F": ["KEY_F","KEY_SHIFT_R"],
"G": ["KEY_G","KEY_SHIFT_R"],
"H": ["KEY_H","KEY_SHIFT_L"],
"J": ["KEY_J","KEY_SHIFT_L"],
"K": ["KEY_K","KEY_SHIFT_L"],
"L": ["KEY_L","KEY_SHIFT_L"],
"Ö": ["KEY_SEMICOLON","KEY_SHIFT_L"],
"Ä": ["KEY_APOSTROPHE","KEY_SHIFT_L"],
"'": ["KEY_HASH","KEY_SHIFT_L"],
">": ["KEY_BACKSLASH","KEY_SHIFT_R"],
"Y": ["KEY_Z","KEY_SHIFT_R"],
"X": ["KEY_X","KEY_SHIFT_R"],
"C": ["KEY_C","KEY_SHIFT_R"],
"V": ["KEY_V","KEY_SHIFT_R"],
"B": ["KEY_B","KEY_SHIFT_R"],
"N": ["KEY_N","KEY_SHIFT_L"],
"M": ["KEY_M","KEY_SHIFT_L"],
";": ["KEY_COMMA","KEY_SHIFT_L"],
":": ["KEY_POINT","KEY_SHIFT_L"],
"_": ["KEY_SLASH","KEY_SHIFT_L"],
"²": ["KEY_2","KEY_ALT_R"],
"³": ["KEY_3","KEY_ALT_R"],
"{": ["KEY_7","KEY_ALT_R"],
"[": ["KEY_8","KEY_ALT_R"],
"]": ["KEY_9","KEY_ALT_R"],
"}": ["KEY_0","KEY_ALT_R"],
"\\": ["KEY_DASH","KEY_ALT_R"],
"@": ["KEY_Q","KEY_ALT_R"],
"€": ["KEY_E","KEY_ALT_R"],
"~": ["KEY_RSQUARE","KEY_ALT_R"],
"|": ["KEY_BACKSLASH","KEY_ALT_R"],
" ": ["KEY_SPACE"],
"\n": ["KEY_ENTER"]
};

function get_keys_for_character(character){
    return keyboard_layout[character];
};

function get_finger_for_key(key){
    return finger_mapping[key];
};

function get_finger_position_key(finger){
    return finger_positions[finger];
};

function set_finger_to_key(finger,key){
    finger_positions[finger] = key;
}

function get_key_dimensions(key){
    return key_positions[key];
}

function get_key_displaytexts(key){
    return key_displaytexts[key];
}

function get_coordinate_distance(x1,y1,x2,y2){
    var x_difference = Math.abs(x1 - x2);
    var y_difference = Math.abs(y1 - y2);

    return Math.sqrt(x_difference*x_difference + y_difference*y_difference);
};

function draw_keyboard(){

    var keys = Object.keys(key_positions);
    var len = keys.length;

    for (var i = 0; i < len; i++) {
// Draw the key outlines
var coordinates = get_key_dimensions(keys[i]);

// Default colors
ctx.fillStyle = key_bg_color;
ctx.strokeStyle = key_outline_color;

// Highlight keys where fingers are positioned
for (var j = 0; j <= 9; j++) {
    if(keys[i] == get_finger_position_key(j))
        ctx.fillStyle = finger_color[j];
}

ctx.fillRect(coordinates[0]*key_size,coordinates[1]*key_size,coordinates[2]*key_size,coordinates[3]*key_size);
ctx.strokeRect(coordinates[0]*key_size,coordinates[1]*key_size,coordinates[2]*key_size,coordinates[3]*key_size);

// Draw the key texts
var texts = get_key_displaytexts(keys[i]);
ctx.fillStyle = key_text_color;
ctx.font = key_font_style;

ctx.fillText(texts[0],coordinates[0]*key_size + 5,coordinates[1]*key_size + 56);
ctx.fillText(texts[1],coordinates[0]*key_size + 5,coordinates[1]*key_size + 20);
ctx.fillText(texts[2],coordinates[0]*key_size + 45,coordinates[1]*key_size + 56);
ctx.fillText(texts[3],coordinates[0]*key_size + 45,coordinates[1]*key_size + 20);

}

}

function process_character(text, index){

// Get the current character
character = text[index];
var keys = get_keys_for_character(character);

// Mark character in textarea
input_text.setSelectionRange(index, index+1);

var len = keys.length;
for (var i = 0; i < len; i++) {

// Which finger needs to be moved?
var finger = get_finger_for_key(keys[i]);

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

// Calculate the distance
var distance = get_coordinate_distance(before_x,before_y,after_x,after_y);

//ctx.strokeStyle = "#000000";
//ctx.moveTo(before_x*key_size,before_y*key_size);
//ctx.lineTo(after_x*key_size,after_y*key_size);
//ctx.stroke();
draw_keyboard();

//alert("Finger moving from " + finger_before_key + " to " + finger_after_key + " - distance " + distance);

// Continue processing if not at end of text
if (index < text.length - 1) {
    window.setTimeout(function() { process_character(text,index+1); },200);
}
}
};

function process_text(text){
    window.setTimeout(function() { process_character(text,0); },0);
};