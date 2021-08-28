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







//ok
function downloadmodetoggle() {
    let img_id1 = document.getElementById("img_id1");
    let img_id2 = document.getElementById("img_id2");
    let img_id1_h = document.getElementById("img_id1").height;
    let img_id1_w = document.getElementById("img_id1").width;
    

    //if on canvas mode, go to download mode
    if (document.getElementById("container_canvas_id").style.display != "none") {

        ////copy-paste src image from canvas element to img element
        document.getElementById("img_id2").src = document.getElementById("img_id1").src;
        
        //hide the image element
        document.getElementById("container_canvas_id").style.display = "none";
        //show the image element
        document.getElementById("container_imgsaveonly_id").style.display = "flex";
        

        // //container image element dimensions.. to match container canvas dimensions
        document.getElementById("container_imgsaveonly_id").style.width = document.getElementById("container_canvas_id").style.width;

        document.getElementById("container_imgsaveonly_id").style.height = document.getElementById("container_canvas_id").style.height;

         // //image element dimensions.. to match canvas element dimensions
        img_id2.width = img_id1_w; //must use helper variables idk why
        img_id2.height = img_id1_h; //..or not


        // //container image element.. to show green color for aesthetic reason
        document.getElementById("container_imgsaveonly_id").style.backgroundColor = "rgb(84,191,84)";

        
    }

    //if on download mode, go to canvas mode
    else {
        
        //show the image element
        document.getElementById("container_canvas_id").style.display = "flex";
        //hide the image element
        document.getElementById("container_imgsaveonly_id").style.display = "none";
        

        //to ensure that canvas content adjusts to any new resized container canvas
        resizeCanvas();       


    }
}
  

//ok
function resetposition() {
    let img_id1 = document.getElementById("img_id1") ;
    instance1_panzoom_global.pause(); //pause to stop any smooth scroll, and get to panzoom reset already
    instance1_panzoom_global =  panzoom(img_id1, {
        zoomDoubleClickSpeed: 1, 
        minZoom: 0.2,
        smoothScroll: false
    });
    
}


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





// window.addEventListener("orientationchange", logprint1);
// window.addEventListener("orientationchange", logprint2);
// window.addEventListener("resize", logprint1);
// window.addEventListener("resize", logprint2);
// function logprint1() {
//     console.log('lgprnt1');
// }
// function logprint2() {
//     console.log('lgprnt2');
// }


//resize canvas (only when resizing windows)
window.addEventListener("resize", resizeCanvas2);
//resize canvas
window.addEventListener("resize", resizeCanvas);



window.addEventListener("orientationchange", resizeCanvas2);
window.addEventListener("orientationchange", resizeCanvas);



function exit_downloadmodetoggle_ifneeded() {
        //show the image element
        document.getElementById("container_canvas_id").style.display = "flex";
        //hide the image element
        document.getElementById("container_imgsaveonly_id").style.display = "none";

        resizeCanvas();
    
}


//culprit
function resizeCanvas2() {


    //resize canvas height to fit 100% in window along with navbars' heights
    let object1 = document.getElementById("container_canvas_id");
    let object2 = document.getElementById("container_imgsaveonly_id");
   

    //if normal screen
    if (object1.style.height != (container_canvas_h_fullscreen_global).toString() + "px") {
        //make container_id2 visible to get the height, invisible container_id2 yields 0 height..
        //if container_id2 is not used:
        if (document.getElementById("container_id2").style.display === "none") {
            document.getElementById("container_id2").style.display = "inline-flex";

            // console.log(document.getElementById("container_id2").style.height, document.getElementById("container_id2").offsetHeight, 'pancake');

            container_canvas_h_normalscreen_global = window.innerHeight - 
            (document.getElementById("navbar1_id").offsetHeight + document.getElementById("container_id1").offsetHeight + document.getElementById("container_id2").offsetHeight + document.getElementById("container_categorybuttons_id").offsetHeight) - 3;
            
            document.getElementById("container_id2").style.display = "none";
        }
        //if container_id2 is used:
        else {
            container_canvas_h_normalscreen_global = window.innerHeight - 
            (document.getElementById("navbar1_id").offsetHeight + document.getElementById("container_id1").offsetHeight + document.getElementById("container_id2").offsetHeight + document.getElementById("container_categorybuttons_id").offsetHeight) - 3;
        }
        



        object1.style.height = (container_canvas_h_normalscreen_global).toString() + "px";
        object2.style.height = (container_canvas_h_normalscreen_global).toString() + "px";
    }

    //if full screen
    else {
        container_canvas_h_fullscreen_global = window.innerHeight - 
        (document.getElementById("container_id1").offsetHeight) - 1;
    

        object1.style.height = (container_canvas_h_fullscreen_global).toString() + "px";
        object2.style.height = (container_canvas_h_fullscreen_global).toString() + "px";
    }


    
    
    
}





