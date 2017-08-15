import hexToHsl from 'hex-to-hsl'
import tinycolor from 'tinycolor2'

export function generateRandomHex() {
  return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
}



const toolsState = {
  colour: {
    value: '#4e4bec',
    name: 'neon-blue',
  }
};

var colorObject = {
  color1: '#cc0000', //red
  color2: '#1F00FF', //blue
  color3: '#72C63B', //green
  color4: '#C6A43B', //yellow
  color5: generateRandomHex(),
  color6: generateRandomHex(),
  color7: generateRandomHex(),
  color8: generateRandomHex(),
  color9: generateRandomHex(),
  color10: generateRandomHex(),
}

Object.keys(colorObject).forEach(key => {
    document.write('<li class="color" style="background-color: ' + colorObject[key] + ' ">' + generateColorName(colorObject[key]) + '</li>');
});

// for (
//   i = 0;
//   i < Object.keys(colorObject).length;
//   i++)
// {
//   var colorName = generateColorName('#ad0ede');
//   document.write('<li class="color" style="background-color: ' + colorName + ' ">' + colorName + '</li>');
// }
// function generateRandomHex() {
//   return '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
// }

function getHueFromColor(color) {
  var hue = hexToHsl(color)[0];
  return hue;
}

function generateColorName(color) {
  if ( getHueFromColor(color) < 11 ) {
    return 'red'
  }
  else if ( getHueFromColor(color) < 34 ) {
    return 'orange'
  }
  else if ( getHueFromColor(color) < 63 ) {
    return 'yellow'
  }
  else if ( getHueFromColor(color) < 80 ) {
    return 'green'
  }
  else if ( getHueFromColor(color) < 147 ) {
    return 'cyan'
  }
  else if ( getHueFromColor(color) < 175 ) {
    return 'teal'
  }
  else if ( getHueFromColor(color) < 200 ) {
    return 'blue'
  }
  else if ( getHueFromColor(color) < 241 ) {
    return 'blue'
  }
  else if ( getHueFromColor(color) < 279 ) {
    return 'purple'
  }
  else if ( getHueFromColor(color) < 344 ) {
    return 'pink'
  }
  else if ( getHueFromColor(color) < 360 ) {
    return 'red'
  }
}
