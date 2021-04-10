<template>
  <div class="card w-75 m-3 align-self-center">
          <div class="card-body">
              <h4 class="card-title">{{ title }}</h4>
              <p>Location: {{ place }}</p>
              <p>{{ desc }}</p>
              <p>Date: {{moment(date).format('DD.MM.YYYY')}}</p>
              <p>Creator of event: {{ author }}</p>
          </div>
      </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    title: String,
    desc: String,
    place: String,
    date: String,
    author: String
  },
    created() {
    this.moment = moment;
  },
}
</script>

<style>

</style>