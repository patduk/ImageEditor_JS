let status = "Sample image";
let displayImage = false;
let showloading = false;
let showprocessing = false;
let showerror = false;
let is_FilterIncremental = false;

let image = new Image();

//some imageData
let imageData;
let imageData_original2;
let imageData_original1;

let DictV = {};
DictV = {"IncV":0, "ContrastV":0, "BrightnessV":0, "OpacityV":0, "RedV":0, "GreenV":0, "BlueV":0, "GblurV":0};

//undo lists
let Image_undo = [];
let IncV_undo = [];
let ContrastV_undo = [];
let BrightnessV_undo = [];
let OpacityV_undo = [];
let RedV_undo = [];
let GreenV_undo = [];
let BlueV_undo = [];
let GblurV_undo = [];

//redo lists
let Image_redo = [];
let IncV_redo = [];
let ContrastV_redo = [];
let BrightnessV_redo = [];
let OpacityV_redo = [];
let RedV_redo = [];
let GreenV_redo = [];
let BlueV_redo = [];
let GblurV_redo = [];

//global variables (may not be needed)
let instance1_panzoom_global;
let container_canvas_h_fullscreen_global;
let container_canvas_h_normalscreen_global;




function update_stats() { 
    let id_log1 = document.getElementById("id_log1");
    id_log1.innerHTML =
    "Image file name: " + image.src.replace(/^.*[\\\/]/, '') + " </br> " + 
    "Image dimensions: " + image.width + "w * " + image.height + "h</br> " + 
    "------------------------</br>" +
    "Undo data count: " + Image_undo.length + "</br>" +
    "Redo data count: " + Image_redo.length + "</br>" +
    "------------------------</br>" + 
    "- Incremental filters' current configurations - </br>" +
    "isIncremental: " + DictV["IncV"] + "</br>" +
    "Contrast: " + DictV["ContrastV"] + "</br>" +
    "Brightness: " + DictV["BrightnessV"] + "</br>" +
    "Opacity: " + DictV["OpacityV"] + "</br>" +
    "Red: " + DictV["RedV"] + "</br>" +
    "Green: " + DictV["GreenV"] + "</br>" +
    "Blue: " + DictV["BlueV"] + "</br>" + 
    "Gaussian Blur: " + DictV["GblurV"] + "</br>";
}






function ClearRedo() //ok
{
    Image_redo = [];
    IncV_redo = [];
    ContrastV_redo = [];
    BrightnessV_redo = [];
    OpacityV_redo = [];
    RedV_redo = [];
    GreenV_redo = [];
    BlueV_redo = [];
    GblurV_redo = [];
}







