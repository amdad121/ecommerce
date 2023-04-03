<script>
export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
            register: false,
            success: "",
            error: "",
            loading: false,
        };
    },
    created() {
        if (this.$route.params.status == "success") {
            this.success = this.$route.params.message;
            this.error = "";
        } else {
            this.error = this.$route.params.message;
            this.success = "";
        }
    },
    methods: {
        login() {
            const self = this;
            self.loading = true;
            axios.get(api_url+'/sanctum/csrf-cookie').then(response => {
                axios
                    .post("login", {
                        email: self.user.email,
                        password: self.user.password,
                    })
                    .then(function (response) {
                        if (response.status == 200) {
                            var token = response.data.split("|")[1];
                            localStorage.setItem('token', token);
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                            self.$router.push({ name: 'admin' });
                        }
                        self.user.email = self.user.password = "";
                        self.loading = self.error = false;
                    })
                    .catch(function (error) {
                        self.loading = self.success = false;
                        self.user.email = self.user.password = "";
                        if (error.response) {
                            self.error = error.response.data.message;
                        }
                    });
            });
        }
    },
};
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="sm:p-2 w-full sm:max-w-sm m-2">
            <div class="bg-white rounded">
                <h2 class="text-center border-b-2 pb-2 text-gray-800 font-medium text-2xl">
                    Login
                </h2>
                <form @submit.prevent="login()" class="p-3">
                    <div
                        v-show="success"
                        class="text-center bg-green-200 text-green-700 px-3 py-2 rounded"
                        v-text="success"
                    ></div>
                    <div
                        v-show="error"
                        class="text-center bg-red-200 text-red-700 px-3 py-2 rounded"
                        v-text="error"
                    ></div>
                    <div>
                        <label
                            for="email"
                            class="block my-2 text-gray-800 select-none"
                            >Email</label
                        >
                        <input
                            type="email"
                            v-model.trim="user.email"
                            class="border focus:outline-none w-full px-2 py-1 rounded"
                            id="email"
                        />
                    </div>
                    <div>
                        <label
                            for="password"
                            class="block my-2 text-gray-800 select-none"
                            >Password</label
                        >
                        <input
                            type="password"
                            v-model.trim="user.password"
                            class="border focus:outline-none w-full px-2 py-1 rounded"
                            id="password"
                        />
                    </div>
                    <!-- <div class="mt-2 select-none">
                    <label class="text-gray-800 flex items-center select-none">
                        <input
                            type="checkbox"
                            name="rememberme"
                            class="form-checkbox focus:shadow-none focus:border-gray-300"
                        />
                        <span class="ml-2 text-gray-600">Remember me</span>
                    </label>
                </div> -->
                    <div class="flex justify-between items-center mt-4">
                        <router-link :to="{ name: 'reset' }" class="text-gray-600 hover:text-gray-800">Forgot Password?</router-link
                        >
                        <button
                            type="submit"
                            class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 flex items-center disabled:bg-gray-400"
                            :disabled="
                                loading ||
                                user.email == '' ||
                                user.password == ''
                            "
                        >
                            <svg
                                v-if="loading"
                                class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Login
                        </button>
                    </div>
                </form>
            </div>
            <div class="text-center mt-4">
                <router-link :to="{ name: 'home' }"
                    ><i class="fas fa-arrow-circle-left fa-sm"></i> Back to
                    Home</router-link
                >
            </div>
        </div>
    </div>
</template>