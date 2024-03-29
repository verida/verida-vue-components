<template>
  <div class="login-container">
    <div class="loader" v-if="isLoading">
      <div class="loader-icon">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="connect" v-else>
      <div class="loader" v-if="isLoading"></div>
      <img src="https://assets.verida.io/verida_logo.svg" alt="verida-btn" />
      <h3>{{ loginText || 'Verida SSO Login' }}</h3>
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
import { defineComponent } from 'vue';
import VeridaHelper from '../helpers/VeridaHelper';

export default /*#__PURE__*/ defineComponent({
  name: 'VdaLogin',
  emits: ['onError', 'onConnected'],
  components: {},
  props: {
    styles: {
      type: String,
      required: false,
    },
    contextName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    loginText: {
      type: String,
      required: false,
    },
    openUrl: {
      type: String,
      required: false,
      default: '',
    },
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
          return (this.error = 'Context Name is required');
        }
        await VeridaHelper.connect({
          contextName: this.contextName,
          logo: this.logo,
          openUrl: this.openUrl,
        });

        await VeridaHelper.getProfile();

        // initialize profile event listener
        VeridaHelper.initProfileEvent();

        this.$emit('onConnected', VeridaHelper.context);
      } catch (error) {
        this.handleError(error);
      } finally {
        this.isLoading = false;
      }
    },
    handleError(error: any) {
      this.error = error;
      this.$emit('onError', this.error);
    },
    async init() {
      if (VeridaHelper.hasSession(this.contextName)) {
        await this.connect();
      }
    },
  },
});
</script>

<style scoped>
@font-face {
  font-family: 'Sora';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  src: local('Sora'), url('../assets/fonts/Sora-Regular.ttf') format('truetype'),
    url('../assets/fonts/Sora-ExtraBold.ttf') format('ttf'),
    url('../assets/fonts/Sora-ExtraLight.ttf') format('ttf'),
    url('../assets/fonts/Sora-Light.ttf') format('ttf'),
    url('../assets/fonts/Sora-Medium.ttf') format('ttf'),
    url('../assets/fonts/Sora-Regular.ttf') format('ttf'),
    url('../assets/fonts/Sora-SemiBold.ttf') format('ttf'),
    url('../assets/fonts/Sora-Thin.ttf') format('ttf');
}

.login-container {
  font-family: 'Sora', sans-serif;
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
  padding: 1rem 0;
  height: 20rem;
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

.loader-icon {
  display: inline-block;
  font-size: 0px;
  padding: 0px;
}
.loader-icon span {
  vertical-align: middle;
  border-radius: 100%;

  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 3px 2px;
  -webkit-animation: loader-icon 0.8s linear infinite alternate;
  animation: loader-icon 0.8s linear infinite alternate;
}
.loader-icon span:nth-child(1) {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
  background: rgba(0, 0, 0, 0.6);
}
.loader-icon span:nth-child(2) {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
  background: rgba(22, 13, 14, 0.8);
}
.loader-icon span:nth-child(3) {
  -webkit-animation-delay: -0.26666s;
  animation-delay: -0.26666s;
  background: rgb(14, 1, 2);
}
.loader-icon span:nth-child(4) {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
  background: rgba(27, 4, 6, 0.8);
}
.loader-icon span:nth-child(5) {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
  background: rgba(0, 0, 0, 0.4);
}

@keyframes loader {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(1, 1);
  }
}
@-webkit-keyframes loader {
  from {
    -webkit-transform: scale(0, 0);
  }
  to {
    -webkit-transform: scale(1, 1);
  }
}
</style>