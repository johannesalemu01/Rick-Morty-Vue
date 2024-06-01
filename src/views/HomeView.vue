<script>
import TheHero from "@/components/TheHero.vue";
import { computed } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import Spinner from "@/components/TheSpinner.vue";

const GET_DATA = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
    episodes {
      results {
        id
        name
      }
    }
    locations {
      results {
        id
        name
      }
    }
  }
`;

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_DATA);
    const characters = computed(() => result.value?.characters?.results || []);
    const episodes = computed(() => result.value?.episodes?.results || []);
    const locations = computed(() => result.value?.locations?.results || []);

    return {
      characters,
      episodes,
      locations,
      loading,
      error,
    };
  },
  components: {
    Spinner,
    TheHero,
  },
};
</script>
<template>
  <div class="flex flex-col">
    <TheHero title="Rick And Morty" />
    <div class="bg-[url('/src/assets/background.gif')]">
      <div
        class="p-4 w-11/12 mx-auto min-h-screen bg-[url('/src/assets/background.gif')]"
      >
        <p v-if="error" class="text-red-500 text-center">
          Something went wrong...
        </p>
        <div v-if="loading" class="flex justify-center mt-8 min-h-screen">
          <Spinner />
        </div>
        <div v-if="!loading && !error">
          <section class="mb-8">
            <h1 class="text-3xl font-bold text-center mb-4 text-white">
              Characters
            </h1>
            <ul
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <li
                v-for="character in characters"
                :key="character.id"
                class="bg-gradient-to-bl from-breeze via-transparent to-titlecol p-8 rounded-xl shadow-2xl hover:scale-105 delay-100"
              >
                <router-link
                  :to="'/character/' + character.id"
                  class="flex items-center text-white"
                >
                  <img
                    :src="character.image"
                    :alt="character.name"
                    class="w-20 h-20 rounded-full mr-4"
                  />
                  <span class="text-lg font-semibold">{{
                    character.name
                  }}</span>
                </router-link>
              </li>
            </ul>
          </section>
          <section class="mb-8">
            <h1 class="text-3xl font-bold text-center mb-4 text-white pt-4">
              Episodes
            </h1>
            <ul
              class="list-none list-inside grid grid-cols-3 gap-6 bg-gradient-to-bl from-ocean via-transparent to-breeze"
            >
              <li
                v-for="episode in episodes"
                :key="episode.id"
                class="bg-transparent p-8 rounded-lg shadow-lg mb-2 border border-green-500"
              >
                <router-link
                  :to="'/episode/' + episode.id"
                  class="text-white hover:text-breeze"
                >
                  Episode {{ episode.id }}: {{ episode.name }}
                </router-link>
              </li>
            </ul>
          </section>
          <section>
            <h1 class="text-3xl font-bold text-center mb-4 text-white">
              Locations
            </h1>
            <ul
              class="list-none list-inside grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <li
                v-for="location in locations"
                :key="location.id"
                class="p-8 cursor-pointer rounded-lg shadow-xl mb-2 hover:scale-105 bg-gradient-to-br from-transparent via-sky-400 via-black to-transparent to-40%"
              >
                <router-link
                  :to="'/location/' + location.id"
                  class="text-white hover:underline"
                >
                  {{ location.name }}
                </router-link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
