<template>
  <div
    class="p-6 bg-gradient-to-r from-indigo-500 via-sky-800 to-transparent text-white"
  >
    <p v-if="error" class="text-red-500 text-center">Something went wrong...</p>
    <div v-if="loading" class="flex justify-center items-start min-h-screen">
      <Spinner :color="white" />
    </div>
    <div v-if="locations.length > 0" class="space-y-8">
      <div
        v-for="location in locations"
        :key="location.id"
        class="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <router-link :to="'/location/' + location.id">
          <h1 class="text-3xl font-bold mb-4 text-indigo-200">
            {{ location.name }}
          </h1>
        </router-link>
        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-4"
        >
          <div
            v-for="resident in location.residents.slice(0, showResidents)"
            :key="resident.id"
            class="flex items-center space-x-4 flex-col"
          >
            <img
              :src="resident.image"
              :alt="resident.name"
              class="w-12 h-12 rounded-full border-2 border-white"
            />
            <router-link
              :to="'/character/' + resident.id"
              class="text-blue-200 hover:underline"
            >
              {{ resident.name }}
            </router-link>
          </div>
        </div>
        <div
          v-if="location.residents.length > showResidents"
          class="text-center mt-4"
        >
          <button
            @click="showResidents += 6"
            class="text-blue-200 hover:underline"
          >
            See More
          </button>
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-12 text-xl">No locations found</div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import Spinner from "@/components/TheSpinner.vue";

const GET_LOCATIONS = gql`
  query {
    locations {
      results {
        id
        name
        type
        dimension
        residents {
          id
          name
          gender
          image
        }
      }
    }
  }
`;

export default {
  setup() {
    const { result, loading, error } = useQuery(GET_LOCATIONS);
    const locations = ref([]);
    const showResidents = ref(6); // Display 6 residents initially

    watch(result, (newValue) => {
      if (newValue && newValue.locations) {
        locations.value = newValue.locations.results;
      }
    });

    watch(error, (newError) => {
      if (newError) {
        console.error("Error fetching locations:", newError);
      }
    });

    return {
      locations,
      loading,
      error,
      showResidents,
    };
  },
  components: {
    Spinner,
  },
};
</script>

<style></style>
