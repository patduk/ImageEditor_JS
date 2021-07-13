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
let imageData_data_1d = [];
let imageData_original2_data_1d = [];
let imageData_original1_data_1d = []; 

//2d array
// let imageData_data_2d = [];
// let imageData_original2_data_2d = [];
// let imageData_original1_data_2d = [];

let DictV = {};
DictV['IncV'] = 0; //0 = false, 1 = true
DictV['ContrastV'] = 0;
DictV['BrightnessV'] = 0;
DictV['RedV'] = 0;
DictV['GreenV'] = 0;
DictV['BlueV'] = 0;
// for (var key in DictV) {
//     if (DictV.hasOwnProperty(key)) {
//         console.log(key + " -> " + DictV[key]);
//     }
// }


//undo lists
let Image_undo = []; //store imageData or imageData.data?
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
    let pow3 = document.getElementById('pow3');
    pow3.innerHTML = "Image_undo: " + Image_undo.length + "</br>Image_redo: " + Image_redo.length + "</br>";

    let pow2 = document.getElementById('pow2');
    pow2.innerHTML = imageData.data.length/4 +  "*4 (data.length) </br> " + image.width*image.height +  " (w*h) </br> " + image.width + " (width) </br> " + image.height + " (height) </br>";

    // let pow1 = document.getElementById('pow1');
    // pow1.innerHTML = image.src + "\n";
    
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
            Image_undo = [];
            Image_redo = [];
            
            logprint();
            
            image.onload = () => {
                URL.revokeObjectURL(image.src);

                //adjust canvas dimension
                canvas.height = image.height;
                canvas.width = image.width;
                                
                //put an image and its left, top location
                ctx.drawImage(image, 0, 0);

                //draw a box over the top (useful for 2d spheres?)
                // ctx.fillStyle = "rgba(200, 0, 0, 0.33)";
                // ctx.fillRect(12, 12, 80, 80);
                

                //get imageData
                imageData = ctx.getImageData(0, 0, image.width, image.height);
                imageData_original2 = ctx.getImageData(0, 0, image.width, image.height);
                imageData_original1 = ctx.getImageData(0, 0, image.width, image.height);

                //write 1d array
                imageData_data_1d = imageData.data; ///v
                imageData_original2_data_1d = imageData_original2.data; ///v
                imageData_original1_data_1d = imageData_original1.data; ///v

                logprint();

            }           
        }
    });

    
    
});


function loadsampleimage() {
    let canvas = document.getElementById('cv2');
    let ctx = canvas.getContext('2d');        
    image.src = 'images/wlop2.jpg'; // set src to blob 
    //image.class = "image_display";
    
    canvas.style.width = "100%";
    // if (canvas.style.width > 1200) { canvas.style.width = 1200;}
    
    
    image.onload = () => {
        URL.revokeObjectURL(image.src);
        
        //adjust canvas dimension
        canvas.height = image.height;
        canvas.width = image.width;
        
        
        //put an image and its left, top location
        ctx.drawImage(image, 0, 0);
        
        //get imageData
        imageData = ctx.getImageData(0, 0, image.width, image.height);
        imageData_original2 = ctx.getImageData(0, 0, image.width, image.height);
        imageData_original1 = ctx.getImageData(0, 0, image.width, image.height);

        //write 1d array (ditch it? just use 2d array on all image filters?)
        imageData_data_1d = imageData.data; ///v
        imageData_original2_data_1d = imageData_original2.data; ///v
        imageData_original1_data_1d = imageData_original1.data; ///v

        logprint();

    }
}
// var c = document.getElementById("cv2");
// var ctx = c.getContext("2d");

// // Create gradient
// var grd = ctx.createLinearGradient(0,0,200,0);
// grd.addColorStop(0,"red");
// grd.addColorStop(1,"white");

// // Fill with gradient
// ctx.fillStyle = grd;
// ctx.fillRect(10,10,150,80);





let num1 = 0;
//works when using onchange in input element
function vnun2() {
    num1 += 1;
    console.log('image uploaded ' + num1 + " ");
}


