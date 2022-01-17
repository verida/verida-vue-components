<template>
  <div>
    <avatar-drop-down
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

export default defineComponent({
  name: "App",
  components: {
    AvatarDropDown,
  },
  data() {
    return {
      contextName: "Verida: Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
    };
  },
  methods: {
    onSuccess() {},
    onError() {},
  },
});
</script>

