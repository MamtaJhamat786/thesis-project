import { auth, database } from "../../../firebase.js";
import axios from "axios";
import router from "../../router";

let timer;

export default {
  namespaced: true,
  state() {
    return {
      userId: "",
      token: "",
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
    },
  },
  actions: {
    login(context, payload) {
      const email = payload.email;
      const actionCodeSettings = {
        url: `${location.origin}/login`,
        handleCodeInApp: true,
      };
      auth
        .sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          localStorage.setItem("emailForSignIn", email);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    auth(context, payload) {
      auth.signInWithEmailLink(payload.email, payload.url).then((res) => {
        axios
          .post(
            "https://securetoken.googleapis.com/v1/token?key=AIzaSyBmceXJiUWmO9bn9rvyM6MWV7Htb9th7UU",
            {
              grant_type: "refresh_token",
              refresh_token: res.user.refreshToken,
            }
          )
          .then((res) => {
            const expiresIn = +res.data.expires_in * 1000;
            const expirationDate = new Date().getTime() + expiresIn;
            const token = res.data.id_token;
            const userId = res.data.user_id;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("tokenExpiration", expirationDate);

            database.ref("users/" + userId).once("value", (snapshot) => {
              if (!snapshot.exists()) {
                database.ref("users/" + userId).set({
                  email: localStorage.getItem("emailForSignIn"),
                });
              }
            });

            timer = setTimeout(function() {
              context.dispatch("autoLogout");
            }, expiresIn);

            context.commit("setUser", {
              token: token,
              userId: userId,
            });
            router.push("/groups");
          });
      });
    },
    tryLogin(context) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const tokenExpiration = localStorage.getItem("tokenExpiration");

      const expiresIn = +tokenExpiration - new Date().getTime();

      if (expiresIn < 0) {
        return;
      }

      timer = setTimeout(function() {
        context.dispatch("autoLogout");
      }, expiresIn);

      if (token && userId) {
        context.commit("setUser", {
          token: token,
          userId: userId,
        });
      }
    },
    logout(context) {
      localStorage.removeItem("emailForSignIn");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      clearTimeout(timer);
      router.push("/");
      context.commit("setUser", {
        token: null,
        userId: null,
      });
    },
    autoLogout(context) {
      context.dispatch("logout");
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
};
