<template>
  <div class="container mt-10">
    <div class="card text-center">
      <div class="card-header">{{ this.$route.params.groupName }}</div>
      <div class="card-body">
        <div class="msger-chat">
          <ChatMassage
            v-for="(message, index) in messages"
            :key="index"
            :sender="message.sender"
            :message="message.message"
            :timestamp="message.timestamp"
            :currentUser="currentUser"
          />
        </div>
      </div>
      <div class="card-footer text-muted">
        <div class="d-flex align-items-center">
          <form action="" class="form" @submit="sendMessage">
            <input
              type="text"
              class="form-control"
              v-model="message"
              placeholder="Enter message"
            />
          </form>
          <button type="submit" class="btn btn-primary ms-3" @click="sendMessage">send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMassage from "../components/Massenger/ChatMassage.vue";
import { firestoredb, timestamp } from "../../firebase";

export default {
  components: {
    ChatMassage
  },
  created() {
    let useremail = localStorage.getItem("emailForSignIn");
    useremail = useremail.split("@");
    this.currentUser = useremail[0];
  },
  mounted() {
    const roomName = this.$route.params.groupName;
    if (roomName) {
      firestoredb
        .collection("rooms")
        .where("name", "==", roomName)
        .onSnapshot(snap => {
          let documents = [];
          snap.forEach(doc => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          
          if (documents.length) {
            this.roomId = documents[0].id;
            firestoredb
              .collection("rooms")
              .doc(documents[0].id)
              .collection("messages")
              .orderBy("timestamp", "asc")
              .onSnapshot(snapshot => {
                this.messages = snapshot.docs.map(doc => doc.data());
              });
          }
        });
    }
  },
  data() {
    return {
      message: "",
      messages: [],
      roomId: "",
      currentUser: ""
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      if (this.message) {
        firestoredb
          .collection("rooms")
          .doc(this.roomId)
          .collection("messages")
          .add({
            message: this.message,
            sender: this.currentUser,
            timestamp: timestamp()
          });

          this.message = ""
      }
    }
  }
};
</script>

<style>
.mt-10 {
  margin-top: 10rem;
}
.form {
  width: 100%;
}
</style>