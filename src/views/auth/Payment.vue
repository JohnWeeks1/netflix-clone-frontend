<template>
  <div>
    <Nav/>
    <div class="pt-32 pb-48 min-h-screen">
      <div class="w-full p-6 flex justify-center items-center">
        <div class="w-full max-w-xs">
          <div class="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-25">
            <div class="text-3xl font-bold pb-5">Payment</div>
            <p class="text-md pb-4">A monthly subscription of $4.99</p>
            <!-- Stripe Elements Placeholder -->
            <div id="card-element"></div>

            <button v-if="setupIntent !== null" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-5 px-4 rounded focus:outline-none
                focus:shadow-outline" id="card-button" :data-secret="setupIntent.client_secret">
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import Nav from "@/components/structure/Nav";

export default {
  name: 'Payment',
  data() {
    return {
      setupIntent: null,
    }
  },
  created() {
    this.loadPaymentInput();
    this.stripeSetupIntent();
  },
  methods: {
    loadPaymentInput() {
      window.addEventListener('load', function() {
        const stripe = window.Stripe('pk_test_IER0NKJoxFDc1QzU6et0NirO00Sq7qimpy');
        const elements = stripe.elements();
        const cardElement = elements.create('card', {
          hidePostalCode: true,
        });
        cardElement.mount('#card-element');
        // const cardHolderName = document.getElementById('card-holder-name');
        const cardButton = document.getElementById('card-button');
        const clientSecret = cardButton.dataset.secret;

        cardButton.addEventListener('click', async () => {
          const { setupIntent, error } = await stripe.confirmCardSetup(
              clientSecret, {
                payment_method: {
                  card: cardElement,
                  billing_details: { name: 'testing name' }
                }
              }
          );

          if (error) {
            // Display "error.message" to the user...
            console.log(error);
          } else {
            // The card has been verified successfully...
            await axios.post('api/payment/store',{ payment_method: setupIntent.payment_method })

            await this.$store.dispatch('user/fetchUser')
          }
        });
      })
    },

    async stripeSetupIntent() {
      await axios.get('api/payment/setup-intent')
        .then(response => {
          this.setupIntent = response.data.intent;
        });
    }
  },
  components: {
    Nav
  }
}
</script>

<style>
.StripeElement {
  box-sizing: border-box;
  height: 40px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}
.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}
.StripeElement--invalid {
  border-color: #fa755a;
}
.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