function resizeCanvas() {
    let canvas = document.getElementById('cv2');
    // let ctx = canvas.getContext('2d');

    // "nickname" variables
    let container_canvas_w = document.getElementById("container_canvas_id").clientWidth;
    let container_canvas_h = document.getElementById("container_canvas_id").clientHeight; 

    
    let img_id1 = document.getElementById("img_id1");
    let img_id2 = document.getElementById("img_id2");
    let container_img_id1 = document.getElementById("container_img_id1");
    let container_img_id2 = document.getElementById("container_img_id2");
    
    
    // reset 
    canvas.style.height = "";
    canvas.style.width = "";
    
    
    //// if image is portrait
    if (canvas.height > canvas.width) {

        //if image is bigger than container in both width and height
        if (canvas.height > container_canvas_h && canvas.width > container_canvas_w) {
            //if container is landscape
            if (container_canvas_w > container_canvas_h) {
                canvas.style.height = "100%";
                img_id1.width = (container_canvas_h * image.width) / image.height;
                img_id1.height = container_canvas_h;
                console.log("portrait, 1.1");
            }

            //if container is portrait
            else if (container_canvas_h > container_canvas_w) {
                //ratio comparison between container & image:
                //if container is more landscape than image
                if (container_canvas_w/container_canvas_h > canvas.width/canvas.height) { 
                    canvas.style.height = "100%";
                    img_id1.width = (container_canvas_h * image.width) / image.height;
                    img_id1.height = container_canvas_h;
                    console.log("portrait, 1.2.1");
                }    
                //if container is more portrait than image
                else if (container_canvas_w/container_canvas_h < canvas.width/canvas.height) {
                    canvas.style.width = "100%";
                    img_id1.width = container_canvas_w;
                    img_id1.height = (container_canvas_w * image.height) / image.width;
                    console.log("portrait, 1.2.2");
                }
            }

            // if container is perfect square
            else if (container_canvas_w === container_canvas_h) {
                canvas.style.height = "100%";
                img_id1.width = (container_canvas_h * image.width) / image.height;
                img_id1.height = container_canvas_h;
                console.log("portrait, 1.3");
            }
        }

        // if image is bigger than container in width only
        else if (canvas.width > container_canvas_w) {
            canvas.style.width = "100%";
            img_id1.width = container_canvas_w;
            img_id1.height = (container_canvas_w * image.height) / image.width;
            console.log("portrait, 2");
        }

        //if image is bigger than container in height only
        else if (canvas.height > container_canvas_h) {
            canvas.style.height = "100%";
            img_id1.width = (container_canvas_h * image.width) / image.height;
            img_id1.height = container_canvas_h;
            console.log("portrait, 3");
        }

        else {
            img_id1.width = image.width;
            img_id1.height = image.height;
            console.log("portrait, 4");
        }

    }
    
    //// if image is landscape
    else if (canvas.width > canvas.height) {
        
        //if image is bigger than container in both width and height
        if (canvas.height > container_canvas_h && canvas.width > container_canvas_w) {
            
            //if container is landscape
            if (container_canvas_w > container_canvas_h) {
                //ratio comparison between container & image:
                //if container is more landscape than image
                if (container_canvas_w/container_canvas_h > canvas.width/canvas.height) {
                    canvas.style.height = "100%";  //update canvas height
                    img_id1.width = (container_canvas_h * image.width) / image.height;
                    img_id1.height = container_canvas_h; //update image height
                    console.log("landscape, 1.1.1");
                }
                //if container is more portrait than image
                if (container_canvas_w/container_canvas_h < canvas.width/canvas.height) {
                    canvas.style.width = "100%";
                    img_id1.width = container_canvas_w;
                    img_id1.height = (container_canvas_w * image.height) / image.width;
                    console.log("landscape, 1.1.2");
                }
                
            }

            //if container is portrait
            else if (container_canvas_h > container_canvas_w) {
                canvas.style.width = "100%";
                img_id1.width = container_canvas_w;
                img_id1.height = (container_canvas_w * image.height) / image.width;
                console.log("landscape, 1.2");
            }

            // if container is perfect square
            else if (container_canvas_w === container_canvas_h) {
                canvas.style.width = "100%";
                img_id1.width = container_canvas_w;
                img_id1.height = (container_canvas_w * image.height) / image.width;
                console.log("landscape, 1.3");
            }
           
        }

        // if image is bigger than container in width only
        else if (canvas.width > container_canvas_w) {
            canvas.style.width = "100%";
            img_id1.width = container_canvas_w;
            img_id1.height = (container_canvas_w * image.height) / image.width;
            console.log("landscape, 2");
        }

        //if image is bigger than container in height only
        else if (canvas.height > container_canvas_h) {
            canvas.style.height = "100%";
            img_id1.width = (container_canvas_h * image.width) / image.height;
            img_id1.height = container_canvas_h;
            console.log("landscape, 3");
        }

        else {
            img_id1.width = image.width;
            img_id1.height = image.height;
            console.log("landscape, 4");
        }

       
    }

    //// if image is perfect square
    else if (canvas.height === canvas.width) {

        // if image is bigger than container in both width and height
        if (canvas.height > container_canvas_h && canvas.width > container_canvas_w) {
            //if container is landscape
            if (container_canvas_w > container_canvas_h) {
                canvas.style.height = "100%";
                img_id1.width = (container_canvas_h * image.width) / image.height;
                img_id1.height = container_canvas_h;
                console.log("image: square, 1.1");
            }
            //if container is portrait
            else if (container_canvas_w < container_canvas_h) {
                canvas.style.width = "100%";
                img_id1.width = container_canvas_w;
                img_id1.height = (container_canvas_w * image.height) / image.width;
                console.log("image: square, 1.2");
            }
        }

        // if image is bigger than container in width only
        else if (canvas.width > container_canvas_w) {
            canvas.style.width = "100%";
            img_id1.width = container_canvas_w;
            img_id1.height = (container_canvas_w * image.height) / image.width;
            console.log("image: square, 2");
        }

        //if image is bigger than container in height only
        else if (canvas.height > container_canvas_h) {
            canvas.style.height = "100%";
            img_id1.width = (container_canvas_h * image.width) / image.height;
            img_id1.height = container_canvas_h;
            console.log("image: square, 3");
        }

        else {
            img_id1.width = image.width;
            img_id1.height = image.height;
            console.log("image: square, 4");
        }
    }    

    
    // img_id2.width = img_id1.width;
    // img_id2.height = img_id1.height;


    ////reposition container (img_id1):
    ////sample: container_img_id1.style.transform = "translateX(-20px) translateY(50px)";
    //translateX("(-w/2)px")
    //translateY(+(-h/2)px") 
    container_img_id1.style.transform = "translateX(" + (-img_id1.width/2).toString() + "px) translateY(" + (-img_id1.height/2).toString() + "px)";


    
    ///scrollbar detection, modify center/left justification within
    let container_id1 = document.getElementById("container_id1");
    let container_id2 = document.getElementById("container_id2");
    let container_id3 = document.getElementById("container_id3");
    let container_id4 = document.getElementById("container_id4");
    let container_id5 = document.getElementById("container_id5");
    let container_id7 = document.getElementById("container_id7");

    if (container_id1.clientWidth < container_id1.scrollWidth) {
        container_id1.style.justifyContent = "left"; 
    }
    else { 
        container_id1.style.justifyContent = "center"; 
    }

    if (container_id2.clientWidth < container_id2.scrollWidth) {
        container_id2.style.justifyContent = "left";
    }
    else { 
        container_id2.style.justifyContent = "center"; 
    }

    if (container_id3.clientWidth < container_id3.scrollWidth) {
        container_id3.style.justifyContent = "left";
    }
    else { 
        container_id3.style.justifyContent = "center"; 
    }

    if (container_id4.clientWidth < container_id4.scrollWidth) {
        container_id4.style.justifyContent = "left";
    }
    else { 
        container_id4.style.justifyContent = "center"; 
    }

    if (container_id5.clientWidth < container_id5.scrollWidth) {
        container_id5.style.justifyContent = "left";
    }
    else { 
        container_id5.style.justifyContent = "center"; 
    }
    
    if (container_id7.clientWidth < container_id7.scrollWidth) {
        container_id7.style.justifyContent = "left";
    }
    else { 
        container_id7.style.justifyContent = "center"; 
    }



}


