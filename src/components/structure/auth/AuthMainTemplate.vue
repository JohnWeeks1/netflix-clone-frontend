<template>
    <div>
        <Nav/>
        <div class="pt-32 pb-48 min-h-screen">
            <div class="w-full p-6 flex justify-center items-center">
                <div class="w-full max-w-sm">
                    <div class="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-opacity-25">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/structure/Nav";

export default {
    name: 'AuthMainTemplate',
    components: { Nav }
}
</script>