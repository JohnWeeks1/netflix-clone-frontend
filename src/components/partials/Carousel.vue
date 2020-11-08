<template>
    <section class="p-6">
        <h3 class="static font-bold text-xl -mb-4">
            {{ movies[0].category.name }}
        </h3>
        <vue-horizontal-list :items="items" :options="options">
            <template v-slot:default="{item}">
                <div class="item">
                    <router-link :to="{ name: 'Movie', params: { id: item.id }}">
                        <img class="z-10"
                             :src="require(`@/assets/images/account/movies/documentaries/${item.title}.png`)" alt="">
                        <div class="w-full border-1 border-black p-2 bg-black opacity-75 relative -mt-10 z-50">
                            {{ $helpers.capitalizeFirstLetter(item.title) }}
                        </div>
                    </router-link>
                </div>
            </template>
        </vue-horizontal-list>
    </section>
</template>

<script>
// https://github.com/fuxingloh/vue-horizontal-list
import VueHorizontalList from 'vue-horizontal-list';

export default {
    name: 'MovieLibrary',
    props: {
        movies: {
            type: Array,
            required: true
        }
    },
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
            items: []
        }
    },
    mounted() {
        this.mapMovies();
    },
    methods: {
        mapMovies() {
            let allMovies = this.movies.map(function (movie) {
                return {
                    id: movie.id,
                    title: movie.title
                }
            });

            for (let i = 0; i < allMovies.length; i++) {
                this.items.push(allMovies[i]);
            }
        }
    },
    components: {
        VueHorizontalList
    },
};
</script>