function undo() {
    exit_downloadmodetoggle_ifneeded();


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
        GblurV_redo.push(DictV["GblurV"]);

        ////pull and delete from undo lists
        
        imageData_original2 = Image_undo.pop(); //ff
        DictV["IncV"] = IncV_undo.pop(); //delete last element + set as new variable
        DictV["ContrastV"] = ContrastV_undo.pop();
        DictV["BrightnessV"] = BrightnessV_undo.pop();
        DictV["OpacityV"] = OpacityV_undo.pop();
        DictV["RedV"] = RedV_undo.pop();
        DictV["GreenV"] = GreenV_undo.pop();
        DictV["BlueV"] = BlueV_undo.pop();
        DictV["GblurV"] = GblurV_undo.pop();
        
        
        // ////3
        ApplyBaseImageAndIncrementalFiltersToCurrentImage(); //make imageData => imageData_original2 + filters
        
        //canvas update
        ctx.putImageData(imageData, 0, 0);
        //image update
        document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 

        ////5
        JS_changesliderpositionandtextvalue_Contrast(DictV["ContrastV"]);
        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);
        JS_changesliderpositionandtextvalue_Opacity(DictV["OpacityV"]);
        JS_changesliderpositionandtextvalue_Red(DictV["RedV"]);
        JS_changesliderpositionandtextvalue_Green(DictV["GreenV"]);
        JS_changesliderpositionandtextvalue_Blue(DictV["BlueV"]);
        JS_changesliderpositionandtextvalue_Gblur(DictV["GblurV"]);


        logprint();
    }

}

