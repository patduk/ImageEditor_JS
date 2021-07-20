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

//1d array - working data
// let imageData_data_1d = [];
// let imageData_original2_data_1d = [];
// let imageData_original1_data_1d = []; 

//2d array
// let imageData_data_2d = [];
// let imageData_original2_data_2d = [];
// let imageData_original1_data_2d = [];

let DictV = {};
DictV = {"IncV":0, "ContrastV":0, "BrightnessV":0, "OpacityV":0, "RedV":0, "GreenV":0, "BlueV":0};
// DictV["IncV"] = 0; //0 = false, 1 = true
// DictV["ContrastV"] = 0;
// DictV["BrightnessV"] = 0;
// DictV["OpacityV"] = 0;
// DictV["RedV"] = 0;
// DictV["GreenV"] = 0;
// DictV["BlueV"] = 0;
console.log(DictV);


//undo lists
let Image_undo = []; //store imageData or imageData.data? imageData fornow
let IncV_undo = [];
let ContrastV_undo = [];
let BrightnessV_undo = [];
let OpacityV_undo = [];
let RedV_undo = [];
let GreenV_undo = [];
let BlueV_undo = [];

//redo lists
let Image_redo = [];
let IncV_redo = [];
let ContrastV_redo = [];
let BrightnessV_redo = [];
let OpacityV_redo = [];
let RedV_redo = [];
let GreenV_redo = [];
let BlueV_redo = [];



function logprint() {
    
    let pow1 = document.getElementById('pow1');
    pow1.innerHTML = 
    "undo/redo lists:" + "</br>" +
    "Image_undo " + Image_undo + "</br>" +
    IncV_undo + "</br>" +
    ContrastV_undo + "</br>" +
    BrightnessV_undo + "</br>" +
    OpacityV_undo + "</br>" +
    RedV_undo + "</br>" +
    GreenV_undo + "</br>" +
    BlueV_undo + "</br>" + 
    "Image_redo " + Image_redo + "</br>" +
    IncV_redo + "</br>" +
    ContrastV_redo + "</br>" +
    BrightnessV_redo + "</br>" +
    OpacityV_redo + "</br>" +
    RedV_redo + "</br>" +
    GreenV_redo + "</br>" +
    BlueV_redo + "</br>" +
    "DictV: </br>" +
    DictV["IncV"] + "</br>" +
    DictV["ContrastV"] + "</br>" +
    DictV["BrightnessV"] + "</br>" +
    DictV["OpacityV"] + "</br>" +
    DictV["RedV"] + "</br>" +
    DictV["GreenV"] + "</br>" +
    DictV["BlueV"] + "</br>";


    let pow2 = document.getElementById('pow2');
    pow2.innerHTML = 
    imageData.data.length/4 + "*4 (data.length) </br> " + 
    image.width*image.height +  " (w*h) </br> " + image.width + " (width) </br> " + 
    image.height + " (height) </br>";

    let pow3 = document.getElementById('pow3');
    pow3.innerHTML = "Baka";

}



window.addEventListener('load', function() 
{
    // document.querySelector('input[type="file"]').addEventListener('change', function()
    document.getElementById('diamondx1').addEventListener('change', function() 
    {
        if (this.files && this.files[0]) 
        {
            let canvas = document.getElementById('cv2'); 
            let ctx = canvas.getContext('2d');
            //image = new Image();

            // set src to blob e
            image.src = URL.createObjectURL(this.files[0]).toString(); 
            //canvas.style.width = "50%";
            
            //reset
            ResetAllAttributes();
            
            image.onload = () => {
                URL.revokeObjectURL(image.src);

                //adjust canvas dimension
                canvas.height = image.height;
                canvas.width = image.width;
                                
                //put an image and its left, top location
                ctx.drawImage(image, 0, 0);
                
                //draw a box over the top (useful for 2d spheres?)
                // 

                // //get imageData
                imageData = ctx.getImageData(0, 0, image.width, image.height);
                imageData_original2 = ctx.getImageData(0, 0, image.width, image.height);
                imageData_original1 = ctx.getImageData(0, 0, image.width, image.height);

                // //write 1d array (ditch it? just use 2d array on all image filters?)
                // imageData_data_1d = imageData.data; ///v
                // imageData_original2_data_1d = imageData_original2.data; ///v
                // imageData_original1_data_1d = imageData_original1.data; ///v

                logprint();
            }
        }
    });

    
    
});


