<template>
    <div>
        <AuthMainTemplate>
            <div class="mb-4 flex items-center justify-between">
                <div class="text-3xl font-bold">Login</div>
                <router-link :to="{ name: 'Home' }" class="link hover:text-blue-800">Back</router-link>
            </div>
            <div class="mb-4">
                <label class="label">Email</label>
                <input v-model="email" class="input" id="email" type="text" placeholder="joe@mail.com">
                <p class="input-error-text" v-if="errors && errors.email">{{ errors.email[0] }}</p>
            </div>
            <div class="mb-6">
                <label class="label">Password</label>
                <input v-model="password" class="input" type="password"  placeholder="**************">
                <p class="input-error-text" v-if="errors && errors.password">{{ errors.password[0] }}</p>
            </div>
            <button @click="login" class="red-button w-full" type="button">Sign In</button>
        </AuthMainTemplate>
    </div>
</template>

<script>

import axios from 'axios';
import AuthMainTemplate from '@/components/structure/auth/AuthMainTemplate'

export default {
    name: 'Login',
    data() {
        return {
            errors: null,
            email: null,
            password: null
        }
    },
    methods: {
        async login() {
            await axios.get('sanctum/csrf-cookie')
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

            await axios.post('login', {
                email: this.email,
                password: this.password
            })
                .then(() => {
                    this.fetchUser();
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                });
        },

        async fetchUser() {
            await this.$store.dispatch('user/fetchUser')
                .then(() => {
                    this.$router.push({name: 'MovieLibrary'})
                })
        }
    },
    components: { AuthMainTemplate }
}
</script>
