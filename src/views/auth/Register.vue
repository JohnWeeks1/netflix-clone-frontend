<template>
  <div>
    <Nav/>
    <div class="pt-32 pb-48 min-h-screen">
      <div class="w-full p-6 flex justify-center items-center">
        <div class="w-full max-w-xs">
          <div class="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-25">
            <div class="text-3xl font-bold pb-5">Register</div>
            <p class="text-md pb-4">A monthly subscription of $4.99</p>
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
            <div class="mb-4">
              <h3 class="text-lg">Card details</h3>
              <Card class="stripe-card shadow text-black bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
            focus:outline-none focus:shadow-outline"
                    :class='{ complete }'
                    stripe='pk_test_JKVJPMynL8ckk7ivBxoroTlT'
                    :options='stripeOptions'
                    @change='change($event)'
              />
              <div id="card-errors" role="alert" v-text="cardDetailsErrorMessage"></div>
            </div>
            <div class="flex items-center justify-between">
              <button @click="register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
                focus:shadow-outline" type="button">
                Go to payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Nav from "@/components/structure/Nav";
import { Card, createToken } from 'vue-stripe-elements-plus';

export default {
  name: 'Register',
  data() {
    return {
      errors: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      password_confirmation: null,
      complete: false,
      cardDetailsErrorMessage: '',
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
        style: {
          base: {
            color: '#32325d',
            lineHeight: '18px',
            fontFamily: '"Raleway", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        },
        hidePostalCode: true
      }
    }
  },
  methods: {
    pay() {
      createToken().then(result => {
        console.log(result);
      }).catch(error => {
        console.log(error);
      })
    },
    change(event) {
      this.cardDetailsErrorMessage = event.error ? event.error.message : ''
    },
    async register() {
      await axios.get('sanctum/csrf-cookie')
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
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
    Nav,
    Card
  }
}
</script>
