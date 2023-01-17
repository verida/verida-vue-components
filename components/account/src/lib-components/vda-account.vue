<template>
  <div class="vda-menu">
    <div class="loading" v-if="loading">Loading....</div>
    <div v-else-if="profile.name" class="vda-menu-widget" :style="styles">
      <div class="vda-dropdown">
        <div
          role="button"
          aria-label="menu"
          @click="toggleDropdown"
          :class="[isOpened ? 'vda-dropdown-top-active' : 'vda-dropdown-top']"
        >
          <img v-if="profile.avatar" alt="vda-avatar" :src="profile.avatar" />
          <img
            v-else
            height="40"
            :src="`${assetsOriginUrl}/avatar.svg`"
            alt="user-avatar"
          />
        </div>
        <div class="vda-dropdown-profile">
          <span>{{ profile.name }}</span>
          <span>{{ truncateDID(profile.did) }}</span>
        </div>
        <div v-show="isOpened" class="vda-dropdown-logout">
          <div role="button" @click="copyToClipBoard(profile.did)">
            <img
              :src="`${assetsOriginUrl}/icon_duplicate.svg`"
              alt="icon"
              title="Copy to clipboard"
            />
            <span>{{ isCopied ? 'Copied !' : 'Copy DID to Clip board' }} </span>
          </div>
          <div>
            <img
              role="button"
              :src="`${assetsOriginUrl}/icon_search.svg`"
              alt="icon"
              title="Copy to clipboard"
            />
            <span>
              <a
                :href="`https://verida.network/did/${profile.did}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                View DID in Account Explorer
              </a>
            </span>
          </div>
          <div v-for="nav in navItems" :key="nav.title">
            <img :src="nav.img" :alt="nav.title" :title="nav.title" />
            <span>
              <a :href="nav.link" target="_blank" rel="noopener noreferrer">
                {{ nav.title }}
              </a>
            </span>
          </div>
          <div
            role="button"
            class="vda-dropdown-logout-button"
            aria-label="button"
            @click="disconnect"
          >
            <img
              height="20"
              :src="`${assetsOriginUrl}/icon_logout.svg`"
              alt="icon"
            />
            <span> Log out </span>
          </div>
        </div>
      </div>
    </div>
      <button v-else class="login-section" @click="connect">
       <span>Verida Connect</span>
      <img alt="Vue logo"  :src="`${assetsOriginUrl}/arrow.svg`" />
    </button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VeridaHelper from '../helpers/VeridaHelper';

interface Data {
  profile: any;
  error: any;
  isOpened: boolean;
  loading: boolean;
  isCopied: boolean;
  assetsOriginUrl: string;
}

declare global {
  interface Window {
    veridaConnect: any;
  }
}

export default /*#__PURE__*/ defineComponent({
  name: 'VdaAccount',
  components: {},
  emits: ['onLogout', 'onError', 'onConnected'],
  data(): Data {
    return {
      assetsOriginUrl: 'https://assets.verida.io',
      isOpened: false,
      profile: {},
      loading: false,
      error: null,
      isCopied: false,
    };
  },
  props: {
    styles: {
      type: String,
      required: false,
    },
    navItems: {
      type: Array,
      required: false,
      default: [],
    },
    loaderIconColor: {
      type: String,
      required: false,
    },
    contextName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    openUrl: {
      type: String,
      required: false,
      default: '',
    },
  },

  async created() {
    // inject connect function to window object
    window.veridaConnect = this.connect;

    if (VeridaHelper.profile && VeridaHelper.profile.name) {
      this.profile = VeridaHelper.profile;
    }
    VeridaHelper.on('profileChanged', (profileData) => {
      this.profile = profileData;
    });

    await this.init();
  },

  methods: {
    copyToClipBoard(value: string) {
      // @ts-ignore
      this.$copyText(value);

      this.isCopied = true;

      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    },
    toggleDropdown() {
      this.isOpened = !this.isOpened;
    },
    async disconnect() {
      await this.logout();
    },
    truncateDID(did: string) {
      return did && did.slice(0, 15);
    },
    async connect() {
      this.loading = true;
      try {
        if (!this.contextName) {
          return (this.error = 'Context Name is required');
        }
        await VeridaHelper.connect({
          contextName: this.contextName,
          logo: this.logo,
          openUrl: this.openUrl,
        });
        const profileData = await VeridaHelper.getProfile();
        // initialize profile event listener
        VeridaHelper.initProfileEvent();
        this.profile = profileData;
        this.$emit('onConnected', VeridaHelper.context);
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    handleError(error: any) {
      if (error.message === 'Public database not found: profile_public') {
        this.profile.name = 'unknown';
        this.error = 'unknown';
      }

      this.$emit('onError', this.error);
    },
    async logout() {
      await VeridaHelper.logout();
      this.profile = {};
      this.$emit('onLogout');
    },
    async init() {
      if (VeridaHelper.hasSession(this.contextName) && !VeridaHelper.context) {
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

a {
  text-decoration: none;
}

.vda-menu {
  font-family: 'Sora', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-section {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  border: none;
}

.login-section > * {
  margin: 0 0.4rem;
}

.vda-menu-widget {
  font-family: 'Sora', sans-serif;
  position: relative;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vda-menu-widget-title {
  margin: 0 1.5rem;
  padding: auto;
}

.vda-dropdown-profile {
  font-family: 'Sora', sans-serif;
  margin: 0 0 0 1.4rem;
}

.vda-dropdown-profile span:nth-child(1) {
  font-weight: 800;
  font-size: 14px;
  text-align: center;
  color: #000000;
}

.vda-dropdown-profile span:nth-child(2) {
  display: block;
  font-weight: 400;
  font-size: 14px;
  line-height: 160%;
  text-align: center;
  color: #808080;
}

.vda-dropdown {
  display: flex;
  position: relative;
  z-index: 2;
}

.vda-dropdown img {
  height: 2.5rem;
  width: 2.5rem;
}

.vda-dropdown span {
  margin: 0.7rem 1rem 0 0;
}

.vda-dropdown span a {
  color: black;
  margin-left: -0.2rem;
}

.vda-dropdown-top {
  background: #3333;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.vda-dropdown-top img {
  border-radius: 50%;
}

.vda-dropdown-top-active img {
  border-radius: 50%;
}

.vda-dropdown-logout {
  font-family: 'Sora', sans-serif;
  position: absolute;
  top: 3.6rem;
  right: 0;
  width: 21rem;
  background: #ffffff;
  border: 1px solid #ededed;
  box-shadow: 0px 24px 40px rgba(6, 5, 32, 0.08);
  border-radius: 8px;
}

.vda-dropdown-logout div {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 9px 16px;
  height: 40px;
}

.vda-dropdown-logout div img {
  height: 1.3rem;
  width: 1.3rem;
  margin: 0 1.2rem -0.5rem 0;
}

.vda-dropdown-logout div:hover {
  background: rgba(12, 11, 11, 0.04);
  cursor: pointer;
}

.vda-dropdown-logout div:nth-child(2) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.vda-dropdown-logout-button {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}
</style>