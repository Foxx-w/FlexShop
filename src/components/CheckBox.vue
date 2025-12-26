<template>
  <button class="checkbox" :aria-pressed="checked.toString()" @click="toggle" type="button">
    <img v-if="checked" src="/src/assets/icons/check.svg" alt="check" />
  </button>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ modelValue: { type: Boolean, default: false } })
const emit = defineEmits(['update:modelValue'])
const checked = computed(() => props.modelValue)
function toggle() { emit('update:modelValue', !props.modelValue) }
</script>

<style scoped>
.checkbox{width:36px;height:36px;background:#222222;border:2px solid #A53DFF;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer}
.checkbox img{width:18px;height:18px;filter:brightness(0) invert(1)}
</style>
