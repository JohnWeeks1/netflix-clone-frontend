<template>
  <div class="container mx-auto px-2">
    <div class="flex flex-wrap items-center">

      <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
        <div class="flex-1 text-center px-4 py-2 m-2">
            <h1 class="text-4xl font-bold">{{headerText}}</h1>
            <p class="text-xl pb-4">{{bodyText}}</p>
        </div>
      </div>

      <div class="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
        <div class="flex-1 text-center px-4 py-2 m-2">
          <img :src="require(`@/assets/images/home/${image}`)" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GridTextImage',
  props: {
    headerText: {
      type: String,
      required: true
    },
    bodyText: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
  }
}
</script>
