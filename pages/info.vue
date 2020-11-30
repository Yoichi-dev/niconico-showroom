<template>
  <v-main>
    <v-container>
      <v-row justify="center" align="center" class="text-h3 mb-5">Info</v-row>
      <v-row justify="center" cols="10" class="mb-5">
        SHOWROOM配信中流れるコメントをニコニコ動画のコメント風に流す事ができるWebアプリになります<br />
        今の所、無料で公開していますが、詳細に設定ができる有料版も出そうかと思ってます（サーバー維持も無料ではないので）<br />
      </v-row>
      <v-row justify="center" cols="10">
        バグ、不具合、要望などありましたらTwitterにてご連絡ください
      </v-row>
      <v-row justify="center" cols="10" class="mb-5">
        <v-btn
          class="ma-2"
          href="https://twitter.com/yoichiro_sub"
          target="_blank"
          rel="noopener"
          large
          outlined
        >
          <v-icon>mdi-twitter</v-icon>
          <span class="text--darken-1">Twitter</span>
        </v-btn>
        <v-btn
          class="ma-2"
          href="https://yoichi.dev/"
          target="_blank"
          rel="noopener"
          large
          outlined
        >
          <v-icon>mdi-web</v-icon>
          <span class="text--darken-1">HP</span>
        </v-btn>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {}
  },
  head() {
    return {
      title: 'インフォメーション',
    }
  },
}
</script>
