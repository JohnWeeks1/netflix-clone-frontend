<template>
<div>
  <Nav/>
  <div class="pt-32 pb-48 min-h-screen">
    <div class="w-full p-6 flex justify-center items-center">
      <div class="w-full max-w-xs">
        <div class="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-25">
          <div class="mb-4">
            <div class="text-3xl font-bold pb-5">Welcome</div>
          </div>
          <div class="flex items-center justify-between">
            <router-link :to="{ name: 'MovieLibrary' }" class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none
              focus:shadow-outline" type="button">
              Click to enter
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>
