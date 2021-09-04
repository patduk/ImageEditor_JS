//edit the image
function ellipse_test1() {
    exit_downloadmodetoggle_ifneeded();
    

    let canvas = document.getElementById('cv2');
    let ctx = canvas.getContext('2d'); 
    

    ////1.0-1.4 store to undolist
    ClearRedo();                   //0.8
    is_FilterIncremental = false;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    update_stats();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }

    ////3.0 edit?
    //ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise)
    //draw stroke ellipse
    ctx.strokeStyle = "rgba(127, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.ellipse(image.width/2, image.height/2, image.width/2, image.height/2, 0, 0, Math.PI*2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(0, 127, 0, 0.5)";
    ctx.beginPath();
    ctx.ellipse(image.width/2, image.height/2, image.width/2.05, image.height/2.05, 0, 0, Math.PI*2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(0, 0, 127, 0.5)";
    ctx.beginPath();
    ctx.ellipse(image.width/2, image.height/2, image.width/2.1, image.height/2.1, 0, 0, Math.PI*2);
    ctx.stroke();

    //draw filled ellipse
    // ctx.fillStyle = 'green';
    // ctx.beginPath();
    // ctx.ellipse(image.width/2, image.height/2, image.width/4, image.height/4, 0, 0, Math.PI*2);
    // ctx.fill(); 
    

    


    ////4.0 update imageData to hold new ellipse shapes 
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    ////4.0 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();
    
    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 


}

