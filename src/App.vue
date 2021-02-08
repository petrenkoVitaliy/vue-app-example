<template>
  <router-view />
</template>

<style lang="scss">
@import "./scss/_variables.scss";

body {
  margin: 0;
  height: 100vh;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  height: 100%;
  background: $backgroundColor;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $buttonColor;
  }
}
</style>
