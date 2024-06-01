<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    async search() {
      const trimmedQuery = this.searchQuery.trim();
      if (trimmedQuery) {
        if (trimmedQuery.toUpperCase() === "EPISODES") {
          this.$router.push({ name: "episode" });
        } else if (trimmedQuery.toUpperCase() === "LOCATIONS") {
          this.$router.push({ name: "location" });
        } else if (trimmedQuery.toUpperCase() === "CHARACTERS") {
          this.$router.push({ name: "character" });
        } else {
          this.$router.push({
            name: "searchResults",
            query: { q: trimmedQuery },
          });
        }
      }
    },
  },
};
</script>
<template>
  <div
    class="bg-gradient-to-b from-midblack to-black h-full z-10 fixed t-0 l-0 w-1/6 px-3 py-14"
  >
    <div class="flex justify-between">
      <span
        class="cursor-pointer top-4 left-2"
        @click="
          {
            this.$router.go(-1);
          }
        "
      >
        <i class="fa-solid fa-arrow-left text-titlecol text-2xl"></i>
      </span>
      <span
        class="cursor-pointer top-4 left-2"
        @click="
          {
            this.$router.go(1);
          }
        "
      >
        <i class="fa-solid fa-arrow-right text-titlecol text-2xl"></i>
      </span>
    </div>
    <router-link id="logo" to="/" class="flex flex-col gap-0 items-center"
      ><img src="@/assets/logo.png" alt="" class="w-10" />
      <img src="@/assets/rm.png" alt="" class="w-28" />
    </router-link>
    <div class="flex flex-col mt-10">
      <input
        type="text"
        placeholder="Character Name"
        v-model="searchQuery"
        @keydown.enter="search"
        class="rounded-3xl outline-0 px-6 bg-gradient-to-r from-sky-100 to-indigo-300 text-slate-950 placeholder:text-green-800 caret-green-500 p-1.5"
      />
      <nav class="flex flex-col gap-10 p-8">
        <router-link
          to="/Episode"
          exact-active-class="router-link-exact-active"
          class="text-white"
        >
          Episodes</router-link
        >
        <router-link to="/Location" class="text-white"> Locations</router-link>
        <router-link to="/Character" class="text-white">
          Characters</router-link
        >
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
