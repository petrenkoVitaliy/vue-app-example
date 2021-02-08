<template>
  <div id="nav"><router-link to="/">Go back</router-link></div>

  <div class="ccy_select_wrapper">
    <p class="hint_text">money amount: {{ moneyAmount }}</p>
    <p
      class="option_wrapper"
      v-for="(option, index) in radioValues"
      :key="index"
    >
      <input type="radio" v-model="selectedValue" :value="option" :id="index" />
      <label :for="index">{{ option }}</label>
    </p>
    <input type="button" value="Calculate" v-on:click="calculate" />
  </div>
  <ConvertationHistory />
</template>

<script lang="ts">
import { ROUTER_PATHS } from "@/router";
import { ActionTypes } from "@/store/constant";
import { defineComponent } from "vue";
import ConvertationHistory from "@/components/ConvertationHistory.vue";

export default defineComponent({
  name: "CCYSelect",

  data() {
    return {
      radioValues: {},
      selectedValue: undefined
    } as { selectedValue: string | undefined; radioValues: string[] };
  },

  beforeMount() {
    this.getConvertationMap();

    if (!this.moneyAmount) {
      this.$router.push(ROUTER_PATHS.MAIN);
    }
  },

  watch: {
    CCYOptions: {
      handler: function(value: string[]) {
        this.radioValues = [...value];
        this.selectedValue = this.radioValues[0];
      },
      immediate: true,
      deep: true
    }
  },

  computed: {
    moneyAmount(): number {
      return this.$store.getters.getMoneyAmount;
    },
    CCYOptions(): string[] {
      return this.$store.getters.getCCYOptions;
    }
  },

  methods: {
    calculate: async function() {
      if (this.selectedValue) {
        const convertCCV = await this.getConvertCCV(this.selectedValue);
        /**
         * the assignment says that all business logic should be inside actions,
         * but I think router logic should be inside component for better navigation
         */

        this.$router.push({
          path: ROUTER_PATHS.CONVERTATION_RESULT,
          query: { amount: this.moneyAmount, convertCCV }
        });
      }
    },

    getConvertCCV: function(selectedValue: string) {
      return this.$store.dispatch(ActionTypes.GET_CONVERT_CCV, selectedValue);
    },
    getConvertationMap: function() {
      this.$store.dispatch(ActionTypes.GET_CONVERTATION_MAP, undefined);
    }
  },

  components: {
    ConvertationHistory
  }
});
</script>

<style lang="scss">
@import "../scss/_variables.scss";

.ccy_select_wrapper {
  .hint_text {
    color: $buttonColor;
  }
  .option_wrapper {
    color: $focusedItem;

    .input_after {
      width: 11px;
      height: 11px;
      border-radius: 15px;
      top: 0px;
      left: -1px;
      content: "";
      position: relative;
      display: inline-block;
      visibility: visible;
      border: 2px solid $itemBorder;
    }

    input[type="radio"]:after {
      @extend .input_after;
      background-color: $backgroundColor;
    }

    input[type="radio"]:checked:after {
      @extend .input_after;
      background-color: $activeItem;
    }

    > input {
      cursor: pointer;
    }

    > label {
      cursor: pointer;
    }
  }

  > input {
    cursor: pointer;

    width: 90px;
    height: 30px;

    border: 2px solid $itemBorder;
    background: $buttonColor;
    color: $backgroundColor;
    font-weight: bold;
  }
}
</style>
