<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          コメント読み上げ
          <v-checkbox
            v-model="checkbox"
            :label="`読み上げ${checkbox ? 'する' : 'しない'}`"
            @change="update"
          ></v-checkbox>
        </v-col>
        <v-col cols="12">
          <v-card flat color="transparent">
            <v-card-title>声の高さ</v-card-title>
            <v-card-text>
              （無料版は設定できません）
              <v-slider
                v-model="pitch"
                step="10"
                ticks="always"
                tick-size="4"
                disabled
              ></v-slider>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card flat color="transparent">
            <v-card-title>声のスピード</v-card-title>
            <v-card-text>
              （無料版は設定できません）
              <v-slider
                v-model="speed"
                step="10"
                ticks="always"
                tick-size="4"
                disabled
              ></v-slider>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-btn class="ma-2" outlined color="indigo" @click="speack()">
            読み上げテスト
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      checkbox: false,
      pitch: 30,
      speed: 50,
    }
  },
  head() {
    return {
      title: '読み上げ設定',
    }
  },
  mounted() {
    console.log(this.$store.state.voice)
    if (this.$store.state.voice != null) {
      this.checkbox = this.$store.state.voice
    }
  },
  methods: {
    update() {
      console.log('call')
      this.$store.commit('setVoice', this.checkbox)
    },
    speack() {
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance('これは読み上げテストです')
      )
    },
  },
}
</script>

<style scoped>
.font {
  font-family: '';
  font-weight: bold;
  -webkit-text-stroke: 1px #000;
}

.bg-color {
  background-color: #f1f8e9;
}
</style>