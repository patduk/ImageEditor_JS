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



const notes = ['do', 'ray', 'me'];

//runs before website html page loads.. i think
notes.forEach((note) => { 
    console.log(note);
    // let id_log1 = document.getElementById("id_log1");
    // console.log(id_log1);
});


['do1', 'ray2', 'me3'].forEach((a) => {
    console.log(a);
});

////////////

function ftn1_notesforeach(notes) {
    notes.forEach(a =>  
    {
        console.log('fr: ' + a);
    });
}

let ftn2_notesforeach = (notes) => {
    notes.forEach(a => 
    {
        console.log('fr: ' + a);
    });
}


////////////


// let consolelog1 = function(a) {
//     console.log("filter applied 1: " + a);
// }
////testing an anonymous function
let consolelog1 = (a) => {
    console.log("filter applied 2: " + a);
}


// function ftn3_combined(ftna_any, ftnb_any) {
//     ftna_any(notes);
//     ftnb_any('aaaa');
    
// }


////////////



function myForEach(array, callback) {
    for (let i = 0; i < array.length -1; i++) {
      callback(array[i]); // This is when the callback function gets called, or executed
    }
  }
  
  // You would call it like this:
  const myArry = [2, 3, 4, 2];
  myForEach(myArry, (item) => {
    console.log(item + 2); 
  })

  
////////////



// function Oninput_Slider_LiveUpdate(a) {
//     //document.getElementById("text_Contrast").value = document.getElementById(id_extracted).value;

//     let btns = document.getElementById("container_id3").getElementsByClassName(a);
//     btns[0].value = input_value;
// }


// ////2
// function Onchange_Slider(a) {
        
    
//         ////999 prep canvas and ctx (idk why its needed)
//         let canvas = document.getElementById('cv2'); 
//         let ctx = canvas.getContext('2d');
//         imageData = ctx.getImageData(0,0,image.width,image.height);
        

//         ClearRedo();                   //0.8
//         is_FilterIncremental = true;   //0.9
//         SaveAttributesToUndoLists();   //1-1.4

        
//         ////2
//         // let input_value = parseFloat(document.getElementById('slider_Contrast').value);
//         // document.getElementById('text_Contrast').value = input_value;

//         // ////2
      
//         let btns = document.getElementById("container_id3").
//         getElementsByClassName(a);
        

//         let input_value = btns[1].value; //pulled from new slider value
//         btns[0].value = input_value;


//         // document.getElementById("container_id3").
//         // getElementsByClassName(a)[0].value = input_value;
//         // let btns = document.getElementById("container_id3").
//         // getElementsByClassName(a);
//         // for (let i = 0; i < btns.length; i++) {
//         //     btns[i].value = input_value;
//         // }


//         DictV["IncV"] = 1;
//         DictV["ContrastV"] = input_value;


//         ////3 edit image
//         ApplyBaseImageAndIncrementalFiltersToCurrentImage();
        

//         //canvas update
//         ctx.putImageData(imageData, 0, 0);
//         //image update
//         document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 

// }
