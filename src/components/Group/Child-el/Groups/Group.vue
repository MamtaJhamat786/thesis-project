<template>
  <div class="col">
    <div class="card h-100 mt-5">
      <div class="card-body">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">
          {{ description }}
        </p>
        <button
          type="button"
          class="btn btn-info mt-2"
          :disabled="value"
          name="joinGroup"
          @click="joinGroup(), value = true"
        > {{ value ? 'Joined' : 'Join Group' }}
        </button>
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