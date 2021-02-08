<template>
  <img class="ccy_img" v-if="iconPath" :src="getImgUrl(iconPath)" alt="ccy" />
</template>
<script lang="ts">
import { CCY_ICONS } from "@/constant/icons";
import { defineComponent } from "vue";

interface CCYiconProps {
  iconPath?: string;
}
export default defineComponent({
  name: "CCYicon",
  props: {
    ccy: String
  },

  data: function() {
    return {
      iconPath: ""
    } as CCYiconProps;
  },

  watch: {
    ccy: {
      handler: function() {
        this.iconPath = this.ccy ? `${CCY_ICONS[this.ccy]}` : "";
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    getImgUrl(iconPath: string) {
      const images = require.context("../assets/", false, /\.png$/);
      return images("./" + iconPath);
    }
  }
});
</script>

<style lang="scss">
@import "../scss/_variables.scss";

.ccy_img {
  width: 25px;
  height: 25px;
  border: 2px solid $itemBorder;
  border-radius: 50%;
  margin: 0 5px;
  box-sizing: border-box;
}
</style>
