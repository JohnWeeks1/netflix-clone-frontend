<template>
  <div>
    <Nav/>
    <div id="home-background-image" class="pb-32 flex justify-center">
      <div class="max-w-xl text-center mt-40">
          <h1 class="text-5xl font-bold">Unlimited films, TV programmes and more.</h1>
          <p class="text-xl pb-4">Watch anywhere. Cancel at any time.</p>
          <p class="text-xl pb-4">Ready to watch? Click the button to start a new subscription.</p>
          <router-link :to="{ name: 'UserDetails' }" class="bg-red-700 hover:bg-red-600 text-white text-xl py-1 px-4 rounded">
            Get Started
          </router-link>
      </div>
    </div>
    <div class="h-2 pt-60 bg-gray-900"></div>
      <grid-text-image
          v-for="(json, index) in jsonHome" :key="index"
          :header-text="json.headerText"
          :body-text="json.bodyText"
          :image="json.image"
      />
    <div class="h-2 pt-60 bg-gray-900"></div>
    <Footer/>
  </div>
</template>

<script>
import GridTextImage from "@/components/partials/GridTextImage";
import JsonHome from "@/assets/json/home.json";
import Footer from "@/components/structure/Footer";
import Nav from "@/components/structure/Nav";
export default {
  name: 'Home',
  data() {
    return {
      jsonHome: JsonHome
    }
  },
  components: {
    GridTextImage,
    Footer,
    Nav
  }
}
</script>
