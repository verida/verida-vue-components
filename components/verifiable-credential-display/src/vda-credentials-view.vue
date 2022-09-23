<template>
  <div class="vda-vc-display" :style="styles">
    <div class="vda-vc-content" v-for="(value, key) in credential" :key="key">
      <h2>{{ caseBreakTitle(key) }}:</h2>
      <p>{{ value }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as _ from "underscore";
import { keysToTitle } from "./helpers";

interface IData {
  credential: any;
}

export default /*#__PURE__*/ defineComponent({
  name: "VerifiableCredentialDisplay", // vue component name
  props: {
    data: {
      type: Object,
      required: true,
    },
    schema: {
      type: Object,
      required: false,
      default: {},
    },
    styles: {
      type: Object,
      required: false,
    },
  },
  data(): IData {
    return {
      credential: {},
    };
  },
  computed: {},
  beforeMount() {
    if (this.schema.properties) {
      if (this.schema.layouts.view) {
        let fields = this.schema.layouts.view;

        // extract layouts views defined matching object  from schema properties
        const layoutViews = _.pick(this.schema.properties, ...fields);

        // get the object keys
        const layoutViewKeys = _.allKeys(layoutViews);

        //use object keys to filter our layout views keys/values only
        this.credential = _.pick(this.data, ...layoutViewKeys);
      }
    } else {
      this.credential = this.data;
    }
  },
  methods: {
    caseBreakTitle(str: string) {
      return keysToTitle(str);
    },
  },
});
</script>
<style scoped>
.vda-vc-display {
  font-family: "Sora", sans-serif;
  line-height: 150%;
  color: #060520;
}

.vda-vc-display h2 {
  font-weight: 600;
  font-size: 1rem;
}

.vda-vc-content {
  display: grid;
  grid-template-columns: 0.1fr 0.1fr;
}

.vda-vc-content h2,
p {
  min-width: 8rem;
}
</style>
