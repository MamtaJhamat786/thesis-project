<template>

  <div class="container">
      
      <div class=" ms-5 row vh-100">
          <div class="col-6 my-auto">
              <img :src="require('../assets/loginPicture.jpg')" alt="Login" class="img-fluid img-fix">
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
/* .img-fix{
    height: 300px;
    width: 300px;
    margin-left: 3rem;
} */
/* .back-color{
  background-color: rgb(231, 168, 205);
} */


</style>