function redo() {
    exit_downloadmodetoggle_ifneeded();


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
        GblurV_undo.push(DictV["GblurV"]);

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
        DictV["GblurV"] = GblurV_redo.pop();

        / ////3
        ApplyBaseImageAndIncrementalFiltersToCurrentImage();
        
        //canvas update
        ctx.putImageData(imageData, 0, 0);
        //image update
        document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
        
        ////5
        ////5
        JS_changesliderpositionandtextvalue_Contrast(DictV["ContrastV"]);
        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);
        JS_changesliderpositionandtextvalue_Opacity(DictV["OpacityV"]);
        JS_changesliderpositionandtextvalue_Red(DictV["RedV"]);
        JS_changesliderpositionandtextvalue_Green(DictV["GreenV"]);
        JS_changesliderpositionandtextvalue_Blue(DictV["BlueV"]);
        JS_changesliderpositionandtextvalue_Gblur(DictV["GblurV"]);


        logprint();
    }

}




function reset() {
    exit_downloadmodetoggle_ifneeded();


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
    
    
    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}








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
    ////OR ////way2
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
    GblurV_undo.push(DictV["GblurV"]);

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
    if (GblurV_undo.length > num_limit) { GblurV_undo.shift(); }

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
    GblurV_redo = [];
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
    GblurV_undo = [];

    Image_redo = [];
    IncV_redo = [];
    ContrastV_redo = [];
    BrightnessV_redo = [];
    OpacityV_redo = [];
    RedV_redo = [];
    GreenV_redo = [];
    BlueV_redo = [];
    GblurV_redo = [];

    for (key in DictV) {
        DictV[key] = 0;
    }
}



function flatten() //need fix!
{
    exit_downloadmodetoggle_ifneeded();


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
    JS_changesliderpositionandtextvalue_Gblur(0);

    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
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
    JS_changesliderpositionandtextvalue_Gblur(0);

}






function ApplyBaseImageAndIncrementalFiltersToCurrentImage()
{
    exit_downloadmodetoggle_ifneeded();

    ////3 edit image
    ////3 edit image
    ////3 edit image
    ////3 edit image

    ////WAY1.0 ////make imgSharp = imgSharp_original2 (base image) prior to adding incremental filters
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
    ////OR ////WAY1.1 (faster)
    for (var i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i+0] = imageData_original2.data[i+0];
            imageData.data[i+1] = imageData_original2.data[i+1];
            imageData.data[i+2] = imageData_original2.data[i+2];  
            imageData.data[i+3] = imageData_original2.data[i+3];  //remove this and use opacity 20 to 255 to "posterize the image" (bs)
    }
    ////OR  ////WAY2 - not working
    //imageData = imageData_original2;


    ////adding incremental filters - try to make the codes shorter
    for (key in DictV)
    {
        if (key == "ContrastV") {
            //0.0-1.0
            Contrast(DictV[key]); 
        }
        if (key == "BrightnessV") {
            Brightness(DictV[key]);  
        }
        if (key == "OpacityV") {
            Opacity(DictV[key]);
        }
        if (key == "RedV") {
            Red(DictV[key]);
        }
        if (key == "GreenV") {
            Green(DictV[key]);
        }
        if (key == "BlueV") {
            Blue(DictV[key]);
        }
        if (key == "GblurV") {
            //0-10
            Gblur(DictV[key]);
        }
    }
    
    //3 edit image
    //3 edit image   
    //3 edit image
    //3 edit image   
}




