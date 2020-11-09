<template>
    <div>
        <AuthMainTemplate>
            <div class="mb-4 flex items-center justify-between">
                <div class="text-3xl font-bold">Register</div>
                <router-link :to="{ name: 'Home' }" class="link hover:text-blue-800">Back</router-link>
            </div>
            <div class="mb-4">
                <label class="label">First Name</label>
                <input v-model="firstName" class="input" type="text" placeholder="Firstname">
                <p class="text-red-500 text-xs italic" v-if="errors">{{ errors.firstname[0] }}</p>
            </div>
            <div class="mb-4">
                <label class="label">Last Name</label>
                <input v-model="lastName" class="input" type="text" placeholder="Lastname">
                <p class="text-red-500 text-xs italic" v-if="errors">{{ errors.lastname[0] }}</p>
            </div>
            <div class="mb-4">
                <label class="label">Email</label>
                <input v-model="email" class="input" type="text" placeholder="Email">
                <p class="text-red-500 text-xs italic" v-if="errors">{{ errors.email[0] }}</p>
            </div>
            <div class="mb-4">
                <label class="label">Password</label>
                <input v-model="password" class="input" type="password" placeholder="Password">
                <p class="text-red-500 text-xs italic" v-if="errors">{{ errors.password[0] }}</p>
            </div>
            <div class="mb-4">
                <label class="label">Confirm password</label>
                <input v-model="password_confirmation" class="input" type="password" placeholder="Confirm password">
                <p class="text-red-500 text-xs italic" v-if="errors">{{ errors.password_confirmation[0] }}</p>
            </div>
            <button @click="register" class="red-button w-full" type="button">Register</button>
        </AuthMainTemplate>
    </div>
</template>

<script>

import axios from 'axios';
import AuthMainTemplate from '@/components/structure/auth/AuthMainTemplate';

export default {
    name: 'Register',
    data() {
        return {
            errors: null,
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            password_confirmation: null
        }
    },
    methods: {
        async register() {
            await axios.get('sanctum/csrf-cookie')
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });

            await axios.post('register', {
                firstname: this.firstName,
                lastname: this.lastName,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            })
                .then(() => {
                    this.login();
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                });
        },

        async login() {
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
                    window.location.href = '/payment'
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                    console.log(error)
                })
        },
    },
    components: { AuthMainTemplate }
}
</script>
