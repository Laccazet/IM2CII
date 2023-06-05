var textarea = document.querySelector("textarea");
var input = document.getElementById("input");
var preview = document.getElementById("preview");
var img = new Image();

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 150;
canvas.height = 125;

//It takes the brightness data of each pixel of the image on the canvas, starting from the top left.
function getPixels(){
    var pixelColorData = []
    for (let column = 0; column < canvas.height; column++){
        for (let row = 0; row < canvas.width; row++) {
            let pixel = ctx.getImageData(row,column,1,1).data;
            pixelColorData.push(pixel[0]);
        }
    }
    return pixelColorData
}

//It adds the letter corresponding to the brightness of each pixel in order.
function convertASCII(pixels){
    let x = [];
    for (let i = 0; i < pixels.length; i++) {

        if (pixels[i] >= 0 && pixels[i] <= 25){
            x.push("@");
        }else if (pixels[i] > 25 && pixels[i] <= 50){
            x.push("%");
        }else if (pixels[i] > 50 && pixels[i] <= 75){
            x.push("#");
        }else if (pixels[i] > 75 && pixels[i] <= 100){
            x.push("*");
        }else if (pixels[i] > 100 && pixels[i] <= 125){
            x.push("+");
        }else if (pixels[i] > 125 && pixels[i] <= 150){
            x.push("=");
        }else if (pixels[i] > 150 && pixels[i] <= 175){
            x.push("-");
        }else if (pixels[i] > 175 && pixels[i] <= 200){
            x.push(":");
        }else if (pixels[i] > 200 && pixels[i] <= 225){
            x.push(".");
        }else if (pixels[i] > 225 && pixels[i] <= 255){
            x.push(" ");
        }

    }
    return x.join("");
}

//Adds new line to textarea after each 200 letter.
function addNewlines(str) {
    var result = '';
    while (str.length > 0) {
      result += str.substring(0, canvas.width) + '\n';
      str = str.substring(canvas.width);
    }
    textarea.innerHTML = result;
}

//When the image file is added, it sends the preview and canvas to the image.
input.addEventListener('change', function() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const file = this.files[0];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    preview.src = URL.createObjectURL(file);
    img.onload = function() {
        ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height);
        addNewlines(convertASCII(getPixels()));
    };
});
