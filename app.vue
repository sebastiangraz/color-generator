<template>
  <div id="app">
    <div class="row">
        <h1 class="fw8 mt5">{{ msg }}</h1>
        <div class="flex justify-between mt5">
          <label for="">{{ label }}</label>
          <a class="link pointer" @click="runRandomHex">🔮 Random</a>
        </div>

        <div class="relative mt3">
          <span class="absolute top-1 left-1 black-50">#</span>
          <input class="w-100 pv3 pl4 input-reset ba b--black-20" v-model="colorValue" placeholder="0AD674" >
        </div>

        <ul class="list">

          <button @click="show = !show">Toggle show</button>
          <li class="pa3 w-100"
          v-for="color in colors"
          :class="{ white: color.colorBrightness < 0.05 }"
          :style=" { backgroundColor: color.colorHex  }">
          <div class="flex justify-between">
              <span>{{ color.colorName }}</span>
              <span>{{ color.colorHex }}</span>
          </div>
          <transition name="bounce">
            <p v-if="show">
<pre class="dib w-100 ma0 pa0 overflow-x-auto ">
.{{ color.colorName }} {
    color: {{ color.colorHex }};
}
.bg-{{ color.colorName }} {
    background-color: {{ color.colorHex }};
}
.b--{{ color.colorName }} {
    border-color: {{ color.colorHex }};
}
.{{ color.colorName }}:hover,
.{{ color.colorName }}:focus { color: {{ color.colorHex }}; }

.hover-bg-{{ color.colorName }}:hover,
.hover-bg-{{ color.colorName }}:focus { background-color: {{ color.colorHex }}; }
</pre>
            </p>
          </transition>
          </li>
        </ul>


<h1 class="fw8 mt5">Grab the CSS code!</h1>
<div v-for="color in colors">

</div>

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
      show: false,
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
