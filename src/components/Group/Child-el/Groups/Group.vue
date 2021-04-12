<template>
  <div class="col">
    <div class="card h-100 mt-5">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ description }}
        </p>
        <span v-if="Object.keys(users).length > 0">{{
          Object.keys(users).length
        }}</span>
        <button
          type="button"
          class="btn mt-2"
          :class="value ? 'btn-success' : 'btn-primary'"
          @click="joinGroup()"
        > Join group
        </button>
       
        <button type="button" class="btn btn-success ms-1 mt-2" @click="goToChat">Chat</button>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "../../../../../firebase.js";
export default {
  name: "Group",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    users: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
      value: false,
    };
  },
  mounted() {
    this.inGroup();
  },
  methods: {
    async joinGroup() {
      const userId = localStorage.getItem("userId");
      const id = this.id;
      database
        .ref("users/" + userId)
        .child("groups")
        .orderByChild("id")
        .equalTo(id)
        .once("value", (snapshot) => {
          if (!snapshot.exists()) {
            database
              .ref("users/" + userId)
              .child("groups")
              .push({ id });
            this.$store.dispatch("updateJoinedGroups");
            database.ref("groups/" + id + "/groupUsers").push({ userId });
          }
        });
    },
    inGroup() {
      const userId = localStorage.getItem("userId");
      const array = this.users;

      if (Object.keys(array).length > 0) {
        Object.values(array).forEach((element) => {
          if (element.userId === userId) {
            this.value = true;
          }
        });
      }
    },
    goToChat(){ 
      this.$router.push(`/chat/${this.title}`);
    }
  },
};
</script>

<style></style>
