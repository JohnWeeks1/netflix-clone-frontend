<template>
    <div>
        <div class="account-background-image"></div>
        <div class="mt-20"></div>
        <div v-if="!isLoaded">
            <PageLoader/>
        </div>
        <Carousel v-if="movies[0] && movies[0].category.name === 'Documentaries'" :movies="movies"/>
        <Carousel v-if="movies[0] && movies[0].category.name === 'Documentaries'" :movies="movies"/>
    </div>
</template>

<script>

import axios from "axios";
import Carousel from "@/components/partials/Carousel";

export default {
    name: 'MovieLibrary',
    created() {
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

