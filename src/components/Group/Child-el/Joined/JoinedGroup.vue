<template>
  <li class="list-group-item">
    <h5>{{ groupName }}</h5>
    <p>{{ groupDesc }}</p>
    <button class="btn btn-danger" @click="leave">Leave</button>
  </li>
</template>

<script>
import { database } from "../../../../../firebase.js";
export default {
  name: "JoinedGroup",
  props: {
    id: String,
    masterId: String,
    idx: Number,
    groupDesc: String,
    groupName: String,
    groupUsers: Object,
  },
  methods: {
    leave() {
      const userId = localStorage.getItem("userId");
      database
        .ref("users/" + userId + "/groups")
        .child(this.masterId)
        .remove()
        .catch((err) => console.log(err));
      database.ref("groups").once("value", (snap) => {
        snap.forEach((element) => {
          if (element.val().groupUsers) {
            Object.keys(this.groupUsers).forEach((element) => {
              console.log(element);
            });
          }
        });
      });
      this.$store.dispatch("deleteJoinedGroup", this.idx);
    },
  },
};
</script>

<style></style>
