<template>
      <div>
        <div v-if="!isPending">
          <Carousel v-if="movies && movies[0].category.name === 'Documentaries'" :movies="movies" />
        </div>
        <div v-else>
          <Spinner/>
        </div>
      </div>
</template>

<script>
import axios from "axios";
import Spinner from "@/components/partials/Spinner";
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
             setTimeout(() => {
               this.isPending = false
             }, 1000);
          });
    }
  },
  components: {
    Carousel,
    Spinner
  }
};
</script>
