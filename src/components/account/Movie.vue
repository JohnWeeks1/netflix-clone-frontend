<template>
  <div>
    <div v-if="!isPending">
      <div class="p-8">
        <div class="px-2">
          <div class="flex flex-wrap -mx-2">
            <div class="w-full sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-1/2 px-2">
              <video controls>
                <source :src="require(`@/assets/movies/documentaries/${movie.title}.mp4`)" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
            <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2">
              <div class="">
                <h3 class="font-semibold text-3xl tracking-tight">
                  {{this.$helpers.capitalizeFirstLetter(movie.title)}}
                </h3>
                <p>{{movie.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
<!--      <Carousel/>-->
    </div>
    <div v-else>
      <Spinner/>
    </div>
  </div>
  </template>
<script>
import axios from "axios";
import Spinner from "@/components/partials/Spinner";
// import Carousel from "@/components/partials/Carousel";

export default {
    name: 'Movie',
    data() {
      return {
        isPending: true,
        movie: null
      }
    },
    mounted() {
      this.getMovieById();
    },
    computed: {
      movieId() {
        return this.$route.params.id;
      }
    },
    methods: {
      getMovieById() {
        axios.get(`api/movies/${this.movieId}`)
            .then(response => {
              this.movie = response.data.data;
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
      // Carousel,
      Spinner
    }
  }
</script>
