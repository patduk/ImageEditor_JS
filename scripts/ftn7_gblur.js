//edit the image
function Gblur(input_value) {
    
    blurRGBA(imageData.data, image.width, image.height, input_value);
    
}



//onchange slider
function Onchange_Slider_Gblur()
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
    let input_value = parseInt(document.getElementById('slider_Gblur').value);
    document.getElementById('text_Gblur').value = input_value;

    DictV["IncV"] = 1;
	DictV["GblurV"] = input_value;

    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();
    //blurRGBA(imageData.data, image.width, image.height, input_value);
    
    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}

function Onchange_Text_Gblur() 
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
    let input_value = parseInt(document.getElementById('text_Gblur').value);
    if (input_value > 10) {
        input_value = 10;
        document.getElementById('text_Gblur').value = input_value;
    }
    if (input_value < 0) {
        input_value = 0;
        document.getElementById('text_Gblur').value = input_value; 
    }
    document.getElementById('slider_Gblur').value = input_value;

    DictV["IncV"] = 1;
	DictV["GblurV"] = input_value;
    

    ////3 edit image
    ApplyBaseImageAndIncrementalFiltersToCurrentImage();
    //blurRGBA(imageData.data, image.width, image.height, input_value);

    //canvas update
    ctx.putImageData(imageData, 0, 0);
    //image update
    document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}


function Oninput_Slider_Gblur_LiveUpdate() {
    document.getElementById("text_Gblur").value = document.getElementById("slider_Gblur").value;
}

function JS_changesliderpositionandtextvalue_Gblur(n) {
    document.getElementById('slider_Gblur').value = n;
	document.getElementById('text_Gblur').value = n;
}

