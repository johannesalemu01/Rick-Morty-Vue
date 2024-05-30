<script setup>
import { defineProps, ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Pagination,
  Navigation,
  EffectCoverflow,
  Keyboard,
  EffectFade,
  Autoplay,
} from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import starImage from "../assets/star.json";
defineProps({
  title: String,
});

const starImages = starImage.images.map((image) =>
  require(`@/assets/stars-image/${image}`)
);

const showFullText = ref(false);
const text = `Rick is a mentally-unbalanced but scientifically gifted old man who
            has recently reconnected with his family. He spends most of his time
            involving his young grandson Morty in dangerous, outlandish
            adventures throughout space and alternate universes. Compounded with
            Morty's already unstable family life, these events cause Morty much
            distress at home and school.`;

const images = [
  new URL("../assets/rm-blue.jpg", import.meta.url).href,
  new URL("../assets/wallpaper1.jpeg", import.meta.url).href,
  new URL("../assets/im10.jpeg", import.meta.url).href,
  new URL("../assets/wallpaper2.jpeg", import.meta.url).href,
];
const currentImageIndex = ref(0);
const updateBackgroundImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

let intervalId;

onMounted(() => {
  intervalId = setInterval(updateBackgroundImage, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
<template>
  <div class="bg-gradient-to-r from-slate-700 to-slate-900">
    <div class="w-11/12 mx-auto flex flex-col items-center">
      <div class="flex justify-center mt-3">
        <h1
          class="text-4xl font-mono italic font-bold bg-gradient-to-r from-sky-400 to-lime-300 bg-clip-text text-transparent"
        >
          {{ title }}
        </h1>
      </div>
      <Swiper
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }"
        :spaceBetween="30"
        :effect="'fade'"
        :loop="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :navigation="true"
        :keyboard="true"
        :pagination="{
          clickable: true,
        }"
        :modules="[
          Pagination,
          Navigation,
          Keyboard,
          EffectCoverflow,
          EffectFade,
          Autoplay,
        ]"
        class="h-100 bg-center bg-no-repeat bg-cover flex justify-center w-full pt-7 pb-2"
      >
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <div
            :style="{ backgroundImage: `url(${image})` }"
            class="swiper-background h-100 bg-no-repeat bg-center bg-cover rounded-3xl"
          ></div>
        </SwiperSlide>
      </Swiper>
      <div class="flex justify-between">
        <div
          class="flex flex-col items-start justify-center pt-2 px-6 gap-2 bg-gradient-to-bl from-transparent from-50% via-midblack to-transparent bg-gradient-to-br from-indigo-400 from-20% via-black via-60% via-titlecol via-20% via-sky-100 via-80% to-midblack rounded-xl"
        >
          <h2 class="text-lime-300 relative pb-2 text-2xl">
            Creators
            <span
              class="absolute border-t border-titlecol bottom-1 left-1 w-9/12"
            ></span>
            <span
              class="absolute border-t border-titlecol bottom-2 left-1 w-11/12"
            ></span>
          </h2>
          <ul class="flex gap-6 p-4 list-none text-gray-200">
            <li class="flex flex-col items-center gap-2 pr-4 relative">
              <div class="absolute h-full border-r border-x-sky-500 -right-1">
                <span
                  class="absolute top-1/2 -left-1.5 w-4 h-4 rounded-full border-black border bg-indigo-300"
                ></span>
              </div>
              <a href="" class="text-white">Justin Roiland </a>
              <img
                class="w-20 h-20 rounded-full"
                src="../assets/stars-image/Justin_Roiland.avif"
                alt="image of Justin_Roiland"
              />
            </li>
            <li class="flex flex-col items-center gap-2">
              <a href="" class="text-white">Dan Harmon</a
              ><img
                class="w-20 h-20 rounded-full"
                src="../assets/stars-image/Dan_Harmon.jpeg"
                alt="image of Dan Harmon"
              />
            </li>
          </ul>
        </div>
        <div class="flex flex-col justify-between w-4/12">
          <div
            class="flex flex-col items-start gap-4 text-black mt-2 text-left border-none px-6 py-4 backdrop-blur-3xl bg-gradient-to-bl from-transparent from-50% via-midblack to-transparent bg-gradient-to-br from-indigo-400 from-20% via-black via-60% via-titlecol via-20% via-sky-100 via-80% to-midblack rounded-2xl h-60"
          >
            <h2 class="text-lime-300 relative pb-2 text-2xl">
              Storyline
              <span
                class="absolute border-t border-titlecol bottom-1 left-1 w-9/12"
              ></span>
              <span
                class="absolute border-t border-titlecol bottom-2 left-1 w-11/12"
              ></span>
            </h2>
            <p
              class="w-full text-gray-200 cursor-pointer"
              @click="showFullText = !showFullText"
              :style="{ fontSize: showFullText ? '14px' : 'inherit' }"
            >
              {{ showFullText ? text : text.substring(0, 230) + "..." }}
              <span v-if="!showFullText" class="text-indigo-300"
                >Read More</span
              >
            </p>
          </div>
        </div>
        <div
          class="flex flex-col bg-gradient-to-bl from-transparent from-50% via-midblack to-transparent bg-gradient-to-br from-indigo-400 from-20% via-black via-60% via-titlecol via-20% via-sky-100 via-80% to-midblack rounded-xl justify-start gap-2 pr-3 pt-6"
        >
          <div class="flex flex-col gap-2 items-start">
            <h2 class="text-lime-300 relative pb-2 text-2xl">
              Genre
              <span
                class="absolute border-t border-titlecol bottom-1 left-1 w-9/12"
              ></span>
              <span
                class="absolute border-t border-titlecol bottom-2 left-1 w-11/12"
              ></span>
            </h2>
            <p class="text-gray-200">
              <em>Adult animated science fiction sitcom</em>
            </p>
          </div>
          <div class="flex flex-col items-start">
            <h2 class="text-lime-300">Rating</h2>
            <p class="w-full text-gray-100 flex">
              <span> ⭐️⭐️⭐️⭐️⭐️</span>
              <span class="ml-4"
                >9.1
                <a
                  href="https://www.imdb.com/title/tt2861424/"
                  target="_blank"
                  class="no-underline text-emerald-200 /"
                  >(IMDB)</a
                ></span
              >
            </p>
          </div>
        </div>
      </div>
      <div class="w-11/12 py-6">
        <div class="flex justify-between font-semibold">
          <h2 class="text-gray-200 relative pb-1 text-4xl">
            Stars
            <span
              class="absolute bottom-1 border-b w-9/12 left-0 border-titlecol"
            ></span>
            <span
              class="absolute bottom-2 border-b w-11/12 left-0 border-titlecol"
            ></span>
          </h2>
          <router-link to="/biography">
            <button
              class="p-1 bg-titlecol bg-opacity-50 rounded-3xl text-sm text-gray-100 hover:bg-opacity-80"
            >
              SeeMore
            </button>
          </router-link>
        </div>
        <div
          class="bg-gradient-to-br from-black from-10% via-teal-300 via-cyan-400 to-black"
        >
          <Swiper
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-fraction-color': '#fff',
            }"
            :effect="'coverflow'"
            :grabCursor="true"
            :centeredSlides="true"
            :loop="true"
            :autoplay="{
              delay: 3500,
              disableOnInteraction: false,
            }"
            :slidesPerView="'auto'"
            :coverflowEffect="{
              rotate: 40,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }"
            :keyboard="true"
            :navigation="true"
            :pagination="{
              clickable: true,
              bulletElement: 'button',
              // type: 'progressbar',
              type: 'fraction',
            }"
            :modules="[
              Pagination,
              Navigation,
              Keyboard,
              EffectCoverflow,
              Autoplay,
            ]"
            class="w-full pt-7 pb-2"
          >
            <SwiperSlide
              v-for="(image, index) in starImages"
              :key="index"
              class="bg-center bg-cover"
            >
              <img
                :src="image"
                :alt="'Episode ' + (index + 1)"
                class="w-full h-full inline-block"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.swiper-slide {
  width: 256px;
  height: 256px;
}
</style>
