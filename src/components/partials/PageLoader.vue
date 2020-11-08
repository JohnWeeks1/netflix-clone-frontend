<template>
  <div class="w-full h-full fixed block top-0 left-0 bg-black z-40 flex items-center">
    <scale-loader class="mx-auto -mt-40" :loading="true" color="#ff1a1a" height="70px" width="12px"></scale-loader>
  </div>
</template>

<script>
// Spinner github -> https://github.com/greyby/vue-spinner
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
  name: 'PageLoader',
  components: {
    ScaleLoader
  }
}
</script>
