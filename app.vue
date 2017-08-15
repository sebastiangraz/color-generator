<template>
  <div id="app">
    <div class="row">
        <h1 class="fw8 mt5">{{ msg }}</h1>
        <div class="flex justify-between mt5">
          <label for="">{{ label }}</label>
          <a class="link" href="#" v-on:click="runRandomHex">🔮 Random</a>
        </div>

        <div class="relative mt3">
          <span class="absolute top-1 left-1 black-50">#</span>
          <input class="w-100 pv3 pl4 input-reset ba b--black-20" v-on:keyup="getColor(colorValue)" v-model="colorValue" placeholder="0AD674" >
        </div>

        <div id="colorbox_darker" class="pa3 white w-100"></div>
        <div id="colorbox_dark" class="pa3 white w-100"></div>
        <div id="colorbox_default" class="pa3 white w-100"></div>
        <div id="colorbox_light" class="pa3 white w-100"></div>
        <div id="colorbox_lighter" class="pa3 white w-100"></div>
    </div>
  </div>
</template>

<script>
import tinycolor from 'tinycolor2'
import chroma from 'chroma-js'
import namer from 'color-namer'
import { kebabCase } from 'lodash'






// Todo PRINT THE HEX ON EACH OF THE COLORS



export default {
  name: 'app',
  data () {
    return {
      msg: 'Color generator',
      label: 'Enter your color',
      colorValue: this.generateRandomHex()
    }
  },
  mounted:function(){
      this.getColor(this.colorValue)
  },
  methods: {
    runRandomHex: function (event) {
      this.getColor(this.generateRandomHex());
    },
    generateRandomHex: function (event) {
      return Math.random().toString(16).slice(2, 8).toUpperCase();
    },
    getColor: function (color, event) {

      var color_darker = chroma(color).darken(3);
      var color_dark = chroma(color).darken(1);
      var color_default = chroma(color);
      var color_light = chroma(color).brighten(1);
      var color_lighter = chroma(color).brighten(3);

      var colorBoxes = {
        colorbox_darker : document.querySelector("#colorbox_darker"),
        colorbox_dark : document.querySelector("#colorbox_dark"),
        colorbox_default : document.querySelector("#colorbox_default"),
        colorbox_light : document.querySelector("#colorbox_default"),
        colorbox_lighter : document.querySelector("#colorbox_lighter")
      }

      // for (let [key, value] of Object.entries(colorBoxes)) {
      //   Object.assign(colorbox_darker.style,{backgroundColor: value});
      // }



      colorbox_darker.style.backgroundColor = color_darker
      colorbox_dark.style.backgroundColor = color_dark
      colorbox_default.style.backgroundColor = color_default
      colorbox_light.style.backgroundColor = color_light
      colorbox_lighter.style.backgroundColor = color_lighter

      colorbox_light.style.color = chroma(color_lighter).darken(3)
      colorbox_lighter.style.color = chroma(color_lighter).darken(3)

      colorbox_darker.innerHTML = _.kebabCase(namer(color_darker).ntc[0].name);
      colorbox_dark.innerHTML = _.kebabCase(namer(color_dark).ntc[0].name);
      colorbox_default.innerHTML = _.kebabCase(namer(color_default).ntc[0].name);
      colorbox_light.innerHTML = _.kebabCase(namer(color_light).ntc[0].name);
      colorbox_lighter.innerHTML = _.kebabCase(namer(color_lighter).ntc[0].name);

    }
  }
}
</script>
