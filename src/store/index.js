import { createStore } from "vuex";
import authModule from "./modules/auth.js";
import axios from "axios";
import { database } from "../../firebase.js";

export default createStore({
  state: {
    allGroups: [],
    allEvents: [],
    allJoinedGroups: [],
  },
  mutations: {
    setAllGroups(state, groups) {
      state.allGroups = groups;
    },
    addToGroups(state, group) {
      state.allGroups.push(group);
    },
    setAllEvents(state, events) {
      state.allEvents = events;
    },
    addToEvents(state, event) {
      state.allEvents.push(event);
    },
    setAllJoinedGroups(state, groups) {
      state.allJoinedGroups = groups
    },
    deleteJoinedGroup(state, deletabel) {
     state.allJoinedGroups.splice(deletabel, 1);
    }
  },
  actions: {
    getAllGroups({ commit }) {
      axios
        .get("https://connectin-5556b-default-rtdb.firebaseio.com/groups.json")
        .then((response) => {
          if (response) {
            return response.data;
          }
        })
        .then((data) => {
          const res = [];
          for (const id in data) {
            res.push({
              id: id,
              name: data[id].groupName,
              desc: data[id].groupDesc,
              users: data[id].groupUsers ? data[id].groupUsers : {}
            });
          }
          commit("setAllGroups", res);
        });
    },
    addGroup(context, payload) {
      context.commit("addToGroups", payload);
    },
    getAllEvents(context) {
      axios
        .get("https://connectin-5556b-default-rtdb.firebaseio.com/events.json")
        .then((response) => {
          if (response) {
            return response.data;
          }
        })
        .then((data) => {
          const res = [];
          for (const id in data) {
            res.push({
              id: id,
              title: data[id].eventTitle,
              desc: data[id].eventDesc,
              place: data[id].eventPlace,
              date: data[id].eventDate,
              author: data[id].eventAuthor,
            });
          }
          context.commit("setAllEvents", res);
        });
    },
    submitEvent(context, payload) {
      let form = {
        title: payload.eventTitle,
        desc: payload.eventDesc,
        place: payload.eventPlace,
        date: payload.eventDate,
        author: payload.eventAuthor,
      };
      context.commit("addToEvents", form);
      return axios
        .post(
          "https://connectin-5556b-default-rtdb.firebaseio.com/events.json",
          {
            eventTitle: payload.eventTitle,
            eventPlace: payload.eventPlace,
            eventDesc: payload.eventDesc,
            eventDate: payload.eventDate,
            eventAuthor: payload.eventAuthor,
          }
        )
        .catch((err) => {
          console.log(err);
        });
    },
    async getAllJoinedGroups(context) {
      const userId = localStorage.getItem("userId");
      const allJoined = await database.ref("users/" + userId).get();
      const allGroups = allJoined.val().groups;

      const res = [];
      for (const id in allGroups) {
      const group = await database.ref('groups/' + allGroups[id].id).get()
      let groupName = group.val().groupName
      let groupDesc = group.val().groupDesc
      let groupUsers = group.val().groupUsers
        res.push({
          id: allGroups[id].id,
          masterId: id,
          groupName: groupName,
          groupDesc: groupDesc,
          groupUsers: groupUsers
        });
      }

      context.commit("setAllJoinedGroups", res);
    },
    updateJoinedGroups(context) {
        context.dispatch('getAllJoinedGroups')
    },
    deleteJoinedGroup(context, payload) {
      context.commit('deleteJoinedGroup', payload)
    }
  },
  getters: {
    allGroups(state) {
      return state.allGroups;
    },
    allEvents(state) {
      return state.allEvents;
    },
    allJoinedGroups(state) {
      return state.allJoinedGroups
    }
  },
  modules: {
    auth: authModule,
  },
});
