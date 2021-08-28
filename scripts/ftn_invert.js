//edit the image
function invert() {
    exit_downloadmodetoggle_ifneeded();


    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    // image = new Image();
    // ctx.drawImage(image, 0, 0);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    
    ////1.0-1.4 store to undolist
    ClearRedo();                   //0.8
    is_FilterIncremental = false;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }
    
    ////3.0
    for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 0] = 255-imageData.data[i+0];
        imageData.data[i + 1] = 255-imageData.data[i+1];
        imageData.data[i + 2] = 255-imageData.data[i+2];
    }


    ////4.0 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();
    

    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}

