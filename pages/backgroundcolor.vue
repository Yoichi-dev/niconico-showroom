<template>
  <v-main v-bind:style="styles">
    <v-container>
      <v-row justify="center" align="center" cols="12">
        <v-color-picker
          class="ma-2"
          show-swatches
          v-model="color"
          mode="hexa"
          :swatches-max-height="coloerHeight"
        ></v-color-picker>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      type: 'hex',
      hex: '#DCFFDC',
      hexa: '#DCFFDC',
      styles: {
        backgroundColor: '',
      },
      coloerHeight: '',
    }
  },
  head() {
    return {
      title: '背景色設定',
    }
  },
  mounted() {
    this.coloerHeight = document.documentElement.clientHeight * 0.4 + 'px'
    if (this.$store.state.backgroundcolor != null) {
      this.hex = this.$store.state.backgroundcolor
      this.hexa = this.$store.state.backgroundcolor
      this.styles.backgroundColor = this.$store.state.backgroundcolor
    } else {
      this.$store.commit('setBackgroundColor', this.hex)
    }
  },
  computed: {
    color: {
      get() {
        this.styles.backgroundColor = this[this.type]
        return this[this.type]
      },
      set(v) {
        this[this.type] = v
        this.$store.commit('setBackgroundColor', v)
      },
    },
  },
  methods: {},
}
</script>
