
function gaussianblur() {

    ////999 prep canvas and ctx (idk why its needed)
    let canvas = document.getElementById('cv2'); 
    let ctx = canvas.getContext('2d');
    // image = new Image();
    // ctx.drawImage(image, 0, 0);
  imageData = ctx.getImageData(0,0,canvas.width,canvas.height);


  var tmpPx = new Uint8ClampedArray(imageData.data.length);
  tmpPx.set(imageData.data);

  for (var i = 0, len= imageData.data.length; i < len; i++) {
     if (i % 4 === 3) {continue;}

     imageData.data[i] = ( tmpPx[i] 
        + (tmpPx[i - 4] || tmpPx[i])
        + (tmpPx[i + 4] || tmpPx[i]) 
        + (tmpPx[i - 4 * imageData.data.width] || tmpPx[i])
        + (tmpPx[i + 4 * imageData.data.width] || tmpPx[i]) 
        + (tmpPx[i - 4 * imageData.data.width - 4] || tmpPx[i])
        + (tmpPx[i + 4 * imageData.data.width + 4] || tmpPx[i])
        + (tmpPx[i + 4 * imageData.data.width - 4] || tmpPx[i])
        + (tmpPx[i - 4 * imageData.data.width + 4] || tmpPx[i])
        )/9;
  };
  // data.data = px;

  //canvas update
  ctx.putImageData(imageData, 0, 0);
  //image update
  document.getElementById('img_id1').src = canvas.toDataURL("image/png"); 
  //delete tmpPx;
  //btnBlur.removeAttribute('disabled');
  //btnBlur.textContent = 'Blur'; 
}

// source channel, target channel, width, height, radius
function gaussBlur_1 (scl, tcl, w, h, r) {
    var rs = Math.ceil(r * 2.57);     // significant radius
    for(var i=0; i<h; i++)
        for(var j=0; j<w; j++) {
            var val = 0, wsum = 0;
            for(var iy = i-rs; iy<i+rs+1; iy++)
                for(var ix = j-rs; ix<j+rs+1; ix++) {
                    var x = Math.min(w-1, Math.max(0, ix));
                    var y = Math.min(h-1, Math.max(0, iy));
                    var dsq = (ix-j)*(ix-j)+(iy-i)*(iy-i);
                    var wght = Math.exp( -dsq / (2*r*r) ) / (Math.PI*2*r*r);
                    val += scl[y*w+x] * wght;  wsum += wght;
                }
            tcl[i*w+j] = Math.round(val/wsum);            
        }
}