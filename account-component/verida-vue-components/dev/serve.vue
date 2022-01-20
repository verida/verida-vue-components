<script lang="ts">
import { defineComponent } from "vue";
//@ts-ignore
import VeridaVueComponents from "@/verida-vue-components.vue";

export default defineComponent({
  name: "ServeDev",
  components: {
    VeridaVueComponents,
  },
  data() {
    return {
      contextName: "Verida: Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    onSuccess(response: any) {
      console.log("App Context", response);
    },
    onError(error: Error) {
      console.log("Login Error", error);
    },
  },
});
</script>

<template>
  <div id="app">
    <verida-vue-components
      :logo="logo"
      :contextName="contextName"
      :onError="onError"
      :onSuccess="onSuccess"
    />
  </div>
</template>
