import { createStore } from 'vuex';
import axios from 'axios';
import config from '../utils/config.json';

export default createStore({
  state: {
    user: {
      name: '',
      discriminator: '',
      id: '',
      avatar: '',
      loggedIn: false,
      token: '',
      refreshToken: '',
      expires: 0,
    },
    guilds: {},
  },
  getters: {},
  mutations: {
    setUser(state, userInfo) {
      state.user.token = userInfo.accessToken;
      state.user.refreshToken = userInfo.refreshToken;
      state.user.expires = userInfo.expiry;
      state.user.name = userInfo.name;
      state.user.discriminator = userInfo.discriminator;
      state.user.id = userInfo.id;
      state.user.avatar = userInfo.avatar;
      state.user.loggedIn = true;
    },
    setGuilds(state, userGuilds) {
      state.guilds = userGuilds;
    },
    setSession(userInfo, userGuilds) {
      sessionStorage.setItem('name', userInfo.name);
      sessionStorage.setItem('discriminator', userInfo.discriminator);
      sessionStorage.setItem('id', userInfo.id);
      sessionStorage.setItem('avatar', userInfo.avatar);
      sessionStorage.setItem('token', userInfo.accessToken);
      sessionStorage.setItem('refreshToken', userInfo.refreshToken);
      sessionStorage.setItem('expires', userInfo.expiry);
      sessionStorage.setItem('guilds', JSON.stringify(userGuilds));
    },
    setState(state) {
      state.user.name = sessionStorage.getItem('name');
      state.user.discriminator = sessionStorage.getItem('discriminator');
      state.user.id = sessionStorage.getItem('id');
      state.user.avatar = sessionStorage.getItem('avatar');
      state.user.token = sessionStorage.getItem('token');
      state.user.refreshToken = sessionStorage.getItem('refreshToken');
      state.user.expires = sessionStorage.getItem('expires');
      state.guilds = JSON.parse(sessionStorage.getItem('guilds'));
    },
  },
  actions: {
    async login(info, code) {
      try {
        // Get URL CODE and send back to get token
        const formData = new URLSearchParams({
          client_id: config.clientId,
          client_secret: config.clientSecret,
          grant_type: 'authorization_code',
          code: code.toString(),
          redirect_uri: 'http://localhost:8080/login/callback',
        });

        const response = await axios.post(
          'https://discord.com/api/v10/oauth2/token',
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        // Use token to get user details
        const userResponse = await axios.get(
          'https://discord.com/api/v10/users/@me',
          {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          }
        );

        const userGuildResponse = await axios.get(
          'https://discord.com/api/v10/users/@me/guilds',
          {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          }
        );

        // build passable object to store
        const userInfo = {
          name: userResponse.data.username,
          discriminator: userResponse.data.discriminator,
          id: userResponse.data.id,
          avatar: userResponse.data.avatar,
          loggedIn: response.data.access_token,
          accessToken: response.data.access_token,
          expiry: response.data.expires_in,
          refreshToken: response.data.refresh_token,
        };

        // Assign guilds data to object
        const userGuilds = userGuildResponse.data;

        // Update State
        info.commit('setUser', userInfo);
        info.commit('setGuilds', userGuilds);

        // Update session for persistence
        info.commit('setSession', userInfo, userGuilds);
      } catch (err) {
        console.log(err);
      }
    },

    async logout() {
      // Build form data
      const formData = new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        token: sessionStorage.getItem('token'),
      });

      // Revoke Token
      try {
        const response = await axios.post(
          'https://discord.com/api/v10/oauth2/token/revoke',
          formData,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }

      // Clear Session
      sessionStorage.clear();
    },

    fetchToken() {
      sessionStorage.getItem('token');
    },
  },
  modules: {},
});
