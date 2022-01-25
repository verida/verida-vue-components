<template>
  <div>
    <!-- <avatar-drop-down
      :logo="logo"
      :contextName="contextName"
      :onError="onError"
      :onSuccess="onSuccess"
    /> -->
    <vue-chinweike
      :logo="logo"
      :contextName="contextName"
      :onError="onError"
      :onSuccess="onSuccess"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AvatarDropDown from "./components/AvatarDropDown.vue";
import { Context } from "@verida/client-ts";
import VueChinweike from "vue-chinweike";

export default defineComponent({
  name: "App",
  components: {
    // AvatarDropDown,
    VueChinweike,
  },
  data() {
    return {
      contextName: "Verida: Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    onSuccess(response: Context) {
      console.log("App Context", response);
    },
    onError(error: Error) {
      console.log("Login Error", error);
    },
  },
});
</script>

