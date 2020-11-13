<template>
    <div>
        <Nav/>
        <div class="h-screen w-screen flex justify-center content-center flex-wrap">
            <p class="font-sans text-white error-text">404</p>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/structure/Nav";

export default {
    name: 'Footer',
    components: {
        Nav
    }
}
</script>

<style scoped>
.error-text {
    font-size: 130px;
}

@media (min-width: 768px) {
    .error-text {
        font-size: 220px;
    }
}
</style>
