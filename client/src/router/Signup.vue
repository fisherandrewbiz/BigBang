<template>
    <div class="signup">
    </div>
</template>

<script>
export default {
    name: 'Signup',
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
        signup() {
            this.errors = {};
            this.$http.post('/api/signup', {
                name: this.name,
                email: this.email
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

<style lang="scss">

</style>