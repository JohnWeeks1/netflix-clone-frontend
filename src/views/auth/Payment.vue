<template>
    <div>
        <Nav/>
        <AuthMainTemplate>
            <div class="mb-4 flex items-center justify-between">
                <div class="text-3xl font-bold">Payment</div>
                <router-link :to="{ name: 'Home' }" class="link hover:text-blue-800">Back</router-link>
            </div>
            <p class="text-md pb-4">A monthly subscription of $4.99</p>

            <!-- Stripe Elements -->
            <div>
                <label class="label" for="card-number">Card Number</label>
                <div id="card-number"></div>
            </div>
            <div class="mt-4">
                <label class="label" for="card-number">Card Expiry</label>
                <div id="card-expiry" @change="console.log('coooooool')"></div>
            </div>
            <div class="mt-4">
                <label class="label" for="card-number">Card CVC</label>
                <div id="card-cvc"></div>
            </div>

            <div v-if="error !== null" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                 role="alert">
                <strong class="font-bold">Wait!</strong>
                <span class="block sm:inline">{{ error.message }}</span>
            </div>
            <!-- Stripe Elements END -->

            <button v-if="setupIntent !== null" class="w-full payment-button" id="card-button" :data-secret="setupIntent.client_secret">
                Subscribe
            </button>
        </AuthMainTemplate>
    </div>
</template>

<script>

import axios from 'axios';
import Nav from "@/components/structure/Nav";
import AuthMainTemplate from '@/components/partials/auth/AuthMainTemplate';

export default {
    name: 'Payment',
    data() {
        return {
            error: null,
            setupIntent: null,
        }
    },
    created() {
        this.loadPaymentInput();
        this.stripeSetupIntent();
    },
    methods: {
        loadPaymentInput() {
            const self = this;
            window.addEventListener('load', function () {
                const stripe = window.Stripe('pk_test_IER0NKJoxFDc1QzU6et0NirO00Sq7qimpy');
                const elements = stripe.elements();

                const cardNumber = elements.create('cardNumber');
                const cardExpiry = elements.create('cardExpiry');
                const cardCvc = elements.create('cardCvc');

                cardNumber.mount('#card-number');
                cardExpiry.mount('#card-expiry');
                cardCvc.mount('#card-cvc');

                const cardButton = document.getElementById('card-button');
                const clientSecret = cardButton.dataset.secret;

                cardButton.addEventListener('click', async () => {
                    const {setupIntent, error} = await stripe.confirmCardSetup(
                        clientSecret, {
                            payment_method: {
                                card: cardNumber,
                            }
                        }
                    );

                    if (error) {
                        this.error = error;
                    } else {
                        // The card has been verified successfully...
                        try {
                            await self.subscribe(setupIntent)
                        } catch (error) {
                            this.error = error;
                        }
                    }
                });
            })
        },

        async stripeSetupIntent() {
            try {
                let response = await axios.get('api/payment/setup-intent')
                this.setupIntent = response.data.data.setup_intent;
            } catch (error) {
                this.error = error;
            }
        },

        async subscribe(setupIntent) {
            const self = this;
            try {
                await axios.post('api/payment/store', {
                    payment_method: setupIntent.payment_method
                })
                await self.fetchUser()
            } catch (error) {
                this.error = error;
            }
        },

        async fetchUser() {
            const self = this;
            try {
                await self.$store.dispatch('user/fetchUser')
                await self.$router.push({ name: 'MovieLibrary' })
            } catch (error) {
                this.error = error;
            }
        }
    },
    components: {
        Nav,
        AuthMainTemplate
    }
}
</script>

<style>
.StripeElement {
    box-sizing: border-box;
    height: 40px;
    padding: 10px 12px;
    border: 1px solid transparent;
    background-color: white;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
}

.StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--complete {
    color: green;
}

.StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
}
</style>
