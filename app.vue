<template>
  <div id="app">
    <div class="row">
        <h1 class="fw8 mt5">{{ msg }}</h1>
        <div class="flex justify-between mt5">
          <label for="">{{ label }}</label>
          <a class="link" href="#" @click="runRandomHex">🔮 Random</a>
        </div>

        <div class="relative mt3">
          <span class="absolute top-1 left-1 black-50">#</span>
          <input class="w-100 pv3 pl4 input-reset ba b--black-20" @keyup="getColor(colorValue)" v-model="colorValue" placeholder="0AD674" >
        </div>

        <!-- <div id="colorbox_darker" class="pa3 white w-100"></div>
        <div id="colorbox_dark" class="pa3 white w-100"></div>
        <div id="colorbox_default" class="pa3 white w-100"></div>
        <div id="colorbox_light" class="pa3 white w-100"></div>
        <div id="colorbox_lighter" class="pa3 white w-100"></div> -->

        <ul class="list">
          <li :id="item.id" v-for="item in items" :style="" class="pa3 w-100">

          </li>
        </ul>

        <code class="dib w-100 bg-black-10 ma0 pa3">
.color {
    color: #{{ colorValue }};
}
        </code>

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
      colorValue: '4e35e1',
      items: [
            {
              intensity: 3,
              colorProperty: 'darken',
              id: 'colorbox_darker'
            },
            {
              intensity: 1,
              colorProperty: 'darken',
              id: 'colorbox_dark'
            },
            {
              intensity: 0,
              colorProperty: '',
              id: 'colorbox_default'
            },
            {
              intensity: 1,
              colorProperty: 'brighten',
              id: 'colorbox_light'
            },
            {
              intensity: 3,
              colorProperty: 'brighten',
              id: 'colorbox_lighter'
            }
          ],
    }
  },
  mounted:function(){
      this.getColor(this.colorValue)
  },
  methods: {
    runRandomHex: function () {
      this.colorValue = this.generateRandomHex();
      this.getColor(this.colorValue)
    },
    generateRandomHex: function () {
      var length = 6;
      var chars = '0123456789ABCDEF';
      var hex = '';
      while(length--) hex += chars[(Math.random() * 16) | 0];
      return hex;
    },
    getColor: function (color) {
      var color_darker = chroma(color).darken(3);
      var color_dark = chroma(color).darken(1);
      var color_default = chroma(color);
      var color_light = chroma(color).brighten(1);
      var color_lighter = chroma(color).brighten(3);

      // for (let [key, value] of Object.entries(colorBoxes)) {
      //   Object.assign(colorbox_darker.style,{backgroundColor: value});
      // }

      colorbox_darker.style.backgroundColor = color_darker
      colorbox_dark.style.backgroundColor = color_dark
      colorbox_default.style.backgroundColor = color_default
      colorbox_light.style.backgroundColor = color_light
      colorbox_lighter.style.backgroundColor = color_lighter

      colorbox_darker.style.color = chroma(color_lighter).brighten(1)
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
