<template>
  <div id="nav">
    <router-link to="/ccy">Select CCY</router-link> |
    <router-link to="/">Select Amount</router-link>
  </div>

  <div class="convertation_result_wrapper">
    <div class="convertation_result sale">
      Sale {{ moneyAmount }} {{ convertationResult.base_ccy }}
      <CCYicon :ccy="convertationResult.base_ccy" />
      and get {{ convertationResult.saleResult }} {{ convertationResult.ccy }}
      <CCYicon :ccy="convertationResult.ccy" />
    </div>

    <div class="convertation_result buy">
      Sale {{ convertationResult.buyResult }} {{ convertationResult.ccy }}
      <CCYicon :ccy="convertationResult.ccy" />
      and get {{ moneyAmount }} {{ convertationResult.base_ccy }}
      <CCYicon :ccy="convertationResult.base_ccy" />
    </div>
  </div>

  <ConvertationHistory />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  ConvertationResult,
  ConvertValue
} from "@/interfaces/convertValues.interface";
import CCYicon from "@/components/CCYicon.vue";
import { ActionTypes } from "@/store/constant";
import ConvertationHistory from "@/components/ConvertationHistory.vue";
import { ROUTER_PATHS } from "@/router";

export default defineComponent({
  name: "ConvertationResult",

  methods: {
    requestConvertationMap: function() {
      this.$store.dispatch(ActionTypes.GET_CONVERTATION_MAP, undefined);
    },

    requestCalculationResult: function() {
      const { amount, convertCCV } = this.$route.query as {
        amount: string;
        convertCCV: string;
      };

      this.$store.dispatch(ActionTypes.GET_CONVERTATION_RESULT, {
        queryAmount: amount,
        queryCCV: convertCCV
      });
    }
  },

  beforeMount() {
    if (!this.ccyList.length) {
      this.requestConvertationMap();
    } else {
      this.requestCalculationResult();
    }
  },

  watch: {
    ccyList: function() {
      this.requestCalculationResult();
    },
    $route: function() {
      if (this.$route.path === ROUTER_PATHS.CONVERTATION_RESULT) {
        this.requestCalculationResult();
      }
    }
  },

  computed: {
    moneyAmount(): number {
      return this.$store.getters.getMoneyAmount;
    },
    convertationResult(): ConvertationResult {
      return this.$store.getters.getConvertationResult;
    },
    ccyList(): ConvertValue[] {
      return this.$store.getters.getCCY;
    }
  },

  components: {
    CCYicon,
    ConvertationHistory
  }
});
</script>

<style lang="scss">
@import "../scss/_variables.scss";

.convertation_result_wrapper {
  .convertation_result {
    width: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $buttonColor;
    margin-bottom: 10px;

    &.sale {
    }
    &.buy {
    }
  }
}
</style>
