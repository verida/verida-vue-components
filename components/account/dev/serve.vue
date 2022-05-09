
<script lang="ts">
/* eslint-disable @typescript-eslint/no-empty-interface */
import { defineComponent } from "vue";

export default defineComponent({
  name: "ServeDev",
  data() {
    return {
      contextName: "Verida: New Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
      navItems: [],
    };
  },
  async created() {},

  methods: {
    onSuccess(response: any) {
      console.log(response);
    },
    onError() {},
    onLogout() {},
  },
});
</script>

<template>
  <div id="app">
    <vda-account
      :logo="logo"
      @onError="onError"
      contextName="contextName"
      @onLogout="onLogout"
      @onConnected="onSuccess"
    />
    <vda-login
      @onError="onError"
      @onConnected="onSuccess"
      :contextName="contextName"
      :logo="logo"
      loginText="Verida Vue Component"
      @onLogout="onLogout"
    />
  </div>
</template>