function loadsampleimage() {
    let canvas = document.getElementById('cv2');
    let ctx = canvas.getContext('2d');        

    // set src to blob e
    image.src = 'images/wlop2.jpg';   

    canvas.style.width = "100%";
    // if (canvas.style.width > 1200) { canvas.style.width = 1200;}
    
    ResetAllAttributes();
    
    image.onload = () => {
        URL.revokeObjectURL(image.src);
        
        //adjust canvas dimension
        canvas.height = image.height;
        canvas.width = image.width;
        
        //put an image and its left, top location
        ctx.drawImage(image, 0, 0);

        //draw a box over the top (useful for 2d spheres?)
        //

        // //get imageData
        imageData = ctx.getImageData(0, 0, image.width, image.height);
        imageData_original2 = ctx.getImageData(0, 0, image.width, image.height);
        imageData_original1 = ctx.getImageData(0, 0, image.width, image.height);

        // //write 1d array (ditch it? just use 2d array on all image filters?)
        // imageData_data_1d = imageData.data; ///v
        // imageData_original2_data_1d = imageData_original2.data; ///v
        // imageData_original1_data_1d = imageData_original1.data; ///v

        logprint();
    }   
}







//normal edge detection function here - moved to separate js file
//custom edge detection function here - moved
//oil paint function here - moved



//psuedo 2d array way - testing
function lighten() {
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    
    ////1.0-1.4
    ClearRedo();                   //0.8
    is_FilterIncremental = false;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }
    //logprint();


    ////3.0 edit    
    for (let y = 0; y < image.height; y ++) {
        for (let x = 0; x < image.width; x ++) {
            //use formula (y * image.width * 4) + x + 0/1/2 for data[i+0/1/2] to use double for-loops of x and y on imagedata 1d array
            
            ////logic example 1
            let formula = (y*image.width*4)+x*4;
            imageData.data[formula+0] += 10;
            imageData.data[formula+1] += 0;
            imageData.data[formula+2] += 0;
        }
    }
    
    ////4 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();

    ctx.putImageData(imageData, 0, 0);

}


////////////
///////////


function undo2() {
    if (Image_undo.length > 0) {

        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        imageData = ctx.getImageData(0, 0, image.width, image.height); 
        
        ////push to redo lists
        
        Image_redo.push(imageData);
        IncV_redo.push(DictV["IncV"]);
        ContrastV_redo.push(DictV["ContrastV"]);
        BrightnessV_redo.push(DictV["BrightnessV"]);
        OpacityV_redo.push(DictV["OpacityV"]);
        RedV_redo.push(DictV["RedV"]);
        GreenV_redo.push(DictV["GreenV"]);
        BlueV_redo.push(DictV["BlueV"]);

        ////pull and delete from undo lists
        
        imageData = Image_undo.pop();
        DictV["IncV"] = IncV_undo.pop(); //delete last element + set as new variable
        DictV["ContrastV"] = ContrastV_undo.pop();
        DictV["BrightnessV"] = BrightnessV_undo.pop();
        DictV["OpacityV"] = OpacityV_undo.pop();
        DictV["RedV"] = RedV_undo.pop();
        DictV["GreenV"] = GreenV_undo.pop();
        DictV["BlueV"] = BlueV_undo.pop();

        ////update image display
        ctx.putImageData(imageData, 0, 0);
        

        // ////3
        ApplyBaseImageAndIncrementalFiltersToCurrentImage();
        
        ////5
        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);

        logprint();
    }

}

