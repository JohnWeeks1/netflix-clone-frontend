<template>
    <nav class="z-50 w-full bg-black bg-opacity-75 fixed top-0 left-0 flex items-center justify-between flex-wrap p-6">

        <!--Logo-->
        <div class="flex items-center flex-shrink-0 mr-6">
      <span class="font-semibold text-xl tracking-tight">
        <router-link :to="{ name: 'Home'}">
          <img src="@/assets/images/johnflix-logo.png" class="w-40" alt="">
        </router-link>
      </span>
        </div>
        <!--LogoEnd-->

        <!--Login-->
        <router-link v-show="!isLoggedIn" :to="{ name: 'Login'}" v-if="!isRouteNameLogin"
                     class="red-button hover:bg-red-700">
            Login
        </router-link>
        <!--LoginEnd-->

        <!--Dropdown-->
        <div v-if="isLoggedIn" class="relative inline-block text-left">
            <div>
        <span class="rounded-md shadow-sm">
          <button @click="isHidden = !isHidden" type="button" class="inline-flex justify-center w-full rounded-md px-4 py-2 text-sm leading-5 font-medium
            hover:text-gray-500 focus:outline-none transition ease-in-out" id="options-menu" aria-haspopup="true"
                  aria-expanded="true">
            {{ userFirstName }}
            <svg class="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </span>
            </div>
            <div v-if="isHidden" class="origin-top-right absolute right-0 w-40 mt-4 shadow-lg">
                <div class="rounded-md bg-black bg-opacity-75 shadow-xs" role="menu" aria-orientation="vertical"
                     aria-labelledby="options-menu">
                    <div class="py-1" @click="isHidden = !isHidden">
                        <router-link :to="{ name: 'MovieLibrary' }"
                                     class="block px-4 py-2 text-sm leading-5 hover:bg-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                     role="menuitem">Movie Library
                        </router-link>
                    </div>
                    <div class="py-1" @click="isHidden = !isHidden">
                        <router-link :to="{ name: 'EditDetails' }"
                                     class="block px-4 py-2 text-sm leading-5 hover:bg-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                     role="menuitem">Edit Details
                        </router-link>
                    </div>
                    <div class="border-t border-gray-100"></div>
                    <div class="py-1">
                        <div @click="logout"
                             class="block cursor-pointer px-4 py-2 text-sm leading-5 hover:bg-gray-700 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                             role="menuitem">Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--DropdownEnd-->

    </nav>
</template>

<script>
export default {
    name: 'Nav',
    data() {
        return {
            isHidden: false,
            errors: null
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch('user/logout')
                .then(() => {
                    this.$router.push({name: 'Home'})
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                })
        }
    },
    computed: {
        isRouteNameLogin() {
            return this.$route.name === 'Login'
        },
        isLoggedIn() {
            return this.$store.getters['user/getIsLoggedIn'];
        },
        userFirstName() {
            return this.$store.getters['user/getFirstName'];
        }
    }
}
</script>
