function Contrast(input_value) {
    if (true) //displayimage
    {           
        input_value += 1;
        for (let y = 0; y < image.height; y++) {
            for (let x = 0; x < image.width; x++) {
                let formula = (y*image.width*4)+x*4
                ;
                let brightness_adjustment = (1 - input_value) * 128;
                let red = input_value * imageData.data[formula+0] + brightness_adjustment;
                let green = input_value * imageData.data[formula+1] + brightness_adjustment;
                let blue = input_value * imageData.data[formula+2] + brightness_adjustment;
                
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
function Onchange_Slider_Contrast()
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
    let input_value = parseFloat(document.getElementById('slider_Contrast').value);
    document.getElementById('text_Contrast').value = input_value;

    DictV["IncV"] = 1;
	DictV["ContrastV"] = input_value;

    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();
    
    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}

function Onchange_Text_Contrast() 
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
    let input_value = parseFloat(document.getElementById('text_Contrast').value);
    if (input_value > 1) {
        input_value = 1;
        document.getElementById('text_Contrast').value = input_value;
    }
    if (input_value < -1) {
        input_value = -1;
        document.getElementById('text_Contrast').value = input_value; 
    }
    document.getElementById('slider_Contrast').value = input_value;

    DictV["IncV"] = 1;
	DictV["ContrastV"] = input_value;


    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();

    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}

function Oninput_Slider_Contrast_LiveUpdate() {
    document.getElementById("text_Contrast").value = document.getElementById("slider_Contrast").value;
}