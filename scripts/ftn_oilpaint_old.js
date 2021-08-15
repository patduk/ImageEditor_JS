
//stolen from stackoverflow https://stackoverflow.com/questions/24222556/apply-a-oil-paint-sketch-effect-to-a-photo-using-javascript 
function oilpaint(radius, intensity) {

    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');

    ////1.0-1.4 store to undolist
    ClearRedo();                   //0.8
    is_FilterIncremental = false;   //0.9 //might be true to avoid playing flatten() in infinite loop
    SaveAttributesToUndoLists();   //1-1.4
    logprint();
    
    ////2.0 (reset incremental filter attributes when user uses non-incremental filter)
    for (key in DictV) { 
        DictV[key] = 0;
    }


    /////
    /////


    var width = canvas.width,
        height = canvas.height,
        imgData = ctx.getImageData(0, 0, width, height),
        pixData = imgData.data,
        destCanvas = document.createElement("canvas"),
        dCtx = destCanvas.getContext("2d"),
        pixelIntensityCount = [];

    destCanvas.width = width;
    destCanvas.height = height;

    // for demo purposes, remove this to modify the original canvas
    document.body.appendChild(destCanvas);

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

    ////4.0 affix
    //imageData_original2 = imageData;
    Flatten_nosavingtoundo();

    // change this to ctx to instead put the data on the original canvas
    dCtx.putImageData(destImageData, 0, 0);
    //OR
    //ctx.putImageData(destImageData, 0, 0);

//     //canvas update
//     ctx.putImageData(imageData, 0, 0);
//     //image update
//     document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
}