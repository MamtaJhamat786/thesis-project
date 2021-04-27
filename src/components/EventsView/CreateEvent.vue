<template>
  <div class="row mt-3 ">
    <div class="d-flex">
      <button
        class="btn btn-lg ms-auto btnzzz mt-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="showModal = true"
        name="createevent"
      >
        Create an event!
      </button>
    </div>
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
            <h5 class="modal-title" id="exampleModalLabel">Create Event</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="onSubmit">
              <input
                class="form-control mb-2"
                type="text"
                placeholder="Event name"
                aria-label="default input example"
                v-model="form.eventTitle"
              />

              <span>Choose a date for event</span>
              <Datepick class="mb-2" v-model="form.eventDate" />

              <input
                class="form-control"
                type="text"
                placeholder="Place of an event"
                aria-label="default input example"
                v-model="form.eventPlace"
              />

              <textarea
                name="description"
                class="form-control mt-3"
                placeholder="Describe an event you want to create.."
                cols="30"
                rows="10"
                v-model="form.eventDesc"
              ></textarea>
              <button
                type="submit"
                class="btn btn-success mt-3"
                id="saveButton"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepick from "./Datepick.vue";
export default {
  name: "CreateEvent",
  components: {
    Datepick
  },
  data() {
    return {
      form: {
        eventTitle: "",
        eventPlace: "",
        eventDesc: "",
        eventDate: new Date().toISOString(),
        eventAuthor: localStorage.getItem("emailForSignIn")
      }
    };
  },
  methods: {
    onSubmit() {
      let form = this.form;
      this.$store.dispatch("submitEvent", form).then(() => {
        let button = document.getElementById("saveButton");
        button.setAttribute("data-bs-dismiss", "modal");
        button.click();
        this.form.eventTitle = "";
        this.form.eventPlace = "";
        this.form.eventDesc = "";
        this.form.eventDate = new Date().toISOString();
        this.form.eventAuthor = localStorage.getItem("emailForSignIn");
        button.removeAttribute("data-bs-dismiss", "modal");
      });
    }
  }
};
</script>

<style scoped>
.btnzzz {
  color: black;
  background-color: #ec4f70;
  font-weight: bolder;
}
</style>
