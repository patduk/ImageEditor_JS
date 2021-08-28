//load sample image
window.addEventListener('load', function() {
        
    //function loadsampleimage() {
    let canvas = document.getElementById('cv2');
    let ctx = canvas.getContext('2d');        
    image = new Image();
    
    // set src to blob e
    image.src = 'images/wlop2.jpg';


    let i = g.import('images/wlop2.jpg').posterize(i, 4);

    

    image.src = g;
    
    console.log(image.src.replace(/^.*[\\\/]/, ''));
    
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
        document.getElementById('img_id1').src = canvas.toDataURL("image/png");


        
    }   

    

});



//upload file
window.addEventListener('load', function() 
{

    

    // document.querySelector('input[type="file"]').addEventListener('change', function()f
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


                //update image
                document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 

                
                resetposition();
                
            }

        }

        //if on download mode, reset to canvas mode
        if (document.getElementById("container_canvas_id").style.display === "none") {
            //show the image element
            document.getElementById("container_canvas_id").style.display = "flex";
            //hide the image element
            document.getElementById("container_imgsaveonly_id").style.display = "none";
        
            //to ensure that canvas content adjusts to any new resized container canvas
            resizeCanvas(); //?
        }

        
        

    });


    
});