


window.onload = () => {
    
    //FROM html5colorpicker, set up custom BG colors for custom edge detection filter 
    colorsfor_edge_custom_BG();
    colorsfor_edge_custom_line();
    ftn_transparent_mode_edge_custom();
    ftn_linecolorcorrection_edge_custom();
    Onchange_Slider_Whiteblackintensity();
    

    //a group of buttons with one selection allowed
    //a group of buttons with one selection allowed
    // Get the container element
    let btnContainer = document.getElementById("container_categorybuttons_id");
    // Get all buttons with class="btn" inside the container
    let btns = btnContainer.getElementsByClassName("button_style2");
    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("button_style2_active");

        // If there's no active class
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" button_style2_active", "");
        }
        
        // Add the active class to the current/clicked button
        this.className += " button_style2_active";

        document.getElementById("container_id2").style.display = "none";
        document.getElementById("container_id3").style.display = "none";
        document.getElementById("container_id4").style.display = "none";
        document.getElementById("container_id5").style.display = "none";
        document.getElementById("container_id7").style.display = "none";

        if (this.innerHTML === "Filters") {
            document.getElementById("container_id2").style.display = "inline-flex";
        }
        else if (this.innerHTML === "Inc. Filters") {
            document.getElementById("container_id3").style.display = "inline-flex";
        }
        else if (this.innerHTML === "Other") {
            document.getElementById("container_id7").style.display = "inline-flex";
        }
        resizeCanvas(); //to adjust the container_id2/3/4 (prevents cut off centered element, make it left)
    });
    }
    //a group of buttons with one selection allowed
    //a group of buttons with one selection allowed



    
    //button to enter edge custom
    //button to enter edge custom
    let edge_custom_button_enter =  document.getElementById("id_edge_custom_button_enter");
    edge_custom_button_enter.addEventListener("click", function() {
        document.getElementById("container_id2").style.display = "none";
        document.getElementById("container_id5").style.display = "inline-flex";

        resizeCanvas();
    });


    //button to exit edge custom
    //button to exit edge custom
    let edge_custom_button_exit1 =  document.getElementById("id1_edge_custom_button_exit");
    edge_custom_button_exit1.addEventListener("click", function() {
        document.getElementById("container_id2").style.display = "inline-flex";
        document.getElementById("container_id5").style.display = "none";

        resizeCanvas();
    });
    // let edge_custom_button_exit2 =  document.getElementById("id2_edge_custom_button_exit");
    // edge_custom_button_exit2.addEventListener("click", function() {
    //     document.getElementById("container_id2").style.display = "inline-flex";
    //     document.getElementById("container_id5").style.display = "none";

    //     resizeCanvas();
    // });


    //add panzoom functionality to img
    instance1_panzoom_global = panzoom(document.getElementById("img_id1"), {
        zoomDoubleClickSpeed: 1, 
        minZoom: 0.2,
        smoothScroll: false
    });


    //set up canvas container height global variables for normal/full screen modes
    container_canvas_h_fullscreen_global = window.innerHeight - 
    (document.getElementById("container_id1").offsetHeight) - 1;

    container_canvas_h_normalscreen_global = window.innerHeight - 
    (document.getElementById("navbar1_id").offsetHeight + document.getElementById("container_id1").offsetHeight + document.getElementById("container_id2").offsetHeight + document.getElementById("container_categorybuttons_id").offsetHeight) - 3 - 110;// - 110;


    //modify container cdanvas/img height using normalscreen global variable
    let object1 = document.getElementById("container_canvas_id");
    let object2 = document.getElementById("container_imgsaveonly_id");
    let id_log1 = document.getElementById("id_log1");
    object1.style.height = (container_canvas_h_normalscreen_global).toString() + "px";
    object2.style.height = (container_canvas_h_normalscreen_global).toString() + "px"; //not needed unintentionally?
    id_log1.style.height =  (container_canvas_h_normalscreen_global).toString() + "px";





    //zoom prevention
    //zoom prevention
    //zoom prevention
    //zoom prevention
    //(example)
    // document.addEventListener("touchmove", function(e)
    // {e.preventDefault();},  
    // {passive: false}
    // );
    //element exception from zoom prevention
    // document.getElementById('container_id2').addEventListener('touchmove', function(e){e.stopPropagation()}, false);

    
    //zoom prevention (targets element by id)
    // document.getElementById('id_undobutton').addEventListener("touchstart", function(e)
    // {e.preventDefault();},  
    // {passive: false}
    // );
    
    //zoom prevention (targets elements by classname)
    let list_button_style1 = document.getElementsByClassName('button_style1');
    let list_button_style2 = document.getElementsByClassName('button_style2');
    let list_button_style3 = document.getElementsByClassName('button_style3');

    for (var i = 0; i < list_button_style1.length; i++) {
        list_button_style1[i].addEventListener("click", function(e) 
        {e.preventDefault();},  
        {passive: false}
        );
    }

    for (var i = 0; i < list_button_style2.length; i++) {
        list_button_style2[i].addEventListener("click", function(e) 
        {e.preventDefault();},  
        {passive: false}
        );
    }

    for (var i = 0; i < list_button_style3.length; i++) {
        list_button_style3[i].addEventListener("click", function(e) 
        {e.preventDefault();},  
        {passive: false}
        );
    }
    //zoom prevention
    //zoom prevention
    //zoom prevention
    //zoom prevention
    

    //// image change on button hover
    // document.getElementById("id_homebutton1_a").addEventListener("mouseover", homebutton1_changeimg_toinvert, false);

    // function homebutton1_changeimg_toinvert()
    // {
    //     if (true)
    //         document.getElementById("id_homebutton1_img").src = "images/icons/icons8-home-100-inverted.png";
        
    // }

    // document.getElementById("id_homebutton1_a").addEventListener("mouseout", homebutton1_changeimg_tooriginal, false);

    // function homebutton1_changeimg_tooriginal()
    // {
    //     document.getElementById("id_homebutton1_img").src = "images/icons/icons8-home-100.png";  
    //}



    //INITALIZE
    id_log1.style.display = "none";



    
}


