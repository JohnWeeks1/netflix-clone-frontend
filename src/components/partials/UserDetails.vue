<template>
  <div>
    <div class="pt-32 pb-48 min-h-screen">
      <div class="w-full p-6 flex justify-center items-center">
        <div class="w-full max-w-xs">
          <form class="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-25">
            <div class="text-3xl font-bold pb-5">Register</div>
            <div class="mb-4">
              <input v-model="firstName" class="shadow text-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
            focus:outline-none focus:shadow-outline" id="firstname" type="text" placeholder="Firstname">
              <p class="text-red-500 text-xs italic" v-if="errors">{{errors.firstname[0]}}</p>
            </div>
            <div class="mb-4">
              <input v-model="lastName" class="shadow text-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
            focus:outline-none focus:shadow-outline" id="lastname" type="text" placeholder="Lastname">
              <p class="text-red-500 text-xs italic" v-if="errors">{{errors.lastname[0]}}</p>
            </div>
            <div class="mb-4">
              <input v-model="email" class="shadow text-black appearance-none border rounded w-full py-2 px-3
              leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email">
              <p class="text-red-500 text-xs italic" v-if="errors">{{errors.email[0]}}</p>
            </div>
            <div class="mb-4">
              <input v-model="password" class="shadow text-black appearance-none border rounded w-full py-2 px-3
              leading-tight focus:outline-none focus:shadow-outline" id="password" type="password"
                     placeholder="Password">
              <p class="text-red-500 text-xs italic" v-if="errors">{{errors.password[0]}}</p>
            </div>
            <div class="mb-4">
              <input v-model="password_confirmation" class="shadow text-black appearance-none border rounded w-full py-2 px-3
                 leading-tight focus:outline-none focus:shadow-outline" id="password_confirmation" type="password"
                     placeholder="Confirm password">
              <p class="text-red-500 text-xs italic" v-if="errors">{{errors.password_confirmation[0]}}</p>
            </div>
            <div class="flex items-center justify-between">
              <router-link :to="{ name: 'Payment' }" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
                focus:shadow-outline" type="button">
                Go to payment
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'UserDetails',
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
            console.log(error.response.data.errors);
          });

      await axios.post('api/register', {
        firstname: this.firstName,
        lastname: this.lastName,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
          .then(response => {
            console.log(response);
            this.login();
          })
          .catch(error => {
            this.errors = error.response.data.errors;
          });
    },

    async login() {
      await axios.post('api/login', {
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
          .catch(error => {
            this.errors = error.response.data.errors;
            console.log(error)
          })
    },
  }
}
</script>
