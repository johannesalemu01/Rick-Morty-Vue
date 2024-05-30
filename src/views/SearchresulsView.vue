<template>
  <div class="p-6 bg-gradient-to-r from-brightgreen via-cascade to-transparent">
    <h1 class="text-3xl font-bold mb-4">
      Search Results for "{{ searchQuery }}"
    </h1>
    <div v-if="loading" class="text-center">
      <Spinner />
    </div>
    <div v-else>
      <div v-if="results.length === 0" class="text-center">
        No results found.
      </div>
      <div v-else>
        <ul class="space-y-4">
          <li v-for="result in results" :key="result.id">
            <router-link :to="`/${result.type}/${result.id}`">
              <h2 class="text-xl font-semibold">{{ result.name }}</h2>
            </router-link>
            <p v-if="result.type === 'episode'">
              Episode: {{ result.episode }}
            </p>
            <p v-if="result.type === 'character'">
              Status: {{ result.status }}
            </p>
            <p v-if="result.type === 'location'">
              Type: {{ result.locationType }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Spinner from "@/components/TheSpinner.vue";

export default {
  components: { Spinner },
  setup() {
    const searchQuery = ref("");
    const results = ref([]);
    const loading = ref(true);

    const fetchResults = async (query) => {
      loading.value = true;
      results.value = [];

      try {
        const characterResponse = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        if (characterResponse.ok) {
          const characterData = await characterResponse.json();
          const characterResults = characterData.results.map((character) => ({
            id: character.id,
            name: character.name,
            image: character.image,
            type: "character",
            status: character.status,
          }));
          results.value.push(...characterResults);
        }

        const episodeResponse = await fetch(
          `https://rickandmortyapi.com/api/episode/?name=${query}`
        );
        if (episodeResponse.ok) {
          const episodeData = await episodeResponse.json();
          const episodeResults = episodeData.results.map((episode) => ({
            id: episode.id,
            name: episode.name,
            type: "episode",
            episode: episode.episode,
          }));
          results.value.push(...episodeResults);
        }

        const locationResponse = await fetch(
          `https://rickandmortyapi.com/api/location/?name=${query}`
        );
        if (locationResponse.ok) {
          const locationData = await locationResponse.json();
          const locationResults = locationData.results.map((location) => ({
            id: location.id,
            name: location.name,
            type: "location",
            locationType: location.type,
          }));
          results.value.push(...locationResults);
        }
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      const query = new URLSearchParams(window.location.search).get("q");
      if (query) {
        searchQuery.value = query;
        fetchResults(query);
      }
    });

    return {
      searchQuery,
      results,
      loading,
    };
  },
};
</script>
