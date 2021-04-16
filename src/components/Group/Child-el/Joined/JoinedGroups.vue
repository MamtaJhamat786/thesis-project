<template>
 <div>
   <h2 class="mt-3">Joined Groups</h2>
   <div class="container">
  <div class="card mt-4">
    <ul class="list-group">
      <JoinedGroup v-for="(group, index) in allJoinedGroups" :key="index" :id="group.id" :masterId="group.masterId" :idx="index" :groupDesc="group.groupDesc" :groupName="group.groupName" :groupUsers="group.groupUsers"/>
    </ul>
  </div>
  </div>
 </div>
</template>

<script>
import { mapGetters } from "vuex";
import JoinedGroup from './JoinedGroup.vue';
export default {
  name: "JoinedGroups",
  components: {
    JoinedGroup
  },
  computed: {
    ...mapGetters({
      allJoinedGroups: 'allJoinedGroups'
    })
  }
  
};
</script>

<style scoped>
.card {
  max-width: 60rem;
}

.list-group {
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  min-width: 80%;
  max-width: 80%;
}
</style>
