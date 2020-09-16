<template>
      <div>
        <div v-if="!isPending">
          <Carousel v-if="movies && movies[0].category[0] === 'documentaries'" :movies="movies" />
        </div>
        <div v-else >
          Wait...
        </div>
      </div>
</template>

<script>
import axios from 'axios';
import Carousel from "@/components/partials/Carousel";

export default {
  name: 'MovieLibrary',
  mounted() {
    this.getAllMovies();
  },
  data() {
    return {
      isPending: true,
      movies: [],
    }
  },
  methods: {
     getAllMovies() {
       axios.get('api/movies')
          .then(response => {
            this.movies = response.data.data;
          }).catch(error => {
            console.log(error);
          }).finally(() => {
             this.isPending = false
          });
    },
  },
  components: {
    Carousel
  }
};
</script>