//works
function invert() {
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    Image_redo = [];
    
    //1.0 store to undolist
    Image_undo.push(imageData);
    logprint();

    
    //ctx.getImageData(starting left, starting top, capture w, capture h)
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imageData_data_1d = imageData.data;

    //3.0
    
    for (var i = 0; i < imageData_data_1d.length; i += 4) {
        imageData_data_1d[i]     = 255 - imageData_data_1d[i];        // red
        imageData_data_1d[i + 1] = 255 - imageData_data_1d[i + 1];    // green
        imageData_data_1d[i + 2] = 255 - imageData_data_1d[i + 2];    // blue
        imageData_data_1d[i + 3] = imageData_data_1d[i + 3];          // alpha
    }
    ctx.putImageData(imageData, 0, 0);
}



//works
function filter1() {
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    Image_redo = [];

    //1.0 store to undolist
    Image_undo.push(imageData);
    logprint();

    //??
    //ctx.getImageData(starting left, starting top, capture w, capture h)
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;

    //3.0.2
    let x = 0; 
    let y = 0;
    // 4 = multiply by 4 if using image.width
    //for (var i = 0; i < (data.length); i += 4) {
    // OR
    for (var i = 0; i < (image.height * (image.width*4)); i += 4) 
    {
        //do custom logic here

        //custom logic example: draw red right border 
        if (x > (image.width*4 - 1) - 1*4) {
            imageData.data[i]     += 40;                    // red
            imageData.data[i + 1] += 0;                    // green
            imageData.data[i + 2] += 0;                    // blue
            imageData.data[i + 3] = imageData.data[i + 3];  // alpha

        } 
        //custom logic example: draw red bottom border
        if (y > (image.height - 1) - 1) {
            imageData.data[i]     += 40;                    // red
            imageData.data[i + 1] += 0;                    // green
            imageData.data[i + 2] += 0;                    // blue
            imageData.data[i + 3] = imageData.data[i + 3];  // alpha
        }

        //counter/reset x and y
        x += 4;
        if (x > (image.width*4) - 1) {
            x = 0;
            y++;
        }
    }
    ctx.putImageData(imageData, 0, 0);


}

//normal edge detection function here - moved to separate js file
//custom edge detection function here - moved


//stolen from stackoverflow https://stackoverflow.com/questions/24222556/apply-a-oil-paint-sketch-effect-to-a-photo-using-javascript 
function oilpaint(radius, intensity) {
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);
    // Image_redo = [];
    // //1.0 store to undolist
    // Image_undo.push(imageData);
    // logprint();


    let width = canvas.width,
        height = canvas.height,
        imgData = ctx.getImageData(0, 0, width, height),
        pixData = imgData.data,
        destCanvas = document.createElement("canvas"),
        dCtx = destCanvas.getContext("2d"),
        pixelIntensityCount = [];

    destCanvas.width = width;
    destCanvas.height = height;

    // for demo purposes, remove this to modify the original canvas
    //document.body.appendChild(destCanvas);

    var destImageData = dCtx.createImageData(width, height),
        destPixData = destImageData.data,
        intensityLUT = [],
        rgbLUT = [];

    for (var y = 0; y < height; y++) {
        intensityLUT[y] = [];
        rgbLUT[y] = [];
        for (var x = 0; x < width; x++) {
            var idx = (y * width + x) * 4,
                r = pixData[idx],
                g = pixData[idx + 1],
                b = pixData[idx + 2],
                avg = (r + g + b) / 3;

            intensityLUT[y][x] = Math.round((avg * intensity) / 255);
            rgbLUT[y][x] = {
                r: r,
                g: g,
                b: b
            };
        }
    }


    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {

            pixelIntensityCount = [];

            // Find intensities of nearest pixels within radius.
            for (var yy = -radius; yy <= radius; yy++) {
                for (var xx = -radius; xx <= radius; xx++) {
                    if (y + yy > 0 && y + yy < height && x + xx > 0 && x + xx < width) {
                        var intensityVal = intensityLUT[y + yy][x + xx];

                        if (!pixelIntensityCount[intensityVal]) {
                            pixelIntensityCount[intensityVal] = {
                                val: 1,
                                r: rgbLUT[y + yy][x + xx].r,
                                g: rgbLUT[y + yy][x + xx].g,
                                b: rgbLUT[y + yy][x + xx].b
                            }
                        } else {
                            pixelIntensityCount[intensityVal].val++;
                            pixelIntensityCount[intensityVal].r += rgbLUT[y + yy][x + xx].r;
                            pixelIntensityCount[intensityVal].g += rgbLUT[y + yy][x + xx].g;
                            pixelIntensityCount[intensityVal].b += rgbLUT[y + yy][x + xx].b;
                        }
                    }
                }
            }

            pixelIntensityCount.sort(function (a, b) {
                return b.val - a.val;
            });

            var curMax = pixelIntensityCount[0].val,
                dIdx = (y * width + x) * 4;

            destPixData[dIdx] = ~~ (pixelIntensityCount[0].r / curMax);
            destPixData[dIdx + 1] = ~~ (pixelIntensityCount[0].g / curMax);
            destPixData[dIdx + 2] = ~~ (pixelIntensityCount[0].b / curMax);
            destPixData[dIdx + 3] = 255;
        }
    }

    // change this to ctx to instead put the data on the original canvas
    //dCtx.putImageData(destImageData, 0, 0);
    imageData = destImageData;
    ctx.putImageData(destImageData, 0, 0);
    
}


