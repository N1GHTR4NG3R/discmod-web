<template>
  <div>
    <h2>Sorry, You do not have authorization!.</h2>
    <p>Please return Home.</p>
    <button v-on:click="goHome()">Home</button>
  </div>
</template>
<script>
export default {
  name: 'NotAuthorized',
  components: {},
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style scoped>
h2 {
  padding-top: 30px;
  font-family: 'Roboto', sans-serif;
  color: white;
}
button {
  width: 200px;
  height: 80px;
  background-color: #7289da;
  margin-top: 20px;
}
</style>
