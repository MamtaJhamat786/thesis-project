<template>
<div>
  <div id="nav">
    <Navbar />
  </div>
  <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navigation/Navbar.vue';
export default {
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch('auth/tryLogin');
    this.$store.dispatch('getAllGroups');
    this.$store.dispatch('getAllEvents');
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.$store.dispatch('getAllJoinedGroups');
    }
  }
}
</script>

<style lang="scss">
:root {
  --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --msger-bg: #fff;
  --border: 2px solid #ddd;
  --left-msg-bg: #ececec;
  --right-msg-bg: #579ffb;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
