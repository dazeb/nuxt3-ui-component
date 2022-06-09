<script setup lang="ts">
import {ref, computed, toRefs, watch, PropType} from 'vue';
import {ErrorMessage} from 'vee-validate';
import {useTextSize} from '@gits-id/utils';

type Value = string | number | object | boolean | Record<string, any>;

type RadioItem = Record<string, any>;

const props = defineProps({
  modelValue: {
    type: [String, Number, Object, Boolean] as PropType<Value>,
    default: null,
  },
  value: {
    type: [String, Number, Object, Boolean] as PropType<Value>,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorMessages: {
    type: Array,
    default: () => [],
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Array as PropType<RadioItem[]>,
    default: () => [],
  },
  itemText: {
    type: String,
    default: 'text',
  },
  itemValue: {
    type: String,
    default: 'value',
  },
  size: {
    type: String,
    default: '',
  },
  inline: {
    type: Boolean,
    default: false,
  },
});

const {
  modelValue,
  error,
  value,
  disabled,
  label,
  items,
  itemValue,
  itemText,
  size,
  inline,
} = toRefs(props);

const emit = defineEmits([
  'update:modelValue',
  'update:value',
  'input',
  'change',
  'blur',
]);

const selected = ref(value.value || modelValue.value);

const onChange = (event: any) => {
  emit('change', event);
};

const classes = computed(() =>
  error.value
    ? 'text-error-600 focus:ring-error-600'
    : 'text-primary-600 focus:ring-primary-600',
);

const getValue = (item: RadioItem) => {
  return typeof item === 'object' ? item?.[itemValue.value] : item;
};

const getText = (item: RadioItem) => {
  return typeof item === 'object' ? item?.[itemText.value] : item;
};

watch(selected, (val) => {
  emit('update:modelValue', val);
  emit('update:value', val);
  emit('input', val);
  emit('change', val);
});

const {class: sizeClass} = useTextSize(size.value);

const setInnerValue = (val: Value) => {
  selected.value = val;
};

watch(
  modelValue,
  (val) => {
    setInnerValue(val);
  },
  {immediate: true},
);

watch(
  value,
  (val) => {
    setInnerValue(val);
  },
  {immediate: true},
);
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="font-semibold mb-1 block"
      :class="error ? 'text-error-500' : 'text-gray-700'"
    >
      {{ label }}
    </label>
    <div
      class="flex gap-y-2 sm:gap-y-0 gap-x-8"
      :class="[inline ? 'flex-row' : 'flex-col']"
    >
      <label v-for="(item, index) in items" :key="index">
        <input
          v-model="selected"
          :name="name"
          type="radio"
          :value="getValue(item)"
          class="
            mr-2
            transition
            duration-300
            disabled:cursor-not-allowed
            disabled:border-gray-300
          "
          :class="classes"
          :disabled="disabled"
          @change="onChange"
        />
        <slot name="label" :item="item" :selected="selected">
          <span :class="[sizeClass, error ? 'text-error' : 'text-gray-700']">
            {{ getText(item) }}
          </span>
        </slot>
      </label>
    </div>
    <ErrorMessage class="text-error-600 text-sm mt-2 block" :name="name" />
  </div>
</template>