

function flatten() //need fix!
{
    exit_downloadmodetoggle_ifneeded();


    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ////1.0-1.4
    ClearRedo();                   //0.8
    is_FilterIncremental = true;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    update_stats();

    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) {
        DictV[key] = 0;
    }
    
    
    ////2.5 (imgSharp_original2 = imgSharp)
    ////WAY 1 - no working
    // for (let y = 0; y < image.height; y++)
    // {
    //     for (let x = 0; x < image.width; x++)
    //     {
    //         let formula = (y*image.width*4)+x*4;
    //         imageData_original2.data[formula+0] = imageData.data[formula+0];
    //         imageData_original2.data[formula+1] = imageData.data[formula+1];
    //         imageData_original2.data[formula+2] = imageData.data[formula+2]; 
    //         imageData_original2.data[formula+3] = imageData.data[formula+3];
    //     }
    // }
    ////WAY 2 - works
    imageData_original2 = imageData;
    
    ////3 no action needed (imgSharp = imgSharp_original2)

    ////reset slider position and text value
    JS_changesliderpositionandtextvalue_Contrast(0);
    JS_changesliderpositionandtextvalue_Brightness(0);
    JS_changesliderpositionandtextvalue_Opacity(0);
    JS_changesliderpositionandtextvalue_Red(0);
    JS_changesliderpositionandtextvalue_Green(0);
    JS_changesliderpositionandtextvalue_Blue(0);
    JS_changesliderpositionandtextvalue_Gblur(0);

    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}

function Flatten_nosavingtoundo() //looks good
{     
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    // no need?
    for (key in DictV)
    {
        DictV[key] = 0;
    }

    ////2.5 (imgSharp_original2 = imgSharp)
    //WAY 1 - no working
    // for (let y = 0; y < image.height; y++)
    // {
    //     for (let x = 0; x < image.idth; x++)
    //     {
    //         let formula = (y*image.width*4)+x*4;
    //         imageData_original2.data[formula+0] = imageData.data[formula+0];
    //         imageData_original2.data[formula+1] = imageData.data[formula+1];
    //         imageData_original2.data[formula+2] = imageData.data[formula+2];  
    //     }
    // }
    ////WAY 2 - works
    imageData_original2 = imageData;

    ////3 no action needed (imgSharp = imgSharp_original2)

    ////reset slider position and text value
    JS_changesliderpositionandtextvalue_Contrast(0);
    JS_changesliderpositionandtextvalue_Brightness(0);
    JS_changesliderpositionandtextvalue_Opacity(0);
    JS_changesliderpositionandtextvalue_Red(0);
    JS_changesliderpositionandtextvalue_Green(0);
    JS_changesliderpositionandtextvalue_Blue(0);
    JS_changesliderpositionandtextvalue_Gblur(0);

}
