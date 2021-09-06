
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


function resizeCanvas2() {


    //resize canvas height to fit 100% in window along with navbars' heights
    let object1 = document.getElementById("container_canvas_id");
    let object2 = document.getElementById("container_imgsaveonly_id");
    let id_log1 = document.getElementById("id_log1");

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
        id_log1.style.height = (container_canvas_h_normalscreen_global).toString() + "px";
    }

    //if full screen
    else {
        container_canvas_h_fullscreen_global = window.innerHeight - 
        (document.getElementById("container_id1").offsetHeight) - 1;
    

        object1.style.height = (container_canvas_h_fullscreen_global).toString() + "px";
        object2.style.height = (container_canvas_h_fullscreen_global).toString() + "px";
        id_log1.style.height = (container_canvas_h_fullscreen_global).toString() + "px";
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


    // document.getElementById("id_log1").left = (-img_id1.width/2).toString() + "px";
    // document.getElementById("id_log1").top = (-img_id1.height/2).toString() + "px";

    
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