//psuedo 2d array way
function lighten() {
    ///////////////////////////////////////////
    
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    Image_redo = [];
    //1.0 store to undolist
    Image_undo.push(imageData);
    logprint();

    //set up
    let height = image.height -1;
    let width = image.width -1;

    //////////////////////////////////////////

    //ctx.getImageData(starting left, starting top, capture w, capture h)
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    let data = imageData.data;   

    //edit 2
    for (let y = 0; y < image.height; y ++)
    {
        for (let x = 0; x < image.width; x ++) 
        {
            //use formula (y * image.width * 4) + x + 0/1/2 for data[i+0/1/2] to use double for-loops of x and y on imagedata 1d array
            
            ////logic example 1
            let formula = (y*image.width*4)+x*4;
            data[formula+0] += 10;
            data[formula+1] += 0;
            data[formula+2] += 0;
            
            ////logic example 2
            //if (y > image.height-2) {   
            if (y > height-1) {    
                data[formula+0] += 244;
                data[formula+1] += 10;
                data[formula+2] += 244;
            }
            //if (x > image.width-2) {
            if (x > width-1) {
                data[formula+0] += 244;
                data[formula+1] += 10;
                data[formula+2] += 244
            }
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
}





function undo() {
    if (Image_undo.length > 0) {
        //prep canvas and ctx (idk why its needed)
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');

        //1 store old imageData/attributes to redolist
        Image_redo.push(imageData);
        //pulling & deleting from undo list
        let imageData_undo = Image_undo[Image_undo.length-1];
        Image_undo.splice(Image_undo.length-1);
        
        
        //prep an imageData (idk why it's needed)
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        

        let data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
                data[i]     = imageData_undo.data[i];      // red
                data[i + 1] = imageData_undo.data[i + 1];      // green
                data[i + 2] = imageData_undo.data[i + 2];      // blue
                data[i + 3] = imageData_undo.data[i + 3];      // alpha  
        }
        ctx.putImageData(imageData, 0, 0);

        logprint();
    }
    
}



function redo() {
    if (Image_redo.length > 0) {
        //prep canvas and ctx (idk why its needed)
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        
        //1store old imageData/attributes to undolist
        Image_undo.push(imageData);
        //pulling & deleting from redo list
        let imageData_redo = Image_redo[Image_redo.length-1];
        Image_redo.splice(Image_redo.length-1);


        //prep an imageData (idk why it's needed)
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        

        let data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
                data[i]     = imageData_redo.data[i];      // red
                data[i + 1] = imageData_redo.data[i + 1];      // green
                data[i + 2] = imageData_redo.data[i + 2];      // blue
                data[i + 3] = imageData_redo.data[i + 3];      // alpha  
        }
        ctx.putImageData(imageData, 0, 0);

        logprint();
    }
    
}



