let canvas = document.getElementById('cv2');
let ctx = canvas.getContext('2d');        

image.src = 'images/wlop1.jpg'; // set src to blob 

image.onload = () => {
    canvas.height = image.height;
    canvas.width = image.width;
    
    //put an image and its left, top location
    ctx.drawImage(image, 0, 0);
    
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    imageData_original2 = ctx.getImageData(0, 0, image.width, image.height);
    imageData_original1 = ctx.getImageData(0, 0, image.width, image.height);
}


canvas.style.width = "50%";