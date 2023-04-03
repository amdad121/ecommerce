<script>
export default {
    data() {
        return {
            loading: false,
            success: "",
            error: "",
            email: "",
            clientid: "",
            password: "",
            password_confirmation: "",
            errors: {},
        };
    },
    created() {
        if (this.$route.params.token) {
            this.tokenValidate(this.$route.params.token);
        }
    },
    methods: {
        tokenValidate(token) {
            const self = this;
            self.loading = true;
            axios
                .post("tokenValidate", {
                    token: token,
                })
                .then(function (res) {
                    if (res.data.result == "success") {
                        self.success = res.data.success;
                        self.clientid = res.data.clientid;
                        self.email = res.data.email;
                    } else {
                        self.$router.push({
                            name: "login",
                            params: {
                                status: "error",
                                message: res.data.message,
                            },
                        });
                    }
                    self.loading = false;
                })
                .catch(function (error) {
                    self.loading = false;
                });
        },
        passwordReset() {
            const self = this;
            self.loading = true;
            axios
                .post("resetPassword", {
                    clientid: self.clientid,
                    email: self.email,
                    password: self.password,
                    password_confirmation: self.password_confirmation,
                })
                .then((res) => {
                    console.log(res.data);
                    if (res.data.result == "success") {
                        self.$router.push({
                            name: "login",
                            params: {
                                status: "success",
                                message: res.data.message,
                            },
                        });
                    } else {
                        self.error = res.data.error;
                    }
                    self.errors = {};
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                    self.password = self.password_confirmation = "";
                    if (error.response) {
                        self.errors = error.response.data.errors;
                    }
                });
        },
    },
};
</script>

<template>
    <div v-if="clientid" class="flex justify-center items-center h-screen">
        <div class="bg-white rounded sm:p-2 w-full sm:max-w-sm m-2">
            <h2
                class="text-center border-b-2 pb-2 text-gray-800 font-medium text-2xl"
            >
                Password Reset
            </h2>
            <form @submit.prevent="passwordReset()" class="p-3">
                <div v-if="errors" class="text-center">
                    <ul v-for="(error, index) in errors" :key="index">
                        <li class="bg-red-200 text-red-700">
                            {{ error[0] }}
                        </li>
                    </ul>
                </div>
                <div>
                    <label
                        for="new-password"
                        class="block my-2 text-gray-800 select-none"
                        >New Password</label
                    >
                    <input
                        type="password"
                        v-model.trim="password"
                        class="border focus:outline-none w-full px-2 py-1 rounded"
                        id="new-password"
                    />
                </div>
                <div>
                    <label
                        for="confirm-password"
                        class="block my-2 text-gray-800 select-none"
                        >Confirm Password</label
                    >
                    <input
                        type="password"
                        v-model.trim="password_confirmation"
                        class="border focus:outline-none w-full px-2 py-1 rounded"
                        id="confirm-password"
                    />
                </div>
                <div class="mt-4">
                    <button
                        type="submit"
                        class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 flex items-center mx-auto disabled:bg-gray-400"
                        :disabled="
                            loading ||
                            password == '' ||
                            password_confirmation == ''
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
                        Confirm Reset
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>