function reset() {
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);
    Image_redo = [];

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

function save() {

}







function SaveAttributesToUndoLists() //1-1.4
{
    ////1
    ////saving imgSharp_original2 to Image undo list:
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
    // if (DictV["IncV"] == 1 && is_FilterIncremental == false)
    //     Flatten();

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

function flatten() //looks good
{
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    // let imageData_data_1d = imageData.data;

    ClearRedo();                   //0.8
    is_FilterIncremental = true;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4

    ////2 reset all incremental filter attributes to 0
    for (key in DictV)
    {
        DictV[key] = 0;
    }
    
    ////2.5 (imgSharp_original2 = imgSharp)
    for (let y = 0; y < image.height; y++)
    {
        for (let x = 0; x < image.width; x++)
        {
            let formula = (y*image.width*4)+x*4;
            imageData_original2.data[formula+0] = imageData.data[formula+0];
            imageData_original2.data[formula+1] = imageData.data[formula+1];
            imageData_original2.data[formula+2] = imageData.data[formula+2]; 
        }
    }

    ////3 no action needed (imgSharp = imgSharp_original2

    ////way1 - call javascript function invokevoidasync, reset slider position and text value
    JS_resetsliderpositionandtextvalue_Brightness();
}

function Flatten_nosavingtoundo() //looks good
{
    ////2 reset all incremental filter attributes to 0
    for (a in DictV)
    {
        DictV[a] = 0;
    }

    ////2.5 (imgSharp_original2 = imgSharp)
    for (let y = 0; y < imgSharp_original2.Height; y++)
    {
        for (let x = 0; x < imgSharp_original2.Width; x++)
        {
            let formula = (y*image.width*4)+x*4;
            imageData_original2.data[formula+0] = imageData.data[formula+0];
            imageData_original2.data[formula+1] = imageData.data[formula+1];
            imageData_original2.data[formula+2] = imageData.data[formula+2];  
        }
    }

    ////3 no action needed (imgSharp = imgSharp_original2

    ////way1 - call javascript function invokevoidasync, reset slider position and text value
    JS_resetsliderpositionandtextvalue_Brightness();
}





function ApplyBaseImageAndIncrementalFiltersToCurrentImage()
{
    ////3 edit image
    ////3 edit image
    

    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    // let imageData_data_1d = imageData.data;

    ////make imgSharp = imgSharp_original2 (base image) prior to adding incremental filters
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
    ctx.putImageData(imageData, 0, 0);
    
}

function Brightness(input_value)
{
    //prep canvas and ctx (idk why its needed)
    //let canvas = document.getElementById('cv2'); 
    //let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    if (true) //displayimage
    {
        for (let y = 0; y < image.height; y++)
        {
            for (let x = 0; x < image.width; x++)
            {
                let formula = (y*image.width*4)+x*4;

                let red = imageData.data[formula+0] + input_value;
                let green = imageData.data[formula+1] + input_value;
                let blue = imageData.data[formula+2] + input_value;

                if (x < 40 && x > 20 && y === 3) {
                    console.log(imageData.data[formula+0])
                    console.log(red); 
                }
                
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


//onchange slider
function Onchange_Slider_Brightness()
{
    ClearRedo();                   //0.8
	is_FilterIncremental = true;   //0.9
	SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    let input_value = parseInt(document.getElementById('slider_Brightness').value);
    document.getElementById('text_Brightness').value = input_value;

    DictV["IncV"] = 1;
	DictV["BrightnessV"] = input_value;

    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();

    console.log("finished: Onchange_Slider_Brightness");

}
function Onchange_Text_Brightness() 
{
    ClearRedo();                   //0.8
	is_FilterIncremental = true;   //0.9
	SaveAttributesToUndoLists();   //1-1.4
    logprint();

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

    console.log("finished: Onchange_Text_Brightness");
}



function JS_resetsliderpositionandtextvalue_Brightness() {
    document.getElementById('slider_Brightness').value = 0;
    document.getElementById('text_Brightness').value = 0;
}