function redo2() {
    if (Image_redo.length > 0) {
        
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        imageData = ctx.getImageData(0, 0, image.width, image.height); 

        ////push to undo lists
        
        Image_undo.push(imageData);
        IncV_undo.push(DictV["IncV"]);
        ContrastV_undo.push(DictV["ContrastV"]);
        BrightnessV_undo.push(DictV["BrightnessV"]);
        OpacityV_undo.push(DictV["OpacityV"]);
        RedV_undo.push(DictV["RedV"]);
        GreenV_undo.push(DictV["GreenV"]);
        BlueV_undo.push(DictV["BlueV"]);
        
        ////pull and delete from undo lists
                
        imageData = Image_redo.pop();
        DictV["IncV"] = IncV_redo.pop(); //delete last element + set as new variable
        DictV["ContrastV"] = ContrastV_redo.pop();
        DictV["BrightnessV"] = BrightnessV_redo.pop();
        DictV["OpacityV"] = OpacityV_redo.pop();
        DictV["RedV"] = RedV_redo.pop();
        DictV["GreenV"] = GreenV_redo.pop();
        DictV["BlueV"] = BlueV_redo.pop();

        ////update image display 
        ctx.putImageData(imageData, 0, 0);
        
        ////3
        ApplyBaseImageAndIncrementalFiltersToCurrentImage();
        
        ////5
        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);

        logprint();
    }

}

function undo() {
    if (Image_undo.length > 0) {
        //prep canvas and ctx (idk why its needed)
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        //1-1.2 store old imageData/attributes to redolist
        ////way1
        // let imageData_temporary = ctx.getImageData(0, 0, image.width, image.height);
        // for (let y = 0; y < image.height; y++) {
        //     for (let x = 0; x < image.width; x++) {
        //         let formula = (y*image.width*4)+x*4;
        //         imageData_temporary.data[formula+0] = imageData_original2.data[formula+0];
        //         imageData_temporary.data[formula+1] = imageData_original2.data[formula+1];
        //         imageData_temporary.data[formula+2] = imageData_original2.data[formula+2];
        //         imageData_temporary.data[formula+3] = imageData_original2.data[formula+3];
        //     }
        // }
        // Image_redo.push(imageData_temporary);
        ////way2
        Image_redo.push(imageData_original2);
       
        IncV_redo.push(DictV["IncV"]);
        ContrastV_redo.push(DictV["ContrastV"]);
        BrightnessV_redo.push(DictV["BrightnessV"]);
        OpacityV_redo.push(DictV["OpacityV"]);
        RedV_redo.push(DictV["RedV"]);
        GreenV_redo.push(DictV["GreenV"]);
        BlueV_redo.push(DictV["BlueV"]);

        //1.3, 1.4 (no need trim undo/redo lists' count to 3, no need to flatten)

        //prep an imageData (idk why it's needed)
        //

        ////2 image - pulling & deleting from undo list
        //// pop = get last element and delete it off from an array
        
        let imageData_undo = Image_undo[Image_undo.length -1];
        Image_undo.pop(); 

        for (let y = 0; y < image.height; y ++) {
            for (let x = 0; x < image.width; x ++) {
                let formula = (y*image.width*4)+x*4;
                imageData.data[formula]     = imageData_undo.data[formula];      // red
                imageData.data[formula + 1] = imageData_undo.data[formula + 1];      // green
                imageData.data[formula + 2] = imageData_undo.data[formula + 2];      // blue
                imageData.data[formula + 3] = imageData_undo.data[formula + 3];      // 
            }
        }
        
        DictV["IncV"] = IncV_undo.pop(); //delete last element + set as new variable
        DictV["ContrastV"] = ContrastV_undo.pop();
        DictV["BrightnessV"] = BrightnessV_undo.pop();
        DictV["OpacityV"] = OpacityV_undo.pop();
        DictV["RedV"] = RedV_undo.pop();
        DictV["GreenV"] = GreenV_undo.pop();
        DictV["BlueV"] = BlueV_undo.pop();

        ////3
        ApplyBaseImageAndIncrementalFiltersToCurrentImage();
        
        ////5
        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);

        ctx.putImageData(imageData, 0, 0);
        logprint();
    }
    
}



