<script setup lang="ts">
import {useAlert} from './api';

withDefaults(
  defineProps<{
    tag?: string;
  }>(),
  {
    tag: 'h3',
  },
);

const api = useAlert();

defineSlots<{
  default?: (props: {}) => any
}>()
</script>

<template>
  <component :is="tag" class="alert-title" :class="`alert-title-${api?.color}`">
    <slot />
  </component>
</template>
