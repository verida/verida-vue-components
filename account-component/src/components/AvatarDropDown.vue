<template>
  <div class="user-menu-widget">
    <span>{{ name }}</span>
    <div class="m-dropdown">
      <div
        @click="toggleDropdown"
        :class="['m-dropdown-top', isOpened && 'show']"
      >
        <img height="40" v-if="avatar" alt="user-avatar" :src="avatar" />
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
              :href="`http://accounts.verida.io/${did}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ truncateDID(did) }}</a
            >

            <img
              height="20"
              @click="clipboard(did)"
              src="@/assets/images/copy.png"
              alt="icon"
              title="Copy to clipboard"
            />
          </span>
        </div>
        <div @click="disconnect">
          <span>
            Log out
            <img height="20" src="@/assets/images/logout.svg" alt="icon"
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserMenu",
  components: {},
  data() {
    return {
      isOpened: false,
    };
  },
  props: {
    className: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    did: {
      type: String,
      required: true,
    },
    logout: {
      type: Function,
      required: true,
    },
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
      return did.slice(0, 13);
    },
  },
});
</script>
