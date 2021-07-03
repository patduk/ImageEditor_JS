let num2 = 0;
function filter2() {
    ///////////////////////////////////////////

    

    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);

    let counter = 0;
    let counter1 = 0;
    let counter2 = 0;

    image_redolist = [];
    //1.0 store to undolist
    image_undolist.push(imageData);
    logprint();
    
    if (canvas.width <= 1200 && canvas.height <= 1800)
        oilPaintEffect(1,8);
    else if (canvas.width <= 1800 && canvas.height <= 1200)
    {
        oilPaintEffect(1,8);
    }
    else {
        oilPaintEffect(2,15);
    }

    //"initialize" imageData
    //ctx.getImageData(starting left, starting top, capture w, capture h)
    imageData = ctx.getImageData(0, 0, image.width, image.height);
    let data = imageData.data;
    imageData_original2_data_1d = ctx.getImageData(0, 0, image.width, image.height).data;

    ///////////////////////////////////////////

    let height = image.height -1;
    let width = image.width -1;

    let array_gx = [];
    array_gx.push([-1,0,1]);
    array_gx.push([-2,0,2]);
    array_gx.push([-1,0,1]);
    let array_gy = [];
    array_gy.push([-1,-2,-1]);
    array_gy.push([0,0,0]);
    array_gy.push([1,2,1]);

    let val_Alpha = 0;
    let val_Blue = 0;
    let val_Green = 0;
    let val_Red = 0;
    
    let Gx_sum_Red = 0;
    let Gx_sum_Green = 0;
    let Gx_sum_Blue = 0;
    let Gy_sum_Red = 0;
    let Gy_sum_Green = 0;
    let Gy_sum_Blue = 0;
    let Gxy_sum_final_Red = 0;
    let Gxy_sum_final_Green = 0;
    let Gxy_sum_final_Blue = 0;
  
    let customBGcolor_R = 255;
    let customBGcolor_G = 233;
    let customBGcolor_B = 233;

    

    //edit
    for (let y = 0; y < image.height; y ++)
    {
        for (let x = 0; x < image.width; x ++) 
        {
            
            let formula = (y*image.width*4)+x*4;

            let trio5 = (imageData_original2_data_1d[formula+0]+imageData_original2_data_1d[formula+1]+imageData_original2_data_1d[formula+2])/3;
            if (trio5 >= 200) {
                data[formula+0] = customBGcolor_R * (trio5/200);
                data[formula+1] = customBGcolor_G * (trio5/200);
                data[formula+2] = customBGcolor_B * (trio5/200);
                data[formula+3] = 255;
                continue;
            }
            
            Gx_sum_Red = 0;
            Gx_sum_Green = 0;
            Gx_sum_Blue = 0;
            Gy_sum_Red = 0;
            Gy_sum_Green = 0;
            Gy_sum_Blue = 0;
            Gxy_sum_final_Red = 0;
            Gxy_sum_final_Green = 0;
            Gxy_sum_final_Blue = 0;

            //logic
            for (let r = 0; r < 3; r++)
            {
                for (let c = 0; c < 3; c++)
                {
                    if (((y + (r - 1) >= 0) && (x + (c - 1) >= 0)) && ((y + (r - 1) <= height) && (x + (c - 1) <= width)))
                    {
                        //attempt 6 (success - edge detection)
                        // formula + row + col + 0/1/2
                        val_Red = imageData_original2_data_1d[formula + ((r-1)*image.width*4) + ((c-1)*4) +0];
                        val_Green = imageData_original2_data_1d[formula + ((r-1)*image.width*4) + ((c-1)*4) +1];
                        val_Blue = imageData_original2_data_1d[formula + ((r-1)*image.width*4) + ((c-1)*4) +2];

                        //attempt 1 (bw blind)
                        // val_Red = imageData_original2_data_1d[formula + (y+(r-1))+ (x+(c-1))*4 +0];
                        //attempt 2 (horizontal rainbow)
                        // val_Red = imageData_original2_data_1d[(y+(r-1))*(image.width+(c-1))*4 +0];
                        //attempt 3 (rainbow shards)
                        // val_Red = imageData_original2_data_1d[((y+(r-1))*(image.width+(c-1))*4)+x*4 +0];
                        //attempt 4 (horizontal rainbow)
                        // val_Red = imageData_original2_data_1d[(y+(r-1))*(image.width+(c-1))*4 +0];
                        //attempt 5 (pink static)
                        // val_Red = imageData_original2_data_1d[(y*image.width*4)+x*4 + (y*(r-1) + x*(c-1)*4) +0];;                        
                    }

                    // if outside the border (row)
                    if ((y + (r - 1) < 0) || (y + (r - 1) > (height)))
                    {
                        val_Red = 0;
                        val_Green = 0;
                        val_Blue = 0;
                    }

                    // if outside the border (column)
                    else if ((x + (c - 1) < 0) || (x + (c - 1) > (width)))
                    {
                        val_Red = 0;
                        val_Green = 0;
                        val_Blue = 0;
                    }

                    Gx_sum_Blue += val_Blue * array_gx[r][c];
                    Gx_sum_Green += val_Green * array_gx[r][c];
                    Gx_sum_Red += val_Red * array_gx[r][c];
                    Gy_sum_Blue += val_Blue * array_gy[r][c];
                    Gy_sum_Green += val_Green * array_gy[r][c];
                    Gy_sum_Red += val_Red * array_gy[r][c];
                }
            
            val_Alpha = imageData_original2_data_1d[formula+3];
        
            // example: Gxy_sum_final_Red = (Gx_sum_Red^2 + Gy_sum_Red^2)^1/2
            Gxy_sum_final_Red = Math.pow(
                (Math.pow(Gx_sum_Red, 2) + Math.pow(Gy_sum_Red, 2)), 0.5
                );
            Gxy_sum_final_Green = Math.pow(
                (Math.pow(Gx_sum_Green, 2) + Math.pow(Gy_sum_Green, 2)), 0.5
                );
            Gxy_sum_final_Blue = Math.pow(
                (Math.pow(Gx_sum_Blue, 2) + Math.pow(Gy_sum_Blue, 2)), 0.5
                );

            let max = 255; let min = 0;
            if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
            if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
            if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
            if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
            if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
            if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }




            // //darken/lighten edges 1 - (optional) (recommended before invert and bw?) not needed?
            // let max2 = 220;
            // let min2 = 75;
            // if (Gxy_sum_final_Red > max2) { Gxy_sum_final_Red *= 0.95; }
            // if (Gxy_sum_final_Green > max2) { Gxy_sum_final_Green *= 0.95; }
            // if (Gxy_sum_final_Blue > max2) { Gxy_sum_final_Blue *= 0.95; }
            // if (Gxy_sum_final_Red > min2) { Gxy_sum_final_Red *= 1.1; }
            // if (Gxy_sum_final_Green > min2) { Gxy_sum_final_Green *= 1.1; }
            // if (Gxy_sum_final_Blue > min2) { Gxy_sum_final_Blue *= 1.1; }
            


            //line 1 - invert (permanent )> bw* > transparent/custom line background* > invert* *all optional individually____
            //line 1 - possible ideal: bw* > transparent/custom line* > invert* > ____


            ////grayscale - line 1 (optional)__
            // let bwcolor1 = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3;
            // Gxy_sum_final_Red = bwcolor1;
            // Gxy_sum_final_Green = bwcolor1;
            // Gxy_sum_final_Blue = bwcolor1;


            // //transparent/custom background + darkener/lightener - line 1 (optional)__
            // //notes:
            // //make into 2: line 1.1 light background, line1.2 for dark background
            // //this option can act as line darkener/lightener
            // //use of transparent/custom bacckground makes poorer quality line
            



            
            // //user options:
            // let customBGcolor_R = 33;
            // let customBGcolor_G = 255;
            // let customBGcolor_B = 255;
            // let use_whiteline = false; //disable this A-1 (false)
            // let cutoff = 200; //0,32,48,64 (0-64) //?? enable this A0 (255)

            // //dark back ground, white line
            // if (use_whiteline === true) {
            //     cutoff = 255-cutoff; //?? enable this A1
            // }

            // //light back ground, black line
            // if (use_whiteline === false) {
            //     Gxy_sum_final_Red = 255-Gxy_sum_final_Red;
            //     Gxy_sum_final_Green = 255-Gxy_sum_final_Green;
            //     Gxy_sum_final_Blue = 255-Gxy_sum_final_Blue;
            //     cutoff = 255-cutoff;
            // }


            // ////HOW TO PUT USE_WHITELINE here?
            // // //dark back ground, white line
            // if (Gxy_sum_final_Blue <= cutoff && Gxy_sum_final_Blue <= cutoff && Gxy_sum_final_Blue <= cutoff) //?? enable this A2
            // // //light back ground, black line
            // //if (Gxy_sum_final_Blue >= cutoff && Gxy_sum_final_Blue >= cutoff && Gxy_sum_final_Blue >= cutoff)
            // {
            //     //set custom background color or/and opacity //disable this A3
            //     // Gxy_sum_final_Red = customBGcolor_R;
            //     // Gxy_sum_final_Green =customBGcolor_G; 
            //     // Gxy_sum_final_Blue = customBGcolor_B; 
            //     // val_Alpha = 255; //slider 0-255 
            // }
            // else
            // {    
            //     let linecolor_tomatch_bgcolor_Red;
            //     let linecolor_tomatch_bgcolor_Green;
            //     let linecolor_tomatch_bgcolor_Blue;
            //     // // colored matching line (dark back ground, white line)
            //     if (use_whiteline === true) {     
            //         linecolor_tomatch_bgcolor_Red = 255/(255-customBGcolor_R);
            //         linecolor_tomatch_bgcolor_Green = 255/(255-customBGcolor_G);
            //         linecolor_tomatch_bgcolor_Blue = 255/(255-customBGcolor_B);
            //     }
            //     // // colored matching line (light back ground, dark line)
            //     if (use_whiteline === false) {
            //         linecolor_tomatch_bgcolor_Red = customBGcolor_R/255;
            //         linecolor_tomatch_bgcolor_Green = customBGcolor_G/255;
            //         linecolor_tomatch_bgcolor_Blue = customBGcolor_B/255;   
            //     }


            //     // //eliminate rgb value of 0 that can't be darkened/lightened by multiplication
            //     let too_dark = 1;
            //     if (Gxy_sum_final_Red <= too_dark) 
            //     {Gxy_sum_final_Red = too_dark; }
            //     if (Gxy_sum_final_Green <= too_dark) 
            //     {Gxy_sum_final_Green = too_dark; }
            //     if (Gxy_sum_final_Blue <= too_dark) 
            //     {Gxy_sum_final_Blue = too_dark; }



            //     // //boldener (dark back ground, white line) - (1-2) ex: 1.2
            //     // //boldener (light back ground, dark line) - (0-1) ex: 0.8
            //     let nontransparentlines__boldness__slider = 1;
            //     if (use_whiteline === true) {
            //         nontransparentlines__boldness__slider = 1.2; }
            //     if (use_whiteline === false) {
            //         nontransparentlines__boldness__slider = 0.8; }

            //     Gxy_sum_final_Red *= nontransparentlines__boldness__slider;
            //     Gxy_sum_final_Green *= nontransparentlines__boldness__slider;
            //     Gxy_sum_final_Blue *= nontransparentlines__boldness__slider;

            //     // with correction
            //     if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
            //     if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
            //     if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
            //     if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
            //     if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
            //     if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }



            //     // //soft spot increaser (dark back ground, white line) - (0-1)
            //     if (use_whiteline === true) {
            //         //let soft_spot_increaser = 85; //slider (0-128)
            //         let soft_spot_increaser = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (2); //auto mode (very nice to have) (1-2) or 2 only slider
            //         if (Gxy_sum_final_Red <= soft_spot_increaser) 
            //         {Gxy_sum_final_Red = soft_spot_increaser};
            //         if (Gxy_sum_final_Green <= soft_spot_increaser) 
            //         {Gxy_sum_final_Green = soft_spot_increaser};
            //         if (Gxy_sum_final_Blue <= soft_spot_increaser) 
            //         {Gxy_sum_final_Blue = soft_spot_increaser};
            //     }
            //     // //soft spot increaser (light back ground, dark line) - (0-1)
            //     if (use_whiteline === false) {
            //         //let soft_spot_increaser = 128; //slider (128-255)
            //         let soft_spot_increaser = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (0.75); //auto mode (testing) (0-1) or .75 only slider
            //         if (Gxy_sum_final_Red >= soft_spot_increaser) 
            //         {Gxy_sum_final_Red = soft_spot_increaser};
            //         if (Gxy_sum_final_Green >= soft_spot_increaser) 
            //         {Gxy_sum_final_Green = soft_spot_increaser};
            //         if (Gxy_sum_final_Blue >= soft_spot_increaser) 
            //         {Gxy_sum_final_Blue = soft_spot_increaser};
            //     }


                
            //     //bold spot reducer (dark background, white line)
            //     if (use_whiteline === true) {
            //         //let bold_spot_reducer = 255; //slider (128-255)
            //         let bold_spot_reducer = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (2); //auto mode
            //         if (Gxy_sum_final_Red >= bold_spot_reducer) 
            //         {Gxy_sum_final_Red = bold_spot_reducer};
            //         if (Gxy_sum_final_Green >= bold_spot_reducer) 
            //         {Gxy_sum_final_Green = bold_spot_reducer};
            //         if (Gxy_sum_final_Blue >= bold_spot_reducer) 
            //         {Gxy_sum_final_Blue = bold_spot_reducer};
            //     }
            //     if (use_whiteline === false) {
            //         //bold spot reducer (light background, dark line)
            //         //let bold_spot_reducer = 64; //slider (0-128)
            //         let bold_spot_reducer = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (.75); //auto mode
            //         if (Gxy_sum_final_Red <= bold_spot_reducer) 
            //         {Gxy_sum_final_Red = bold_spot_reducer};
            //         if (Gxy_sum_final_Green <= bold_spot_reducer)
            //         {Gxy_sum_final_Green  = bold_spot_reducer};
            //         if (Gxy_sum_final_Blue <= bold_spot_reducer)
            //         {Gxy_sum_final_Blue  = bold_spot_reducer};
            //     }



            //     // line and background color matching
            //     Gxy_sum_final_Red *= linecolor_tomatch_bgcolor_Red; 
            //     Gxy_sum_final_Green *= linecolor_tomatch_bgcolor_Green; 
            //     Gxy_sum_final_Blue *= linecolor_tomatch_bgcolor_Blue;



            //     //correction
            //     if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
            //     if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
            //     if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
            //     if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
            //     if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
            //     if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }


            // }







            // // // //transparent/custom background + darkener/lightener - line 1.3(optional)__
            // // // //notes:
            // // // //solid colored background with black lines
            // // // // possible to bolden/soften black lines?
            
            // //user options:
            // let customBGcolor_R = 255;
            // let customBGcolor_G = 255;
            // let customBGcolor_B = 255;
            // let customBGcolor_A = 255;
            // let use_whiteline = false; //128 this A-1 (false)
            // let cutoff = 25; //0,32,48,64 (0-64) //?? enable this A0 (255)
            
            // //black background and colored lines without, use_whiteline = false
            // //colored background and black lines with, use_whiteline = false
            // Gxy_sum_final_Red = 255-Gxy_sum_final_Red;
            // Gxy_sum_final_Green = 255-Gxy_sum_final_Green;
            // Gxy_sum_final_Blue = 255-Gxy_sum_final_Blue;            

            // let customlineshadowcolor_R = 0;
            // let customlineshadowcolor_G = 0;
            // let customlineshadowcolor_B = 0; //128-30
            


            // // //colored back ground, black line
            // // //light back ground, black line
            //  if (Gxy_sum_final_Blue <= cutoff && Gxy_sum_final_Blue <= cutoff && Gxy_sum_final_Blue <= cutoff) //?? enable this A2
            // // 
            // //if (Gxy_sum_final_Blue >= cutoff && Gxy_sum_final_Blue >= cutoff && Gxy_sum_final_Blue >= cutoff)
            // {
            //     //set custom background color or/and opacity //disable this A3
            //     // Gxy_sum_final_Red = customBGcolor_R;
            //     // Gxy_sum_final_Green =customBGcolor_G; 
            //     // Gxy_sum_final_Blue = customBGcolor_B; 
            //     // val_Alpha = 255; //slider 0-255 
            //     Gxy_sum_final_Red *= 10;
            //     Gxy_sum_final_Green *= 10;
            //     Gxy_sum_final_Blue *= 10;
            //     val_Alpha = customBGcolor_A;
               
            // }
            // else if (Gxy_sum_final_Blue > cutoff && Gxy_sum_final_Blue > cutoff && Gxy_sum_final_Blue > cutoff)
            // {    
            //     let linecolor_tomatch_bgcolor_Red;
            //     let linecolor_tomatch_bgcolor_Green;
            //     let linecolor_tomatch_bgcolor_Blue;
            //     // // colored matching line (dark back ground, white line)
            //     if (use_whiteline === true) {     
            //         linecolor_tomatch_bgcolor_Red = 255/(255-customBGcolor_R);
            //         linecolor_tomatch_bgcolor_Green = 255/(255-customBGcolor_G);
            //         linecolor_tomatch_bgcolor_Blue = 255/(255-customBGcolor_B);
            //     }
            //     // // colored matching line (light back ground, dark line)
            //     if (use_whiteline === false) {
            //         linecolor_tomatch_bgcolor_Red = customBGcolor_R/255;
            //         linecolor_tomatch_bgcolor_Green = customBGcolor_G/255;
            //         linecolor_tomatch_bgcolor_Blue = customBGcolor_B/255;   
            //     }


            //     // // //eliminate rgb value of 0 that can't be darkened/lightened by multiplication
            //     let too_dark = 1;
            //     if (Gxy_sum_final_Red <= too_dark) 
            //     {Gxy_sum_final_Red = too_dark; }
            //     if (Gxy_sum_final_Green <= too_dark) 
            //     {Gxy_sum_final_Green = too_dark; }
            //     if (Gxy_sum_final_Blue <= too_dark) 
            //     {Gxy_sum_final_Blue = too_dark; }



            //     // // //boldener (dark back ground, white line) - (1-2) ex: 1.2
            //     // // //boldener (light back ground, dark line) - (0-1) ex: 0.8
            //     // let nontransparentlines__boldness__slider = 1;
            //     // if (use_whiteline === true) {
            //     //     nontransparentlines__boldness__slider = 1.2; }
            //     // if (use_whiteline === false) {
            //     //     nontransparentlines__boldness__slider = 0.8; }

            //     // Gxy_sum_final_Red *= nontransparentlines__boldness__slider;
            //     // Gxy_sum_final_Green *= nontransparentlines__boldness__slider;
            //     // Gxy_sum_final_Blue *= nontransparentlines__boldness__slider;

            //     // // with correction
            //     // if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
            //     // if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
            //     // if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
            //     // if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
            //     // if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
            //     // if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }



            //      // //soft spot increaser (dark back ground, white line) - (0-1)
            //      if (use_whiteline === true) {
            //         //let soft_spot_increaser = 85; //slider (0-128)
            //         let soft_spot_increaser = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (2); //auto mode (very nice to have) (1-2) or 2 only slider
            //         if (Gxy_sum_final_Red <= soft_spot_increaser) 
            //         {Gxy_sum_final_Red = soft_spot_increaser};
            //         if (Gxy_sum_final_Green <= soft_spot_increaser) 
            //         {Gxy_sum_final_Green = soft_spot_increaser};
            //         if (Gxy_sum_final_Blue <= soft_spot_increaser) 
            //         {Gxy_sum_final_Blue = soft_spot_increaser};
            //     }
            //     // //soft spot increaser (light back ground, dark line) - (0-1)
            //     if (use_whiteline === false) {
            //         //let soft_spot_increaser = 128; //slider (128-255)
            //         let soft_spot_increaser = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (0.2); //auto mode (testing) (0-1) or .75 only slider
            //         if (Gxy_sum_final_Red >= soft_spot_increaser) 
            //         {Gxy_sum_final_Red = soft_spot_increaser};
            //         if (Gxy_sum_final_Green >= soft_spot_increaser) 
            //         {Gxy_sum_final_Green = soft_spot_increaser};
            //         if (Gxy_sum_final_Blue >= soft_spot_increaser) 
            //         {Gxy_sum_final_Blue = soft_spot_increaser};
            //     }



                
            //     // //bold spot reducer (dark background, white line)
            //     // if (use_whiteline === true) {
            //     //     //let bold_spot_reducer = 255; //slider (128-255)
            //     //     let bold_spot_reducer = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (2); //auto mode
            //     //     if (Gxy_sum_final_Red >= bold_spot_reducer) 
            //     //     {Gxy_sum_final_Red = bold_spot_reducer};
            //     //     if (Gxy_sum_final_Green >= bold_spot_reducer) 
            //     //     {Gxy_sum_final_Green = bold_spot_reducer};
            //     //     if (Gxy_sum_final_Blue >= bold_spot_reducer) 
            //     //     {Gxy_sum_final_Blue = bold_spot_reducer};
            //     // }
            //     // if (use_whiteline === false) {
            //     //     //bold spot reducer (light background, dark line)
            //     //     //let bold_spot_reducer = 64; //slider (0-128)
            //     //     let bold_spot_reducer = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (.75); //auto mode
            //     //     if (Gxy_sum_final_Red <= bold_spot_reducer) 
            //     //     {Gxy_sum_final_Red = bold_spot_reducer};
            //     //     if (Gxy_sum_final_Green <= bold_spot_reducer)
            //     //     {Gxy_sum_final_Green  = bold_spot_reducer};
            //     //     if (Gxy_sum_final_Blue <= bold_spot_reducer)
            //     //     {Gxy_sum_final_Blue  = bold_spot_reducer};
            //     // }



            //     // line and background color matching
            //     Gxy_sum_final_Red *= linecolor_tomatch_bgcolor_Red; 
            //     Gxy_sum_final_Green *= linecolor_tomatch_bgcolor_Green; 
            //     Gxy_sum_final_Blue *= linecolor_tomatch_bgcolor_Blue;

            //     // val_Alpha =0 ;

            //     //correction
            //     if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
            //     if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
            //     if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
            //     if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
            //     if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
            //     if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }
                

            // }
            

            

            //add custom/transparent background, modify underlying white lines' boldness, soft/hard spots, and shadow colors - line 1.4(optional)__
            //notes:
            //white lines = works with dark/light/transparent background
            //black lines = works with dark/light/transparent background (testing)
            // fix line 1.3 to be as good as line 1.4?? = forget it?
            let bwcolor1_31;
            bwcolor1_31 = (Gxy_sum_final_Blue + Gxy_sum_final_Green + Gxy_sum_final_Red) / 3;

            
            //user options:
            // customBGcolor_R = 255-45;
            // customBGcolor_G = 255-45;
            // customBGcolor_B = 255-45;
            let customBGcolor_A = 0;
            let use_blackline = true;
            let cutoff = 20; //10-20% of 255 recommended         

            let highestlimit = 127 * (customBGcolor_A/255);
            let customlineshadowcolor_R = 0;
            let customlineshadowcolor_G = 0;
            let customlineshadowcolor_B = 0;
            
            let trio0 = (Gxy_sum_final_Red+Gxy_sum_final_Green + Gxy_sum_final_Blue)/3;

            if (trio0 <= cutoff)
            {
                // set desired background color/opacity
                Gxy_sum_final_Red = customBGcolor_R;
                Gxy_sum_final_Green = customBGcolor_G;
                Gxy_sum_final_Blue = customBGcolor_B;
                //val_Alpha = customBGcolor_A;

            }

            else if (trio0 > cutoff)
            {    

                ////////modifications for underlying white lines - modify overall boldness, soft spots, and hard spots of underying white lines
                
                ////step 1: replace underlying white lines' RGB colors of 0 with new number that can be easily manipulating by multiplication/division necessary for modifying overall boldness, soft spots, and hard spots
                let too_dark = 1;
                if (Gxy_sum_final_Red <= too_dark) 
                {Gxy_sum_final_Red = too_dark; }
                if (Gxy_sum_final_Green <= too_dark) 
                {Gxy_sum_final_Green = too_dark; }
                if (Gxy_sum_final_Blue <= too_dark) 
                {Gxy_sum_final_Blue = too_dark; }
                
                ////step 2: modify boldness of white lines (to bring up low RGB color spots)
                let nontransparentlines__boldness__slider = 1;
                Gxy_sum_final_Red *= nontransparentlines__boldness__slider;
                Gxy_sum_final_Green *= nontransparentlines__boldness__slider;
                Gxy_sum_final_Blue *= nontransparentlines__boldness__slider;
                



                ////step 2.1: "0-255" correction
                if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
                if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
                if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
                if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
                if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
                if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }

                ////step 3: increase soft spots
                let soft_spot_increaser = 85; //slider (0-128)
                soft_spot_increaser = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (2); //auto mode (very nice to have) (1-2) or 2 only slider
                if (Gxy_sum_final_Red <= soft_spot_increaser) 
                {Gxy_sum_final_Red = soft_spot_increaser};
                if (Gxy_sum_final_Green <= soft_spot_increaser) 
                {Gxy_sum_final_Green = soft_spot_increaser};
                if (Gxy_sum_final_Blue <= soft_spot_increaser) 
                {Gxy_sum_final_Blue = soft_spot_increaser};
                
                ////step 4: decrease hard spots
                let hard_spot_reducer = 255; //slider (128-255)
                hard_spot_reducer = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3 * (2); //auto mode
                if (Gxy_sum_final_Red > hard_spot_reducer) 
                {Gxy_sum_final_Red = hard_spot_reducer};
                if (Gxy_sum_final_Green > hard_spot_reducer) 
                {Gxy_sum_final_Green = hard_spot_reducer};
                if (Gxy_sum_final_Blue > hard_spot_reducer) 
                {Gxy_sum_final_Blue = hard_spot_reducer};




                ////////corrections for custom RGB BG and shadow line colors submitted by users, then apply custom RGB shadow line colors, including black line mode, to underlying white lines

                ////step 0: opacity adjuster (increase or decrease RGB background colors in proportion with custom Alpha background color)
                
                // customBGcolor_R = customBGcolor_R * (customBGcolor_A/255);
                // customBGcolor_G = customBGcolor_G * (customBGcolor_A/255);
                // customBGcolor_B = customBGcolor_B * (customBGcolor_A/255);

                ////step 1: increase low [custom RGB line colors] to match brightness level as [custom RGB background colors]
                if (customlineshadowcolor_R < customBGcolor_R) 
                {customlineshadowcolor_R += customBGcolor_R; }
                if (customlineshadowcolor_G < customBGcolor_G) 
                {customlineshadowcolor_G += customBGcolor_G; }
                if (customlineshadowcolor_B < customBGcolor_B) 
                {customlineshadowcolor_B += customBGcolor_B; }

                ////step 2: limit high [custom RGB line colors] to prevent from making white lines looking too bright. then, decrease all [custom RGB line colors] to balance  brightness while keeping desired custom RGB line colors' appearance 
                // highestlimit = 50 * (customBGcolor_A/255);
                let overbrightline_count = 0;

                if (customlineshadowcolor_R > customBGcolor_R + highestlimit) 
                {customlineshadowcolor_R = customBGcolor_R + highestlimit; }
                if (customlineshadowcolor_G > customBGcolor_G + highestlimit) 
                {customlineshadowcolor_G = customBGcolor_G + highestlimit; }
                if (customlineshadowcolor_B > customBGcolor_B + highestlimit) 
                {customlineshadowcolor_B = customBGcolor_B + highestlimit; }

                overbrightline_count += customlineshadowcolor_R - customBGcolor_R;
                overbrightline_count += customlineshadowcolor_G - customBGcolor_G;
                overbrightline_count += customlineshadowcolor_B - customBGcolor_B;
                overbrightline_count += highestlimit;

                let brightnessreducer = overbrightline_count/3;
                customlineshadowcolor_R = customlineshadowcolor_R - brightnessreducer;
                customlineshadowcolor_G = customlineshadowcolor_G - brightnessreducer;
                customlineshadowcolor_B = customlineshadowcolor_B - brightnessreducer;
                


                ////step 3: prepare variables that modify white (or soon-to-be black) underlying lines' original shadow colors, so they'll blend in with the [custom RGB background colors]
                let linecolor_tomatch_bgcolor_Red;
                let linecolor_tomatch_bgcolor_Green;
                let linecolor_tomatch_bgcolor_Blue;
                if (use_blackline === false) {     
                    linecolor_tomatch_bgcolor_Red = 255/(255-customlineshadowcolor_R);
                    linecolor_tomatch_bgcolor_Green = 255/(255-customlineshadowcolor_G);
                    linecolor_tomatch_bgcolor_Blue = 255/(255-customlineshadowcolor_B);
                }
                else if (use_blackline === true) {
                   linecolor_tomatch_bgcolor_Red = 255/(customlineshadowcolor_R);
                   linecolor_tomatch_bgcolor_Green = 255/(customlineshadowcolor_G);
                   linecolor_tomatch_bgcolor_Blue = 255/(customlineshadowcolor_B);   
                }

                ////step 4: Apply [custom RGB line colors] to white (or soon-to-be black) underlying lines, which will have shadow RGB colors that match [custom RGB background colors]
                Gxy_sum_final_Red *= linecolor_tomatch_bgcolor_Red; 
                Gxy_sum_final_Green *= linecolor_tomatch_bgcolor_Green; 
                Gxy_sum_final_Blue *= linecolor_tomatch_bgcolor_Blue;


                

                ////step 4.1: "0-255" correction
                if (Gxy_sum_final_Blue > max) { Gxy_sum_final_Blue = 255; }
                if (Gxy_sum_final_Green > max) { Gxy_sum_final_Green = 255; }
                if (Gxy_sum_final_Red > max) { Gxy_sum_final_Red = 255; }
                if (Gxy_sum_final_Blue < min) { Gxy_sum_final_Blue = 0; }
                if (Gxy_sum_final_Green < min) { Gxy_sum_final_Green = 0; }
                if (Gxy_sum_final_Red < min) { Gxy_sum_final_Red = 0; }

                ////step 5: remove bad spots that result from setting cutoff at low value
                //WAY 1 
                if (use_blackline === false) {
                    if (Gxy_sum_final_Red < customBGcolor_R) { Gxy_sum_final_Red = customBGcolor_R; }
                    if (Gxy_sum_final_Green < customBGcolor_G) { Gxy_sum_final_Green = customBGcolor_G; }
                    if (Gxy_sum_final_Blue < customBGcolor_B) { Gxy_sum_final_Blue = customBGcolor_B; }
                }
                
                ////step 6: Instead of white lines (w/ desired highlight colors), generate black lines (by inverting underlying white lines w/ pre-inverted highlight colors into black lines w/ desired highlight colors))
                if (use_blackline === true) {  
                    Gxy_sum_final_Red = 255-Gxy_sum_final_Red;
                    Gxy_sum_final_Green = 255-Gxy_sum_final_Green;
                    Gxy_sum_final_Blue = 255-Gxy_sum_final_Blue;
                }

                

            }


            // //Attempt 1 = restore black lines 
            // let bwcolor2_31 = (imageData_original2_data_1d[formula+0] + imageData_original2_data_1d[formula+1] + imageData_original2_data_1d[formula+2]) / 3;
            // //add shade
            // if (bwcolor2_31 <= bwcolor1_31 && bwcolor2_31 <= 255)
            // {
            //     // Gxy_sum_final_Blue = bwcolor2_31;
            //     // Gxy_sum_final_Green = bwcolor2_31;
            //     // Gxy_sum_final_Red = bwcolor2_31;
            //     Gxy_sum_final_Red = 255;
            //     Gxy_sum_final_Green = customBGcolor_G * (255-bwcolor1_31)/255;
            //     Gxy_sum_final_Blue = customBGcolor_B * (255-bwcolor1_31)/255;
            // }
            // else
            // {
            // }
            if (trio5 <= 25 && trio5 >= 4) {
                // data[formula+0] = customBGcolor_R * ((255)-trio5)/(255);
                // data[formula+1] = customBGcolor_G * ((255)-trio5)/(255);
                // data[formula+2] = customBGcolor_B * ((255)-trio5)/(255);
                data[formula+0] = customBGcolor_R * 0.8;
                data[formula+1] = customBGcolor_G * 0.8;
                data[formula+2] = customBGcolor_B * 0.8;
                continue;
            }


            // if (use_blackline === true) {
            //     Gxy_sum_final_Red = 255-Gxy_sum_final_Red;
            //     Gxy_sum_final_Green = 255-Gxy_sum_final_Green;
            //     Gxy_sum_final_Blue = 255-Gxy_sum_final_Blue; 
            // }


            // //line 2 - grayscale with color lines____

            // ////grayscale - line 2 (optional)__
            // let bwcolor1 = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3;
            // Gxy_sum_final_Red = bwcolor1;
            // Gxy_sum_final_Green = bwcolor1;
            // Gxy_sum_final_Blue = bwcolor1;

            // let bwcolor2 = (((imageData_original2_data_1d[formula+0] + imageData_original2_data_1d[formula+1] + imageData_original2_data_1d[formula+2]) / 3));
            // //add shade
            // if (bwcolor2 >= bwcolor1)
            // {
            //     Gxy_sum_final_Green = bwcolor2;
            //     Gxy_sum_final_Red = bwcolor2;
            // }
            // Gxy_sum_final_Blue = bwcolor2;
             

            ////line 3 - grayscale with color lines____

            ////grayscale - line 3 (optional)__
            // let bwcolor1 = (Gxy_sum_final_Red + Gxy_sum_final_Green + Gxy_sum_final_Blue)/3;
            // Gxy_sum_final_Red = bwcolor1;
            // Gxy_sum_final_Green = bwcolor1;
            // Gxy_sum_final_Blue = bwcolor1;

            // let bwcolor2 = (((imageData_original2_data_1d[formula+0] + imageData_original2_data_1d[formula+1] + imageData_original2_data_1d[formula+2]) / 3));
            // //add shade
            // if (bwcolor2 >= bwcolor1)
            // {
            //     Gxy_sum_final_Green = bwcolor2;
            //     Gxy_sum_final_Red = bwcolor2;
            // }
            // Gxy_sum_final_Blue = bwcolor2;
            
            

            data[formula]     = Gxy_sum_final_Red;    // red
            data[formula + 1] = Gxy_sum_final_Green;  // green
            data[formula + 2] = Gxy_sum_final_Blue;   // blue
            data[formula + 3] = val_Alpha;            // alpha
            }

        }
    }

    console.log("counter1: " + counter1);
    ctx.putImageData(imageData, 0, 0);
}




