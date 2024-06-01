import { createApp, provide, h } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { DefaultApolloClient } from "@vue/apollo-composable";
import router from "./router";

const apolloClient = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
});

try {
  const app = createApp({
    setup() {
      provide(DefaultApolloClient, apolloClient);
    },
    render: () => h(App),
  });

  app.use(router);
  app.mount("#app");
} catch (error) {
  console.error("Error initializing Vue app:", error);
}
