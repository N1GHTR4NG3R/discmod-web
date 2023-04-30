const login = () => {
  window.location.href =
    'https://discord.com/api/oauth2/authorize?client_id=668585282630582303&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Fcallback&response_type=code&scope=identify%20guilds';
};

export { login };
