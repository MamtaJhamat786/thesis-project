<template>
  <div class="b-row d-lg-flex">
    <div class="col-lg-8 mt-4">
  
    </div>
    <div class="col-lg-4 mt-4">
      <button
        type="button"
        name="joinedgroups"
        class="btn btn-primary ms-2 btn-color"
        @click="!joined ? $emit('joined') : $emit('main')"
      >
       {{joined ? 'Groups' : 'Joined Groups'}}
      </button>

      <button
        type="button"
        class="btn btn-primary ms-2 btn-color"
        name="creategroup"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="creategroup"
      >
        Create Group
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create Group</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                name="close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createGroup()">
                <input
                  class="form-control"
                  type="text"
                  id="name"
                  placeholder="Group name"
                  aria-label="default input example"
                  v-model="form.groupTitle"
                />
                <textarea
                  name="description"
                  class="form-control mt-3"
                  placeholder="Describe a group you want to create.."
                  cols="30"
                  rows="10"
                  v-model="form.groupDesc"
                ></textarea>

                <button type="submit" class="btn btn-success mt-3" name="save" id="saveButton">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firestoredb, timestamp } from '../../../firebase';

export default {
  name: "Nav",
  props: {
    joined: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        groupTitle: "",
        groupDesc: "",
      },
    };
  },
  methods: {
    createGroup() {
      const createdAt = timestamp();
      this.$store.dispatch("addGroup", {
        name: this.form.groupTitle,
        desc: this.form.groupDesc,
        users: {}
      });
      firestoredb.collection("rooms").add({
        name: this.form.groupTitle,
        createdAt
      })
   this.axios
        .post(
          "https://connectin-5556b-default-rtdb.firebaseio.com/groups.json",
          {
            groupName: this.form.groupTitle,
            groupDesc: this.form.groupDesc,
          }
        )
        .then(() => {
          this.$emit('main')
        })
        .catch((err) => {
          console.log(err);
        });
      this.form.groupTitle = "";
      this.form.groupDesc = "";

      let button = document.getElementById('saveButton');
      button.setAttribute('data-bs-dismiss', 'modal')
      button.click();

    }
  }
};
</script>

<style>
.btn-color{
    color: black;
    background-color: #EC4F70;
}</style>
