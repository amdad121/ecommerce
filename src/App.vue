<script setup>
</script>

<template>
    <component :is="this.$route.meta.layout || 'div'">
        <router-view />
    </component>
</template>

<style scoped>
</style>
