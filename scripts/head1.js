//not working
// document.querySelect('html').onclick = function() {
//   alert ("ouch!");
// }

// document.querySelector('html').onclick = function() 
// {
//   alert("jerk");
// }

// function function4_display() {
//     variable1 = "\nchanged_variable1";
//     return variable3;
// }
// function function3_button() {
//     if (document.getElementById("button1").style.color !== "red")
//         document.getElementById("button1").style.color = "red";
//     else 
//         document.getElementById("button1").style.color = "green";
// }
// function function1_buttonimg() {
//     //let myImage = document.getElementById('myImage');
    
//     if (document.getElementById('myImage').src !== "images/wlop.jpg")
//     document.getElementById('myImage').src = "images/wlop1.jpg";
//     else {
//         document.getElementById('myImage').src = "images/firefox-icon.png"
//     }
//     myImage.height = 300;
//     alert(myImage.src);
// }
// //picture switching function = working
// let toggle1 = false;
// function function2_buttonimg() {

//     //picture switching
//     let myImage = document.getElementById('myImage');
    
//     if (toggle1 === false) {
//         myImage.src = "images/wlop1.jpg";
//         toggle1 = true;
//     }
//     else {
//         myImage.src = "images/firefox-icon copy.png";
//         toggle1 = false;
//     }
    
//     //limit height?
//     myImage.height = 300;

//     //edit text by element id
//     let paragraph1 = document.getElementById('pow1');
//     paragraph1.innerHTML = myImage.src;
// }




////way 1
// window.addEventListener('load', function() {
//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         if (this.files && this.files[0]) {
//             let img = document.getElementById('myImage');
//             img.onload = () => {
//                 URL.revokeObjectURL(img.src);  // no longer needed, free memory
//             }
//             img.src = URL.createObjectURL(this.files[0]); // set src to blob url
//         }
//     });
//   });



