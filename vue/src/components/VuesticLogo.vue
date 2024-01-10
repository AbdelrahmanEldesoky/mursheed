<template>
 <img src="../assets/logo_white.png" class="w-[149px] h-[30px]" >
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useColors } from 'vuestic-ui'
  const { getColor, shiftHSLAColor } = useColors()

  const props = withDefaults(
    defineProps<{
      height?: number | string
      color?: string
    }>(),
    {
      height: 16,
      color: 'primary',
    },
  )

  const colorsComputed = computed(() => {
    const color = getColor(props.color, 'primary')
    return { start: color, end: shiftHSLAColor(color, { l: -20 }) }
  })
</script>
