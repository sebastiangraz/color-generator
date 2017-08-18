<template>
  <div id="app">
    <div class="absolute z-0 w-100 o-30">
      <div class="flex flex-wrap justify-center">
        <span v-for="color in colors" class="nl4 nr4 blur br-pill w5 dib h5" :style=" { backgroundColor: color.colorHex }"></span>
      </div>
    </div>
    <div class="row">
      <div class="relative z-1">
        <h1 class="fw8 mt5"> Spindrift Brand Color generator </h1>
      </div>

      <div class="flex-ns justify-between-ns mt5 z-1 relative">
        <div class="">
          <a class="link pointer mr4 hover-black" @click="runRandomHex">🔮 Random</a>
          <a class="link pointer hover-black" @click="show = !show">🎼 <span v-if="show">Hide</span> <span v-else="show">Show</span> CSS</a>
        </div>
      </div>

      <div class="relative mt3 z-1">
        <span class="absolute top-1 left-1 black-50">#</span>
        <input class="gray hover-black w-100 pv3 pl4 input-reset bn" v-model="colorValue" placeholder="Enter colorname or HEX" >
      </div>

      <ul class="list relative z-1 mb5">


          <li class="pa3 w-100"
          v-for="color in colors"
          :class="{ white: color.colorBrightness < 0.07 }"
          :style=" { backgroundColor: color.colorHex  }">
          <div v-if="!show" class="flex justify-between">
              <input :class="{ white: color.colorBrightness < 0.07 }" class="hover-bg-white hover-black pointer bg-transparent di bt-0 br-0 bl-0 bb pa2" v-model="color.colorName"/>
              <span class="pa2">{{ color.colorHex}}</span>
          </div>
          <transition name="bounce">
            <div v-if="show">
<pre class="dib w-100 ma0 pa0 overflow-x-auto ">
.{{ color.colorName | kebabify }} {
    color: {{ color.colorHex }};
}
.bg-{{ color.colorName | kebabify }} {
    background-color: {{ color.colorHex }};
}
.b--{{ color.colorName | kebabify }} {
    border-color: {{ color.colorHex }};
}
.{{ color.colorName | kebabify }}:hover,
.{{ color.colorName | kebabify }}:focus { color: {{ color.colorHex }}; }

.hover-bg-{{ color.colorName | kebabify }}:hover,
.hover-bg-{{ color.colorName | kebabify }}:focus { background-color: {{ color.colorHex }}; }
</pre>
            </div>
          </transition>
          </li>
        </ul>
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
      colorValue: '6C63E5',
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
  },
  filters: {
    kebabify: function(value) {
      return _.kebabCase(value);
    }
  },
  methods: {
    randomList: function(rand){
      return rand.sort(function(){return 0.5 - Math.random()});
    },
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
