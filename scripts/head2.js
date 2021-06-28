let image = new Image();
let image_undolist = [];
let image_redolist = [];

//some imageData before making 1d/2d array
let imageData;
let imageData_original2;
let imageData_original1;

//1d array
let imageData_data_1d = [];
let imageData_original2_data_1d = [];
let imageData_original1_data_1d = []; 

//2d array
let imageData_data_2d = [];
let imageData_original2_data_2d = [];
let imageData_original1_data_2d = [];

let DictV = {};


function logprint() {
    let pow3 = document.getElementById('pow3');
    pow3.innerHTML = "image_undolist: " + image_undolist.length + "</br>image_redolist: " + image_redolist.length + "</br>";

    let pow2 = document.getElementById('pow2');
    pow2.innerHTML = imageData.data.length/4 +  "*4 (data.length) </br> " + image.width*image.height +  " (w*h) </br> " + image.width + " (width) </br> " + image.height + " (height) </br>";

    // let pow1 = document.getElementById('pow1');
    // pow1.innerHTML = image.src + "\n";

    ////only use this if usng imageData_data_2d
    // console.log("\nchecking 2d array 'borders'");
    // console.log("ideal format: imageData_data_2d[h][w]")
    // console.log("working format: imageData_data_2d[h-1][w*4-1]")
    // console.log("topleft: " + imageData_data_2d[0][0]);
    // console.log("topright: " + imageData_data_2d[0][image.width*4-1]);
    // console.log("bottomleft: " + imageData_data_2d[image.height-1][0]);
    // console.log("bottomright: " + imageData_data_2d[image.height-1][image.width*4-1]);

    
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

            // set src to blob 
            image.src = URL.createObjectURL(this.files[0]).toString(); 
            canvas.style.width = "50%";
            
            //reset
            image_undolist = [];
            image_redolist = [];
            
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

                // //write 2d array //no needed?
                // let x = 0; let y = 0;
                // let subarray = [];
                // for (let i = 0; i < image.height * (image.width * 4); i +=4) 
                // {
                //     subarray.push(imageData_data_1d[i]);
                //     subarray.push(imageData_data_1d[i+1]);
                //     subarray.push(imageData_data_1d[i+2]);
                //     subarray.push(imageData_data_1d[i+3]);
                    
                //     x += 4;

                //     if (x > (image.width * 4) - 1) {
                //         imageData_data_2d.push(subarray); ///v
                //         imageData_original2_data_2d.push(subarray); ///v
                //         imageData_original1_data_2d.push(subarray); ///v
                //         subarray = [];
                //         x = 0;
                //         y++;
                //     }
                // }
                logprint();

            }           
        }
    });

    
    
});


function loadsampleimage() {
    let canvas = document.getElementById('cv2');
    let ctx = canvas.getContext('2d');        
    image.src = 'images/wlop1.jpg'; // set src to blob 
    //image.class = "image_display";
    
    canvas.style.width = "50%";
    
    
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

        // //write 2d array //no needed?
        // let x = 0; let y = 0;
        // let subarray = [];
        // for (let i = 0; i < image.height * (image.width * 4); i +=4) 
        // {
        //     subarray.push(imageData_data_1d[i]);
        //     subarray.push(imageData_data_1d[i+1]);
        //     subarray.push(imageData_data_1d[i+2]);
        //     subarray.push(imageData_data_1d[i+3]);
            
        //     x += 4;

        //     if (x > (image.width * 4) - 1) {
        //         imageData_data_2d.push(subarray); ///v
        //         imageData_original2_data_2d.push(subarray); ///v
        //         imageData_original1_data_2d.push(subarray); ///v
        //         subarray = [];
        //         x = 0;
        //         y++;
        //     }
        // }
        logprint();

    }
}



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

    image_redolist = [];
    
    //1.0 store to undolist
    image_undolist.push(imageData);
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

    image_redolist = [];

    //1.0 store to undolist
    image_undolist.push(imageData);
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




// function filter2() {
//     ///////////////////////////////////////////
    
