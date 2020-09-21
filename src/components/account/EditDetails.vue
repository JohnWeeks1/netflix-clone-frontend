<template>
      <div>
        <div v-if="!isPending">
          <div class="w-full max-w-lg mx-auto">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  First Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
                 :value="userFirstName">
<!--                <p class="text-red-500 text-xs italic">Please fill out this field.</p>-->
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                  Last Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text"
                 :value="userLastName">
              </div>
            </div>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </div>
        </div>
        <div v-else>
          <Spinner/>
        </div>
      </div>
</template>

<script>
import Spinner from "@/components/partials/Spinner";

export default {
  name: 'MovieLibrary',
  data() {
    return {
      isPending: false,
      movies: [],
    }
  },
  methods: {
     updateUser() {
       //
    }
  },
  computed: {
    userFirstName() {
      return this.$store.getters['user/getFirstName'];
    },
    userLastName() {
      return this.$store.getters['user/getLastName'];
    }
  },
  components: {
    Spinner
  }
};
</script>
