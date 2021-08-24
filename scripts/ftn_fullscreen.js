

function imagefullscreen() {
    
    let object1 = document.getElementById("container_canvas_id");
    let object2 = document.getElementById("container_imgsaveonly_id");

    // if (document.fullscreenElement) {
    //     closeFullscreen(); }
    // else {
    //     openFullscreen(); }
    

    //if normal screen, go to full screen
    if (object1.style.height != (container_canvas_h_fullscreen_global).toString() + "px")
    {
        object1.style.height = (container_canvas_h_fullscreen_global).toString() + "px";
        object2.style.height = (container_canvas_h_fullscreen_global).toString() + "px";
        
        document.getElementById("navbar1_id").style.display = "none";
        document.getElementById("container_id2").style.display = "none";
        document.getElementById("container_id3").style.display = "none";
        document.getElementById("container_id4").style.display = "none";
        document.getElementById("container_id5").style.display = "none";
        document.getElementById("container_id6").style.display = "none";
        document.getElementById("container_categorybuttons_id").style.display = "none";

        console.log("a1");
 
    }
    //if full screen, go to normal screen
    else {

        object1.style.height = (container_canvas_h_normalscreen_global).toString() + "px";
        object2.style.height = (container_canvas_h_normalscreen_global).toString() + "px";

        document.getElementById("navbar1_id").style.display = "flex";
        document.getElementById("container_id2").style.display = "inline-flex";
        document.getElementById("container_id3").style.display = "none";
        document.getElementById("container_id4").style.display = "none";
        document.getElementById("container_id5").style.display = "none";
        document.getElementById("container_id6").style.display = "none";
        document.getElementById("container_categorybuttons_id").style.display = "inline-flex";
        
        console.log("a2");
    }



    //IF ON DOWNLOAD mode, go to canvas mode
    if (document.getElementById("container_canvas_id").style.display === "none") {

        //show the image element
        document.getElementById("container_canvas_id").style.display = "flex";
        //hide the image element
        document.getElementById("container_imgsaveonly_id").style.display = "none";
        

        //to ensure that canvas content adjusts to any new resized container canvas
        // resizeCanvas();       

    }

    //reset cateogry button selected
    let btnContainer = document.getElementById("container_categorybuttons_id");

    // Get all buttons with class="btn" inside the container
    let btns = btnContainer.getElementsByClassName("button_style2");

    for (var i = 0; i < btns.length; i++) {
        var current = document.getElementsByClassName("button_style2_active");

        // If there's no active class
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" button_style2_active", "");
        }
    }

   
    
    resizeCanvas();
    resizeCanvas2();
}


let elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

