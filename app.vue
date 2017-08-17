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
          <input class="w-100 pv3 pl4 input-reset ba b--black-20" v-model="colorValue" placeholder="0AD674" >
        </div>

        <!-- <div id="colorbox_darker" class="pa3 white w-100"></div>
        <div id="colorbox_dark" class="pa3 white w-100"></div>
        <div id="colorbox_default" class="pa3 white w-100"></div>
        <div id="colorbox_light" class="pa3 white w-100"></div>
        <div id="colorbox_lighter" class="pa3 white w-100"></div> -->

        <ul class="list">
<li class="pa3 w-100"
v-for="color in colors"
:class="{ white: color.colorBrightness < 0.05 }"
:style=" { backgroundColor: color.colorHex  }">

  <div class="flex justify-between">
      <span>{{ color.colorName}}</span>
      <span>{{ color.colorHex }}</span>
  </div>
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
import namer from 'color-namer'
import { kebabCase } from 'lodash'
import chroma from 'chroma-js'



// Todo PRINT THE HEX ON EACH OF THE COLORS


export default {
  name: 'app',
  data () {
    return {
      msg: 'Spindrift Brand Color generator',
      colorValue: '4e35e1',
      label: 'Enter your color',
      items: [
            {
              intensity: 3,
              colorProperty: 'darken'
            },
            {
              intensity: 1,
              colorProperty: 'darken'
            },
            {
              intensity: 0,
              colorProperty: 'brighten'
            },
            {
              intensity: 1,
              colorProperty: 'brighten'
            },
            {
              intensity: 3,
              colorProperty: 'brighten'
            }
          ],
    }
  },
  mounted:function(){
      this.getColorName
  },
  computed: {
    colors() {
      return this.items.map((item) => {
        var colorHex = chroma(this.colorValue)[item.colorProperty](item.intensity).toString(),
            colorName = _.kebabCase(namer(colorHex).ntc[0].name),
            colorBrightness = chroma(colorHex).luminance().toString();
        return {colorHex, colorName, colorBrightness}
      });
    }
    // colors() {
    //   return this.items.map((item) => {
    //     console.log(item)
    //     if (item.colorProperty !== '') {
    //       return chroma(this.colorValue)[item.colorProperty](item.intensity).toString();
    //
    //     } else {
    //       return `#${this.colorValue}`;
    //     }
    //   });
    // }
  },
  methods: {

    runRandomHex: function () {
      this.colorValue = this.generateRandomHex();
    },
    generateRandomHex: function (color) {
      var length = 6;
      var chars = '0123456789ABCDEF';
      var hex = '';
      while(length--) hex += chars[(Math.random() * 16) | 0];
      return hex;
    }
  }
}
</script>
