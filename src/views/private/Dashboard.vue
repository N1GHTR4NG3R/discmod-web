<template>
  <div class="wrapper">
    <h2>Welcome {{ user.name }}</h2>
    <p>Select the guild you wish to manage</p>
    <div class="guildDivs">
      <ul>
        <li
          v-for="owner in filteredGuilds"
          v-bind:key="owner"
          class="guildList"
        >
          <img
            :src="`https://cdn.discordapp.com/icons/${owner.id}/${owner.icon}.png`"
          />
          <p>{{ owner.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {},
  methods: {},
  data: function () {
    return {
      user: this.$store.state.user,
      guilds: this.$store.state.guilds,
    };
  },
  computed: {
    filteredGuilds() {
      return this.guilds.filter((owner) => {
        return owner.owner;
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  text-align: center;
  padding-top: 30px;
}
.wrapper h2 {
  padding-bottom: 30px;
  font-size: 2em;
  color: white;
  font-family: 'Roboto', sans-serif;
}
.wrapper p {
  font-size: 1.3em;
  color: white;
  font-family: 'Nunito Sans', sans-serif;
}
.guildDivs {
  display: flex;
  align-items: center;
  justify-content: center;
}
.guildList {
  flex-grow: 1;
  float: left;
  flex-basis: 0;
  padding: 20px;
  margin-left: 10px;
  text-align: center;
  line-height: 30px;
  color: white;
  list-style-type: none;
  font-family: 'Nunito Sans', sans-serif;
}
</style>
