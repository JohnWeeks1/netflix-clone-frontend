<template>
    <div class="pt-32 pb-48 min-h-screen">
      <div class="w-full p-6 flex justify-center items-center">
        <div class="w-full max-w-xs">
          <form class="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-25">
            <div>
              <div class="text-xl font-bold pb-5">Card details</div>
              <div class="pb-5">This subscription is £4.99 a month</div>
            </div>
            <div class='credit-card-inputs' :class='{ complete }'>
              <card-number class='stripe-element card-number shadow bg-white text-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 '
                           ref='cardNumber'
                           stripe='pk_test_IER0NKJoxFDc1QzU6et0NirO00Sq7qimpy'
                           :options='options'
                           @change='number = $event.complete'
              />
              <card-expiry class='stripe-element card-expiry shadow bg-white text-black appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 '
                           ref='cardExpiry'
                           stripe='pk_test_IER0NKJoxFDc1QzU6et0NirO00Sq7qimpy'
                           :options='options'
                           @change='expiry = $event.complete'
              />
              <card-cvc class='stripe-element card-cvc shadow bg-white text-black appearance-none border rounded w-full p-10 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 '
                        ref='cardCvc'
                        stripe='pk_test_IER0NKJoxFDc1QzU6et0NirO00Sq7qimpy'
                        :options='options'
                        @change='cvc = $event.complete'
              />
            </div>
            <div class="flex items-center justify-between">
              <button @click="register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
                focus:shadow-outline" type="button">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import { CardNumber, CardExpiry, CardCvc } from 'vue-stripe-elements-plus'

export default {
  name: 'Payment',
  props: [ 'stripe', 'options' ],
  data () {
    return {
      complete: false,
      number: false,
      expiry: false,
      cvc: false,
    }
  },
  methods: {
    update () {
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
    number () { this.update() },
    expiry () { this.update() },
    cvc () { this.update() }
  },
  components: {
    CardNumber,
    CardExpiry,
    CardCvc
  },
}
</script>
