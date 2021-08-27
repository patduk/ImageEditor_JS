function Brightness(input_value)
{
    if (true) //displayimage
    {           
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                let formula = (y*image.width*4)+x*4;

                let red = imageData.data[formula+0] + input_value;
                let green = imageData.data[formula+1] + input_value;
                let blue = imageData.data[formula+2] + input_value;
                
                if (red > 255) { red = 255; }
                else if (red < 0) { red = 0; }
                if (green > 255) { green = 255; }
                else if (green < 0) { green = 0; }
                if (blue > 255) { blue = 255; }
                else if (blue < 0) { blue = 0; }

                imageData.data[formula+0] = red;
                imageData.data[formula+1] = green;
                imageData.data[formula+2] = blue;   
            }
        }
    }
}

//onchange slider
function Onchange_Slider_Brightness()
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
    let input_value = parseInt(document.getElementById('slider_Brightness').value);
    document.getElementById('text_Brightness').value = input_value;

    DictV["IncV"] = 1;
	DictV["BrightnessV"] = input_value;

    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();
    
    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}

function Onchange_Text_Brightness() 
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
    let input_value = parseInt(document.getElementById('text_Brightness').value);
    if (input_value > 255) {
        input_value = 255;
        document.getElementById('text_Brightness').value = input_value;
    }
    if (input_value < -255) {
        input_value = -255;
        document.getElementById('text_Brightness').value = input_value; 
    }
    document.getElementById('slider_Brightness').value = input_value;

    DictV["IncV"] = 1;
	DictV["BrightnessV"] = input_value;


    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();

    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}

function Oninput_Slider_Brightness_LiveUpdate() {
    document.getElementById("text_Brightness").value = document.getElementById("slider_Brightness").value;
}

function JS_changesliderpositionandtextvalue_Brightness(n) {
    document.getElementById('slider_Brightness').value = n;
	document.getElementById('text_Brightness').value = n;
    
}

