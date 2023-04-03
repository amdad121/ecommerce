<script>
    export default {
        data: function () {
            return {
                auth: {},
                access: false,
                error: '',
            }
        },
        created: function () {
            this.getAuth()
        },
        methods: {
            getAuth: function () {
                axios.get('user')
                    .then(response => {
                        this.auth = response.data
                        // if (response.data.role.id == 1) {
                        //     this.access = true
                        // }
                    })
                    .catch(error => {
                        if (error.response) {
                            this.error = error.response.message
                        }
                    })
            },
            logOut: function () {
                axios.post('logout')
                    .then(response => {
                        if (response.status == 200) {
                            localStorage.removeItem('token')
                            this.$router.push({ name: 'home', params: { success: response.data.message }})
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            this.error = error.response.message
                        }
                    })
            }
        }
    }
</script>

<template>
<div>
    <div>
        {{ auth.name }}
    </div>
    <button @click="logOut()">Logout</button>
</div>
</template>

<style scoped>
</style>