//     //prep canvas and ctx (idk why its needed)
//     let canvas = document.getElementById('cv2'); 
//     let ctx = canvas.getContext('2d');
//     //image = new Image();
//     //ctx.drawImage(image, 0, 0);
//     let counter = 0;
//     let counter1 = 0;
//     let counter2 = 0;

//     ///////////////////////////////////////////

//     image_redolist = [];

//     //1.0 store to undolist
//     image_undolist.push(imageData);
//     logprint();

//     ///////////////////////////////////////////

//     //set up
//     let height = image.height -1;
//     let width = image.width -1;
//     let stride = (image.width -1)*4;

//     let array_gx = [];
//     let array_gy = [];
//     array_gx.push([-1,0,1]);
//     array_gx.push([-2,0,2]);
//     array_gx.push([-1,0,1]);
//     array_gy.push([-1,-2,-1]);
//     array_gy.push([0,0,0]);
//     array_gy.push([1,2,1]);

//     let val_Alpha = 0;
//     let val_Blue = 0;
//     let val_Green = 0;
//     let val_Red = 0;

//     let Gx_sum_Blue = 0;
//     let Gx_sum_Green = 0;
//     let Gx_sum_Red = 0;

//     let Gy_sum_Blue = 0;
//     let Gy_sum_Green = 0;
//     let Gy_sum_Red = 0;

//     let Gxy_sum_final_Blue = 0;
//     let Gxy_sum_final_Green = 0;
//     let Gxy_sum_final_Red = 0;

//     ///////////////////////////////////////////

//     //ctx.getImageData(starting left, starting top, capture w, capture h)
//     imageData = ctx.getImageData(0, 0, image.width, image.height);
//     let data = imageData.data;

//     ///////////////////////////////////////////
//     ///////////////////////////////////////////
//     ///////////////////////////////////////////
    
//     //3.0 editing
//     //3.0 editing
//     //multiply by 4 if using image.width
//     let x = 0; 
//     let y = 0;
//     //for (var i = 0; i < (data.length); i += 4) {
//     // OR
//     for (var i = 0; i < (image.height * (image.width*4)); i += 4) 
//     {    
//         ////custom logic 1
//         data[i]     = 44;              // red
//         data[i + 1] = 99;            // green
//         data[i + 2] = 144;             // blue
//         data[i + 3] =imageData.data[i+3];             // alpha

//         ////custom logic 2
//         Gx_sum_Blue = 0;
//         Gx_sum_Green = 0;
//         Gx_sum_Red = 0;

//         Gy_sum_Blue = 0;
//         Gy_sum_Green = 0;
//         Gy_sum_Red = 0;

//         Gxy_sum_final_Blue = 0;
//         Gxy_sum_final_Green = 0;
//         Gxy_sum_final_Red = 0;

//         // finding Gx and Gy - attempt 1
//         // finding Gx and Gy - attempt 1
//         ///problem
//         for (let r = 0; r < 3; r++)
//         {
//             for (let c = 0; c < 3; c++)
//             {
//                 //if (r === 1 && c === 1) {counter++;} //799364
                
//                 ////if outside (shorter)

                

//                 ////if inside
//                 if (
//                 ((y + (r - 1) >= 0) && (x + (c - 1)*4 >= 0)) && 
//                 ((y + (r - 1) <= height) && (x + (c - 1)*4 <= width*4))
//                 )
//                 {
//                     //if (r===1 && c===1) {console.log(x/4 + " " + y);}
//                     //not working??
//                     let he = y + (r - 1);
//                     let we = x + (c - 1)*4;
//                     // val_Red = imageData.data[(i/image.height)];
//                     // val_Green = imageData.data[i+1];
//                     // val_Blue = imageData.data[i+2];
//                     // val_Red = imageData.data[(he)*((we))+0];
//                     // val_Green = imageData.data[(he)*((we))+1];
//                     // val_Blue = imageData.data[(he)*((we))+2];

//                     // val_Red = imageData_original2_data_1d[(image.height-1)*(image.width)*4+x+0];
//                     // val_Green = imageData_original2_data_1d[(image.height-1)*(image.width)*4+x+1];
//                     // val_Blue = imageData_original2_data_1d[(image.height-1)*(image.width)*4+x+2];


