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




function ftn_showprocessing() {
    let imagestatus = document.getElementById('imagestatus');
    
    if (showprocessing === true) {imagestatus.innerHTML = "Processing";}
    else {imagestatus.innerHTML = "Ready";}
        
}


// document.addEventListener("click", event => {});
document.addEventListener("touchstart", event => {
    if(event.touches.length > 1) {
        console.log("zoom plz stahp");
        event.preventDefault();
        event.stopPropagation(); // maybe useless
    }
}, {passive: false});


function logprint() {
    
    // let pow1 = document.getElementById('pow1');
    // pow1.innerHTML = 
    // "undo/redo lists:" + "</br>" +
    // "Image_undo " + Image_undo + "</br>" +
    // IncV_undo + "</br>" +
    // ContrastV_undo + "</br>" +
    // BrightnessV_undo + "</br>" +
    // OpacityV_undo + "</br>" +
    // RedV_undo + "</br>" +
    // GreenV_undo + "</br>" +
    // BlueV_undo + "</br>" + 
    // "Image_redo " + Image_redo + "</br>" +
    // IncV_redo + "</br>" +
    // ContrastV_redo + "</br>" +
    // BrightnessV_redo + "</br>" +
    // OpacityV_redo + "</br>" +
    // RedV_redo + "</br>" +
    // GreenV_redo + "</br>" +
    // BlueV_redo + "</br>" +
    // "DictV: </br>" +
    // DictV["IncV"] + "</br>" +
    // DictV["ContrastV"] + "</br>" +
    // DictV["BrightnessV"] + "</br>" +
    // DictV["OpacityV"] + "</br>" +
    // DictV["RedV"] + "</br>" +
    // DictV["GreenV"] + "</br>" +
    // DictV["BlueV"] + "</br>";


    // let pow2 = document.getElementById('pow2');
    // pow2.innerHTML = 
    // imageData.data.length/4 + "*4 (data.length) </br> " + 
    // image.width*image.height +  " (w*h) </br> " + image.width + " (width) </br> " + 
    // image.height + " (height) </br>";

    // let pow3 = document.getElementById('pow3');
    // pow3.innerHTML = "Baka";

}

//load sample image
window.addEventListener('load', function() {
    //function loadsampleimage() {
    let canvas = document.getElementById('cv2');
    let ctx = canvas.getContext('2d');        
    image = new Image();
    
    // set src to blob e
    image.src = 'images/wlop2.jpg';
    
    ResetAllAttributes();

    // canvas.style.height = image.height.ToString + "%";
    // canvas.style.width = image.width.ToString + "%";
    // OR
    canvas.style.height = "";
    canvas.style.width = "";
    

    image.onload = () => {
        URL.revokeObjectURL(image.src);

        //new canvas dimensions
        canvas.height = image.height;
        canvas.width = image.width;

        resizeCanvas();

        //put an image and its left, top location
        ctx.drawImage(image, 0, 0);

        //draw a box over the top (useful for 2d spheres?)
        //

        // //get imageData
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        imageData_original2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
        imageData_original1 = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        logprint();
    }   
});



//upload file
window.addEventListener('load', function() 
{
    // document.querySelector('input[type="file"]').addEventListener('change', function()
    document.getElementById('diamondx1').addEventListener('change', function() 
    {
        if (this.files && this.files[0]) 
        {
            let canvas = document.getElementById('cv2'); 
            let ctx = canvas.getContext('2d');
            image = new Image();

            // set src to blob e
            image.src = URL.createObjectURL(this.files[0]).toString(); 
            
            //reset
            ResetAllAttributes();

            // canvas.style.height = image.height.ToString + "%";
            // canvas.style.width = image.width.ToString + "%";
            // OR
            canvas.style.height = "";
            canvas.style.width = "";

            
            image.onload = () => {
                URL.revokeObjectURL(image.src);

                
                //new canvas dimensions
                canvas.height = image.height;
                canvas.width = image.width;

              

                resizeCanvas();


                //put an image and its left, top location
                ctx.drawImage(image, 0, 0);
                
                //draw a box over the top (useful for 2d spheres?)
                // 

                // //get imageData
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                imageData_original2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                imageData_original1 = ctx.getImageData(0, 0, canvas.width, canvas.height);

                logprint();
            }
        }
    });

    
    
});



