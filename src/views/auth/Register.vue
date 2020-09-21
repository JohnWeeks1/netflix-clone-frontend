<template>
  <div>
    <Nav/>
    <router-view/>
  </div>
</template>

<script>

import axios from 'axios';
import Nav from "@/components/structure/Nav";

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
  },
  components: {
    Nav
  }
}
</script>
