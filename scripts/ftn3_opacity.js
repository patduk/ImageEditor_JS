function Opacity(input_value)
{
    if (true) //displayimage
    {           
        for (let i = 0; i < imageData.data.length; i+=4) {

            //must use imageData_original2's alpha values
            imageData.data[i+3] = imageData_original2.data[i+3] + input_value;
        }
    }
}

//onchange slider
function Onchange_Slider_Opacity()
{
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0,0,image.width,image.height);
    
    ClearRedo();                   //0.8
	is_FilterIncremental = true;   //0.9
	SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2
    let input_value = parseInt(document.getElementById('slider_Opacity').value);
    document.getElementById('text_Opacity').value = input_value;

    DictV["IncV"] = 1;
	DictV["OpacityV"] = input_value;

    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();
    
    ctx.putImageData(imageData, 0, 0);
}

function Onchange_Text_Opacity() 
{
    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    imageData = ctx.getImageData(0,0,image.width,image.height);

    ClearRedo();                   //0.8
	is_FilterIncremental = true;   //0.9
	SaveAttributesToUndoLists();   //1-1.4
    logprint();

    ////2
    let input_value = parseInt(document.getElementById('text_Opacity').value);
    if (input_value > 255) {
        input_value = 255;
        document.getElementById('text_Opacity').value = input_value;
    }
    if (input_value < -255) {
        input_value = -255;
        document.getElementById('text_Opacity').value = input_value; 
    }
    document.getElementById('slider_Opacity').value = input_value;

    DictV["IncV"] = 1;
	DictV["OpacityV"] = input_value;


    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();

    ctx.putImageData(imageData, 0, 0);
}