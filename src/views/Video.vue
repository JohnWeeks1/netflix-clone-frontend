<template>
  <div>
    <Nav/>
    <div class="p-8">
      <div class="px-2">
        <div class="flex -mx-2">
          <div class="w-2/3 px-2">
            <div class="">
              <video controls>
                <source src="@/assets/videos/video-1.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div class="w-1/3 px-2">
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
import Nav from "@/components/partials/Nav";
import Carousel from "@/components/account/Carousel";

  export default {
    name: 'Video',
    components: {
      Nav,
      Carousel
    }
  }
</script>
