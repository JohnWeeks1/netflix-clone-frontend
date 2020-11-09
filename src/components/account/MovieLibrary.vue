<template>
    <div>
        <div class="background-image"></div>
        <div class="mt-20"></div>
        <div v-if="!isLoaded">
            <PageLoader/>
        </div>
        <Carousel v-if="movies[0] && movies[0].category.name === 'Documentaries'" :movies="movies"/>
    </div>
</template>

<script>

import axios from "axios";
import Carousel from "@/components/partials/Carousel";

export default {
    name: 'MovieLibrary',
    mounted() {
        this.getAllMovies();
    },
    data() {
        return {
            isLoaded: false,
            movies: [],
        }
    },
    methods: {
        async getAllMovies() {
            try {
                let response = await axios.get('api/movies')
                this.movies = response.data.data;

                setTimeout(() => { this.isLoaded = true }, 1000);
            } catch (error) {
                console.log(error);
            }
        }
    },
    components: {
        Carousel
    }
};
</script>

<style>
.background-image {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background-image: url("../../assets/images/account/movies/startrek-bg.jpg");
    background-position: top;
    background-repeat: no-repeat;
    background-size:cover;
}
</style>