//                     // val_Red = 222;
//                     // val_Green = 22;
//                     // val_Blue = 22;
                    

//                     if (r === 0 && c === 0)
//                     {
//                         val_Red = imageData_original2_data_1d[(image.height-(2))*(image.width)*4+x+(-4)+0];
//                         val_Green = imageData_original2_data_1d[(image.height-(2))*(image.width)*4+x+(-4)+1];
//                         val_Blue= imageData_original2_data_1d[(image.height-(2))*(image.width)*4+x+(-4)+2];
//                     }
//                     if (r === 0 && c === 1) {
//                         val_Red = imageData_original2_data_1d[(image.height-(2))*(image.width)*4+x+(0)+0];
//                         val_Green = imageData_original2_data_1d[(image.height-(2))*(image.width)*4+x+(0)+1];
//                         val_Blue= imageData_original2_data_1d[(image.height-(2))*(image.width)*4+x+(0)+2];
//                     }
//                     if (r === 0 && c === 2) {
//                         val_Red = imageData_original2_data_1d[(image.height-(2))*(image.width)*4+x+(4)+0];
//                         val_Green = imageData_original2_data_1d[(image.height-(2))*(image.width)*4+x+(4)+1];
//                         val_Blue= imageData_original2_data_1d[(image.height-(2))*(image.width)*4+x+(4)+2];
//                     }
//                     if (r === 1 && c === 0) {
//                         val_Red = imageData_original2_data_1d[(image.height-(1))*(image.width)*4+x+(-4)+0];
//                         val_Green = imageData_original2_data_1d[(image.height-(1))*(image.width)*4+x+(-4)+1];
//                         val_Blue= imageData_original2_data_1d[(image.height-(1))*(image.width)*4+x+(-4)+2];
//                     }
//                     if (r === 1 && c === 1) {
//                         val_Red = imageData_original2_data_1d[(image.height-(1))*(image.width)*4+x+(0)+0];
//                         val_Green = imageData_original2_data_1d[(image.height-(1))*(image.width)*4+x+(0)+1];
//                         val_Blue= imageData_original2_data_1d[(image.height-(1))*(image.width)*4+x+(0)+2];
//                     }
//                     if (r === 1 && c === 2) {
//                         val_Red = imageData_original2_data_1d[(image.height-(1))*(image.width)*4+x+(4)+0];
//                         val_Green = imageData_original2_data_1d[(image.height-(1))*(image.width)*4+x+(4)+1];
//                         val_Blue= imageData_original2_data_1d[(image.height-(1))*(image.width)*4+x+(4)+2];
//                     }
//                     if (r === 2 && c === 0) {
//                         val_Red = imageData_original2_data_1d[(image.height-(0))*(image.width)*4+x+(-4)+0];
//                         val_Green = imageData_original2_data_1d[(image.height-(0))*(image.width)*4+x+(-4)+1];
//                         val_Blue= imageData_original2_data_1d[(image.height-(0))*(image.width)*4+x+(-4)+2];
//                     }
//                     if (r === 2 && c === 1) {
//                         val_Red = imageData_original2_data_1d[(image.height-(0))*(image.width)*4+x+(0)+0];
//                         val_Green = imageData_original2_data_1d[(image.height-(0))*(image.width)*4+x+(0)+1];
//                         val_Blue= imageData_original2_data_1d[(image.height-(0))*(image.width)*4+x+(0)+2];
//                     }
//                     if (r === 2 && c === 2) {
//                         val_Red = imageData_original2_data_1d[(image.height-(0))*(image.width)*4+x+(4)+0];
//                         val_Green = imageData_original2_data_1d[(image.height-(0))*(image.width)*4+x+(4)+1];
//                         val_Blue= imageData_original2_data_1d[(image.height-(0))*(image.width)*4+x+(4)+2];
//                     }


//                     // if (r === 1 && c === 1) {counter++;} //799364


//                 }

//                 // //if outside (original)
//                 // if ((y + (r - 1) < 0) || (y + (r - 1) > (height)))
//                 // {
//                 //     val_Blue = 0;
//                 //     val_Green = 0;
//                 //     val_Red = 0;
                    
