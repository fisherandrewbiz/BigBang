<template>
    <div class="signin">
    </div>
</template>

<script>
export default {
    name: 'Signin',
    data() {
        return {
            email: '',
            password: '',
            errors: {}
        }
    },
    computed: {
        isDisabled() {
            return !this.email.length || !this.password.length;
        }
    },
    methods: {
        signin() {
            this.errors = {};
            this.$http.post('/api/signin', {
                email: this.email,
                password: this.password
            })
                .then((res) => {
                    this.$store.dispatch('setToken', res.data.token);
                    this.$router.push('/').catch(() => {});
                })
                .catch((err) => {
                    this.errors = err.response.data;
                })
        }
    }
}
</script>

<style>

</style>