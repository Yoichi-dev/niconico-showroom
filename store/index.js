export const state = () => ({
    roomid: null,
    backgroundcolor: null,
    fontsize: null,
    voice: null,
    telop: null,
    fontfamily: null
})

export const mutations = {
    setRoomid(state, id) {
        state.roomid = id
    },
    setBackgroundColor(state, color) {
        state.backgroundcolor = color
    },
    setFontSize(state, size) {
        state.fontsize = size
    },
    setVoice(state, flg) {
        state.voice = flg
    },
    setTelop(state, speed) {
        state.telop = speed
    },
    setFontFamily(state, font) {
        state.fontfamily = font
    }
}