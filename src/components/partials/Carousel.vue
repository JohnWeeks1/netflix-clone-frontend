<template>
      <section class="p-10 relative">
        <h3 class="static font-bold text-lg -mb-4">Documentaries</h3>
        <vue-horizontal-list :items="items" :options="options">
          <template v-slot:default="{item}">
            <div class="item">
              <router-link :to="{ name: 'Movie', params: { movieName: 'beach' }}">
                <img src="@/assets/images/account/movies/documentaries/beach.png" alt="">
                <div class="w-full h-6 bg-black">
                  <h5 class="-mt-8 ml-2">{{item.title}}</h5>
                </div>
              </router-link>
            </div>
          </template>
        </vue-horizontal-list>
      </section>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list';

export default {
  name: 'MovieLibrary',
  components: {
    VueHorizontalList
  },
  // props: {
  //   category: {
  //     type: String,
  //     required: true
  //   },
  //   title: {
  //     type: String,
  //     required: true
  //   }
  // },
  data() {
    return {
      options: {
        responsive: [
          {end: 576, size: 1},
          {start: 576, end: 768, size: 2},
          {start: 768, end: 992, size: 3},
          {size: 4}
        ],
        list: {
          // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
          windowed: 1200,

          // Because: #app {padding: 80px 24px;}
          // padding: 24
        }
      },
      items: [
        {title: 'Item 0'},
      ]
    }
  }
};
</script>
