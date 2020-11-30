<template>
  <div role="list" class="v-list v-sheet v-list--three-line">
    <div tabindex="-1" role="listitem" class="v-list-item">
      <div
        class="v-avatar v-list-item__avatar"
        style="height: 70px; min-width: 70px; width: 70px"
      >
        <div class="v-image v-responsive">
          <div class="v-responsive__sizer" style="padding-bottom: 100%"></div>
          <div
            class="v-image__image v-image__image--cover"
            :style="
              'background-image: url(\'https://image.showroom-cdn.com/showroom-prod/image/avatar/' +
              avatar +
              '.png\');background-position: center center;'
            "
          ></div>
        </div>
      </div>
      <div class="v-list-item__content">
        <div
          class="v-list-item__title niconico"
          :style="
            'font-size: 2rem !important; padding-bottom: 15px; font-family: ' +
            fontFamily
          "
        >
          {{ name }}
        </div>
        <div class="v-list-item__subtitle">
          <span
            class="niconico"
            :style="'font-size: ' + fontsize + '; font-family: ' + fontFamily"
            >{{ comment }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      comment: '',
      avatar: '1',
      id: '',
      fontsize: 5,
      fontFamily: '',
      nameFontSize: 2,
    }
  },
}
</script>

<style scoped>
.niconico {
  color: white !important;
  position: fixed;
  white-space: nowrap;
  font-weight: bold;
  -webkit-text-stroke: 1px #000;
}
</style>