window.addEventListener("resize", resizeCanvas);
function resizeCanvas() {
    let canvas = document.getElementById('cv2');
    // let ctx = canvas.getContext('2d'); 
    // imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    // "nickname" variables
    let container_canvas_w = document.getElementById("container_canvas_id").clientWidth;
    let container_canvas_h = document.getElementById("container_canvas_id").clientHeight;    

    // reset 
    canvas.style.height = "";
    canvas.style.width = "";

    // log print
    console.log("cw: " + canvas.width, "\nch: " + canvas.height);
    console.log("stylew: " + canvas.style.width, "\nstyleh: " + canvas.style.height);
    console.log("containerw: " + container_canvas_w, "\ncontainerh: " + container_canvas_h);


    
    //// if image is portrait
    if (canvas.height > canvas.width) {

        //if image is bigger than container in both width and height
        if (canvas.height > container_canvas_h && canvas.width > container_canvas_w) 
        {
            //if container is landscape
            if (container_canvas_w > container_canvas_h) {
                canvas.style.height = "100%";
                console.log("portrait, 1.1");
            }

            //if container is portrait
            else if (container_canvas_h > container_canvas_w) {
                //ratio comparison between container & image:
                //if container is more landscape than image
                if (container_canvas_w/container_canvas_h > canvas.width/canvas.height)
                    canvas.style.height = "100%";
                //if container is more portrait than image
                else if (container_canvas_w/container_canvas_h < canvas.width/canvas.height)
                    canvas.style.width = "100%";

                console.log("portrait, 1.2");
            }

            // if container is perfect square
            else if (container_canvas_w === container_canvas_h) {
                canvas.style.width = "100%";
                console.log("portrait, 1.3");
            }
        }

        // if image is bigger than container in width only
        else if (canvas.width > container_canvas_w) 
        {
            canvas.style.width = "100%";
            console.log("landscape, 2");
        }

        //if image is bigger than container in height only
        else if (canvas.height > container_canvas_h) 
        {
            canvas.style.height = "100%";
            console.log("landscape, 3");
        }

        //if image is same width/height as container - not needed?
        // else if {
        // }


    }


    //// if image is landscape
    else if (canvas.width > canvas.height) {

        //if image is bigger than container in both width and height
        if (canvas.height > container_canvas_h && canvas.width > container_canvas_w) 
        {
            //if container is landscape
            if (container_canvas_w > container_canvas_h) {
                //ratio comparison between container & image:
                //if container is more landscape than image
                if (container_canvas_w/container_canvas_h > canvas.width/canvas.height)
                    canvas.style.height = "100%";
                //if container is more portrait than image
                if (container_canvas_w/container_canvas_h < canvas.width/canvas.height)
                    canvas.style.width = "100%";

                console.log("landscape, 1.1");
            }

            //if container is portrait
            else if (container_canvas_h > container_canvas_w) {
                canvas.style.width = "100%";
                console.log("landscape, 1.2");
            }

            // if container is perfect square
            else if (container_canvas_w === container_canvas_h) {
                canvas.style.width = "100%";
                console.log("landscape, 1.3");
            }
        }

        // if image is bigger than container in width only
        else if (canvas.width > container_canvas_w) 
        {
            canvas.style.width = "100%";
            console.log("landscape, 2");
        }

        //if image is bigger than container in height only
        else if (canvas.height > container_canvas_h) 
        {
            canvas.style.height = "100%";
            console.log("landscape, 3");
        }

        //if image is same width/height as container - not needed?
        // else if {
        // }
       
    }

    //// if image is perfect square
    else if (canvas.height === canvas.width) {

        // if image is bigger than container in both width and height
        if (canvas.height > container_canvas_h && canvas.width > container_canvas_w) {
            //if container is landscape
            if (container_canvas_w > container_canvas_h) {
                canvas.style.height = "100%";
                console.log("image: square, 1.1");
            }
            //if container is portrait
            else if (container_canvas_w < container_canvas_h) {
                canvas.style.width = "100%";
                console.log("image: square, 1.2");
            }
        }

        // if image is bigger than container in width only
        else if (canvas.width > container_canvas_w) 
        {
            canvas.style.width = "100%";
            console.log("image: square, 2");
        }

        //if image is bigger than container in height only
        else if (canvas.height > container_canvas_h) 
        {
            canvas.style.height = "100%";
            console.log("image: square, 3");
        }

    }
}