//stolen from stackoverflow https://stackoverflow.com/questions/24222556/apply-a-oil-paint-sketch-effect-to-a-photo-using-javascript 
function oilPaintEffect(radius, intensity) {
    //prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    //image = new Image();
    //ctx.drawImage(image, 0, 0);
    // image_redolist = [];
    // //1.0 store to undolist
    // image_undolist.push(imageData);
    // logprint();


    let width = canvas.width,
        height = canvas.height,
        imgData = ctx.getImageData(0, 0, width, height),
        pixData = imgData.data,
        destCanvas = document.createElement("canvas"),
        dCtx = destCanvas.getContext("2d"),
        pixelIntensityCount = [];

    destCanvas.width = width;
    destCanvas.height = height;

    // for demo purposes, remove this to modify the original canvas
    //document.body.appendChild(destCanvas);

    var destImageData = dCtx.createImageData(width, height),
        destPixData = destImageData.data,
        intensityLUT = [],
        rgbLUT = [];

    for (var y = 0; y < height; y++) {
        intensityLUT[y] = [];
        rgbLUT[y] = [];
        for (var x = 0; x < width; x++) {
            var idx = (y * width + x) * 4,
                r = pixData[idx],
                g = pixData[idx + 1],
                b = pixData[idx + 2],
                avg = (r + g + b) / 3;

            intensityLUT[y][x] = Math.round((avg * intensity) / 255);
            rgbLUT[y][x] = {
                r: r,
                g: g,
                b: b
            };
        }
    }


    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {

            pixelIntensityCount = [];

            // Find intensities of nearest pixels within radius.
            for (var yy = -radius; yy <= radius; yy++) {
                for (var xx = -radius; xx <= radius; xx++) {
                    if (y + yy > 0 && y + yy < height && x + xx > 0 && x + xx < width) {
                        var intensityVal = intensityLUT[y + yy][x + xx];

                        if (!pixelIntensityCount[intensityVal]) {
                            pixelIntensityCount[intensityVal] = {
                                val: 1,
                                r: rgbLUT[y + yy][x + xx].r,
                                g: rgbLUT[y + yy][x + xx].g,
                                b: rgbLUT[y + yy][x + xx].b
                            }
                        } else {
                            pixelIntensityCount[intensityVal].val++;
                            pixelIntensityCount[intensityVal].r += rgbLUT[y + yy][x + xx].r;
                            pixelIntensityCount[intensityVal].g += rgbLUT[y + yy][x + xx].g;
                            pixelIntensityCount[intensityVal].b += rgbLUT[y + yy][x + xx].b;
                        }
                    }
                }
            }

            pixelIntensityCount.sort(function (a, b) {
                return b.val - a.val;
            });

            var curMax = pixelIntensityCount[0].val,
                dIdx = (y * width + x) * 4;

            destPixData[dIdx] = ~~ (pixelIntensityCount[0].r / curMax);
            destPixData[dIdx + 1] = ~~ (pixelIntensityCount[0].g / curMax);
            destPixData[dIdx + 2] = ~~ (pixelIntensityCount[0].b / curMax);
            destPixData[dIdx + 3] = 255;
        }
    }

    // change this to ctx to instead put the data on the original canvas
    //dCtx.putImageData(destImageData, 0, 0);
    imageData = destImageData;
    ctx.putImageData(destImageData, 0, 0);
    
}
