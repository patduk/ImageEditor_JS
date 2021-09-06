

function toggleonoff_stats() {
    if (document.getElementById("id_log1").style.display === "none")
    {
        document.getElementById("id_log1").style.display = "flex";
    }
    else {
        document.getElementById("id_log1").style.display = "none";
    }


}

function exit_downloadmodetoggle_ifneeded() {
        //show the image element
        document.getElementById("container_canvas_id").style.display = "flex";
        //hide the image element
        document.getElementById("container_imgsaveonly_id").style.display = "none";

        resizeCanvas();
    
}

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