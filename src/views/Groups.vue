<template>
  <div class="container mt-3">
    <Nav @joined="components='JoinedGroups'" @main="components='GroupsList'" :joined="components === 'JoinedGroups'"/>
    <div class="joined">
      <component :is="components"></component>
    </div>
  </div>
</template>

<script>
import Nav from "../components/Group/Nav.vue";
import GroupsList from "../components/Group/Child-el/Groups/GroupsList.vue";
import JoinedGroups from "../components/Group/Child-el/Joined/JoinedGroups.vue";
export default {
  name: "Groups",
  components: {
    Nav,
    GroupsList,
    JoinedGroups
  },
  data() {
    return {
      components: "GroupsList",
    }
  }
};
</script>

<style scoped>

.joined{
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.container{
  padding-top: 3.5rem;
}

</style>
