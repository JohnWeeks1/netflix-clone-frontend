<template>
    <div>
        <div class="mt-20"></div>
        <div v-if="!isLoaded">
            <PageLoader/>
        </div>
        <div class="p-8">
            <div class="px-2">
                <div class="flex flex-wrap -mx-2">
                    <div class="w-full sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-1/2 px-2">
                        <video controls>
                            <source v-if="movie" :src="require(`@/assets/movies/documentaries/${movie.title}.mp4`)" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/2 px-2">
                        <h3 v-if="movie" class="font-semibold text-4xl tracking-tight">
                            {{ this.$helpers.capitalizeFirstLetter(movie.title) }}
                        </h3>
                        <p v-if="movie">{{ movie.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
// import Carousel from "@/components/partials/Carousel";

export default {
    name: 'Movie',
    data() {
        return {
            isLoaded: false,
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
        async getMovieById() {
            try {
                let response = await axios.get(`api/movies/${this.movieId}`)
                this.movie = response.data.data;

                setTimeout(() => { this.isLoaded = true }, 1000);

            } catch (error) {
                console.log(error);
            }
        }
    },
    components: {
        // Carousel
    }
}
</script>
