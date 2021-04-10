<template>
  <div class="card">
    <div class="card-header">
      <h2>Upcoming Events</h2>
    </div>
    <Event
      v-for="(event, index) in allEvents"
      :key="index"
      :title="event.title"
      :desc="event.desc"
      :date="event.date"
      :place="event.place"
      :author="event.author"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Event from "./Event.vue";
export default {
  name: "EventList",
  components: {
    Event,
  },
  computed: {
    ...mapGetters({
      allEvents: "allEvents",
    }),
  },
};
</script>

<style scoped>
.card-header {
  background-color: #ec808d;
}
</style>
