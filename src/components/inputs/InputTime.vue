<template>
  <label class="input-time">
    <output class="input-time__output">{{ modelValue }}</output>
    <input
      v-bind="field"
      type="search"
      class="input-time__field"
      :class="className"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePlayer } from '@/modules';
import { timeToNumber, timeToString } from '@/modules/helpers';

const props = defineProps<{ modelValue: string; maxTime: number }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}>();

const { duration } = usePlayer();

const field = ref('');
const isFocused = ref(false);
const className = computed(() => ({ '-filled': !!props.modelValue.length, '-focus': isFocused.value }));

function onInput({ target }: Event) {
  const { value } = target as HTMLInputElement;
  const totalSeconds = timeToNumber(value);
  const timeValue = totalSeconds > duration.value ? duration.value : totalSeconds;
  emit('update:modelValue', timeToString(timeValue));
}

function onFocus() {
  isFocused.value = true;
  emit('focus');
}

function onBlur() {
  isFocused.value = false;
  emit('blur');
}
</script>
