<script setup lang="ts">
import { useTransition, TransitionPresets } from '@vueuse/core'

const props = defineProps<{
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}>()

const source = ref(props.value)

// Sync source with prop value
watch(() => props.value, (newVal) => {
  source.value = newVal
})

const output = useTransition(source, {
  duration: props.duration || 1000,
  transition: TransitionPresets.easeOutExpo,
})

const formattedNumber = computed(() => {
  return output.value.toLocaleString(undefined, {
    minimumFractionDigits: props.decimals ?? 0,
    maximumFractionDigits: props.decimals ?? 0,
  })
})
</script>

<template>
  <span>{{ prefix }}{{ formattedNumber }}{{ suffix }}</span>
</template>
