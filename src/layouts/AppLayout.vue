<script setup>
const name = app_name;
const year = new Date().getFullYear();
</script>

<template>
<div class="font-sans antialiased container mx-auto">
    <header class="flex bg-white py-6 border-b">
        <nav class="w-2/5">
            <ul class="flex gap-4">
                <li>
                    <router-link :to="{ name: 'home' }" active-class="border-b-2" class="p-2 hover:border-b-2">Home</router-link>
                </li>
                <!-- <li>
                    <router-link :to="{ name: 'shop' }" class="p-2 hover:border-b-2">Shop</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'about' }" class="p-2 hover:border-b-2">About</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'contact' }" class="p-2 hover:border-b-2">Contact</router-link>
                </li> -->
            </ul>
        </nav>
        <div class="w-1/5 text-center">
            <h1 class="font-bold text-xl uppercase">
                <router-link :to="{ name: 'home' }">{{ name }}</router-link>
            </h1>
        </div>
        <div class="w-auto ml-auto">
            <ul class="flex gap-4">
                <!-- <li>
                    <button type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </li> -->
                <li>
                    <router-link :to="{ name: 'login' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </router-link>
                </li>
                <!-- <li>
                    <router-link :to="{ name: 'wishlist' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>        
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'cart' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </router-link>
                </li> -->
            </ul>
        </div>
    </header>
    <slot />
    <footer class="bg-white flex justify-between py-2 border-t">
        <div>
            <p>Made with <span class="text-red-500">&hearts;</span> by <a href="http://fb.me/amdad121" class="hover:border-b" target="_blank" rel="noopener noreferrer">Amdadul Haq</a></p>
        </div>
        <div>
            <p>Copyright &copy; {{ year }} <i aria-hidden="true" class="fa fa-copyright"></i> {{ name }}. All Rights Reserved.</p>
        </div>
    </footer>
</div>
</template>

<style scoped>
</style>
