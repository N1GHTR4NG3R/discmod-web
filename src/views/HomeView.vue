<template>
  <div>
    <h2>Hey, Thanks for visiting!</h2>

    <p>
      This website is currently in development, as such most features are
      unavailable at this point. I apologise for the inconvenience, but I hope
      you'll come back soon to check out the finished product!
    </p>

    <p>
      In the meantime however, Feel free to log in if you wish to see what
      servers you own!. Don't worry, no user information is stored outside of
      the site currently, this may change in the future though, I'll keep you
      updated.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  methods: {},
  mounted() {
    if (!sessionStorage.getItem('token')) {
      this.$store.dispatch('setState');
    }
  },
};
</script>

<style scoped>
div {
  text-align: center;
  padding-top: 30px;
  width: 80%;
  margin: 0 auto;
}
h2 {
  color: white;
  font-family: 'Roboto', sans-serif;
}
p {
  text-align: center;
  color: white;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 1.2em;
  width: 100%;
}
</style>
