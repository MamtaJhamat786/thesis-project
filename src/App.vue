<template>
  <div id="nav">
    <Navbar />
  </div>
  <router-view/>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
