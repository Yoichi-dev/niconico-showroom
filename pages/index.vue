<template>
  <v-main v-bind:style="styles">
    <v-container class="nonecss" id="userData">
      <div class="py-6"></div>
      <v-row justify="center" align="center">
        <p>
          ※配信、テストが終わった際はタブを閉じるかページをリロードしてください※
        </p>
      </v-row>
      <div class="py-1"></div>
      <v-row justify="center" align="center">
        <v-btn outlined color="indigo" @click="getRoomData()" :disabled="btn">
          自分のルームへ接続
        </v-btn>
      </v-row>
      <div class="py-6"></div>
      <v-row justify="center" align="center">
        <v-btn outlined color="indigo" @click="getRoomRandom()" :disabled="btn">
          【テスト用】ON LIVE1位の部屋に接続
        </v-btn>
      </v-row>
      <div class="py-6"></div>
      <v-row v-if="loading" justify="center" align="center">
        サーバー起動中…
        <v-progress-circular
          :size="70"
          :width="7"
          color="green"
          indeterminate
        ></v-progress-circular>
      </v-row>
      <div class="py-6"></div>
      <v-row justify="center" align="center">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">News</th>
                <th class="text-left"></th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(news, i) in newsLists" :key="i">
                <td>{{ news.title }}</td>
                <td v-html="news.content"></td>
                <td>{{ news.date }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="commentDialog" scrollable max-width="500px">
          <v-card max-width="800px" class="mx-auto">
            <v-toolbar color="cyan" dark>
              <v-btn icon>
                <v-icon>mdi-comment-processing-outline</v-icon>
              </v-btn>
              <v-toolbar-title>コメントログ</v-toolbar-title>
            </v-toolbar>
            <v-list three-line>
              <template v-for="(comment, index) in comments">
                <v-divider :key="index" inset></v-divider>
                <v-list-item
                  :key="comment.name + '' + index"
                  :id="comment.name + '' + index"
                >
                  <v-list-item-avatar>
                    <v-img
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                        comment.avatar +
                        '.png'
                      "
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="comment.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="comment.comment"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-dialog>
        <v-dialog v-model="freeGiftDialog" scrollable max-width="500px">
          <v-card max-width="800px" class="mx-auto">
            <v-toolbar color="green" dark>
              <v-btn icon>
                <v-icon>mdi-gift-outline</v-icon>
              </v-btn>
              <v-toolbar-title>ギフトログ（無料）</v-toolbar-title>
            </v-toolbar>

            <v-list three-line>
              <template v-for="(freeGift, index) in freeGifts">
                <v-divider :key="index" inset></v-divider>
                <v-list-item
                  :key="freeGift.name + '' + index"
                  :id="freeGift.name + '' + index"
                >
                  <v-list-item-avatar>
                    <v-img
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                        freeGift.avatar +
                        '.png'
                      "
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="freeGift.name"
                    ></v-list-item-title>
                    <v-img
                      max-height="50"
                      max-width="50"
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/assets/img/gift/' +
                        freeGift.giftimg +
                        '_s.png'
                      "
                    ></v-img>
                    × {{ freeGift.count }}
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-dialog>
        <v-dialog v-model="preGiftDialog" scrollable max-width="500px">
          <v-card max-width="800px" class="mx-auto">
            <v-toolbar color="green" dark>
              <v-btn icon>
                <v-icon>mdi-gift-outline</v-icon>
              </v-btn>
              <v-toolbar-title>ギフトログ（有料）</v-toolbar-title>
            </v-toolbar>

            <v-list three-line>
              <template v-for="(preGift, index) in preGifts">
                <v-divider :key="index" inset></v-divider>
                <v-list-item
                  :key="preGift.name + '' + index"
                  :id="preGift.name + '' + index"
                >
                  <v-list-item-avatar>
                    <v-img
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
                        preGift.avatar +
                        '.png'
                      "
                    ></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="preGift.name"
                    ></v-list-item-title>
                    <v-img
                      max-height="50"
                      max-width="50"
                      :src="
                        'https://image.showroom-cdn.com/showroom-prod/assets/img/gift/' +
                        preGift.giftimg +
                        '_s.png'
                      "
                    ></v-img>
                    × {{ preGift.count }}
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios'
import { TweenMax } from 'gsap'
import Vue from 'vue/dist/vue.esm.js'
import CommentArea from '@/components/CommentArea.vue'

export default {
  components: {
    CommentArea,
  },
  data() {
    return {
      roomData: '',
      roomId: '',
      socket: null,
      btn: false,
      commentCnt: 0,
      styles: {
        backgroundColor: '#FFFFFF',
        fontSize: '5em',
      },
      speed: 20,
      checkbox: false,
      speech: false,
      loading: false,
      target: 0,
      commentDialog: false,
      freeGiftDialog: false,
      preGiftDialog: false,
      comments: [],
      stockComments: [],
      freeGifts: [],
      stockFreeGifts: [],
      preGifts: [],
      stockPreGifts: [],
      top: 0,
      fontFamily: '',
      newsLists: [
        {
          title: 'Update',
          content:
            '本WebアプリケーションPWA対応（URLバー右に表示されるインストールを押すとPCにインストールして使用できます）',
          date: '2020/12/19 19:00',
        },
        {
          title: 'Update',
          content:
            'すこアニフォント変更拡張機能 機能追加（フォントサイズ変更） <a href="https://chrome.google.com/webstore/detail/showroom-%E3%81%99%E3%81%93%E3%82%A2%E3%83%8B-%E4%BB%AE-%CE%B2%E7%89%88%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E5%A4%89%E6%9B%B4%E6%A9%9F/nmknohiegmphpeadmmpkfdhddedfbool" target="_blank">Chrome版</a>',
          date: '2020/12/15 15:00',
        },
        {
          title: 'Bugfix',
          content:
            '配信に一定期間接続していない状態で接続すると接続に失敗する問題を修正<br>　使用前に「Ctrl + F5」を押してください（初回だけでOK）',
          date: '2020/12/12 21:30',
        },
        {
          title: 'Release',
          content:
            'リアルLINE風コメントビューワー（β版）　<a href="https://showroom-comment-viewer.yoichi.dev/" target="_blank">https://showroom-comment-viewer.yoichi.dev/</a>',
          date: '2020/12/10 11:00',
        },
        {
          title: 'Release',
          content:
            '雪降らすだけのサイト　<a href="https://particles-screen.yoichi.dev/" target="_blank">https://particles-screen.yoichi.dev/</a>',
          date: '2020/12/02 07:30',
        },
        {
          title: 'Release',
          content:
            'スコアニのフォント変更拡張機能　<a href="https://chrome.google.com/webstore/detail/showroom-%E3%81%99%E3%81%93%E3%82%A2%E3%83%8B-%E4%BB%AE-%CE%B2%E7%89%88%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E5%A4%89%E6%9B%B4%E6%A9%9F/nmknohiegmphpeadmmpkfdhddedfbool" target="_blank">Chrome版</a>　<a href="https://addons.mozilla.org/ja/firefox/addon/showroom-%E3%81%99%E3%81%93%E3%82%A2%E3%83%8B-%E4%BB%AE-%CE%B2%E7%89%88%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E5%A4%89%E6%9B%B4-%E6%A9%9F%E8%83%BD%E5%88%B6%E9%99%90%E7%89%88/" target="_blank">Firefox版</a>',
          date: '2020/07/14 11:00',
        },
      ],
    }
  },
  head() {
    return {
      title: 'ホーム',
    }
  },
  watch: {
    commentDialog: function (newValue) {
      if (newValue) {
        this.comments = this.stockComments
      } else {
        this.comments = []
      }
    },
    freeGiftDialog: function (newValue) {
      if (newValue) {
        this.freeGifts = this.stockFreeGifts
      } else {
        this.freeGifts = []
      }
    },
    preGiftDialog: function (newValue) {
      if (newValue) {
        this.preGifts = this.stockPreGifts
      } else {
        this.preGifts = []
      }
    },
  },
  // 離脱時
  beforeRouteLeave(to, from, next) {
    if (this.socket != null) {
      this.socket.close()
    }
    this.$nuxt.$emit('openMenu', true)
    next()
  },
  created() {
    this.setListener()
  },
  mounted() {},
  methods: {
    setListener() {
      this.$nuxt.$on('commentModalOpen', this.commentModalOpen)
      this.$nuxt.$on('freeGiftModalOpen', this.freeGiftModalOpen)
      this.$nuxt.$on('preGiftModalOpen', this.preGiftModalOpen)
    },
    getRoomData() {
      if (this.$store.state.roomid === null) {
        console.log('ID無し')
        this.$router.push('/roomid')
      }
      this.btn = true
      this.loading = true
      // キー取得
      axios
        .get(
          'https://niconico-showroom-api.herokuapp.com/apis/live_info/' +
            this.$store.state.roomid
        )
        .then((response) => {
          if (response.data.room_name === undefined) {
            console.log('ページが存在しません')
            this.roomData = 'ページが存在しません'
            this.btn = false
            this.loading = false
            return
          }
          this.roomData = response.data
          if (response.data.bcsvr_key != '') {
            this.setting()
            this.connectSocket()
          } else {
            alert('配信停止中です')
            this.roomData = '配信停止中です'
            this.btn = false
            this.loading = false
          }
        })
    },
    setting() {
      this.$nuxt.$emit('closeMenu', false)
      console.log('==setting==')
      console.log(this.$store.state.backgroundcolor)
      this.styles.backgroundColor = this.$store.state.backgroundcolor
      if (this.$store.state.fontsize != null) {
        this.styles.fontSize = this.$store.state.fontsize + 'em'
      }
      if (this.$store.state.telop != null) {
        this.speed = this.$store.state.telop
      }
      console.log('スピード' + this.speed)
      if (this.$store.state.fontfamily != null) {
        this.fontFamily = this.$store.state.fontfamily
      }
      console.log('フォント' + this.fontFamily)
      console.log(
        'フォントサイズ' +
          (this.$store.state.fontsize === null
            ? this.styles.fontSize
            : this.$store.state.fontsize)
      )
      this.speech = this.$store.state.voice
      console.log('読み上げ' + (this.speech ? 'する' : 'しない'))
      console.log('==setting==')
      // 疎通確認
      setInterval(() => {
        if (this.roomData != '') {
          this.socket.send('PING	showroom')
        }
      }, 60000)
      // setInterval(() => {
      //   axios
      //     .get(
      //       'https://niconico-showroom-api.herokuapp.com/apis/alive/' +
      //         this.roomData.roomId
      //     )
      //     .then((response) => {
      //       console.log(response.statusText)
      //     })
      // }, 1200000)
    },
    connectSocket() {
      console.log('接続開始')
      // 接続
      this.socket = new WebSocket('wss://online.showroom-live.com')
      // 接続確認
      this.socket.onopen = (e) => {
        console.log('コネクションを開始しました')
        this.socket.send('SUB	' + this.roomData.bcsvr_key)
        document.getElementById('userData').style.display = 'none'
      }
      // エラー発生時
      this.socket.onerror = (error) => {
        alert('エラーが発生しました\nページをリロードしてください')
        location.reload()
      }
      // メッセージ受信
      this.socket.onmessage = (data) => {
        // 死活監視
        if (data.data === 'ACK	showroom') {
          console.log('死活監視OK')
          return
        }
        // JSON変換
        let getMessage = JSON.parse(
          data.data.replace('MSG	' + this.roomData.bcsvr_key + '	', '')
        )
        // コメント
        if (getMessage.cm != undefined) {
          // カウント
          if (Number.isFinite(Number(getMessage.cm)) && getMessage.cm <= 50) {
            this.getCount(getMessage)
          } else {
            this.commentLog(getMessage)
            this.getComment(getMessage)
          }
        }
        // ギフト
        if (getMessage.g != undefined) {
          this.giftLog(getMessage)
        }
      }
    },
    commentLog(data) {
      this.stockComments.push({
        avatar: data.av,
        name: data.ac,
        comment: data.cm,
      })
    },
    async getComment(data) {
      let id = 'comment' + this.commentCnt

      let CommentAreaComponentClass = Vue.extend(CommentArea)
      let commentComponent = new CommentAreaComponentClass()
      commentComponent.$mount()
      commentComponent.name = data.ac
      commentComponent.comment = data.cm
      commentComponent.avatar = data.av
      commentComponent.id = id
      commentComponent.fontFamily = this.fontFamily
      if (this.$store.state.fontsize != null) {
        commentComponent.fontsize = this.$store.state.fontsize - 1 + 'em'
        commentComponent.nameFontSize = this.$store.state.fontsize / 2 + 'em'
      } else {
        commentComponent.fontsize = '4em'
        commentComponent.nameFontSize = '2em'
      }

      commentComponent.$el.setAttribute('id', id)

      commentComponent.$el.style.position = 'absolute'
      commentComponent.$el.style.left =
        document.documentElement.clientWidth + 'px'

      let he = document.documentElement.clientHeight * 0.1
      let nextTop = this.getRandomNum(
        50,
        document.documentElement.clientHeight - he * 2
      )
      while (this.top + 100 > nextTop && this.top - 100 < nextTop) {
        nextTop = this.getRandomNum(
          50,
          document.documentElement.clientHeight - he * 2
        )
      }
      this.top = nextTop
      commentComponent.$el.style.top = nextTop + 'px'
      document.getElementsByTagName('main')[0].appendChild(commentComponent.$el)

      if (this.speech) {
        if (!/(.)\1+/.test(data.cm))
          window.speechSynthesis.speak(new SpeechSynthesisUtterance(data.cm))
      }
      if (data.ac.length > data.cm.length) {
        commentComponent.$el.style.width = data.ac.length + 'em'
      } else {
        commentComponent.$el.style.width = data.cm.length + 'em'
      }

      TweenMax.to('#' + id, this.speed, {
        x:
          -1 *
          (document.documentElement.clientWidth +
            commentComponent.$el.clientWidth +
            100),
        onComplete: () => {
          commentComponent.$el.parentNode.removeChild(commentComponent.$el)
        },
      })
      this.commentCnt++
    },
    getCount(data) {},
    getRoomRandom() {
      this.btn = true
      this.loading = true
      // キー取得
      axios
        .get('https://niconico-showroom-api.herokuapp.com/apis/onlive')
        .then((response) => {
          if (response.data === undefined) {
            console.log('ページが存在しません')
            this.roomData = 'ページが存在しません'
            this.btn = false
            this.loading = false
            return
          }
          this.roomData = response.data
          console.log(response.data.room_name)
          if (response.data != '') {
            this.setting()
            this.connectSocket()
          } else {
            this.roomData = '配信停止中です'
            this.btn = false
            this.loading = false
          }
        })
    },
    commentModalOpen() {
      this.commentDialog = true
    },
    freeGiftModalOpen() {
      this.freeGiftDialog = true
    },
    preGiftModalOpen() {
      this.preGiftDialog = true
    },
    giftLog(data) {
      // TODO:要修正
      // 有料
      if (data.gt === 1) {
        let flg = this.preGifts.some((value) => {
          // ユーザを特定
          if (value.userid === data.u && value.giftimg === data.g) {
            // ギフト数加算
            value.count = Number(value.count) + Number(data.n)
            return true
          }
        })
        // 新規
        if (!flg) {
          this.stockPreGifts.push({
            avatar: data.av,
            userid: data.u,
            name: data.ac,
            count: data.n,
            giftimg: data.g,
          })
        }
      } else {
        // 扱いが難しい虹星
        if (data.g === 1601) {
          // 無料
          let nijiflg = this.freeGifts.some((value) => {
            // ユーザを特定
            if (value.userid === data.u && value.giftimg === data.g) {
              // ギフト数加算
              value.count = Number(value.count) + Number(data.n)
              return true
            }
          })
          // 新規
          if (!nijiflg) {
            this.stockFreeGifts.push({
              avatar: data.av,
              userid: data.u,
              name: data.ac,
              count: data.n,
              giftimg: data.g,
            })
          }
        } else {
          // 無料
          let flg = this.freeGifts.some((value) => {
            // ユーザを特定
            if (value.userid === data.u) {
              // ギフト数加算
              value.count = Number(value.count) + Number(data.n)
              // ギフトアイコン更新
              value.giftimg = data.g
              return true
            }
          })
          // 新規
          if (!flg) {
            this.freeGifts.push({
              avatar: data.av,
              userid: data.u,
              name: data.ac,
              count: data.n,
              giftimg: data.g,
            })
          }
        }
      }
    },
    getRandomNum(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
  },
}
</script>

<style scoped>
::v-deep .niconico {
  color: white;
  position: fixed;
  white-space: nowrap;
  font-weight: bold;
  -webkit-text-stroke: 1px #000;
}

.nonecss {
  font-size: initial;
}
</style>