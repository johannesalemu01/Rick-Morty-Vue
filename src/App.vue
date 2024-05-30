<template>
  <div class="flex relative">
    <TheNavigation />
  </div>
  <div class="w-5/6 ml-1/6 pb-96 h-96 flex flex-col">
    <router-view class="flex-grow" />
    <Thefooter class=" " />
  </div>
</template>
<script>
import TheNavigation from "@/components/TheNavigation.vue";
import Thefooter from "@/components/TheFooter.vue";
export default {
  components: {
    TheNavigation,
    Thefooter,
  },
  name: "App",
  setup() {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