//                 // }
                
//                 // //if outside (original)
//                 // else if ((x + (c - 1) < 0) || (x + (c - 1)*4 > (width*4)))
//                 // {
//                 //     val_Blue = 0;
//                 //     val_Green = 0;
//                 //     val_Red = 0;
                    
//                 // }

//                 Gx_sum_Blue += val_Blue * array_gx[r][c];
//                 Gx_sum_Green += val_Green * array_gx[r][c];
//                 Gx_sum_Red += val_Red * array_gx[r][c];

//                 Gy_sum_Blue += val_Blue * array_gy[r][c];
//                 Gy_sum_Green += val_Green * array_gy[r][c];
//                 Gy_sum_Red += val_Red * array_gy[r][c];
//             }
            
//         }
//         // finding Gx and Gy - attempt 1
//         // finding Gx and Gy - attempt 1
//         ///problem


        
        
//         val_Alpha = imageData_original2_data_1d[i+3];
        
//         //gxy_sum = ((gx_sum_blue)^2)^1/2 + ((gy_sum_blue)^2)^1/2
//         Gxy_sum_final_Red = Math.pow((Math.pow(Gx_sum_Red, 2)),0.5) + Math.pow((Math.pow(Gy_sum_Red, 2)),0.5);
//         Gxy_sum_final_Green = Math.pow((Math.pow(Gx_sum_Green, 2)),0.5) + Math.pow((Math.pow(Gy_sum_Green, 2)),0.5);
//         Gxy_sum_final_Blue = Math.pow((Math.pow(Gx_sum_Blue, 2)),0.5) + Math.pow((Math.pow(Gy_sum_Blue, 2)),0.5);

        

//         let max = 255;
//         let min = 0;
//         if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
//         if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
//         if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
//         if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
//         if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
//         if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }


//         //do custom logic here example, apply filter
//         data[i]     = Gxy_sum_final_Red;              // red
//         data[i + 1] = Gxy_sum_final_Green;            // green
//         data[i + 2] = Gxy_sum_final_Blue;             // blue
//         data[i + 3] = val_Alpha;             // alpha

        
//         // if (i < 200)
//         //     console.log(image.Data[i]);
        
        


//         x += 4;
//         //keeps x 0 to image.width*4 - 1;
//         //keeps y 0 to image.height-1;
//         //occurs X times (X = image.height-1)
//         //if (x > (image.width-1) * 4) {
//         if (x > (image.width-1) * 4) {
//             //console.log(i / (image.height-1) / 4) // 1186 (image.width);
//             //console.log("x " + x); //x673;
//             //console.log(x/4 + " " + y);
//             x = 0;
//             y++;
//         }
        
//     }
//     ctx.putImageData(imageData, 0, 0);

//     console.log("y " + y);
//     console.log(counter1);
//     console.log((image.width) * (image.height));
//     console.log(image.width + " " + image.height);
//     console.log(x + " " + y);
// }







