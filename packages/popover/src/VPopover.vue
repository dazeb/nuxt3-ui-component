<script setup lang="ts">
import {Popover} from '@headlessui/vue';
import type {VPopoverPlacement} from './api';

withDefaults(
  defineProps<{
    placement?: VPopoverPlacement;
  }>(),
  {
    placement: 'bottom-start',
  },
);

defineSlots<{
  default?: (props: {}) => any;
}>();
</script>

<template>
  <Popover
    class="v-popover"
    :class="['v-popover--' + placement]"
    v-slot="slotProps"
  >
    <slot v-bind="slotProps" />
  </Popover>
</template>
