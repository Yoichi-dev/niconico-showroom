<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <p>フォントサイズ</p>
          <v-btn class="ma-2" outlined color="indigo" @click="fontSmall()">
            小さく
          </v-btn>
          <v-btn class="ma-2" outlined color="indigo" @click="fontBig()">
            大きく
          </v-btn>
          <br />
        </v-col>
        <v-col cols="12">
          <p>フォントファミリー</p>
          <small
            >※フォントのダウンロードに時間が掛かる事があるため反映に少し時間が掛かる場合があります</small
          >
          　<v-select
            :items="items"
            label="フォントファミリーを選択"
            item-text="text"
            item-value="id"
            dense
            outlined
            @change="itemChanged"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <p>フォントカラー</p>
          　無料版は白字に黒ふちになります
          <br />
        </v-col>
        <v-col cols="12">
          <p>テロップスピード</p>
          スピード：{{ speed }}　（20推奨）
          <v-slider
            v-model="speed"
            step="5"
            min="5"
            max="50"
            ticks="always"
            tick-size="4"
          ></v-slider>
          <br />
        </v-col>
      </v-row>
      <v-row justify="center" align="center" v-bind:style="styles">
        <span class="font" id="sample">サンプルフォント</span>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { TweenMax } from 'gsap'

export default {
  data() {
    return {
      fontsize: 5,
      speed: 20,
      items: [
        { text: 'デフォルト', id: '' },
        { text: 'メイリオ', id: 'メイリオ' },
        { text: '焚火フォント', id: '焚火フォント' },
        { text: '851テガキカクット', id: 'テガキカクット' },
        { text: 'AP', id: 'AP' },
        { text: 'しねきゃぷしょん', id: 'しねきゃぷしょん' },
        { text: 'CPFont', id: 'CPFont' },
        { text: '昔々ふぉんと', id: '昔々ふぉんと' },
        { text: 'モギハ', id: 'モギハ' },
        { text: 'にゃしぃフォント改二', id: 'にゃしぃフォント改二' },
        { text: 'ピグモ00', id: 'ピグモ00' },
        { text: 'ピグモ01', id: 'ピグモ01' },
        { text: 'ポプらむ☆キュート', id: 'ポプらむ☆キュート' },
        { text: 'serif', id: 'serif' },
        { text: 'HG行書体', id: 'HG行書体' },
        { text: 'ＭＳ ゴシック', id: 'ＭＳ ゴシック' },
        { text: 'HG正楷書体-PRO', id: 'HG正楷書体-PRO' },
        { text: '游ゴシック', id: '游ゴシック' },
        { text: '游明朝', id: '游明朝' },
      ],
      styles: {
        color: 'white',
        fontSize: '5em',
        backgroundColor: '#DCFFDC',
        fontFamily: '',
      },
    }
  },
  head() {
    return {
      title: 'フォント設定',
    }
  },
  watch: {
    speed: function (newValue) {
      this.$store.commit('setTelop', newValue)
    },
  },
  mounted() {
    if (this.$store.state.fontsize != null) {
      this.fontsize = this.$store.state.fontsize
      this.styles.fontSize = this.$store.state.fontsize + 'em'
    }
    if (this.$store.state.backgroundcolor != null) {
      this.styles.backgroundColor = this.$store.state.backgroundcolor
    }
    if (this.$store.state.telop != null) {
      this.speed = this.$store.state.telop
    }
    if (this.$store.state.fontfamily != null) {
      this.styles.fontFamily = this.$store.state.fontfamily
    }
  },
  methods: {
    fontSmall() {
      if (this.fontsize - 1 != 0) {
        this.fontsize -= 1
        this.styles.fontSize = this.fontsize + 'em'
        this.$store.commit('setFontSize', this.fontsize)
      }
    },
    fontBig() {
      this.fontsize += 1
      this.styles.fontSize = this.fontsize + 'em'
      this.$store.commit('setFontSize', this.fontsize)
    },
    itemChanged(val) {
      console.log(val)
      this.styles.fontFamily = val
      this.$store.commit('setFontFamily', val)
    },
  },
}
</script>

<style scoped>
.font {
  font-weight: bold;
  -webkit-text-stroke: 1px #000;
}
</style>