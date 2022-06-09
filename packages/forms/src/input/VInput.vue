<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {toRefs, computed} from 'vue';
import {SearchIcon} from '@heroicons/vue/solid';
import {useField} from 'vee-validate';

const props = defineProps({
  value: {
    type: [String, Number],
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
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
  size: {
    type: String,
    default: 'default',
  },
  placeholder: {
    type: String,
    default: '',
  },
  prependIcon: {
    type: String,
    default: '',
  },
  appendIcon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'default',
  },
  text: {
    type: Boolean,
    default: false,
  },
  shadow: {
    type: Boolean,
    default: false,
  },
  classes: {
    type: Object,
    default: () => ({
      wrapper: '',
      input: '',
      prepend: '',
      append: '',
    }),
  },
  label: {
    type: String,
    default: '',
  },
  rules: {
    type: [Object, String],
    default: null,
  },
  id: {
    type: String,
    default: '',
  },
  inputClass: {
    type: String,
    default: '',
  },
  wrapperClass: {
    type: String,
    default: '',
  },
});

const {type, readonly, disabled, placeholder, prependIcon, appendIcon} =
  toRefs(props);

defineEmits(['input:modelValue', 'blur', 'change']);

const sizeClass = computed(() => {
  const sizes: Record<string, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    default: 'text-base',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  return sizes[props.size];
});

const {value: inputValue, errorMessage} = useField(props.name, props.rules, {
  initialValue: props.modelValue || props.value,
});

const inputVariantClass = computed(() => {
  if (props.error || errorMessage.value) {
    return 'border-error-500 focus:ring-error-500 focus:ring-opacity-50 focus:border-error-500';
  } else {
    const variants: Record<string, string> = {
      default:
        'border-gray-300 hover:border-gray-400 focus:ring-primary-500 focus:ring-opacity-50 focus:border-primary-500',
      blue: 'border-gray-300 hover:border-gray-400 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500',
      primary:
        'border-gray-300 hover:border-gray-400 focus:ring-primary-500 focus:ring-opacity-50 focus:border-primary-500',
      secondary:
        'border-gray-300 hover:border-gray-400 focus:ring-secondary-500 focus:ring-opacity-50 focus:border-secondary-500',
      info: 'border-gray-300 hover:border-gray-400 focus:ring-info-500 focus:ring-opacity-50 focus:border-info-500',
      warning:
        'border-gray-300 hover:border-gray-400 focus:ring-warning-500 focus:ring-opacity-50 focus:border-warning-500',
      success:
        'border-gray-300 hover:border-gray-400 focus:ring-success-500 focus:ring-opacity-50 focus:border-success-500',
      error:
        'border-gray-300 hover:border-gray-400 focus:ring-error-500 focus:ring-opacity-50 focus:border-error-500',
      dark: 'border-gray-300 hover:border-gray-400 focus:ring-gray-500 focus:ring-opacity-50 focus:border-gray-500',
    };
    return variants[props.color];
  }
});
</script>

<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="id || name" class="mb-1 block">{{ label }}</label>
    <div v-if="text" v-bind="$attrs">{{ inputValue }}</div>
    <div v-else class="relative w-full flex gap-2 items-center">
      <slot name="prepend.outer">
        <div
          class="
            absolute
            inset-y-0
            left-0
            h-full
            flex
            items-center
            pr-2
            text-gray-500
          "
        >
          <slot name="prepend">
            <SearchIcon v-if="prependIcon === 'search'" class="w-5 h-5 ml-3" />
          </slot>
        </div>
      </slot>
      <input
        :id="id || name"
        v-model="inputValue"
        class="
          w-full
          border
          px-3
          py-2
          focus:outline-none
          rounded-md
          transition
          duration-300
          disabled:cursor-not-allowed
          focus:ring-2
        "
        :class="[{shadow}, sizeClass, inputVariantClass, inputClass]"
        :placeholder="placeholder"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="$attrs"
      />
      <slot name="append.outer">
        <div
          class="
            absolute
            inset-y-0
            right-0
            h-full
            flex
            items-center
            pl-2
            text-gray-500
          "
        >
          <slot name="append">
            <SearchIcon v-if="appendIcon === 'search'" class="w-5 h-5 mr-3" />
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="errorMessage" class="text-error-500 text-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>