import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailView from "../views/DetailView.vue";
import SearchResultsView from "../views/SearchresulsView.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/Episode",
    name: "episode",
    component: () =>
      import(/* webpackChunkName: "episode" */ "../views/EpisodeView.vue"),
  },
  {
    path: "/Character",
    name: "character",
    component: () =>
      import(/* webpackChunkName: "charactetr" */ "../views/CharacterView.vue"),
  },
  {
    path: "/Location",
    name: "location",
    component: () =>
      import(/* webpackChunkName: "location" */ "../views/LocationView.vue"),
  },
  {
    path: "/:type/:id",
    name: "Detail",
    component: DetailView,
    props: (route) => ({ type: route.params.type, id: route.params.id }),
  },
  {
    path: "/search",
    name: "searchResults",
    component: SearchResultsView,
  },
  {
    path: "/biography",
    name: "biography",
    component: () =>
      import(/*webpackChunkName: "Biographgy"*/ "../views/StarBioView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
