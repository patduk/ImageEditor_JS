function ClearRedo() //ok
{
    Image_redo = [];
    IncV_redo = [];
    ContrastV_redo = [];
    BrightnessV_redo = [];
    OpacityV_redo = [];
    RedV_redo = [];
    GreenV_redo = [];
    BlueV_redo = [];
    GblurV_redo = [];
}


//1.0-1.4
function SaveAttributesToUndoLists() //1-1.4
{
    ////1.0-1.4 store old imageData/attributes to redolist


    ////1.0-1.1 
    ////way1
    // let imageData_temporary = ctx.getImageData(0, 0, image.width, image.height);
    // for (let y = 0; y < image.height; y++) {
    //     for (let x = 0; x < image.width; x++) {
    //         let formula = (y*image.width*4)+x*4;
    //         imageData_temporary.data[formula+0] = imageData_original2.data[formula+0];
    //         imageData_temporary.data[formula+1] = imageData_original2.data[formula+1];
    //         imageData_temporary.data[formula+2] = imageData_original2.data[formula+2];
    //         imageData_temporary.data[formula+3] = imageData_original2.data[formula+3];
    //     }
    // }
    // Image_undo.push(imageData_temporary);
    
    ////1.0-1.1
    ////way2
    Image_undo.push(imageData_original2);

    ////1.2
    ////saving incremental filter attributes to undo lists
    IncV_undo.push(DictV["IncV"]);
    ContrastV_undo.push(DictV["ContrastV"]);
    BrightnessV_undo.push(DictV["BrightnessV"]);
    OpacityV_undo.push(DictV["OpacityV"]);
    RedV_undo.push(DictV["RedV"]);
    GreenV_undo.push(DictV["GreenV"]);
    BlueV_undo.push(DictV["BlueV"]);
    GblurV_undo.push(DictV["GblurV"]);

    ////1.3 (limit undo lists' count to num_limit) (unique code block)
    let num_limit = 20;
    if (Image_undo.length > num_limit) { Image_undo.shift(); }
    if (IncV_undo.length > num_limit) { IncV_undo.shift(); }
    if (ContrastV_undo.length > num_limit) { ContrastV_undo.shift(); }
    if (BrightnessV_undo.length > num_limit) { BrightnessV_undo.shift(); }
    if (OpacityV_undo.length > num_limit) { OpacityV_undo.shift(); }
    if (RedV_undo.length > num_limit) { RedV_undo.shift(); }
    if (GreenV_undo.length > num_limit) { GreenV_undo.shift(); }
    if (BlueV_undo.length > num_limit) { BlueV_undo.shift(); }
    if (GblurV_undo.length > num_limit) { GblurV_undo.shift(); }

    ////1.4 (put this on undo/redo? no)
    if (DictV["IncV"] === 1 && is_FilterIncremental === false)
        //flatten(); //?
        Flatten_nosavingtoundo();
    
    
}