function ellipse_test1() {
    let canvas = document.getElementById('cv2');
    let ctx = canvas.getContext('2d'); 
    

    ////1.0-1.4 store to undolist
    ClearRedo();                   //0.8
    is_FilterIncremental = false;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }

    ////3.0 edit?
    //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    //draw stroke ellipse
    ctx.strokeStyle = "rgb(127, 0, 0)";
    ctx.beginPath();
    ctx.ellipse(image.width/2, image.height/2, image.width/2, image.height/2, 0, 0, Math.PI*2);
    ctx.stroke();

    //draw filled ellipse
    ctx.fillStyle = 'green';
    ctx.beginPath();
    ctx.ellipse(image.width/2, image.height/2, image.width/4, image.height/4, 0, 0, Math.PI*2);
    ctx.fill(); 
    
    ////4.0 update imageData to hold new ellipse shapes 
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    ////4.0 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();
    
    ctx.putImageData(imageData, 0, 0);
}



//normal edge detection function here - moved to separate js file
//custom edge detection function here - moved
//oil paint function here - moved



//psuedo 2d array way - testing
function lighten() {
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    // image = new Image();
    // ctx.drawImage(image, 0, 0);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    
    ////1.0-1.4 store to undolist
    ClearRedo();                   //0.8
    is_FilterIncremental = false;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }

    ////3.0 edit    
    for (let y = 0; y < image.height; y ++) {
        for (let x = 0; x < image.width; x ++) {
            //use formula (y * image.width * 4) + x + 0/1/2 for data[i+0/1/2] to use double for-loops of x and y on imagedata 1d array
            
            ////logic example 1
            let formula = (y*image.width*4)+x*4;
            imageData.data[formula+0] += 0;
            imageData.data[formula+1] += 25;
            imageData.data[formula+2] += 0;
            imageData.data[formula+3] += 0;
        }
    }
    

    ////4.0 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();
    
    
    ctx.putImageData(imageData, 0, 0);
}



function invert() {
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    // image = new Image();
    // ctx.drawImage(image, 0, 0);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    
    ////1.0-1.4 store to undolist
    ClearRedo();                   //0.8
    is_FilterIncremental = false;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }
    
    ////3.0
    for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 0] = 255-imageData.data[i+0];
        imageData.data[i + 1] = 255-imageData.data[i+1];
        imageData.data[i + 2] = 255-imageData.data[i+2];
    }


    ////4.0 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();
    
    
    ctx.putImageData(imageData, 0, 0);
}


function grayscale() {
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    // image = new Image();
    // ctx.drawImage(image, 0, 0);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    
    ////1.0-1.4 store to undolist
    ClearRedo();                   //0.8
    is_FilterIncremental = false;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }
    

    ////3.0 edit
    for (var i = 0; i < imageData.data.length; i += 4) {
        let bw = (imageData.data[i+0] + imageData.data[i+1] + imageData.data[i+2]) / 3;
        imageData.data[i + 0] = bw;
        imageData.data[i + 1] = bw;
        imageData.data[i + 2] = bw;
    }


    ////4.0 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();
    
    
    ctx.putImageData(imageData, 0, 0);
}


