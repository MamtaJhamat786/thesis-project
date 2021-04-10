<template>
  <div class="container">
      <div class="row vh-100">
          <div class="col-6 my-auto">
              <img :src="require('../assets/loginPicture.jpg')" alt="Login" class="img-fluid">
          </div>
          <div class="col-6 my-auto">
              <LoginInput />
          </div>
      </div>
  </div>
</template>

<script>
import LoginInput from '../components/User/LoginInput.vue';
export default {
    name: 'Login',
    components: {
        LoginInput
    }

}
</script>

<style scoped>



</style>