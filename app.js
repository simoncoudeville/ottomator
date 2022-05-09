const nameElement = document.getElementById('name');
const mainElement = document.getElementById('main');
const reloadButton = document.getElementById('reload');
const reloadSvg = document.getElementsByClassName('js-reload-svg')[0];
const chars = nameElement.getElementsByClassName('js-char');

// an array of colors
// const backgroundColors = ['#9fbfdf', '#f2c8c0', '#f5ca3d', '#dce87d', '#a2a0cf'];
// const backgroundColors = ['#e2f13c', '#f8c511', '#fbc0b4', '#c9dfe5', '#fddfa4'];
// const backgroundColors = ['#F7D694', '#D8E673', '#91C2F2', '#A4A1E6', '#F2C0B6'];
// const backgroundColors = ['#ffe7b3', '#d3e4e9', '#fcd3c8'];
const backgroundColors = ['#fbcabf', '#a6cdde', '#f7ca0b', '#cee1e7', '#f3dac4', '#e8e2d6', '#fba804', '#208ab4', '#9caacd', '#c7af45', '#98a76c'];
// const backgroundColors = ['#0d47a7', '#1e90bf', '#81c226', '#fc960a', '#f5be0d', '#f30076', '#a3ba41', '#f00011'];
// const backgroundColors = ['#1289e4', '#cf0069', '#e1740a', '#63a717'];

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
// or a number before 360 if the number is smaller than 0
function calcHue(num) {
    if (num > 360) {
        return num - 360;
    } else if (num < 0) {
        return num + 360;
    } else {
        return num;
    }
}

function calcHSL(hue) {
    // return `hsl(${hue}, ${random(50, 70)}%, ${random(40, 60)}%)`;
    // return `hsl(${hue}, ${random(50, 70)}%, ${random(20, 40)}%)`;
    // return `hsl(${hue}, ${random(60, 80)}%, ${random(50, 80)}%)`;
    // return `hsl(${hue}, ${random(80, 100)}%, ${random(50, 80)}%)`;
    // return `hsl(${hue}, ${random(70, 90)}%, ${random(70, 80)}%)`;
    // return `hsl(${hue}, ${random(80, 100)}%, ${random(60, 80)}%)`;
    // return `hsl(${hue}, ${random(100, 100)}%, ${random(30, 30)}%)`;
    // return `hsl(${hue}, ${random(100, 100)}%, ${random(40, 40)}%)`;
    return `hsl(${hue}, ${random(100, 100)}%, ${random(40, 60)}%)`;
}

function getHue(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h > 360) {
        return h - 360;
    } else if (h < 0) {
        return h + 360;
    } else {
        return h;
    }

}

const setRandomColors2 = function () {
    // get a random color from the array
    const baseColor = backgroundColors[random(0, backgroundColors.length - 1)];
    // const baseColor = backgroundColors[0];
    // get the hue of the base color
    const baseHue = getHue(baseColor);
    const complimentaryHue = calcHue(baseHue + 180);
    const splitComplimentaryHue1 = calcHue(complimentaryHue + 30);
    const splitComplimentaryHue2 = calcHue(complimentaryHue - 30);
    const analogousHue1 = calcHue(baseHue + 30);
    const analogousHue2 = calcHue(baseHue - 30);
    const triadicHue1 = calcHue(baseHue + 120);
    const triadicHue2 = calcHue(baseHue + 240);
    const tetradHue1 = calcHue(baseHue + 90);
    const tetradHue3 = calcHue(baseHue + 270);

    // create an array of all the hue values
    const fittingHues = [baseHue, complimentaryHue, splitComplimentaryHue1, splitComplimentaryHue2, analogousHue1, analogousHue2, triadicHue1, triadicHue2, tetradHue1, tetradHue3];

    // get a rondom hue
    const fittingHue = fittingHues[random(0, fittingHues.length - 1)];
    // let fittingHue = fittingHues[9];

    // set a variable randomly to 'bright' or 'dark' or 'light'
    // const brightness = ['bright', 'dark'][random(0, 1)];
    const brightness = ['bright', 'dark'][random(0, 1)];

    const colorBack = baseColor;
    // let colorFront = calcHSL(fittingHue);

    const colorFront = randomColor({
        luminosity: brightness,
        hue: fittingHue
    });

    console.log(baseHue, fittingHue);

    // create an array of color objects
    const colors = [colorBack, colorFront];

    // randomly replace colorDark with black
    // if (random(0, 10) === 10) {
    //     colors[1] = 'black';
    // }

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

    // save the colors to local storage
    localStorage.setItem('backgroundColor', colors[0]);
    localStorage.setItem('textColor', colors[1]);
}

function setRandomFontProps() {
    for (var i = 0; i < chars.length; i++) {
        chars[i].style.setProperty('font-variation-settings', '"wght" ' + random(100, 950) + ', "wdth" ' + random(1, 1));
        // save every char font variation settings to a separate local storage variable        
        localStorage.setItem('font-variation-settings-' + i, chars[i].style.fontVariationSettings);
    }

}

// create a function that rotates an element every time the function is called
function rotateElement(element) {
    // get the current rotation value of the button
    let currentRotation = element.style.transform;
    // rotate the button 360 degrees plus the current rotation
    element.style.transform = 'rotate(' + (parseInt(currentRotation.split('(')[1].split('deg')[0]) + 360) + 'deg)';
}

// fetch colors and setrandom stuff when the r key is pressed only when aboutIsOpen is false
document.onkeypress = function (e) {
    if (e.keyCode == 114 && !aboutIsOpen) {
        setRandomFontProps();
        setRandomColors2();
        rotateElement(reloadSvg);
    }
}

// fetch colors and setrandom stuff when the reload button is pressed with an event listener when aboutIsOpen is false
reloadButton.addEventListener('click', function () {
    if (!aboutIsOpen) {
        setRandomFontProps();
        setRandomColors2();
        rotateElement(reloadSvg);
    }
});

document.addEventListener('DOMContentLoaded', function () {

    // if local storage doesnt have a value for backgroundColor or textColor, set random colors
    if (!localStorage.getItem('backgroundColor') || !localStorage.getItem('textColor')) {
        setRandomColors2();
    } else {
        // set the body background color to colorLight from local storage
        document.body.style.backgroundColor = localStorage.getItem('backgroundColor');
        // set the css variable for the background color
        document.documentElement.style.setProperty('--global-backgroundColor', localStorage.getItem('backgroundColor'));
        // set the body color to colorDark from local storage
        document.body.style.color = localStorage.getItem('textColor');
        // set the css variable for the text color
        document.documentElement.style.setProperty('--global-textColor', localStorage.getItem('textColor'));
    }

});

// remove the loading class from the html tag and add a minumum loading time of 1 second
document.onreadystatechange = function () {
    if (document.readyState == "complete") {

        // if local storage doesnt have an item with a key that starts with font-variation-settings, set random font props
        if (!localStorage.getItem('font-variation-settings-0')) {
            setRandomFontProps();
        } else {
            // loop through all chars and set their font variation settings to the font variation settings from local storage
            for (var i = 0; i < chars.length; i++) {
                chars[i].style.setProperty('font-variation-settings', localStorage.getItem('font-variation-settings-' + i));
            }
        }

        setTimeout(function () {
            document.querySelector('html').classList.remove('loading');
        }, 1000);
    }
}




