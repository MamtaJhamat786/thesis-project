<template>
<div>
  <div class="row row-cols-1 row-cols-md-3 g-4">
    <Group v-for="(group, index) in allGroups" :key="index" :title="group.name" :description="group.desc" :id="group.id" :users="group.users"/>
  </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import Group from "./Group.vue";
export default {
  name: "GroupsList",
  components: {
    Group,
  },
  computed: {
    ...mapGetters({
      allGroups: "allGroups",
    }),
  },
};
</script>

<style></style>
