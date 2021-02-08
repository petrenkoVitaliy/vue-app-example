<template>
  <div class="history_wrapper">
    <button v-on:click="toggleHistory">
      {{ opened ? "Collapse" : "Expand" }}
      History
    </button>
    <ul v-if="opened">
      <li
        v-for="(historyItem, index) in history"
        :key="index"
        v-on:click="handleHistorySelect(historyItem)"
      >
        {{ getDate(historyItem.date) }}: {{ historyItem.ccy }} to
        {{ historyItem.base_ccy }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { LocalStorageAPI } from "@/api/localstorage";
import { ConvertationResult } from "@/interfaces/convertValues.interface";
import { ROUTER_PATHS } from "@/router";
import { defineComponent } from "vue";

interface ConvertationHistoryProps {
  history: ConvertationResult[];
  opened: boolean;
}

export default defineComponent({
  name: "ConvertationHistory",

  data: function() {
    return {
      history: [],
      opened: false
    } as ConvertationHistoryProps;
  },

  beforeMount() {
    this.history = LocalStorageAPI.getConvertationHistory();
  },

  methods: {
    toggleHistory: function() {
      this.opened = !this.opened;
    },
    handleHistorySelect: function(historyItem: ConvertationResult) {
      this.$router.push({
        path: ROUTER_PATHS.CONVERTATION_RESULT,
        query: {
          amount: historyItem.amount,
          convertCCV: `${historyItem.base_ccy}_${historyItem.ccy}`
        }
      });
    },
    getDate: function(date: string) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        hour: "numeric",
        minute: "numeric"
      };

      return new Date(date).toLocaleDateString("en-US", options);
    }
  }
});
</script>

<style lang="scss">
@import "../scss/_variables.scss";

.history_wrapper {
  position: absolute;
  top: 20px;
  left: 20px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;

  > button {
    cursor: pointer;

    width: 150px;
    height: 30px;

    border: 2px solid $itemBorder;
    background: $buttonColor;
    color: $backgroundColor;
    font-weight: bold;
  }

  > ul {
    width: 240px;
    height: 200px;
    overflow: auto;
    border: 2px solid $itemBorder;
    border-radius: 5px;
    color: $buttonColor;

    list-style: decimal-leading-zero;
    padding: 5px 5px 5px 30px;

    > li {
      padding: 5px 0;
      cursor: pointer;
      border: 1px solid $backgroundColor;

      &:hover {
        border: 1px solid $activeItem;
      }
    }
  }
}
</style>
