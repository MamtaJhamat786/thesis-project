<template>
  <li class="list-group-item">
    <h5>{{ groupName }}</h5>
    <p>{{ groupDesc }}</p>
    <button class="btn btn-danger" name="leave" @click="leave">Leave</button>
    <button type="button" class="btn btn-info ms-3" name="gotochat" @click="goToChat">Go To Chat</button>
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
   async leave() {
      const userId = localStorage.getItem("userId");
      const groupId = await database
        .ref("users/" + userId + "/groups")
        .child(this.masterId)
        .once("value")

      database
        .ref("users/" + userId + "/groups")
        .child(this.masterId)
        .remove()
        .catch((err) => console.log(err));
      
     const groupUsers = await database
        .ref("groups/" + groupId.val().id + "/groupUsers").once("value")

    groupUsers.forEach(element => {
      const usrId = element.val().userId;
      if(usrId === userId) {
       database
        .ref("groups/" + groupId.val().id + "/groupUsers").child(element.key).remove().catch((err) => console.log(err));
      }
    });

     this.$store.dispatch("deleteJoinedGroup", this.idx);
    },
    goToChat(){
      this.$router.push(`/chat/${this.groupName}`);

    }
  },
};
</script>

<style></style>
