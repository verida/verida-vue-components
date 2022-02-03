
<template>
  <div class="login-container">
    <div class="loader" v-if="isLoading">
      <pulse-loader :loading="isLoading" />
    </div>
    <div class="connect" v-else>
      <div class="loader" v-if="isLoading">
        <pulse-loader :loading="isLoading" />
      </div>
      <img src="https://assets.verida.io/verida_logo.svg" alt="verida-btn" />
      <h3>Verifiable Credentials Demo</h3>
      <p>Use the button below to connect with Verida Vault</p>
      <button @click="connect">
        <img
          src="https://assets.verida.io/connect_with_verida_dark.png"
          alt="verida-btn"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Connect",
  props: {
    styles: {
      type: String,
      required: false,
    },
    onSuccess: {
      type: Function,
      required: true,
    },
    onError: {
      type: Function,
      required: true,
    },
    contextName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    loaderIconColor: {
      type: String,
      required: false,
    },
  },
  components: {
    PulseLoader,
  },
  data() {
    return {
      isLoading: false,
      error: {},
    };
  },
  methods: {
    async connect() {
      this.isLoading = true;
      try {
        if (!this.contextName) {
          return (this.error = "Context Name is required");
        }
        //@ts-ignore
        await this.$VeridaHelper.connect({
          contextName: this.contextName,
          logo: this.logo,
        });
        //@ts-ignore
        this.onSuccess(this.$VeridaHelper.context);
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    handleError(error: any) {
      this.error = error;
      this.onError(this.error);
    },
  },
});
</script>

<style scoped>
.login-container {
  text-align: center;
  width: 744px;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  background: #ffffff;
  padding: 0 1.5rem;
  margin: auto;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  margin: 8rem auto;
}

@media (max-width: 768px) {
  .login-container {
    width: 83%;
    margin: 8rem auto;
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.connect > * {
  margin: 0.7rem 0;
}
.connect h3 {
  font-weight: 600;
  font-size: 2.5rem;
}

.connect p {
  word-break: inherit;
}

.connect button {
  background: transparent;
  outline: none;
  border: none;
}

.connect {
  padding: 1rem 0;
  height: 20rem;
}
.loader {
  padding: 1rem 0;
  height: 20rem;
}
</style>