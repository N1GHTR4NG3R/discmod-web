<template>
  <nav>
    <div id="hamnav">
      <img alt="Discmod logo" src="@/assets/imgs/Discmod-logo.png" />
      <h1>Discmod</h1>
      <label for="hamburger" class="burger">&#9776;</label>
      <input type="checkbox" id="hamburger" />
      <ul class="hamitems">
        <li class="routerlink" v-if="$store.state.user.token">
          <router-link to="/private/dashboard">Dashboard</router-link>
        </li>
        <li class="routerlink" v-if="!$store.state.user.token">
          <router-link to="/">Home</router-link>
        </li>
        <li
          class="routerlink"
          v-on:click="joinSupport('https://discord.gg/4ndksBBcJ3')"
        >
          Support Server
        </li>
        <li class="routerlink">
          <router-link to="/servers">Public Servers</router-link>
        </li>
        <li
          class="routerlink"
          :class="{ login: !$store.state.user.token }"
          v-if="!$store.state.user.token"
          v-on:click="loginClick()"
        >
          Login
        </li>
        <li
          class="routerlink"
          :class="{ logout: $store.state.user.token }"
          v-if="$store.state.user.token"
          v-on:click="logOut()"
        >
          Logout
        </li>
      </ul>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { login } from '@/utils/auth';
export default {
  name: 'navbar',
  components: {},
  methods: {
    loginClick() {
      login();
    },
    logOut() {
      this.$store
        .dispatch('logout')
        .then(() => this.$router.push({ name: 'Home' }))
        .then(() => {
          this.$router.go();
        });
    },
    joinSupport(url) {
      window.open(url, '_blank', 'noreferrer');
    },
  },
};
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
nav {
  height: 150px;
  width: 100%;
  padding-top: 10px;
}
nav ul {
  margin: 0;
  padding: 0;
}
#hamnav {
  position: relative;
  height: 50px;
  width: 100vw;
  background: #36393e;
}
#hamnav img {
  float: left;
  padding-left: 20px;
  height: 150px;
  width: 150px;
}
#hamnav h1 {
  display: flex;
  font-family: 'Roboto', sans-serif;
  justify-content: center;
  padding-right: 160px;
  font-size: 40px;
  line-height: 50px;
  margin: 0 auto;
  padding-top: 15px;
  color: white;
}
.hamitems {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding-top: 20px;
}
.routerlink {
  flex-grow: 1;
  flex-basis: 0;
  padding: 10px;
  text-align: center;
  line-height: 30px;
  color: white;
}
a {
  display: inline-block;
  color: white;
  text-decoration: none;
  width: 100%;
  height: 100%;
}

.login {
  background-color: green;
  color: white;
}
.logout {
  background-color: red;
  color: white;
}
.routerlink:hover {
  background-color: #7289da;
  color: white;
  cursor: pointer;
}
.navcolor {
  display: inline-block;
  color: white;
  text-decoration: none;
  width: 100%;
  height: 100%;
}
.login:hover {
  background-color: lightgreen;
  color: black;
}
.logout:hover {
  background-color: lightcoral;
  color: black;
}
#hamnav label,
#hamburger {
  display: none;
}
@media screen and (max-width: 875px) {
  #hamnav label {
    display: block;
    position: absolute;
    top: -10px;
    right: 0;
    color: white;
    background: #7289da;
    height: 50px;
    width: 60px;
    font-style: normal;
    font-size: 1.8em;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    line-height: 50px;
  }
  .hamitems {
    display: none;
  }
  .hamitems .routerlink {
    box-sizing: border-box;
    display: inline-block;
    width: 85vw;
    position: relative;
    top: -60px;
    /** Fixes half the logo disappearing */
    background-color: rgba(0, 0, 0, 0);
  }
  .hamitems .routerlink:hover {
    box-sizing: border-box;
    display: inline-block;
    width: 85%;
    background-color: #7289da;
  }
  #hamnav input:checked ~ .hamitems {
    display: block;
    background-color: #36393e;
    line-height: 30px;
    text-align: center;
  }
}
</style>
