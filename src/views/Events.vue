<template>
  <div class="container">
      <CreateEvent />
    <div class="row mt-3">
        <div class="col">
            <EventList />
        </div>
    </div>
  </div>
</template>

<script>
import CreateEvent from '../components/EventsView/CreateEvent.vue';
import EventList from '../components/EventsView/EventList.vue'
export default {
    name: 'Events',
    components: {
        CreateEvent,
        EventList
    }
}
</script>

<style scoped>

.container{
  padding-top: 3.5rem;
}

</style>