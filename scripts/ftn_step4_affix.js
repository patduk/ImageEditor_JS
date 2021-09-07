
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
