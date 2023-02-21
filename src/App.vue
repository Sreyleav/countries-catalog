<template>
  <v-app style="background-color: #fafafa">
    <div><MenuBar></MenuBar></div>
    <v-container class="mt-5">
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import MenuBar from "./components/Default/MenuBar.vue";

export default {
  components: { MenuBar },
  data: () => {
    return {};
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */

::-webkit-scrollbar-thumb {
  background: rgb(194, 190, 190);
}

/* Handle on hover */

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
