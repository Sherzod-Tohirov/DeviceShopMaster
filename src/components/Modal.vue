<template>
  <div class="overlay" v-on:click="handleClick" v-if="store.getters.generalModal">
    <div class="modal">
      <button class="close-btn" @click="store.commit('toggleModal')">
        &times;
      </button>
      <slot> </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import store from "../store/index";
const handleClick = (e: MouseEvent) => {
  const target = e.target as Element;
  if (target.matches(".overlay")) {
    store.commit("toggleModal");
  }
};
</script>
