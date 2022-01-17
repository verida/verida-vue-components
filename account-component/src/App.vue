<template>
  <avatar-drop-down
    :name="`Chinweike`"
    :did="`did:vda:0x472fe99271dBAdE2d3C7B64F6878318287852979`"
    :logout="() => {}"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AvatarDropDown from "./components/AvatarDropDown.vue";

export default defineComponent({
  name: "App",
  components: {
    AvatarDropDown,
  },
});
</script>

