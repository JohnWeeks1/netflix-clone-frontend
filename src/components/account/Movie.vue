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
                        <small class="text-gray-700">Rate this movie</small>
                        <StarRating
                            :rating="rating"
                            v-bind:increment="1"
                            v-bind:max-rating="5"
                            inactive-color="gray"
                            active-color="#BD0000"
                            v-bind:star-size="35"
                            @rating-selected="addRating"
                        />
                        <p class="pt-5" v-if="movie">{{ movie.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import StarRating from 'vue-star-rating'
// import Carousel from "@/components/partials/Carousel";

export default {
    name: 'Movie',
    data() {
        return {
            isLoaded: false,
            rating: 0,
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
        },

        async addRating(value) {
            try {
                let response = await axios.post('api/user/movie/ratings', {
                    rating  : value,
                    movie_id: this.movie.id
                })
                this.rating = response.data.data;

                setTimeout(() => { this.isLoaded = true }, 1000);

            } catch (error) {
                console.log(error);
            }
        },
    },
    components: {
        // Carousel
        StarRating
    }
}
</script>
