<template>
    <div>
        <Nav/>
        <div class="pt-32 pb-48 min-h-screen">
            <div class="w-full p-6 flex justify-center items-center">
                <div class="w-full max-w-xs">
                    <div class="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-25">
                        <div class="text-3xl font-bold pb-5">Payment</div>
                        <p class="text-md pb-4">A monthly subscription of $4.99</p>
                        <div class='credit-card-inputs' :class='{ complete }'>
                            <label class="text-sm text-gray-600">Card Number</label>
                            <card-number class='stripe-element card-number '
                                         ref='cardNumber'
                                         :stripe='stripe'
                                         :options='options'
                                         @change='number = $event.complete'
                            />
                            <label class="text-sm text-gray-600">Card Expiry</label>
                            <card-expiry class='stripe-element card-expiry'
                                         ref='cardExpiry'
                                         :stripe='stripe'
                                         :options='options'
                                         @change='expiry = $event.complete'
                            />
                            <label class="text-sm text-gray-600">CVC</label>
                            <card-cvc class='stripe-element card-cvc'
                                      ref='cardCvc'
                                      :stripe='stripe'
                                      :options='options'
                                      @change='cvc = $event.complete'
                            />
                            <div class="h-4"></div>
                            <button class="w-full bg-red-700 hover:bg-red-600 text-gray-300 font-bold py-2 px-4
                                focus:outline-none focus:shadow-outline">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Nav from "@/components/structure/Nav";
import {CardNumber, CardExpiry, CardCvc} from 'vue-stripe-elements-plus'

export default {
    name: 'Payment',
    data() {
        return {
            stripe: 'pk_test_IER0NKJoxFDc1QzU6et0NirO00Sq7qimpy',
            complete: false,
            number: false,
            expiry: false,
            cvc: false,
            options: {
                // see https://stripe.com/docs/stripe.js#element-options for details
                style: {
                    base: {
                        iconColor: '#c4f0ff',
                        color: '#363636',
                        fontWeight: 600,
                        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                        fontSize: '18px',
                        fontSmoothing: 'antialiased',
                        ':-webkit-autofill': {
                            color: '#fce883',
                        },
                        '::placeholder': {
                            color: '#9c9c9c',
                        },
                    },
                    invalid: {
                        iconColor: '#cf4646',
                        color: '#cf4646',
                    },
                    complete: {
                        iconColor: '#36962a',
                        color: '#36962a',
                    },
                }
            }
        }
    },
    methods: {
        update() {
            this.complete = this.number && this.expiry && this.cvc

            // field completed, find field to focus next
            if (this.number) {
                if (!this.expiry) {
                    this.$refs.cardExpiry.focus()
                } else if (!this.cvc) {
                    this.$refs.cardCvc.focus()
                }
            } else if (this.expiry) {
                if (!this.cvc) {
                    this.$refs.cardCvc.focus()
                } else if (!this.number) {
                    this.$refs.cardNumber.focus()
                }
            }
            // no focus magic for the CVC field as it gets complete with three
            // numbers, but can also have four
        }
    },
    watch: {
        number() {
            this.update()
        },
        expiry() {
            this.update()
        },
        cvc() {
            this.update()
        }
    },
    components: {
        Nav,
        CardNumber,
        CardExpiry,
        CardCvc
    }
}
</script>

<style>
.stripe-element {
    @apply p-3 mb-2 border-solid border border-gray-900 bg-gray-400
}
</style>
