<script>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ref, computed, watch } from "vue";
import Spinner from "../components/TheSpinner.vue";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        gender
        status
        species
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  }
`;

export default {
  setup() {
    const searchName = ref("");
    const selectedStatus = ref("all");
    const activeCharacter = ref(null);
    const error = ref(null);
    const loading = ref(true);
    const result = ref(null);

    const {
      result: queryResult,
      loading: queryLoading,
      error: queryError,
    } = useQuery(GET_CHARACTERS);

    watch(queryResult, (newResult) => {
      result.value = newResult;
      loading.value = false;
    });

    watch(queryError, (newError) => {
      error.value = newError;
      loading.value = false;
    });

    watch(queryLoading, (newLoading) => {
      loading.value = newLoading;
    });

    const filteredCharacters = computed(() => {
      let filtered = result.value?.characters?.results || [];
      if (searchName.value.trim() !== "") {
        filtered = filtered.filter((character) =>
          character.name.toLowerCase().includes(searchName.value.toLowerCase())
        );
      }
      if (selectedStatus.value !== "all") {
        filtered = filtered.filter(
          (character) => character.status.toLowerCase() === selectedStatus.value
        );
      }
      return filtered;
    });

    const showDetails = (character) => {
      activeCharacter.value = character;
    };

    const hideDetails = () => {
      activeCharacter.value = null;
    };

    return {
      filteredCharacters,
      loading,
      error,
      searchName,
      selectedStatus,
      showDetails,
      hideDetails,
      activeCharacter,
    };
  },
  components: {
    Spinner,
  },
};
</script>

<template>
  <div class="container bg-midblack">
    <div class="mb-1 bg-midblack">
      <div class="flex justify-evenly py-4">
        <input
          type="text"
          placeholder="Search by name"
          v-model="searchName"
          class="rounded-3xl outline-0 px-6 bg-gradient-to-r from-sky-100 to-indigo-300 text-slate-950 placeholder:text-green-800 caret-green-500 p-1.5"
        />
        <select
          v-model="selectedStatus"
          class="p-2 border border-green-300 rounded outline-0 bg-gradient-to-r from-sky-100 to-indigo-300 text-slate-950"
        >
          <option value="all">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>
    <div v-if="error" class="row">
      <div class="col-md-12 text-center mt-4">
        <p class="text-red-500">
          Error fetching characters: {{ error.message }}
        </p>
      </div>
    </div>
    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <div
        class="col-span-1"
        v-for="character in filteredCharacters"
        :key="character.id"
      >
        <router-link :to="'/character/' + character.id">
          <div class="relative overflow-hidden">
            <div
              class="card bg-cover bg-center rounded-lg shadow-md overflow-hidden cursor-pointer"
              :style="{ backgroundImage: 'url(' + character.image + ')' }"
              @mouseenter="showDetails(character)"
              @mouseleave="hideDetails"
            >
              <div
                class="details absolute bottom-0 left-0 w-full p-6 bg-gradient-to-b from-black via-midblack via-50% via-black to-transparent text-white transition duration-300 transform translate-y-full rounded-t-xl"
                :class="{ 'translate-y-0': character === activeCharacter }"
              >
                <p>Name:{{ character.name }}</p>
                <p>Gender: {{ character.gender }}</p>
                <p>Status: {{ character.status }}</p>
                <p>Location: {{ character.location.name }}</p>
                <p>Species: {{ character.species }}</p>
              </div>
              <div
                v-if="character.status === 'dead'"
                class="absolute inset-0 bg-gray-800 bg-opacity-25"
              ></div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="row" v-if="loading">
      <div class="col-md-12 text-center mt-2 flex justify-center">
        <Spinner />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: filter 0.3s ease;
  height: 300px;
}

.card-img-top {
  height: 100%;
  width: 100%;
}

.details {
  transition: transform 0.3s ease;
}

.card:hover .details {
  transform: translateY(0);
}

.filter-gray {
  filter: grayscale(100%);
}
</style>
