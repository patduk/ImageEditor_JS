// let variable1 = "35"+"34"; 
// variable1 = 4555;
// let variable2;


// document.write(toggle1 + "   \n");
// document.write(variable1); 
// document.write(variable2);
// document.write(display_function1());
// document.write(variable1); 

// for (let i = 0; i <3; i++)
// {
// document.write("\ni = " + i);
// }



// let myHeading = document.querySelector('h1');
// let newHeading = 4+4;

// newHeading = [1,'Bob', true];

// let newheading = 1; //no cap
// myHeading.textContent = newHeading[1] + " f " + newHeading[2];

// let newHeading2 = {"KEY1":111, "KEY2":222+3/8, "KEY3":333===334, "KEY4":3!==4};

// myHeading.textContent = newHeading2.KEY4;

// let paragraph1 = document.getElementById('pow1');
// paragraph1.innerHTML = '34';


// //changing image
// let myImage = document.querySelector('img');
// myImage.src = "images/wlop1.jpg";
// myImage.height = 300;


// let myImage = document.getElementById('myImage');
// myImage.src = "images/wlop1.jpg";
// myImage.height = 300;

//let can = document.getElementbyId("canvas1").getContext()



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////




let canvas = document.getElementById('cv2');
let ctx = canvas.getContext('2d');
        

image.src = 'images/wlop1.jpg'; // set src to blob 
image_original2.src = image.src;
image_original1.src = image.src;



image.onload = () => {
    canvas.height = image.height;
    canvas.width = image.width;
    
    //put an image and its left, top location
    ctx.drawImage(image, 0, 0);
    
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    imageData_original2 = ctx.getImageData(0, 0, image.width, image.height);
    imageData_original1 = ctx.getImageData(0, 0, image.width, image.height);
}


let paragraph1 = document.getElementById('pow1');
paragraph1.innerHTML = image.src + "\n" + image_original2.src + "\n" + image_original1.src;






canvas.style.width = "50%";
//canvas.style.height = auto;