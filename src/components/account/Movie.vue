<template>
  <div>
    <div class="p-8">
      <div class="px-2">
        <div class="flex flex-wrap -mx-2">
          <div class="w-full sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-1/2 px-2">
            <video controls>
              <source src="@/assets/movies/documentaries/beach.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
          <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2">
            <div class="">
              <h3>Title</h3>
              <p>Description section</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Carousel/>
  </div>
  </template>
<script>
import Carousel from "@/components/partials/Carousel";

  export default {
    name: 'Movie',
    computed: {
      params() {
        return this.$route.params.id;
      }
    },
    components: {
      Carousel
    }
  }
</script>
