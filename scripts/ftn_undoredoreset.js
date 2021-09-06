function undo() {
    exit_downloadmodetoggle_ifneeded();


    if (Image_undo.length > 0) {

        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); 
        
        ////push to redo lists
        
        Image_redo.push(imageData_original2); //ff
        IncV_redo.push(DictV["IncV"]);
        ContrastV_redo.push(DictV["ContrastV"]);
        BrightnessV_redo.push(DictV["BrightnessV"]);
        OpacityV_redo.push(DictV["OpacityV"]);
        RedV_redo.push(DictV["RedV"]);
        GreenV_redo.push(DictV["GreenV"]);
        BlueV_redo.push(DictV["BlueV"]);
        GblurV_redo.push(DictV["GblurV"]);

        ////pull and delete from undo lists
        
        imageData_original2 = Image_undo.pop(); //ff
        DictV["IncV"] = IncV_undo.pop(); //delete last element + set as new variable
        DictV["ContrastV"] = ContrastV_undo.pop();
        DictV["BrightnessV"] = BrightnessV_undo.pop();
        DictV["OpacityV"] = OpacityV_undo.pop();
        DictV["RedV"] = RedV_undo.pop();
        DictV["GreenV"] = GreenV_undo.pop();
        DictV["BlueV"] = BlueV_undo.pop();
        DictV["GblurV"] = GblurV_undo.pop();
        
        
        // ////3
        ApplyBaseImageAndIncrementalFiltersToCurrentImage(); //make imageData => imageData_original2 + filters
        
        //canvas update
        ctx.putImageData(imageData, 0, 0);
        //image update
        document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 

        ////5
        JS_changesliderpositionandtextvalue_Contrast(DictV["ContrastV"]);
        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);
        JS_changesliderpositionandtextvalue_Opacity(DictV["OpacityV"]);
        JS_changesliderpositionandtextvalue_Red(DictV["RedV"]);
        JS_changesliderpositionandtextvalue_Green(DictV["GreenV"]);
        JS_changesliderpositionandtextvalue_Blue(DictV["BlueV"]);
        JS_changesliderpositionandtextvalue_Gblur(DictV["GblurV"]);


        update_stats();
    }

}

function redo() {
    exit_downloadmodetoggle_ifneeded();


    if (Image_redo.length > 0) {
        
        let canvas = document.getElementById('cv2'); 
        let ctx = canvas.getContext('2d');
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); 


        ////push to undo lists
        Image_undo.push(imageData_original2); //ff
        IncV_undo.push(DictV["IncV"]);
        ContrastV_undo.push(DictV["ContrastV"]);
        BrightnessV_undo.push(DictV["BrightnessV"]);
        OpacityV_undo.push(DictV["OpacityV"]);
        RedV_undo.push(DictV["RedV"]);
        GreenV_undo.push(DictV["GreenV"]);
        BlueV_undo.push(DictV["BlueV"]);
        GblurV_undo.push(DictV["GblurV"]);

        ////pull and delete from undo lists
        //.pop() = delete last element + set as new variable
        imageData_original2 = Image_redo.pop(); //ff       
        DictV["IncV"] = IncV_redo.pop();
        DictV["ContrastV"] = ContrastV_redo.pop();
        DictV["BrightnessV"] = BrightnessV_redo.pop();
        DictV["OpacityV"] = OpacityV_redo.pop();
        DictV["RedV"] = RedV_redo.pop();
        DictV["GreenV"] = GreenV_redo.pop();
        DictV["BlueV"] = BlueV_redo.pop();
        DictV["GblurV"] = GblurV_redo.pop();

        / ////3
        ApplyBaseImageAndIncrementalFiltersToCurrentImage();
        
        //canvas update
        ctx.putImageData(imageData, 0, 0);
        //image update
        document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
        
        ////5
        ////5
        JS_changesliderpositionandtextvalue_Contrast(DictV["ContrastV"]);
        JS_changesliderpositionandtextvalue_Brightness(DictV["BrightnessV"]);
        JS_changesliderpositionandtextvalue_Opacity(DictV["OpacityV"]);
        JS_changesliderpositionandtextvalue_Red(DictV["RedV"]);
        JS_changesliderpositionandtextvalue_Green(DictV["GreenV"]);
        JS_changesliderpositionandtextvalue_Blue(DictV["BlueV"]);
        JS_changesliderpositionandtextvalue_Gblur(DictV["GblurV"]);


        update_stats();
    }

}




function reset() {
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
    update_stats();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }

    ////3.0
    for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i]     = imageData_original1.data[i];        // r
        imageData.data[i + 1] = imageData_original1.data[i + 1];    // g
        imageData.data[i + 2] = imageData_original1.data[i + 2];    // b
        imageData.data[i + 3] = imageData_original1.data[i + 3];    // a  
    }

    ////4.0 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();
    
    
    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}


//ok
function resetposition() {
    let img_id1 = document.getElementById("img_id1") ;
    instance1_panzoom_global.pause(); //pause to stop any smooth scroll, and get to panzoom reset already
    instance1_panzoom_global =  panzoom(img_id1, {
        zoomDoubleClickSpeed: 1, 
        minZoom: 0.2,
        smoothScroll: false
    });
    
}