function gaussianblur() {

    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    // image = new Image();
    // ctx.drawImage(image, 0, 0);
  imageData = ctx.getImageData(0,0,canvas.width,canvas.height);


  var tmpPx = new Uint8ClampedArray(imageData.data.length);
  tmpPx.set(imageData.data);

  for (var i = 0, len= imageData.data.length; i < len; i++) {
     if (i % 4 === 3) {continue;}

     imageData.data[i] = ( tmpPx[i] 
        + (tmpPx[i - 4] || tmpPx[i])
        + (tmpPx[i + 4] || tmpPx[i]) 
        + (tmpPx[i - 4 * imageData.data.width] || tmpPx[i])
        + (tmpPx[i + 4 * imageData.data.width] || tmpPx[i]) 
        + (tmpPx[i - 4 * imageData.data.width - 4] || tmpPx[i])
        + (tmpPx[i + 4 * imageData.data.width + 4] || tmpPx[i])
        + (tmpPx[i + 4 * imageData.data.width - 4] || tmpPx[i])
        + (tmpPx[i - 4 * imageData.data.width + 4] || tmpPx[i])
        )/9;
  };
  // data.data = px;

  ctx.putImageData(imageData,0,0);
  //delete tmpPx;
  //btnBlur.removeAttribute('disabled');
  //btnBlur.textContent = 'Blur'; 
}

// source channel, target channel, width, height, radius
function gaussBlur_1 (scl, tcl, w, h, r) {
    var rs = Math.ceil(r * 2.57);     // significant radius
    for(var i=0; i<h; i++)
        for(var j=0; j<w; j++) {
            var val = 0, wsum = 0;
            for(var iy = i-rs; iy<i+rs+1; iy++)
                for(var ix = j-rs; ix<j+rs+1; ix++) {
                    var x = Math.min(w-1, Math.max(0, ix));
                    var y = Math.min(h-1, Math.max(0, iy));
                    var dsq = (ix-j)*(ix-j)+(iy-i)*(iy-i);
                    var wght = Math.exp( -dsq / (2*r*r) ) / (Math.PI*2*r*r);
                    val += scl[y*w+x] * wght;  wsum += wght;
                }
            tcl[i*w+j] = Math.round(val/wsum);            
        }
}


////////////
///////////


function undo2() {
    if (Image_undo.length > 0) {

        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); 
        
        ////push to redo lists
        
        Image_redo.push(imageData_original2); //ff
        IncV_redo.push(DictV["IncV"]);
        ContrastV_redo.push(DictV["ContrastV"]);
        BrightnessV_redo.push(DictV["BrightnessV"]);
        OpacityV_redo.push(DictV["OpacityV"]);
        RedV_redo.push(DictV["RedV"]);
        GreenV_redo.push(DictV["GreenV"]);
        BlueV_redo.push(DictV["BlueV"]);

        ////pull and delete from undo lists
        
        imageData_original2 = Image_undo.pop(); //ff
        DictV["IncV"] = IncV_undo.pop(); //delete last element + set as new variable
        DictV["ContrastV"] = ContrastV_undo.pop();
        DictV["BrightnessV"] = BrightnessV_undo.pop();
        DictV["OpacityV"] = OpacityV_undo.pop();
        DictV["RedV"] = RedV_undo.pop();
        DictV["GreenV"] = GreenV_undo.pop();
        DictV["BlueV"] = BlueV_undo.pop();

        
        
        // ////3
        ApplyBaseImageAndIncrementalFiltersToCurrentImage(); //make imageData => imageData_original2 + filters
        
        ////update image display
        ctx.putImageData(imageData, 0, 0);

        ////5
        JS_changesliderpositionandtextvalue_Contrast(DictV["ContrastV"]);
        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);
        JS_changesliderpositionandtextvalue_Opacity(DictV["OpacityV"]);
        JS_changesliderpositionandtextvalue_Red(DictV["RedV"]);
        JS_changesliderpositionandtextvalue_Green(DictV["GreenV"]);
        JS_changesliderpositionandtextvalue_Blue(DictV["BlueV"]);
        


        logprint();
    }

}

