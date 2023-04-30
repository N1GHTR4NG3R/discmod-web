<template>
  <div>
    <h2>Loading...</h2>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  name: 'Callback',
  components: {},
  mounted() {
    window.addEventListener('load', () => this.processLogin());
  },
  methods: {
    processLogin() {
      const code = new URLSearchParams(this.$route.query).get('code');
      if (!code) {
        this.$router.push({ name: 'NotAuthorized' });
      } else {
        try {
          this.$store.dispatch('login', code);
          this.$store.watch(
            () => {
              return this.$store.state.user.loggedIn;
            },
            (newValue, oldValue) => {
              if (newValue !== oldValue) {
                this.$router.push({ name: 'Dashboard' });
              }
            }
          );
        } catch (err) {
          console.log(
            `User most likely Cancelled, or API Error: ${err.message}`
          );
          this.$router.push({ name: 'NotAuthorized' });
        }
      }
    },
  },
};
</script>

<style scoped>
div {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  color: white;
}
div h2 {
  margin-top: 20%;
  font-family: 'Roboto', sans-serif;
}
</style>
