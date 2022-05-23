import randomColor from 'randomcolor';
import chroma from "chroma-js";

const nameElement = document.getElementById('name');
const reloadButton = document.getElementById('reload');
const reloadSvg = document.getElementsByClassName('js-reload-svg')[0];
const chars = nameElement.getElementsByClassName('js-char');

let aboutIsOpen = false;

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
const setRandomColors = function () {
    const baseHue = random(0, 360);
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
    // const fittingHue = fittingHues[9];

    // const colorBack = randomColor({
    //     luminosity: 'light',
    //     hue: baseHue
    // });

    const colorFront = randomColor({
        luminosity: 'dark',
        hue: fittingHue
    });

    const colorBack = chroma.hcl(baseHue, 30, 90);
    // const colorFront = chroma.hcl(fittingHue, random(80, 100), random(40, 70));

    // create an array of color objects
    const colors = [colorBack, colorFront];

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

    const maxTotalWght = 2400;

    let wght1 = random(200, 400);
    let wght2 = random(400, 600);
    let wght3 = random(600, 800);
    let totalWght = wght1 + wght2 + wght3;
    let wght4 = maxTotalWght - totalWght;
    if (wght4 > 800) {
        wght4 = 800;
    }

    let wghts = [wght1, wght2, wght3, wght4];
    // shuffle the array
    wghts.sort(() => Math.random() - 0.5);

    for (var i = 0; i < chars.length; i++) {
        // chars[i].style.setProperty('font-variation-settings', '"wght" ' + random(400, 800) + ', "wdth" ' + 1);
        chars[i].style.setProperty('font-variation-settings', '"wght" ' + wghts[i] + ', "wdth" ' + 1);
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
        setRandomColors();
        rotateElement(reloadSvg);
    }
}

// fetch colors and setrandom stuff when the reload button is pressed with an event listener when aboutIsOpen is false
reloadButton.addEventListener('click', function () {
    if (!aboutIsOpen) {
        setRandomFontProps();
        setRandomColors();
        rotateElement(reloadSvg);
    }
});

document.addEventListener('DOMContentLoaded', function () {

    // if local storage doesnt have a value for backgroundColor or textColor, set random colors
    if (!localStorage.getItem('backgroundColor') || !localStorage.getItem('textColor')) {
        setRandomColors();
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

// toggle about when #about is in the url
if (window.location.hash === '#about') {
    document.querySelector("body").classList.toggle("open-about");
    aboutIsOpen = true;
}

// toggle about when the back and forward buttons are pressed
window.onpopstate = function (event) {
    if (window.location.hash === '#about') {
        document.querySelector("body").classList.add("open-about");
        aboutIsOpen = true;
    } else {
        document.querySelector("body").classList.remove("open-about");
        aboutIsOpen = false;
    }
}




