<script setup>
import Bio from "@/assets/Bio.json";
const biography = Bio.actors;
</script>
<template>
  <div class="bg-midblack text-white">
    <div
      class="flex flex-col start w-10/12 mx-auto py-6"
      v-for="bio in biography"
      :key="bio.name"
    >
      <div class="flex flex-col justify-center gap-4 pb-3">
        <p class="text-3xl bg-gradient-to-tr from-breeze to-crimson py-4">
          {{ bio.name }}
        </p>
        <div class="flex justify-center items-center">
          <div class="lg:flex">
            <div
              class="flex lg:flex-col justify-center mr-3 lg:gap-5 gap-3 items-start"
            >
              <div v-for="(view, key) in bio.overview" :key="view.key">
                <p>
                  <span class="text-breeze uppercase">{{ key }} :</span>
                  {{ view }}
                </p>
              </div>
            </div>
            <img
              v-if="bio.name === 'Chris Parnell'"
              src="../assets/stars-image/Chris_Parnell.jpeg"
              class="w-60 rounded-2xl"
              :alt="bio.name"
            />
            <img
              v-if="bio.name === 'Sarah Chalke'"
              src="../assets/stars-image/Sarah_Chalke.webp"
              class="w-60 rounded-2xl"
              :alt="bio.name"
            />
            <img
              v-if="bio.name === 'Spencer Grammer'"
              src="../assets/stars-image/Spencer_Grammer.jpeg"
              class="w-60 rounded-2xl"
              :alt="bio.name"
            />
            <img
              v-if="bio.name === 'Justin Roiland'"
              src="../assets/stars-image/Justin_Roiland.avif"
              class="w-60 rounded-2xl"
              :alt="bio.name"
            />
            <img
              v-if="bio.name === 'Kari Wahlgren'"
              src="../assets/stars-image/Kari_Wahlgren.jpeg"
              class="w-60 rounded-2xl"
              :alt="bio.name"
            />
            <img
              v-if="bio.name === 'Dan Harmon'"
              src="../assets/stars-image/Dan_Harmon.jpeg"
              class="w-60 rounded-2xl"
              :alt="bio.name"
            />
            <img
              v-if="bio.name === 'Maurice LaMarche'"
              src="../assets/stars-image/Maurice_LaMarche.jpeg"
              class="w-60 rounded-2xl"
              :alt="bio.name"
            />
          </div>
        </div>
      </div>
      <p
        v-for="(miniBio, index) in bio.mini_bio"
        :key="index"
        class="text-left"
      >
        {{ miniBio }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
