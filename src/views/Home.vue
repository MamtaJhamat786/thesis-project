<template>
  <div class="home">
    <div class="intro d-flex flex-column align-items-start">
      <p class="intro-text">
        Connect with University People and solve your problems
      </p>
      <button class="btn rounded-pill btn-lg" @click="Join">Join Now!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      loggedin: false

    }

  },
  components: {},
  methods:{
    Join(){
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
.home {
  background-image: url("../assets/friends_forever.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
}
.intro {
  position: absolute;
  left: 40px;
  top: 120px;
}

.intro-text {
  font-size: xx-large;
  font-weight: bold;
  color: black;
}

.btn {
  color: black;
  background-color: #ec4f70;
  font-weight: bolder;
  font-size: x-large;
}
</style>
