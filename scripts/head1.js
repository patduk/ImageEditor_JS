//not working
// document.querySelect('html').onclick = function() {
//   alert ("ouch!");
// }

// document.querySelector('html').onclick = function() 
// {
//   alert("jerk");
// }

function function4_display() {
    variable1 = "\nchanged_variable1";
    return variable3;
}
function function3_button() {
    if (document.getElementById("button1").style.color !== "red")
        document.getElementById("button1").style.color = "red";
    else 
        document.getElementById("button1").style.color = "green";
}


function function1_buttonimg() {
    //let myImage = document.getElementById('myImage');
    
    if (document.getElementById('myImage').src !== "images/wlop.jpg")
    document.getElementById('myImage').src = "images/wlop1.jpg";
    else {
        document.getElementById('myImage').src = "images/firefox-icon.png"
    }
    myImage.height = 300;
    alert(myImage.src);
}


//picture switching function = working
let toggle1 = false;
function function2_buttonimg() {

    //picture switching
    let myImage = document.getElementById('myImage');
    
    if (toggle1 === false) {
        myImage.src = "images/wlop1.jpg";
        toggle1 = true;
    }
    else {
        myImage.src = "images/firefox-icon copy.png";
        toggle1 = false;
    }
    
    //limit height?
    myImage.height = 300;

    //edit text by element id
    let paragraph1 = document.getElementById('pow1');
    paragraph1.innerHTML = myImage.src;
}


////way 1
// window.addEventListener('load', function() {
//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         if (this.files && this.files[0]) {
//             let img = document.getElementById('myImage');
//             img.onload = () => {
//                 URL.revokeObjectURL(img.src);  // no longer needed, free memory
//             }
//             img.src = URL.createObjectURL(this.files[0]); // set src to blob url
//         }
//     });
//   });

let image = new Image();
let image_original2 = new Image();
let image_original1 = new Image();
let image_undolist = [];
let image_redolist = [];

let imageData;
let imageData_original2;
let imageData_original1;

function logprint() {
    let pow3 = document.getElementById('pow3');
    pow3.innerHTML = image_undolist;

    let pow2 = document.getElementById('pow2');
    pow2.innerHTML = imageData.data.length/4 +  "*4 (data.length) </br> " + image.width*image.height +  " (w*h) </br> " + image.width + " (width) </br> " + image.height + " (height) </br>";

    let pow1 = document.getElementById('pow1');
    pow1.innerHTML = image.src + "\n" + image_original2.src + "\n" + image_original1.src;
}


////way 2
//too foreign, don't know what is going on there lmao
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


            image.onload = () => {
                canvas.height = image.height;
                canvas.width = image.width;
                
                //not working here?
                // if (image.src !== null) {
                //     URL.revokeObjectURL(img.src);  // no longer needed, free memory
                // }
                
                //put an image and its left, top location
                ctx.drawImage(image, 0, 0);

                
                //draw a box over the top (useful for 2d spheres?)
                // ctx.fillStyle = "rgba(200, 0, 0, 0.33)";
                // ctx.fillRect(12, 12, 80, 80);
                
                //moved to invert function
                //moved to invert function

                //get array
                //let imageData = ctx.getImageData(0, 0, image.width, image.height);
                //let data = imageData.data;
                //OR
                imageData = ctx.getImageData(0, 0, image.width, image.height);
                imageData_original2 = ctx.getImageData(0, 0, image.width, image.height);
                imageData_original1 = ctx.getImageData(0, 0, image.width, image.height);

                logprint();


                // for (var i = 0; i < data.length; i += 4) {
                //     data[i]     = 255 - data[i];     // red
                //     data[i + 1] = 255 - data[i + 1]; // green
                //     data[i + 2] = 255 - data[i + 2]; // blue
                //     data[i + 3] = 255 - data[i + 2]; // blue

                // }
                // ctx.putImageData(imageData, 0, 0);

                //moved to invert function
                //moved to invert function
                
                
            }           

            image.src = URL.createObjectURL(this.files[0]).toString(); // set src to blob 
            image_original2.src = image.src;
            image_original1.src = image.src;

            let paragraph1 = document.getElementById('pow1');
            paragraph1.innerHTML = image.src + "\n" + image_original2.src + "\n" + image_original1.src;
            

            canvas.style.width = "50%"; //should be done by css for now? 
            //canvas.style.height = auto;
        }
    });

    
    
});



let num1 = 0;
//works when using onchange in input element
function vnun2() {
    num1 += 1;
    console.log('image uploaded ' + num1 + " ");
}


//works
function invert() {
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    //1.0 store to undolist
    image_undolist.push(imageData);
    logprint();

    
    //ctx.getImageData(starting left, starting top, capture w, capture h)
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    //3.0
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 255 - data[i];        // red
        data[i + 1] = 255 - data[i + 1];    // green
        data[i + 2] = 255 - data[i + 2];    // blue
        data[i + 3] = data[i + 3];          // alpha
    }
    ctx.putImageData(imageData, 0, 0);
}



//works
function filter1() {
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    //1.0 store to undolist
    image_undolist.push(imageData);
    logprint();


    //??
    //ctx.getImageData(starting left, starting top, capture w, capture h)
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    const data = imageData.data;

    //3.0
    for (var i = 0; i < data.length; i += 4) {
        if (data[i] > 128 && data[i + 1] > 128 && data[i + 2] > 128) {
            imageData.data[i]     += 20;      // red
            imageData.data[i + 1] -= 20;      // green
            imageData.data[i + 2] -= 20;      // blue
            imageData.data[i + 3] -= 20;      // alpha  
        }
    }
    ctx.putImageData(imageData, 0, 0);


}

function original() {
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    //1.0 store to undolist
    image_undolist.push(imageData);
    logprint();
    

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

}




function undo() {
    if (image_undolist.length > 0) {
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        //image = new Image();
        //ctx.drawImage(image, 0, 0);


        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const imageData_undo = image_undolist[image_undolist.length-1];
        
        
        //possible original image for undo storing?
        image_redolist.push(imageData);
        image_undolist.splice(image_undolist.length-1);
        logprint();


        const data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
                data[i]     = imageData_undo.data[i];      // red
                data[i + 1] = imageData_undo.data[i + 1];      // green
                data[i + 2] = imageData_undo.data[i + 2];      // blue
                data[i + 3] = imageData_undo.data[i + 3];      // alpha  
        }
        ctx.putImageData(imageData, 0, 0);
    }
    
}



function redo() {
    // image_undolist.push(image);
    // let paragraph3 = document.getElementById('pow3');
    // paragraph3.innerHTML = image_undolist;

    
}