function redo() {
    if (Image_redo.length > 0) {
        //prep canvas and ctx (idk why its needed)
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        
        
        //1-1.2 store old imageData/attributes to undolist
        Image_undo.push(imageData_original2);
        IncV_undo.push(DictV["IncV"]);
        ContrastV_undo.push(DictV["ContrastV"]);
        BrightnessV_undo.push(DictV["BrightnessV"]);
        OpacityV_undo.push(DictV["OpacityV"]);
        RedV_undo.push(DictV["RedV"]);
        GreenV_undo.push(DictV["GreenV"]);
        BlueV_undo.push(DictV["BlueV"]);


        ////1.3, 1.4 none (no need trim undo/redo lists' count to 3, no need to flatten)

        //prep an imageData (idk why it's needed)
        //imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        

        ////2 imgsharp - pulling & deleting from redo list
        //let imageData_redo = Image_redo[Image_redo.length-1];
        let imageData_redo = Image_redo.pop();

        for (var i = 0; i < imageData.length; i += 4) {
            imageData.data[i]     = imageData_redo.data[i];      // red
            imageData.data[i + 1] = imageData_redo.data[i + 1];      // green
            imageData.data[i + 2] = imageData_redo.data[i + 2];      // blue
            imageData.data[i + 3] = imageData_redo.data[i + 3];      // alpha  
        }
        //Image_redo.pop(); //delete last element

        DictV["IncV"] = IncV_redo.pop(); //delete last element + set as new variable
        DictV["ContrastV"] = ContrastV_redo.pop();
        DictV["BrightnessV"] = BrightnessV_redo.pop();
        DictV["OpacityV"] = OpacityV_redo.pop();
        DictV["RedV"] = RedV_redo.pop();
        DictV["GreenV"] = GreenV_redo.pop();
        DictV["BlueV"] = BlueV_redo.pop();

        ApplyBaseImageAndIncrementalFiltersToCurrentImage();

        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);

        logprint();
    }
    
}



function reset() {
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);
    

    ClearRedo();
    
    //1.0 store to undolist
    Image_undo.push(imageData);
    

    //??
    //ctx.getImageData(starting left, starting top, capture w, capture h)
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;

    //3.0
    for (var i = 0; i < data.length; i += 4) {
        imageData.data[i]     = imageData_original1.data[i];        // r
        imageData.data[i + 1] = imageData_original1.data[i + 1];    // g
        imageData.data[i + 2] = imageData_original1.data[i + 2];    // b
        imageData.data[i + 3] = imageData_original1.data[i + 3];    // a  
    }
    ctx.putImageData(imageData, 0, 0);

    logprint();
}

//////////
//////////



function SaveAttributesToUndoLists() //1-1.4
{
    //1-1.2 store old imageData/attributes to redolist

    ////way1
    // let imageData_temporary = ctx.getImageData(0, 0, image.width, image.height);
    // for (let y = 0; y < image.height; y++) {
    //     for (let x = 0; x < image.width; x++) {
    //         let formula = (y*image.width*4)+x*4;
    //         imageData_temporary.data[formula+0] = imageData_original2.data[formula+0];
    //         imageData_temporary.data[formula+1] = imageData_original2.data[formula+1];
    //         imageData_temporary.data[formula+2] = imageData_original2.data[formula+2];
    //         imageData_temporary.data[formula+3] = imageData_original2.data[formula+3];
    //     }
    // }
    // Image_undo.push(imageData_temporary);
    
    ////OR way2
    Image_undo.push(imageData_original2);

    ////1.2
    ////saving incremental filter attributes to undo lists
    IncV_undo.push(DictV["IncV"]);
    ContrastV_undo.push(DictV["ContrastV"]);
    BrightnessV_undo.push(DictV["BrightnessV"]);
    OpacityV_undo.push(DictV["OpacityV"]);
    RedV_undo.push(DictV["RedV"]);
    GreenV_undo.push(DictV["GreenV"]);
    BlueV_undo.push(DictV["BlueV"]);

    ////1.3 (limit undo lists' count to num_limit) (unique code block)
    // let num_limit = 3;
    // if (Image_undo.length > num_limit) { Image_undo.shift(); }
    // if (IncV_undo.length > num_limit) { IncV_undo.shift(); }
    // if (ContrastV_undo.length > num_limit) { ContrastV_undo.shift(); }
    // if (BrightnessV_undo.length > num_limit) { BrightnessV_undo.shift(); }
    // if (OpacityV_undo.length > num_limit) { OpacityV_undo.shift(); }
    // if (RedV_undo.length > num_limit) { RedV_undo.shift(); }
    // if (GreenV_undo.length > num_limit) { GreenV_undo.shift(); }
    // if (BlueV_undo.length > num_limit) { BlueV_undo.shift(); }

    ////1.4 (put this on undo/redo? no)

    if (DictV["IncV"] === 1 && is_FilterIncremental === false)
        flatten();

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
}

