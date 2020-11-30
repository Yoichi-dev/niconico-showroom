<template>
  <v-app>
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      :color="bgColor"
      app
      overflow
    >
      <v-container>
        <v-list-item>
          <v-list-item-title class="title">Setting</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
      <template v-slot:append>
        <div class="pa-3">
          <v-btn to="/info" nuxt block :color="bgColor"> info </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      :collapse="!collapseOnScroll"
      :collapse-on-scroll="collapseOnScroll"
      :color="bgColor"
      dense
      flat
      app
    >
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
        aria-label="メニュー"
      ></v-app-bar-nav-icon>
      <v-toolbar-title
        style="cursor: pointer"
        @click="$router.push('/')"
        v-text="title"
      />
    </v-app-bar>

    <nuxt />

    <v-footer :inset="footer.inset" :color="bgColor" app>
      <span class="px-4"
        >&copy; {{ new Date().getFullYear() + ' ' + title }}</span
      >
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text small @click="commentLog">コメントログ</v-btn>
        <v-btn text small @click="freeGiftLog">ギフトログ（無料）</v-btn>
        <v-btn text small @click="preGiftLog">ギフトログ（有料）</v-btn>
      </v-toolbar-items>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-home-outline',
          title: 'ホーム',
          to: '/',
        },
        {
          icon: 'mdi-door',
          title: 'Room ID登録',
          to: '/roomid',
        },
        {
          icon: 'mdi-palette-outline',
          title: '背景色',
          to: '/backgroundcolor',
        },
        {
          icon: 'mdi-format-font',
          title: 'フォント',
          to: '/font',
        },
        {
          icon: 'mdi-account-tie-voice-outline',
          title: '読み上げ',
          to: '/voice',
        },
      ],
      title: 'Yoichi.dev - Niconico Showroom',
      collapseOnScroll: true,
      bgColor: 'white',
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: true,
        floating: false,
        mini: false,
      },
      footer: {
        inset: true,
      },
    }
  },
  created() {
    this.setListener()
  },
  methods: {
    setListener() {
      this.$nuxt.$on('openMenu', this.openMenu)
      this.$nuxt.$on('closeMenu', this.closeMenu)
    },
    openMenu(flg) {
      this.collapseOnScroll = flg
      this.primaryDrawer.model = flg
      this.bgColor = 'white'
    },
    closeMenu(flg) {
      this.collapseOnScroll = flg
      this.primaryDrawer.model = flg
      this.bgColor = this.$store.state.backgroundcolor
    },
    commentLog() {
      this.$nuxt.$emit('commentModalOpen')
    },
    freeGiftLog() {
      this.$nuxt.$emit('freeGiftModalOpen')
    },
    preGiftLog() {
      this.$nuxt.$emit('preGiftModalOpen')
    },
  },
}
</script>
