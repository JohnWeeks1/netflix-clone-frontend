<template>
    <div>
        <div class="mt-20"></div>
        <div v-if="!isLoaded">
            <PageLoader/>
        </div>
        <div class="w-full max-w-lg mx-auto">
            <h1 class="text-2xl pb-4">My Details</h1>
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="label">First Name</label>
                    <input v-model="firstName" class="input" type="text">
                    <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="label">Last Name</label>
                    <input v-model="lastName" class="input" type="text">
                </div>
            </div>
            <button class="red-button hover:bg-red-700">Update Details</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MovieLibrary',
    data() {
        return {
            isLoaded: false,
            firstName: null,
            lastName: null
        }
    },
    mounted() {
        this.userDetails()
    },
    methods: {
        userDetails() {
            this.firstName = this.$store.getters['user/getFirstName'];
            this.lastName  = this.$store.getters['user/getLastName'];

            if (this.firstName !== null && this.lastName !== null)  {
                setTimeout(() => { this.isLoaded = true }, 1000)
            }
        }
    },
};
</script>
