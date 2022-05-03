const nameElement = document.getElementById('name');
const mainElement = document.getElementById('main');
const reloadButton = document.getElementById('reload');
const reloadSvg = document.getElementsByClassName('js-reload-svg')[0];
const chars = nameElement.getElementsByClassName('js-char');

let aboutIsOpen = false;

let textCase = "uppercase";

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

    colorLight = randomColor({
        luminosity: 'light',
        hue: hue1
    });

    colorDark = randomColor({
        luminosity: 'dark',
        hue: hue2
    });

    // create an array of color objects
    const colors = [colorLight, colorDark];

    // randomly replace colorDark with black
    if (random(0, 10) === 10) {
        colors[1] = 'black';
    }

    // shuffle the colors array if shufflefrontandback is true
    if (shufflefrontandback) {
        colors.sort(() => Math.random() - 0.5);
    }

    // set the body background color to the first color in the array
    document.body.style.backgroundColor = colors[0];
    // set the css variable for the background color
    document.documentElement.style.setProperty('--global-backgroundColor', colors[0]);
    // set the body color to the second color in the array
    document.body.style.color = colors[1];
    // set the css variable for the text color
    document.documentElement.style.setProperty('--global-textColor', colors[1]);

    for (var i = 0; i < chars.length; i++) {
        chars[i].style.setProperty('font-variation-settings', '"wght" ' + random(100, 950) + ', "wdth" ' + random(1, 1));
        // save every char font variation settings to a separate local storage variable        
        localStorage.setItem('font-variation-settings-' + i, chars[i].style.fontVariationSettings);
    }

    // save the colors to local storage
    localStorage.setItem('backgroundColor', colors[0]);
    localStorage.setItem('textColor', colors[1]);
}

// setRandomFontProps();

// create a function that rotates an element every time the function is called
function rotateElement(element) {
    // get the current rotation value of the button
    let currentRotation = element.style.transform;
    // rotate the button 360 degrees plus the current rotation
    element.style.transform = 'rotate(' + (parseInt(currentRotation.split('(')[1].split('deg')[0]) + 360) + 'deg)';
}

// fetch colors and setrandom font weight when the r key is pressed only when aboutIsOpen is false
document.onkeypress = function (e) {
    if (e.keyCode == 114 && !aboutIsOpen) {
        setRandomFontProps();
        rotateElement(reloadSvg);
    }
}

// fetch colors and setrandom font weight when the reload button is pressed with an event listener when aboutIsOpen is false
reloadButton.addEventListener('click', function () {
    if (!aboutIsOpen) {
        setRandomFontProps();
        rotateElement(reloadSvg);
    }
});

// remove the loading class from the html tag and add a minumum loading time of 1 second
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        //setRandomFontProps(localStorage.getItem('colorLight'), localStorage.getItem('colorDark'));
        // set the body background color to colorLight from local storage
        document.body.style.backgroundColor = localStorage.getItem('backgroundColor');
        // set the css variable for the background color
        document.documentElement.style.setProperty('--global-backgroundColor', localStorage.getItem('backgroundColor'));
        // set the body color to colorDark from local storage
        document.body.style.color = localStorage.getItem('textColor');
        // set the css variable for the text color
        document.documentElement.style.setProperty('--global-textColor', localStorage.getItem('textColor'));

        // loop through all chars and set their font variation settings to the font variation settings from local storage
        for (var i = 0; i < chars.length; i++) {
            chars[i].style.setProperty('font-variation-settings', localStorage.getItem('font-variation-settings-' + i));
        }

        // if local storage is empty, setRandomFontProps();
        if (localStorage.length === 0) {
            setRandomFontProps();
        }

        setTimeout(function () {
            document.querySelector('html').classList.remove('loading');
        }, 1000);
    }
}




