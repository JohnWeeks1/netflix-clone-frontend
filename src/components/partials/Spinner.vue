<template>
  <div class="z-50 flex flex items-center h-screen w-full bg-black bg-opacity-50">
    <scale-loader class="mx-auto -mt-40" :loading="true" color="#ff1a1a" height="70px" width="12px"></scale-loader>
  </div>
</template>

<script>
// Spinner github -> https://github.com/greyby/vue-spinner
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
  name: 'Spinner',
  components: {
    ScaleLoader
  }
}
</script>
