<template>
  <div class="user-menu">
    <pulse-loader
      v-if="loading"
      :loading="loading"
      :color="loaderIconColor || `#000`"
    />
    <div v-else-if="connected" class="user-menu-widget" :style="styles">
      <span class="user-menu-widget-title">{{ profile.name }}</span>
      <div class="m-dropdown">
        <div
          @click="toggleDropdown"
          :class="[isOpened ? 'm-dropdown-top-active' : 'm-dropdown-top']"
        >
          <img
            height="40"
            v-if="profile?.avatar"
            alt="user-avatar"
            :src="profile.avatar"
          />
          <img
            v-else
            height="40"
            src="@/assets/images/avatar.svg"
            alt="user-avatar"
          />
        </div>
        <div v-show="isOpened" class="m-dropdown-logout">
          <div>
            <span>
              <a
                :href="`http://accounts.verida.io/${profile.did}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ truncateDID(profile.did) }}...</a
              >
            </span>
            <img
              height="20"
              @click="clipboard(profile.did)"
              src="@/assets/images/copy.png"
              alt="icon"
              title="Copy to clipboard"
            />
          </div>
          <div @click="disconnect">
            <span> Log out </span>
            <img height="20" src="@/assets/images/logout.svg" alt="icon" />
          </div>
        </div>
      </div>
    </div>
    <button v-else class="login-section" @click="login">
      <span>Login with Verida</span>
      <img alt="Vue logo" src="../assets/images/arrow.svg" />
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import VeridaHelper from "../helpers/VeridaHelper";

export default defineComponent({
  name: "UserMenu",
  components: {
    PulseLoader,
  },
  data() {
    return {
      isOpened: false,
      connected: false,
      profile: {},
      loading: false,
      error: {},
    };
  },
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
  async beforeMount() {
    await this.init();
  },
  methods: {
    clipboard(value) {
      this.$copyText(value);
    },
    toggleDropdown() {
      this.isOpened = !this.isOpened;
    },
    async disconnect() {
      await this.logout();
    },
    truncateDID(did) {
      return did && did.slice(0, 13);
    },
    async login() {
      this.loading = true;
      try {
        if (!this.contextName) {
          return (this.error = "Context Name is required");
        }
        await VeridaHelper.connect({
          contextName: this.contextName,
          logo: this.logo,
        });
        this.connected = true;
        this.onSuccess(VeridaHelper.context);
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    handleError(error) {
      this.error = error;
      this.onError(this.error);
    },
    async logout() {
      await VeridaHelper.logout();
      this.connected = false;
    },
    async init() {
      const hasSession = VeridaHelper.autoLogin();
      if (hasSession) {
        await this.login();
      }
    },
  },
  created() {
    VeridaHelper.on("profileChanged", (profile) => {
      this.profile = profile;
      this.profile.did = VeridaHelper.did;
    });

    window.addEventListener("click", () => {
      const menuElement = document.querySelector(".user-menu-widget");
      if (!menuElement && this.isOpened) {
        this.isOpened = !this.isOpened;
      }
    });
  },
});
</script>
