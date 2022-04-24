const url = "http://colormind.io/api/";
const data = {
    model: "default"
}

const http = new XMLHttpRequest();

http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
        const palette = JSON.parse(http.responseText).result;
        // make palette available to the setRandomFontProps function
        setRandomFontProps(palette);
    }
}

http.open("POST", url, true);
http.send(JSON.stringify(data));

const nameElement = document.getElementById('name');
const reloadButton = document.getElementById('reload');
// get the element with the class app__reload-svg
const reloadSvg = document.getElementsByClassName('app__reload-svg')[0];
const choiceElement = document.getElementById('textTransformChoice');
const chars = nameElement.getElementsByClassName('char');

reloadSvg.style.transform = 'rotate(0deg)';

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setRandomFontProps(palette) {
    // set the page background color to the first color in the palette
    const rgb = palette[0];
    document.body.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

    for (var i = 0; i < chars.length; i++) {
        // chars[i].style.setProperty('font-variation-settings', '"wght" ' + random(10, 950) + ', "wdth" ' + random(1, 200) + ', "ital" ' + random(1, 12));
        chars[i].style.setProperty('font-variation-settings', '"wght" ' + random(10, 950) + ', "wdth" ' + random(1, 200));
        // set the css color property to color from the colorpalette exept the first color        
        chars[i].style.setProperty('color', `rgb(${palette[i + 1][0]}, ${palette[i + 1][1]}, ${palette[i + 1][2]})`);
    }
}

// create a function that reruns the http request
function rerunHttpRequest() {
    http.open("POST", url, true);
    http.send(JSON.stringify(data));
}

// create a function that rotates an element every time the function is called
function rotateElement(element) {
    // get the current rotation value of the button
    let currentRotation = element.style.transform;
    // rotate the button 360 degrees plus the current rotation
    element.style.transform = 'rotate(' + (parseInt(currentRotation.split('(')[1].split('deg')[0]) + 360) + 'deg)';
}

// fetch colors  and setrandom font weight when the r key is pressed
document.onkeypress = function (e) {
    if (e.keyCode == 114) {
        rerunHttpRequest();
        rotateElement(reloadSvg);
    }
}

// fetch colors  and setrandom font weight when the reload button is pressed
reloadButton.onclick = function () {
    rerunHttpRequest();
    rotateElement(reloadButton);
}

// select the radio buttons inside choiceElement 
const radioButtons = choiceElement.getElementsByTagName('input');

// set the text-transform property to the value of the selected radio button
choiceElement.onchange = function () {
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            nameElement.style.textTransform = radioButtons[i].value;
        }
    }
}