let num2 = 0;
function filter2() {
    ///////////////////////////////////////////

    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    let counter = 0;
    let counter1 = 0;
    let counter2 = 0;

    image_redolist = [];
    //1.0 store to undolist
    image_undolist.push(imageData);
    logprint();
    
    //"initialize" imageData
    //ctx.getImageData(starting left, starting top, capture w, capture h)
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    let data = imageData.data;
    imageData_original2_data_1d = ctx.getImageData(0, 0, image.width, image.height).data;

    ///////////////////////////////////////////

    let height = image.height -1;
    let width = image.width -1;

    let array_gx = [];
    array_gx.push([-1,0,1]);
    array_gx.push([-2,0,2]);
    array_gx.push([-1,0,1]);
    let array_gy = [];
    array_gy.push([-1,-2,-1]);
    array_gy.push([0,0,0]);
    array_gy.push([1,2,1]);

    let val_Alpha = 0;
    let val_Blue = 0;
    let val_Green = 0;
    let val_Red = 0;
    
    let Gx_sum_Red = 0;
    let Gx_sum_Green = 0;
    let Gx_sum_Blue = 0;
    let Gy_sum_Red = 0;
    let Gy_sum_Green = 0;
    let Gy_sum_Blue = 0;
    let Gxy_sum_final_Red = 0;
    let Gxy_sum_final_Green = 0;
    let Gxy_sum_final_Blue = 0;
  
    //edit
    for (let y = 0; y < image.height; y ++)
    {
        for (let x = 0; x < image.width; x ++) 
        {
            let formula = (y*image.width*4)+x*4;

            Gx_sum_Red = 0;
            Gx_sum_Green = 0;
            Gx_sum_Blue = 0;
            Gy_sum_Red = 0;
            Gy_sum_Green = 0;
            Gy_sum_Blue = 0;
            Gxy_sum_final_Red = 0;
            Gxy_sum_final_Green = 0;
            Gxy_sum_final_Blue = 0;

            //logic
            for (let r = 0; r < 3; r++)
            {
                for (let c = 0; c < 3; c++)
                {
                    if (((y + (r - 1) >= 0) && (x + (c - 1) >= 0)) && ((y + (r - 1) <= height) && (x + (c - 1) <= width)))
                    {
                        //attempt 6 (success - edge detection)
                        // formula + row + col + 0/1/2
                        val_Red = imageData_original2_data_1d[formula + ((r-1)*image.width*4) + ((c-1)*4) +0];
                        val_Green = imageData_original2_data_1d[formula + ((r-1)*image.width*4) + ((c-1)*4) +1];
                        val_Blue = imageData_original2_data_1d[formula + ((r-1)*image.width*4) + ((c-1)*4) +2];

                        //attempt 1 (bw blind)
                        // val_Red = imageData_original2_data_1d[formula + (y+(r-1))+ (x+(c-1))*4 +0];
                        // val_Green = imageData_original2_data_1d[formula + (y+(r-1)) + (x+(c-1))*4 +1];
                        // val_Blue = imageData_original2_data_1d[formula + (y+(r-1)) + (x+(c-1))*4+2];

                        //attempt 2 (horizontal rainbow)
                        // val_Red = imageData_original2_data_1d[(y+(r-1))*(image.width+(c-1))*4 +0];
                        // val_Green = imageData_original2_data_1d[(y+(r-1))*(image.width+(c-1))*4 +1];
                        // val_Blue = imageData_original2_data_1d[(y+(r-1))*(image.width+(c-1))*4 +2];

                        //attempt 3 (rainbow shards)
                        // val_Red = imageData_original2_data_1d[((y+(r-1))*(image.width+(c-1))*4)+x*4 +0];
                        // val_Green = imageData_original2_data_1d[((y+(r-1))*(image.width+(c-1))*4)+x*4 +1];
                        // val_Blue = imageData_original2_data_1d[((y+(r-1))*(image.width+(c-1))*4)+x*4 +2];

                        //attempt 4 (horizontal rainbow)
                        // val_Red = imageData_original2_data_1d[(y+(r-1))*(image.width+(c-1))*4 +0];
                        // val_Green = imageData_original2_data_1d[(y+(r-1))*(image.width+(c-1))*4 +1];
                        // val_Blue = imageData_original2_data_1d[(y+(r-1))*(image.width+(c-1))*4 +2];

                        //attempt 5 (pink static)
                        // val_Red = imageData_original2_data_1d[(y*image.width*4)+x*4 + (y*(r-1) + x*(c-1)*4) +0];
                        // val_Green = imageData_original2_data_1d[(y*image.width*4)+x*4 + (y*(r-1) + x*(c-1)*4) +1];
                        // val_Blue = imageData_original2_data_1d[(y*image.width*4)+x*4 + (y*(r-1) + x*(c-1)*4) +2];                        
                    }

                    // if outside the border (row)
                    if ((y + (r - 1) < 0) || (y + (r - 1) > (height)))
                    {
                        val_Red = 0;
                        val_Green = 0;
                        val_Blue = 0;
                    }

                    // if outside the border (column)
                    else if ((x + (c - 1) < 0) || (x + (c - 1) > (width)))
                    {
                        val_Red = 0;
                        val_Green = 0;
                        val_Blue = 0;
                    }

                    Gx_sum_Blue += val_Blue * array_gx[r][c];
                    Gx_sum_Green += val_Green * array_gx[r][c];
                    Gx_sum_Red += val_Red * array_gx[r][c];
                    Gy_sum_Blue += val_Blue * array_gy[r][c];
                    Gy_sum_Green += val_Green * array_gy[r][c];
                    Gy_sum_Red += val_Red * array_gy[r][c];
                }
            
            val_Alpha = imageData_original2_data_1d[formula+3];
        
            // example: Gxy_sum_final_Red = (Gx_sum_Red^2 + Gy_sum_Red^2)^1/2
            Gxy_sum_final_Red = Math.pow(
                (Math.pow(Gx_sum_Red, 2) + Math.pow(Gy_sum_Red, 2)), 0.5
                );
            Gxy_sum_final_Green = Math.pow(
                (Math.pow(Gx_sum_Green, 2) + Math.pow(Gy_sum_Green, 2)), 0.5
                );
            Gxy_sum_final_Blue = Math.pow(
                (Math.pow(Gx_sum_Blue, 2) + Math.pow(Gy_sum_Blue, 2)), 0.5
                );

            let max = 255; let min = 0;
            if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
            if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
            if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
            if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
            if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
            if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }




            //darken/lighten edges 1 - (optional) (recommended before invert and bw?) not needed?
            //max = 220;
            //min = 75;
            // if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red *= 0.95; }
            // if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green *= 0.95; }
            // if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue *= 0.95; }
            // if (Gxy_sum_final_Red > min) { Gxy_sum_final_Red *= 1.1; }
            // if (Gxy_sum_final_Green > min) { Gxy_sum_final_Green *= 1.1; }
            // if (Gxy_sum_final_Blue > min) { Gxy_sum_final_Blue *= 1.1; }
            
            //darken/lighten edges 2 - (optional) not needed? 
            // Gxy_sum_final_Red *= 1.0; 
            // Gxy_sum_final_Green *= 1.0; 
            // Gxy_sum_final_Blue *= 1.0; 





            //line 1 - invert (permanent )> bw* > transparent/custom line background* > invert* *all optional individually____
            //line 1 - possible ideal: transparent/custom line* > invert* > bw*____


            //transparent/custom line background - line 1 (optional)__
            //notes:
            //this option can act as line darkener/lightener
            //ideal: (220, 128/cutoff), (220, 80/cutoff), (200, 0.2), (217, 0.25), (230 (90), 45/cutoff), (218 (85.5% of 255), 64/cutoff), (230 (90%), 128/cutoff)
            //ideal: (.83-.90), (.83-.855) & >96, (.9) & 128

            //nontransparentlines__amount__slider: (0-1.0)
            //nontransparentlines__boldness__slider: (0/cutoff-255/cutoff) or (0-1.0) toggle
            
            //invert (permanent, find a way to get rid of this)
            Gxy_sum_final_Red = 255- Gxy_sum_final_Red;
            Gxy_sum_final_Green = 255-Gxy_sum_final_Green;
            Gxy_sum_final_Blue = 255-Gxy_sum_final_Blue;

            let nontransparentlines__amount__slider = 0.855;
            let cutoff = (nontransparentlines__amount__slider)*255;    

            if (Gxy_sum_final_Blue >= cutoff && Gxy_sum_final_Blue >= cutoff && Gxy_sum_final_Blue >= cutoff)
            {
                val_Alpha = 0; //slider 0-255
                // //OR
                // Gxy_sum_final_Red = 255; //slider 0-255
                // Gxy_sum_final_Green = 255; //slider 0-255
                // Gxy_sum_final_Blue = 255; //slider 0-255
                // //OR
                // Gxy_sum_final_Red = 245;
                // Gxy_sum_final_Green = 233;
                // Gxy_sum_final_Blue = 233;
                // //OR
                // Gxy_sum_final_Red = 192;
                // Gxy_sum_final_Green = 192;
                // Gxy_sum_final_Blue = 192;
                // //OR
                // Gxy_sum_final_Red = 128;
                // Gxy_sum_final_Green = 128;
                // Gxy_sum_final_Blue = 128;
                // //OR
                // Gxy_sum_final_Red = 64;
                // Gxy_sum_final_Green = 64;
                // Gxy_sum_final_Blue = 64;
                // //OR
                // Gxy_sum_final_Red = 0;
                // Gxy_sum_final_Green = 0;
                // Gxy_sum_final_Blue = 0;
                // //OR DO NOTHING (in this if-statement)

              


                
            }
            else
            {
                //darkner/lightener
                //boldness_nontransparentlines suggestions:
                //note: darker lines may be crispier and uglier
                //ideal: 80,96,112,128
                //.. 064/cutoff to have dark-colored lines && black lines
                //.. 0-96/cutoff to have dark-colored lines && black lines
                //.. 128/cutoff to have medium-colored lines && black lines
                //.. 191/cutoff to have light-colored lines && black lines
                //.. 0.25       to have dark-colored lines && black lines
                
                // //darkner:
                // let nontransparentlines__boldness__slider = 128/cutoff;
                // Gxy_sum_final_Red *= nontransparentlines__boldness__slider;
                // Gxy_sum_final_Green *= nontransparentlines__boldness__slider;
                // Gxy_sum_final_Blue *= nontransparentlines__boldness__slider;
                
                // //PLUS
                
                // //lightener:
                if (Gxy_sum_final_Red <= 5) {Gxy_sum_final_Red = 5; }
                if (Gxy_sum_final_Green <= 5) {Gxy_sum_final_Green = 5; }
                if (Gxy_sum_final_Blue <= 5) {Gxy_sum_final_Blue = 5; }
                let boldnessreducer = 64;
                if (Gxy_sum_final_Red <= boldnessreducer) {Gxy_sum_final_Red *= boldnessreducer/Gxy_sum_final_Red};
                if (Gxy_sum_final_Green <= boldnessreducer) {Gxy_sum_final_Green *= boldnessreducer/Gxy_sum_final_Green};
                if (Gxy_sum_final_Blue <= boldnessreducer) {Gxy_sum_final_Blue *= boldnessreducer/Gxy_sum_final_Blue};

                // //OR
                
                // //DO NOTHING (in this else-statement)
            }
            

            ////invert - line 1 (optional)__
            // Gxy_sum_final_Red = 255- Gxy_sum_final_Red;
            // Gxy_sum_final_Green = 255-Gxy_sum_final_Green;
            // Gxy_sum_final_Blue = 255-Gxy_sum_final_Blue;


            ////grayscale - line 1 (optional)__
            let bwcolor1 = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3;
            Gxy_sum_final_Red = bwcolor1;
            Gxy_sum_final_Green = bwcolor1;
            Gxy_sum_final_Blue = bwcolor1;




            // //line 2 - grayscale with color lines____

            // ////grayscale - line 2 (optional)__
            // let bwcolor1 = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3;
            // Gxy_sum_final_Red = bwcolor1;
            // Gxy_sum_final_Green = bwcolor1;
            // Gxy_sum_final_Blue = bwcolor1;

            // let bwcolor2 = (((imageData_original2_data_1d[formula+0] + imageData_original2_data_1d[formula+1] + imageData_original2_data_1d[formula+2]) / 3));
            // //add shade
            // if (bwcolor2 >= bwcolor1)
            // {
            //     Gxy_sum_final_Green = bwcolor2;
            //     Gxy_sum_final_Red = bwcolor2;
            // }
            // Gxy_sum_final_Blue = bwcolor2;
             

            ////line 3 - grayscale with color lines____

            ////grayscale - line 3 (optional)__
            // let bwcolor1 = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3;
            // Gxy_sum_final_Red = bwcolor1;
            // Gxy_sum_final_Green = bwcolor1;
            // Gxy_sum_final_Blue = bwcolor1;

            // let bwcolor2 = (((imageData_original2_data_1d[formula+0] + imageData_original2_data_1d[formula+1] + imageData_original2_data_1d[formula+2]) / 3));
            // //add shade
            // if (bwcolor2 >= bwcolor1)
            // {
            //     Gxy_sum_final_Green = bwcolor2;
            //     Gxy_sum_final_Red = bwcolor2;
            // }
            // Gxy_sum_final_Blue = bwcolor2;
            

            

            data[formula]     = Gxy_sum_final_Red;    // red
            data[formula + 1] = Gxy_sum_final_Green;  // green
            data[formula + 2] = Gxy_sum_final_Blue;   // blue
            data[formula + 3] = val_Alpha;            // alpha
            }

        }
    }

    console.log("counter1: " + counter1);
    ctx.putImageData(imageData, 0, 0);
}