function redo2() {
    if (Image_redo.length > 0) {
        
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); 


        ////push to undo lists

        Image_undo.push(imageData_original2); //ff
        IncV_undo.push(DictV["IncV"]);
        ContrastV_undo.push(DictV["ContrastV"]);
        BrightnessV_undo.push(DictV["BrightnessV"]);
        OpacityV_undo.push(DictV["OpacityV"]);
        RedV_undo.push(DictV["RedV"]);
        GreenV_undo.push(DictV["GreenV"]);
        BlueV_undo.push(DictV["BlueV"]);
        
        ////pull and delete from undo lists
        //.pop() = delete last element + set as new variable
        imageData_original2 = Image_redo.pop(); //ff       
        DictV["IncV"] = IncV_redo.pop();
        DictV["ContrastV"] = ContrastV_redo.pop();
        DictV["BrightnessV"] = BrightnessV_redo.pop();
        DictV["OpacityV"] = OpacityV_redo.pop();
        DictV["RedV"] = RedV_redo.pop();
        DictV["GreenV"] = GreenV_redo.pop();
        DictV["BlueV"] = BlueV_redo.pop();

        / ////3
        ApplyBaseImageAndIncrementalFiltersToCurrentImage();
        
        ////update image display
        ctx.putImageData(imageData, 0, 0);
        
        ////5
        ////5
        JS_changesliderpositionandtextvalue_Contrast(DictV["ContrastV"]);
        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);
        JS_changesliderpositionandtextvalue_Opacity(DictV["OpacityV"]);
        JS_changesliderpositionandtextvalue_Red(DictV["RedV"]);
        JS_changesliderpositionandtextvalue_Green(DictV["GreenV"]);
        JS_changesliderpositionandtextvalue_Blue(DictV["BlueV"]);
        


        logprint();
    }

}




function reset() {
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    // image = new Image();
    // ctx.drawImage(image, 0, 0);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    

    ////1.0-1.4 store to undolist
    ClearRedo();                   //0.8
    is_FilterIncremental = false;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }

    ////3.0
    for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i]     = imageData_original1.data[i];        // r
        imageData.data[i + 1] = imageData_original1.data[i + 1];    // g
        imageData.data[i + 2] = imageData_original1.data[i + 2];    // b
        imageData.data[i + 3] = imageData_original1.data[i + 3];    // a  
    }

    ////4.0 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();
    
    
    ctx.putImageData(imageData, 0, 0);
}

//not perfect:
function download() {
    let canvas = document.getElementById("cv2");
    let ctx = canvas.getContext('2d');

    ///?
    // image = new Image();
    // ctx.drawImage(image, 0, 0);
    ////


    let img    = canvas.toDataURL("image/png");
    let fullQuality = canvas.toDataURL('image/jpeg', 1.0);
    // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...9oADAMBAAIRAxEAPwD/AD/6AP/Z"
    let mediumQuality = canvas.toDataURL('image/jpeg', 0.5);
    let lowQuality = canvas.toDataURL('image/jpeg', 0.1);



    let element = document.createElement('a');
    let filename = 'untitled.png';
    element.setAttribute('href', img);
    element.setAttribute('download', filename);
    element.click();  
                
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
    ////way2
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
    let num_limit = 8;
    if (Image_undo.length > num_limit) { Image_undo.shift(); }
    if (IncV_undo.length > num_limit) { IncV_undo.shift(); }
    if (ContrastV_undo.length > num_limit) { ContrastV_undo.shift(); }
    if (BrightnessV_undo.length > num_limit) { BrightnessV_undo.shift(); }
    if (OpacityV_undo.length > num_limit) { OpacityV_undo.shift(); }
    if (RedV_undo.length > num_limit) { RedV_undo.shift(); }
    if (GreenV_undo.length > num_limit) { GreenV_undo.shift(); }
    if (BlueV_undo.length > num_limit) { BlueV_undo.shift(); }

    ////1.4 (put this on undo/redo? no)

    if (DictV["IncV"] === 1 && is_FilterIncremental === false)
        //flatten(); //?
        Flatten_nosavingtoundo();


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



function flatten() //need fix!
{
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ////1.0-1.4
    ClearRedo();                   //0.8
    is_FilterIncremental = true;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();

    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) {
        DictV[key] = 0;
    }
    
    
    ////2.5 (imgSharp_original2 = imgSharp)
    ////WAY 1 - no working
    // for (let y = 0; y < image.height; y++)
    // {
    //     for (let x = 0; x < image.width; x++)
    //     {
    //         let formula = (y*image.width*4)+x*4;
    //         imageData_original2.data[formula+0] = imageData.data[formula+0];
    //         imageData_original2.data[formula+1] = imageData.data[formula+1];
    //         imageData_original2.data[formula+2] = imageData.data[formula+2]; 
    //         imageData_original2.data[formula+3] = imageData.data[formula+3];
    //     }
    // }
    ////WAY 2 - works
    imageData_original2 = imageData;
    
    ////3 no action needed (imgSharp = imgSharp_original2)

    ////reset slider position and text value
    JS_changesliderpositionandtextvalue_Contrast(0);
    JS_changesliderpositionandtextvalue_Brightness(0);
    JS_changesliderpositionandtextvalue_Opacity(0);
    JS_changesliderpositionandtextvalue_Red(0);
    JS_changesliderpositionandtextvalue_Green(0);
    JS_changesliderpositionandtextvalue_Blue(0);


    ctx.putImageData(imageData, 0, 0);
}

