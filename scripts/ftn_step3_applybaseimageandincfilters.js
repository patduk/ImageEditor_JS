

function ApplyBaseImageAndIncrementalFiltersToCurrentImage()
{
    exit_downloadmodetoggle_ifneeded();

    ////3 edit image
    ////3 edit image
    ////3 edit image
    ////3 edit image

    ////make imgSharp = imgSharp_original2 (base image) prior to adding incremental filters
    
    ////WAY1 - works
    // for (let y = 0; y < image.height; y++)
    // {
    //     for (let x = 0; x < image.width; x++)
    //     {
    //         let formula = (y*image.width*4)+x*4;
    //         imageData.data[formula+0] = imageData_original2.data[formula+0];
    //         imageData.data[formula+1] = imageData_original2.data[formula+1];
    //         imageData.data[formula+2] = imageData_original2.data[formula+2];  
    //     }
    // }

    ////WAY1.1 - works (faster)
    for (var i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i+0] = imageData_original2.data[i+0];
            imageData.data[i+1] = imageData_original2.data[i+1];
            imageData.data[i+2] = imageData_original2.data[i+2];  
            imageData.data[i+3] = imageData_original2.data[i+3];  //remove this and use opacity 20 to 255 to "posterize the image" (bs)
    }
    
    ////WAY2 - not working
    //imageData = imageData_original2;


    ////adding incremental filters - try to make the codes shorter
    for (key in DictV)
    {
        if (key == "ContrastV") {
            //0.0-1.0
            Contrast(DictV[key]); 
        }
        if (key == "BrightnessV") {
            Brightness(DictV[key]);  
        }
        if (key == "OpacityV") {
            Opacity(DictV[key]);
        }
        if (key == "RedV") {
            Red(DictV[key]);
        }
        if (key == "GreenV") {
            Green(DictV[key]);
        }
        if (key == "BlueV") {
            Blue(DictV[key]);
        }
        if (key == "GblurV") {
            //0-10
            Gblur(DictV[key]);
        }
    }
    
    //3 edit image
    //3 edit image   
    //3 edit image
    //3 edit image   


    update_stats();
}