function ResetAllAttributes() //ok
{
    Image_undo = [];
    IncV_undo = [];
    ContrastV_undo = [];
    BrightnessV_undo = [];
    OpacityV_undo = [];
    RedV_undo = [];
    GreenV_undo = [];
    BlueV_undo = [];

    Image_redo = [];
    IncV_redo = [];
    ContrastV_redo = [];
    BrightnessV_redo = [];
    OpacityV_redo = [];
    RedV_redo = [];
    GreenV_redo = [];
    BlueV_redo = [];

    for (key in DictV) {
        DictV[key] = 0;
    }
}



function flatten() //need fix
{
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);
    
    //imageData = ctx.getImageData(0, 0, image.width, image.height);
    ClearRedo();                   //0.8
    is_FilterIncremental = true;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();

    ////2 reset all incremental filter attributes to 0
    for (key in DictV)
    {
        DictV[key] = 0;
    }
    
    
    // let imageData_data_1d = imageData.data;
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    imageData_original2 = ctx.getImageData(0, 0, image.width, image.height);
    //let data = imageData.data;   
    

    ////2.5 (imgSharp_original2 = imgSharp)
    for (let y = 0; y < image.height; y++)
    {
        for (let x = 0; x < image.width; x++)
        {
            let formula = (y*image.width*4)+x*4;
            imageData_original2.data[formula+0] = imageData.data[formula+0];
            imageData_original2.data[formula+1] = imageData.data[formula+1];
            imageData_original2.data[formula+2] = imageData.data[formula+2]; 
            imageData_original2.data[formula+3] = imageData.data[formula+3];
        }
    }
    //ctx.putImageData(imageData_original2, 0, 0);
    
    ////3 no action needed (imgSharp = imgSharp_original2

    ////way1 - call javascript function invokevoidasync, reset slider position and text value
    JS_resetsliderpositionandtextvalue_Brightness();

    
}

function Flatten_nosavingtoundo() //looks good
{
    ////canvas and ctx for 2.5 WAY 1 - no needed
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //imageData = ctx.getImageData(0, 0, image.width, image.height);      

    ////2 reset all incremental filter attributes to 0 - no needed?
    for (key in DictV)
    {
        DictV[key] = 0;
    }

    ////2.5 (imgSharp_original2 = imgSharp)
    //WAY 1 - no working
    // for (let y = 0; y < image.height; y++)
    // {
    //     for (let x = 0; x < image.idth; x++)
    //     {
    //         let formula = (y*image.width*4)+x*4;
    //         imageData_original2.data[formula+0] = imageData.data[formula+0];
    //         imageData_original2.data[formula+1] = imageData.data[formula+1];
    //         imageData_original2.data[formula+2] = imageData.data[formula+2];  
    //     }
    // }
    ////WAY 2 - works
    imageData_original2 = imageData;

    ////3 no action needed (imgSharp = imgSharp_original2

    ////way1 - call javascript function invokevoidasync, reset slider position and text value
    JS_resetsliderpositionandtextvalue_Brightness();
}