//psuedo 2d array way
function lighten() {
    ///////////////////////////////////////////
    
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    image_redolist = [];
    //1.0 store to undolist
    image_undolist.push(imageData);
    logprint();

    //set up
    let height = image.height -1;
    let width = image.width -1;

    //////////////////////////////////////////

    //ctx.getImageData(starting left, starting top, capture w, capture h)
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    let data = imageData.data;   

    // //edit  1
    // //use imageData_data_2d using imageData_original2_data_2d?
    // for (let y = 0; y < image.height; y ++)
    // {
    //     for (let x = 0; x < image.width*4; x += 4) 
    //     {
    //         //use formula (y * image.width * 4) + x + 0/1/2 for data[i+0/1/2] to use double for-loops of x and y on imagedata 1d array
            
    //         ////logic example 1
    //         let formula = (y*image.width*4)+x;
    //         data[formula+0] += 10;
    //         data[formula+1] += 0;
    //         data[formula+2] += 0;
            
    //         ////logic example 2
    //         if (y > image.height-2) {
    //             data[(y*image.width*4)+x+0] += 244;
    //             data[(y*image.width*4)+x+1] += 10;
    //             data[(y*image.width*4)+x+2] += 244;
    //         }
    //         if (x > image.width*4-8) {
    //             data[(y*image.width*4)+x+0] += 244;
    //             data[(y*image.width*4)+x+1] += 10;
    //             data[(y*image.width*4)+x+2] += 244;
    //         }
    //     }
    // }

    //edit  2
    //use imageData_data_2d using imageData_original2_data_2d?
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


function original() {
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);
    image_redolist = [];
    

    //1.0 store to undolist
    image_undolist.push(imageData);
    

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




function undo() {
    if (image_undolist.length > 0) {
        //prep canvas and ctx (idk why its needed)
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');

        //1 store old imageData/attributes to redolist
        image_redolist.push(imageData);
        //pulling & deleting from undo list
        let imageData_undo = image_undolist[image_undolist.length-1];
        image_undolist.splice(image_undolist.length-1);

        
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
    if (image_redolist.length > 0) {
        //prep canvas and ctx (idk why its needed)
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        
        //1store old imageData/attributes to undolist
        image_undolist.push(imageData);
        //pulling & deleting from redo list
        let imageData_redo = image_redolist[image_redolist.length-1];
        image_redolist.splice(image_redolist.length-1);


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
    
    image_undolist = [];
    image_redolist = [];
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




function Onchange_Slider_Brightness()
{
     // ClearRedo();                   //0.8
    // is_FilterIncremental = true;   //0.9
    // SaveAttributesToUndoLists();   //1-1.4

    ////2
    logprint();
    let input_value = document.getElementById('slider_Brightness').value;
    document.getElementById('text_Brightness').value = input_value;
    // DictV["IncV"] = 1;
    // DictV["BrightnessV"] = input_value;


    // ////3 edit image
    // ApplyBaseImageAndIncrementalFiltersToCurrentImage();


}

function Onchange_Text_Brightness() 
{
    // ClearRedo();                   //0.8
    // is_FilterIncremental = true;   //0.9
    // SaveAttributesToUndoLists();   //1-1.4

    ///2
    logprint();
    let input_value = document.getElementById('text_Brightness').value;
    if (input_value > 255) {input_value = 255;}
    if (input_value < -255) {input_value = -255;}
    document.getElementById('text_Brightness').value = input_value;
    document.getElementById('slider_Brightness').value = input_value;
    // DictV["IncV"] = 1;
    // DictV["BrightnessV"] = input_value;


    // ////3 edit image
    // ApplyBaseImageAndIncrementalFiltersToCurrentImage();


}