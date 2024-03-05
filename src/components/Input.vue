<template>
  <input
    class="w-2/3 p-5 border border-slate-500 shadow-sm rounded-md text-lg"
    type="text"
    :placeholder="props.placeholder"
  />
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';
const props = defineProps(['placeholder'])

</script>