function Brightness(input_value)
{
    if (true) //displayimage
    {           
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                let formula = (y*image.width*4)+x*4;

                let red = imageData.data[formula+0] + input_value;
                let green = imageData.data[formula+1] + input_value;
                let blue = imageData.data[formula+2] + input_value;
                
                if (red > 255) { red = 255; }
                else if (red < 0) { red = 0; }
                if (green > 255) { green = 255; }
                else if (green < 0) { green = 0; }
                if (blue > 255) { blue = 255; }
                else if (blue < 0) { blue = 0; }

                imageData.data[formula+0] = red;
                imageData.data[formula+1] = green;
                imageData.data[formula+2] = blue;   
            }
        }
    }
}


function ApplyBaseImageAndIncrementalFiltersToCurrentImage()
{
    ////3 edit image
    ////3 edit image
    
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2');
    let ctx = canvas.getContext('2d');   
    //imageData = ctx.getImageData(0,0,image.width,image.height); //- already done?
    //imageData_original2  = ctx.getImageData(0,0,image.width,image.height); //- already used in onchange?


    ////make imgSharp = imgSharp_original2 (base image) prior to adding incremental filters
    ////WAY1
    for (let y = 0; y < image.height; y++)
    {
        for (let x = 0; x < image.width; x++)
        {
            let formula = (y*image.width*4)+x*4;
            imageData.data[formula+0] = imageData_original2.data[formula+0];
            imageData.data[formula+1] = imageData_original2.data[formula+1];
            imageData.data[formula+2] = imageData_original2.data[formula+2];  

        }
    }
    ////WAY2
    //imageData = imageData_original2;


    ////adding incremental filters - try to make the codes shorter
    for (key in DictV)
    {
        // if (key == "ContrastV")
        // {
        //     Contrast(DictV[key]); //0.0-3.0
        // }
        if (key == "BrightnessV")
        {
            Brightness(DictV[key]);
            
        }
        // if (key == "OpacityV")
        // {
        //     Opacity(DictV[key]);
        // }
        // if (key == "RedV")
        // {
        //     Red(DictV[key]);
        // }
        // if (key == "GreenV")
        // {
        //     Green(DictV[key]);
        // }
        // if (key == "BlueV")
        // {
        //     Blue(DictV[key]);
        // }
    }
    //3 edit image
    //3 edit image
    
    //ctx.putImageData(imageData, 0, 0); //remove this cuz alreayd been used by undo and redo i guess
    
}



//onchange slider
function Onchange_Slider_Brightness()
{
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0,0,image.width,image.height);
    
    ClearRedo();                   //0.8
	is_FilterIncremental = true;   //0.9
	SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2
    let input_value = parseInt(document.getElementById('slider_Brightness').value);
    document.getElementById('text_Brightness').value = input_value;

    DictV["IncV"] = 1;
	DictV["BrightnessV"] = input_value;

    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();
    
    ctx.putImageData(imageData, 0, 0);
}

function Onchange_Text_Brightness() 
{
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0,0,image.width,image.height);

    ClearRedo();                   //0.8
	is_FilterIncremental = true;   //0.9
	SaveAttributesToUndoLists();   //1-1.4
    logprint();

    ////2
    let input_value = parseInt(document.getElementById('text_Brightness').value);
    if (input_value > 255) {
        input_value = 255;
        document.getElementById('text_Brightness').value = input_value;
    }
    if (input_value < -255) {
        input_value = -255;
        document.getElementById('text_Brightness').value = input_value; 
    }
    document.getElementById('slider_Brightness').value = input_value;

    DictV["IncV"] = 1;
	DictV["BrightnessV"] = input_value;


    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();

    ctx.putImageData(imageData, 0, 0);
}


function JS_resetsliderpositionandtextvalue_Brightness() {
    document.getElementById('slider_Brightness').value = 0;
    document.getElementById('text_Brightness').value = 0;
}

function JS_changesliderpositionandtextvalue_Brightness(n) {
    document.getElementById('slider_Brightness').value = n;
	document.getElementById('text_Brightness').value = n;
}