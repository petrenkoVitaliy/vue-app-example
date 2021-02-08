<template>
  <div class="money_input_wrapper">
    <form class="money_input_form">
      <p class="hint_text">Input money amount:</p>
      <input class="money_input" type="number" v-model="moneyAmount" />

      <div v-if="errors.length">
        <p class="error" v-bind:key="error" v-for="error in errors">
          {{ error }}
        </p>
      </div>

      <div class="actions_wrapper">
        <input type="button" value="Clear" v-on:click="clearValue" />
        <input type="button" value="Calculate" v-on:click="checkForm" />
      </div>
    </form>
  </div>
  <ConvertationHistory />
</template>

<script lang="ts">
import { ROUTER_PATHS } from "@/router";
import { MutationTypes } from "@/store/constant";
import ConvertationHistory from "@/components/ConvertationHistory.vue";

import { defineComponent } from "vue";

interface MoneyAmountInputProps {
  errors: string[];
  moneyAmount: string;
}

export default defineComponent({
  name: "MoneyAmountInput",
  data: () => {
    return {
      errors: [],
      moneyAmount: ""
    } as MoneyAmountInputProps;
  },

  methods: {
    setMoneyAmount: function(value: number) {
      this.$store.commit(MutationTypes.SET_MONEY_TO_CONVERT, value);
    },

    checkForm: function(e: Event) {
      this.errors = [];

      if (!this.moneyAmount || !Number(this.moneyAmount)) {
        this.errors.push("Value is required!");
      } else {
        this.setMoneyAmount(Number(this.moneyAmount));
        this.$router.push(ROUTER_PATHS.CCY);
      }

      e.preventDefault();
    },

    clearValue: function() {
      this.moneyAmount = "";
      this.setMoneyAmount(0);
    }
  },

  created: function() {
    this.clearValue();
  },

  components: {
    ConvertationHistory
  }
});
</script>

<style lang="scss">
@import "../scss/_variables.scss";

.money_input_wrapper {
  display: flex;
  justify-content: center;
  padding: 20px;

  .money_input_form {
    padding: 20px;

    width: 400px;
    border: 1px solid $itemBorder;

    .hint_text {
      color: $buttonColor;
    }

    .money_input {
      border: 2px solid $itemBorder;
      width: 50%;
      height: 20px;

      margin-bottom: 20px;
    }

    .error {
      color: $activeItem;
      margin: 0 0 20px 0;
    }

    .actions_wrapper {
      width: 50%;
      display: flex;
      margin: 0 auto;
      justify-content: space-between;

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
  }
}
</style>
