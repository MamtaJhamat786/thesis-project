<template>
  <div class="b-row d-lg-flex">
    <div class="col-lg-8 mt-2">
      <form class="d-flex">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    <div class="col-lg-4 mt-2">
      <button
        type="button"
        class="btn btn-primary ms-2"
        @click="!joined ? $emit('joined') : $emit('main')"
      >
       {{joined ? 'Groups' : 'Joined Groups'}}
      </button>
      <button
        type="button"
        class="btn btn-primary ms-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
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
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="createGroup()">
                <input
                  class="form-control"
                  type="text"
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

                <button type="submit" class="btn btn-success mt-3" id="saveButton">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
      this.$store.dispatch("addGroup", {
        name: this.form.groupTitle,
        desc: this.form.groupDesc,
      });
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

<style></style>
