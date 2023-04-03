<script>
export default {
    name: "Reset",
    data() {
        return {
            user: {
                email: "",
            },
            success: "",
            error: "",
            loading: false,
        };
    },
    methods: {
        reset() {
            const self = this;
            self.loading = true;
            axios
                .post("reset", {
                    email: self.user,
                })
                .then(function (res) {
                    if (res.data.result == "success") {
                        self.success = res.data.message;
                        self.error = self.user.email = "";
                    } else {
                        self.error = res.data.message;
                        self.success = self.user.email = "";
                    }
                    self.loading = false;
                })
                .catch(function (error) {
                    self.loading = false;
                });
        },
    },
};
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <div class="bg-white rounded sm:p-2 w-full sm:max-w-sm m-2">
            <h2 class="text-center border-b-2 pb-2 text-gray-800 font-medium text-2xl">
                Reset Password
            </h2>
            <form @submit.prevent="reset()" class="p-3">
                <div
                    v-show="success"
                    class="text-center text-gray-700 bg-gray-200 px-3 py-2 rounded"
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
                <div class="flex justify-between items-center mt-4">
                    <router-link
                        :to="{ name: 'login' }"
                        class="text-gray-600 hover:text-gray-800"
                        >Back to Login</router-link
                    >
                    <button
                        type="submit"
                        class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 flex items-center disabled:bg-gray-400"
                        :disabled="loading || user.email == ''"
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
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>