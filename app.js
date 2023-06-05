var p = document.querySelector("textarea");
var input = document.getElementById("input");
var preview = document.getElementById("preview-container");
var img = new Image();
img.src = "dog.jpg";



var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");




canvas.width = 150;
canvas.height = 125;


ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);



var pixelColorData = []

for (let column = 0; column < canvas.height; column++){
    for (let row = 0; row < canvas.width; row++) {

        let pixel = ctx.getImageData(row,column,1,1).data;
        pixelColorData.push(pixel[0]);
    
    }
}


var ascii = [];

function convertASCII(pixels){
    for (let i = 0; i < pixels.length; i++) {

        if (pixels[i] >= 0 && pixels[i] <= 25){
            ascii.push("@");
        }else if (pixels[i] > 25 && pixels[i] <= 50){
            ascii.push("%");
        }else if (pixels[i] > 50 && pixels[i] <= 75){
            ascii.push("#");
        }else if (pixels[i] > 75 && pixels[i] <= 100){
            ascii.push("*");
        }else if (pixels[i] > 100 && pixels[i] <= 125){
            ascii.push("+");
        }else if (pixels[i] > 125 && pixels[i] <= 150){
            ascii.push("=");
        }else if (pixels[i] > 150 && pixels[i] <= 175){
            ascii.push("-");
        }else if (pixels[i] > 175 && pixels[i] <= 200){
            ascii.push(":");
        }else if (pixels[i] > 200 && pixels[i] <= 225){
            ascii.push(".");
        }else if (pixels[i] > 225 && pixels[i] <= 255){
            ascii.push(" ");
        }

    }
}


convertASCII(pixelColorData);

var final = ascii.join("");

function addNewlines(str) {
    var result = '';
    while (str.length > 0) {
      result += str.substring(0, canvas.width) + '\n';
      str = str.substring(canvas.width);
    }
    return result;
}

p.innerHTML = addNewlines(final);
