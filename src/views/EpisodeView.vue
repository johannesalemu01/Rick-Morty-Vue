<script>
import { computed } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import Spinner from "@/components/TheSpinner.vue";
import episodeData from "../assets/episode.json";

const episodeImages = episodeData.images.map((image) =>
  require(`@/assets/episode-images/${image}`)
);

const GET_EPISODES = gql`
  query {
    episodes {
      results {
        id
        name
        air_date
        episode
        characters {
          id
          name
          gender
        }
        created
      }
    }
  }
`;

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_EPISODES);

    if (error) {
      console.error("Error fetching episodes:", error);
    }

    const episodes = computed(() => result.value?.episodes?.results || []);

    return {
      episodes,
      loading,
      error,
      episodeImages,
    };
  },
  components: {
    Spinner,
  },
};
</script>

<template>
  <div class="p-4">
    <p v-if="error" class="text-red-500">
      Something went wrong: {{ error.message }}
      <span v-if="error.networkError"> (Network Error)</span>
    </p>
    <div class="row" v-if="loading">
      <div class="col-md-12 text-center mt-2 flex justify-center">
        <Spinner />
      </div>
    </div>
    <div v-if="!loading && !error">
      <h1 class="text-2xl font-bold mb-4">Episodes</h1>
      <ul class="flex flex-wrap -m-2">
        <li
          v-for="(episode, index) in episodes"
          :key="episode.id"
          class="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <router-link
            :to="'/episode/' + episode.id"
            class="block bg-ocean rounded-lg shadow hover:shadow-lg overflow-hidden"
          >
            <img
              :src="episodeImages[index]"
              :alt="'episode ' + (index + 1)"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <p class="text-lg font-semibold text-center">
                {{ episode.name }}
              </p>
              <p class="text-gray-600 text-sm text-center">
                {{ episode.air_date }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
