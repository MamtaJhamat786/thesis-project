<template>
<nav class="navbar navbar-expand-lg navbar-light fixed-top">
  <!-- <div class="container"> -->
    <router-link class="navbar-brand me-5" to="/">
    <img :src="image" class="logo"/>
    </router-link>
    <!-- <router-link class="navbar-brand me-5" to="/">ConnectIn</router-link> -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ms-md-5" v-if="isAuth">
        <router-link class="nav-link ms-lg-5" to="/">Home</router-link>
        <router-link class="nav-link ms-lg-5" to="/groups">Groups</router-link>
        <router-link class="nav-link ms-lg-5" to="/events">Events</router-link>
        <router-link class="nav-link ms-lg-5" to="/about">About us</router-link>
      </div>
      <div class="navbar-nav ms-auto">
          <button v-if="isAuth" class="btn login-btn rounded-pill me-5" @click="logout()">Log out</button>
          <router-link v-else class="btn login-btn rounded-pill me-5" role="button" to="/login">Log In</router-link>
      </div>
    </div>
  <!-- </div> -->
</nav>
</template>

<script>
import image from "../../assets/ConnectInLogo.jpg"
export default {
    name: 'Navbar',
    data(){
      return{
        image: image
        
      }
    },
    computed: {
      isAuth() {
        return this.$store.getters['auth/isAuthenticated']
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout')
      }
    }
}
</script>

<style scoped>
.login-btn{
    color: black;
    background-color: #EC4F70;
}

nav{
    font-weight: bold;
    color: black;
     background-color: #EC808D;
}
.logo{
  width :80px;
  position:absolute;
  height: 50px;
  position: relative;
  margin-left: 20px;

}


</style>