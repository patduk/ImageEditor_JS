
//2.0
function ResetAllAttributes() //ok
{
    Image_undo = [];
    IncV_undo = [];
    ContrastV_undo = [];
    BrightnessV_undo = [];
    OpacityV_undo = [];
    RedV_undo = [];
    GreenV_undo = [];
    BlueV_undo = [];
    GblurV_undo = [];

    Image_redo = [];
    IncV_redo = [];
    ContrastV_redo = [];
    BrightnessV_redo = [];
    OpacityV_redo = [];
    RedV_redo = [];
    GreenV_redo = [];
    BlueV_redo = [];
    GblurV_redo = [];

    for (key in DictV) {
        DictV[key] = 0;
    }
}

