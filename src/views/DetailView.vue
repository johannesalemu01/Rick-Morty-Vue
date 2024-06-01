<template>
  <div
    class="flex flex-col items-center bg-gradient-to-r from-midblack to-black"
  >
    <h1 class="text-4xl font-bold text-white my-8">Detail Page</h1>
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
    <div v-if="error" class="text-red-500 text-xl">{{ error }}</div>
    <div
      v-if="type === 'episode' && detail"
      class="w-11/12 md:w-2/3 lg:w-11/12 bg-sky-100 p-6 rounded-lg shadow-lg mb-8"
    >
      <h2 class="text-3xl font-bold mb-4 text-sky-800">{{ detail.name }}</h2>
      <p class="text-lg mb-2">
        <strong>Air Date:</strong> {{ detail.air_date }}
      </p>
      <p class="text-lg mb-2"><strong>Episode:</strong> {{ detail.episode }}</p>
      <h3 class="text-2xl font-semibold mt-4 mb-2">Characters</h3>
      <ul class="list-none grid grid-cols-2 items-center justify-center gap-4">
        <li
          v-for="character in detail.characters"
          :key="character.id"
          class="text-lg bg-gradient-to-tr from-midblack via-transparent to-black py-10 mx-2 rounded-md"
        >
          <p>Id:{{ character.id }}</p>
          <p>Name: {{ character.name }}</p>
          <p>Status: {{ character.status }}</p>
          <p>Gender: {{ character.gender }}</p>
        </li>
      </ul>
    </div>

    <div
      v-else-if="type === 'location' && detail"
      class="w-11/12 md:w-2/3 lg:w-11/2 bg-gradient-to-l from-cascade via-transparent via-indigo-100 to-titlecol p-8 rounded-lg shadow-lg mb-8 flex flex-col items-center"
    >
      <h2 class="text-3xl font-bold mb-4 text-sky-800">{{ detail.name }}</h2>
      <p class="text-lg mb-2"><strong>Type:</strong> {{ detail.type }}</p>
      <p class="text-lg mb-2">
        <strong>Dimension:</strong> {{ detail.dimension }}
      </p>
      <p class="text-lg mb-2"><strong>Created:</strong> {{ detail.created }}</p>
      <h3 class="text-2xl font-semibold mt-4 mb-2">Residents</h3>
      <ul class="list-none grid grid-cols-3 gap-10">
        <li
          v-for="resident in detail.residents"
          :key="resident.id"
          class="text-lg flex flex-col items-start"
        >
          <img
            :src="resident.image"
            :alt="resident.name"
            class="w-28 h-28 rounded-lg mb-3"
          />
          <p
            class="bg-clip-text text-transparent bg-gradient-to-br from-black via-white to-serenade"
          >
            <strong class="">Name:</strong> {{ resident.name }}
          </p>
          <p
            class="bg-clip-text text-transparent bg-gradient-to-br from-black via-white to-serenade"
          >
            <strong class="">Status:</strong>
            {{ resident.status }}
          </p>
          <p
            class="bg-clip-text text-transparent bg-gradient-to-br from-black via-white to-serenade"
          >
            <strong class="">Species:</strong>
            {{ resident.species }}
          </p>
          <p
            class="bg-clip-text text-transparent bg-gradient-to-br from-black via-white to-serenade"
          >
            <strong class="">Gender:</strong>
            {{ resident.gender }}
          </p>
        </li>
      </ul>
    </div>

    <!-- Character Section -->
    <div
      v-else-if="type === 'character' && detail"
      class="w-11/12 md:w-2/3 lg:w-1/2 bg-sky-50 p-6 rounded-lg shadow-lg mb-8 flex flex-col items-center"
    >
      <h2
        class="text-3xl font-bold mb-4 bg-gradient-to-r from-ocean to-breeze text-transparent bg-clip-text"
      >
        {{ detail.name }}
      </h2>
      <p class="text-lg mb-2">
        <strong>Status:</strong>
        <span
          v-if="detail.status === 'Dead'"
          class="bg-red-600 w-8 h-8 inline-block"
        ></span>
        {{ detail.status }}
      </p>
      <p class="text-lg mb-2"><strong>Species:</strong> {{ detail.species }}</p>
      <p class="text-lg mb-2"><strong>Gender:</strong> {{ detail.gender }}</p>
      <p class="text-lg mb-2">
        <strong>Origin:</strong> {{ detail.origin.name }}
      </p>
      <p class="text-lg mb-2">
        <strong>Location:</strong> {{ detail.location.name }}
      </p>
      <img :src="detail.image" :alt="detail.name" class="rounded-lg" />
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/TheSpinner.vue";

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      detail: null,
      loading: true,
      error: null,
    };
  },
  components: {
    Spinner,
  },
  mounted() {
    this.fetchDetail();
  },
  methods: {
    async fetchDetail() {
      const baseUrl = "https://rickandmortyapi.com/api";
      let url;

      if (this.type === "episode") {
        url = `${baseUrl}/episode/${this.id}`;
      } else if (this.type === "location") {
        url = `${baseUrl}/location/${this.id}`;
      } else if (this.type === "character") {
        url = `${baseUrl}/character/${this.id}`;
      } else {
        this.error = "Invalid type";
        this.loading = false;
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const detail = await response.json();
        if (detail.characters) {
          const characters = await Promise.all(
            detail.characters.map(async (characterURL) => {
              const characterResponse = await fetch(characterURL);
              if (!characterResponse.ok) {
                throw new Error(`Failed to fetch character: ${characterURL}`);
              }
              return characterResponse.json();
            })
          );
          detail.characters = characters;
        } else if (detail.residents) {
          const residents = await Promise.all(
            detail.residents.map(async (residentURL) => {
              const residentResponse = await fetch(residentURL);
              if (!residentResponse.ok) {
                throw new Error(`Failed to fetch resident: ${residentURL}`);
              }
              return residentResponse.json();
            })
          );
          detail.residents = residents;
        }
        this.detail = detail;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
