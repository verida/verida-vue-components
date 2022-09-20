
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ServeDev",
  data() {
    return {
      contextName: "Verida: New Account Component",
      logo: "https://assets.verida.io/verida_login_request_logo_170x170.png",
      navItems: [],
      openUrl: "http://172.20.10.3:8081/",
    };
  },
  async created() {},

  methods: {
    onSuccess(response: any) {
      console.log(response);
    },
    onError() {},
    onLogout() {},

    async onLogin() {
      if (window.veridaConnect) {
        await window.veridaConnect();
      }
    },
  },
});
</script>

<template>
  <div id="app">
    <vda-account
      :logo="logo"
      :openUrl="openUrl"
      @onError="onError"
      :contextName="contextName"
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

    <button @click="onLogin">Custom Login</button>
  </div>
</template>