function Flatten_nosavingtoundo() //looks good
{     
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    // no need?
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

    ////3 no action needed (imgSharp = imgSharp_original2)

    ////reset slider position and text value
    JS_changesliderpositionandtextvalue_Contrast(0);
    JS_changesliderpositionandtextvalue_Brightness(0);
    JS_changesliderpositionandtextvalue_Opacity(0);
    JS_changesliderpositionandtextvalue_Red(0);
    JS_changesliderpositionandtextvalue_Green(0);
    JS_changesliderpositionandtextvalue_Blue(0);
    

}






function ApplyBaseImageAndIncrementalFiltersToCurrentImage()
{
    
    ////3 edit image
    ////3 edit image
    
    ////make imgSharp = imgSharp_original2 (base image) prior to adding incremental filters
    ////WAY1 - works
    // for (let y = 0; y < image.height; y++)
    // {
    //     for (let x = 0; x < image.width; x++)
    //     {
    //         let formula = (y*image.width*4)+x*4;
    //         imageData.data[formula+0] = imageData_original2.data[formula+0];
    //         imageData.data[formula+1] = imageData_original2.data[formula+1];
    //         imageData.data[formula+2] = imageData_original2.data[formula+2];  

    //     }
    // }
    ////WAY1.1
    for (var i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i+0] = imageData_original2.data[i+0];
            imageData.data[i+1] = imageData_original2.data[i+1];
            imageData.data[i+2] = imageData_original2.data[i+2];  
            imageData.data[i+3] = imageData_original2.data[i+3];  //remove this and use opacity 20 to 255 to "posterize the image"
    }
    ////WAY2 - not working
    //imageData = imageData_original2;

    ////adding incremental filters - try to make the codes shorter
    for (key in DictV)
    {
        if (key == "ContrastV")
        {
            Contrast(DictV[key]); //0.0-3.0
        }
        if (key == "BrightnessV")
        {
            Brightness(DictV[key]);  
        }
        if (key == "OpacityV")
        {
            Opacity(DictV[key]);
        }
        if (key == "RedV")
        {
            Red(DictV[key]);
        }
        if (key == "GreenV")
        {
            Green(DictV[key]);
        }
        if (key == "BlueV")
        {
            Blue(DictV[key]);
        }
    }
    //3 edit image
    //3 edit image   
}




function JS_changesliderpositionandtextvalue_Contrast(n) {
    document.getElementById('slider_Contrast').value = n;
	document.getElementById('text_Contrast').value = n;
}

function JS_changesliderpositionandtextvalue_Brightness(n) {
    document.getElementById('slider_Brightness').value = n;
	document.getElementById('text_Brightness').value = n;
}

function JS_changesliderpositionandtextvalue_Opacity(n) {
    document.getElementById('slider_Opacity').value = n;
	document.getElementById('text_Opacity').value = n;
}

function JS_changesliderpositionandtextvalue_Red(n) {
    document.getElementById('slider_Red').value = n;
	document.getElementById('text_Red').value = n;
}

function JS_changesliderpositionandtextvalue_Green(n) {
    document.getElementById('slider_Green').value = n;
	document.getElementById('text_Green').value = n;
}

function JS_changesliderpositionandtextvalue_Blue(n) {
    document.getElementById('slider_Blue').value = n;
	document.getElementById('text_Blue').value = n;
}