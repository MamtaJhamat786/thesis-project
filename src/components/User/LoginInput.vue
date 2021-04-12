<template>
  <div class="border border-secondary p-5">
    <div v-if="showAskForMail">
      <h2 class="mb-5">Log In</h2>
      <input
        type="email"
        class="form-control mb-4"
        placeholder="Your  email"
        aria-label="Username"
        aria-describedby="addon-wrapping"
        v-model="email"
      />
      <button class="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="login()">Let's start</button>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Notification</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h4>Check {{ email }} mailbox, you have there authentication link.</h4>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="Okay">OK</button>
        
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isSuccess">
      <h2>You are logged in</h2>
    </div>
    <div v-else-if="isBoth">
      <h2>Loading........</h2>
    </div>
  </div>
</template>

<script>
import { auth } from "../../../firebase.js";
export default {
  name: "LoginInput",
  data() {
    return {
      email: "",
      showAskForMail: false,
      isSuccess: false
    };
  },

  created() {
    const url = location.href;
    const email = localStorage.getItem("emailForSignIn");
    if (auth.isSignInWithEmailLink(url) && email) {
      this.$store.dispatch("auth/auth", { url, email });
      this.isSuccess = true
     
    } else {
      this.showAskForMail = true;
    }
  },
  methods: {
    login() {
      let email = this.email;
      this.$store.dispatch("auth/login", { email: email });
    },
    continueWithSignIn() {
      auth.signInWithEmailLink(this.email, location.href);
    },
    Okay(){
      this.showAskForMail = false;
      this.isSuccess = false
    },

    isBoth(){
      if (!this.showAskForMail && !this.isSuccess) {
        return true
      } else return false
    }
  },
};
</script>

<style></style>
