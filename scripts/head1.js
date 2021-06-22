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





////way 2
//very StackOverFlow-y, don't know what is going on there lmao
window.addEventListener('load', function() 
{
    // document.querySelector('input[type="file"]').addEventListener('change', function()
    document.getElementById('diamondx1').addEventListener('change', function() 
    {
        if (this.files && this.files[0]) 
        {

            let ctx = document.getElementById('cv2');
            
            let base_image = new Image();
            
            base_image.onload = () => {
                ctx.height = base_image.height;
                ctx.width = base_image.width;
                
                //not working here?
                // if (base_image.src !== null) {
                //     URL.revokeObjectURL(img.src);  // no longer needed, free memory
                // }
                
                //put an image and its left, top location
                ctx.getContext('2d').drawImage(base_image, 0, 0);

                //draw a box over the top (useful for 2d spheres?)
                // ctx.getContext('2d').fillStyle = "rgba(200, 0, 0, 0.33)";
                // ctx.getContext('2d').fillRect(12, 12, 80, 80);
                
                //moved to invert function
                // const imageData = ctx.getContext('2d').getImageData(0, 0, base_image.width, base_image.height);
                // const data = imageData.data;
                // for (var i = 0; i < data.length; i += 4) {
                //     data[i]     = 255 - data[i];     // red
                //     data[i + 1] = 255 - data[i + 1]; // green
                //     data[i + 2] = 255 - data[i + 2]; // blue
                // }
                // ctx.getContext('2d').putImageData(imageData, 0, 0);

                
            }           
            base_image.src = URL.createObjectURL(this.files[0]).toString(); // set src to blob 

            let paragraph1 = document.getElementById('pow1');
            paragraph1.innerHTML = base_image.src;
            

            ctx.style.height = "50%"; //should be done by css for now? 
            //ctx.style.width = auto;


            
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
    let base_image = new Image();
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');

    ctx.drawImage(base_image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        data[i]     = 255 - data[i];     // red
        data[i + 1] = 255 - data[i + 1]; // green
        data[i + 2] = 255 - data[i + 2]; // blue
        data[i + 3] = data[i + 3];       // alpha
    }
    ctx.putImageData(imageData, 0, 0);
}


//works
function filter1() {
    let base_image = new Image();
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');

    ctx.drawImage(base_image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(canvas.width + " " + canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        if (data[i] > 128 && data[i + 1] > 128 && data[i + 2] > 128) {
            data[i]     += 20;      // red
            data[i + 1] -= 20;      // green
            data[i + 2] -= 20;      // blue
        }
    }
    ctx.putImageData(imageData, 0, 0);
}