import Color from "https://colorjs.io/dist/color.esm.js";

const nameElement = document.getElementById('name');
const reloadButton = document.getElementById('reload');
const reloadSvg = document.getElementsByClassName('app__reload-svg')[0];
const choiceElement = document.getElementById('textTransformChoice');
const chars = nameElement.getElementsByClassName('char');

// create 3 variables for 3 cases: colorjs, randomcolor.js and customrandomcolor
let colorjs = false;
let randomcolorjs = true;
let customrandomcolor = false;

let frontandback = true;
let shufflefrontandback = false;

// set the reload svg to 0deg
reloadSvg.style.transform = 'rotate(0deg)';

// a function that generates a random number between min and max
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// a calculation function that returns a number after 0 if the number is larger than 360 
// or a number before 0 if the number is smaller than 360
function calcHue(num) {
    return num > 360 ? num - 360 : num;
}

// a function that sets a hsl value
function generateColors(hue, saturation, lightness) {
    return 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
}

function setRandomFontProps() {
    const baseHue = random(0, 360);
    const complimentaryHue = calcHue(baseHue + 180);
    const splitComplimentaryHue1 = calcHue(complimentaryHue + 30);
    const splitComplimentaryHue2 = calcHue(complimentaryHue - 30);
    const analogousHue1 = calcHue(baseHue + 30);
    const analogousHue2 = calcHue(baseHue + 60);
    const analogousHue3 = calcHue(baseHue + 90);
    const analogousHue4 = calcHue(baseHue + 120);
    const triadicHue1 = calcHue(baseHue + 120);
    const triadicHue2 = calcHue(baseHue + 240);
    const tetradHue1 = calcHue(baseHue + 90);
    const tetradHue2 = calcHue(baseHue + 180);
    const tetradHue3 = calcHue(baseHue + 270);

    // create an array of complimentary hue values
    const complimentaryHues = [baseHue, complimentaryHue];
    complimentaryHues.name = "Complimentary";
    // create an array of complimentary hue values
    const splitComplimentaryHues1 = [baseHue, splitComplimentaryHue1];
    splitComplimentaryHues1.name = "SplitComplimentary1";
    // create an array of complimentary hue values
    const splitComplimentaryHues2 = [baseHue, splitComplimentaryHue2];
    splitComplimentaryHues2.name = "SplitComplimentary2";
    // create an array of analogous hue values and base hue
    const analogousHues = [baseHue, analogousHue1, analogousHue2, analogousHue3, analogousHue4];
    analogousHues.name = "Analogous";
    // create an array of triadic hue values and base hue
    const triadicHues = [baseHue, triadicHue1, triadicHue2];
    triadicHues.name = "Triadic";
    // create an array of tetradhedral hue values and base hue
    const tetradHues = [baseHue, tetradHue1, tetradHue2, tetradHue3];
    tetradHues.name = "Tetrad";
    // create an array of base hue
    const baseHues = [baseHue, baseHue];
    baseHues.name = "Monochrome";

    // create an array of all hue arrays
    const hueArrays = [complimentaryHues, splitComplimentaryHues1, splitComplimentaryHues2, analogousHues, triadicHues, tetradHues, baseHues];

    // shuffle the hue arrays and the hue array inside each hue array
    hueArrays.sort(() => Math.random() - 0.5);
    hueArrays.forEach(function (hueArray) {
        hueArray.sort(() => Math.random() - 0.5);
    });

    // get 2 hue valus from the same shuffled hue array
    const hue1 = hueArrays[0][0];
    const hue2 = hueArrays[0][1];

    // console.log(hueArrays[0]);
    // console.log(baseHue, hue1, hue2);

    let colorLight = "";
    let colorDark = "";
    let colorBright = "";

    if (colorjs) {
        console.log('colorjs is true');

        colorLight = new Color("lch", [80, 30, hue1]).to("hsl").toString();

        colorDark = new Color("lch", [50, 50, hue2]).to("hsl").toString();

        colorBright = new Color("lch", [70, 200, baseHue]).to("hsl").toString();

    } else if (randomcolorjs) {

        colorLight = randomColor({
            luminosity: 'light',
            hue: hue1
        });

        colorDark = randomColor({
            luminosity: 'dark',
            hue: hue2
        });

        colorBright = randomColor({
            luminosity: 'bright',
            hue: baseHue
        });

    } else if (customrandomcolor) {
        colorLight = generateColors(hue1, random(70, 90), random(70, 90));
        colorDark = generateColors(hue2, random(40, 60), random(30, 40));
        colorBright = generateColors(baseHue, random(60, 100), random(35, 70));
    }

    // console.log(colorLight, colorDark, colorBright);

    // create an array of color objects
    const colors = [colorLight, colorDark];

    // shuffle the colors array if shufflefrontandback is true
    if (shufflefrontandback) {
        colors.sort(() => Math.random() - 0.5);
    }

    if (frontandback) {
        // set the body background color to the first color in the array
        document.body.style.backgroundColor = colors[0];
        // set the body color to the second color in the array
        document.body.style.color = colors[1];
    } else {
        document.body.style.color = colorBright;
    }

    for (var i = 0; i < chars.length; i++) {
        chars[i].style.setProperty('font-variation-settings', '"wght" ' + random(100, 950) + ', "wdth" ' + random(1, 1));
        // if its a letter O, set different font-variation-settings
        if (chars[i].classList.contains('char--o')) {
            chars[i].style.setProperty('font-variation-settings', '"wght" ' + random(100, 950) + ', "wdth" ' + random(1, 1));
        }

    }
}

// setRandomFontProps();

// create a function that rotates an element every time the function is called
function rotateElement(element) {
    // get the current rotation value of the button
    let currentRotation = element.style.transform;
    // rotate the button 360 degrees plus the current rotation
    element.style.transform = 'rotate(' + (parseInt(currentRotation.split('(')[1].split('deg')[0]) + 360) + 'deg)';
}

// fetch colors and setrandom font weight when the r key is pressed
document.onkeypress = function (e) {
    if (e.keyCode == 114) {
        setRandomFontProps();
        rotateElement(reloadSvg);
    }
}

// fetch colors and setrandom font weight when the reload button is pressed with an event listener
reloadButton.addEventListener('click', function () {
    setRandomFontProps();
    rotateElement(reloadSvg);
});

// select the radio buttons inside choiceElement 
//const radioButtons = choiceElement.getElementsByTagName('input');

// set the text-transform property to the value of the selected radio button
// choiceElement.onchange = function () {
//     for (var i = 0; i < radioButtons.length; i++) {
//         if (radioButtons[i].checked) {
//             nameElement.style.textTransform = radioButtons[i].value;
//         }
//     }
// }

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        document.getElementsByTagName('html')[0].classList.remove('not-loaded');
    }
}




