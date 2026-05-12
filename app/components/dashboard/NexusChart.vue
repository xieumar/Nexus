<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart, RadarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  VisualMapComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

// Register ECharts modules
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  VisualMapComponent
])

const props = defineProps<{
  option: any
  loading?: boolean
  autoresize?: boolean
}>()
</script>

<template>
  <div class="h-full w-full relative">
    <VChart 
      class="h-full w-full" 
      :option="option" 
      :loading="loading"
      :autoresize="autoresize !== false"
    />
    
    <!-- Loading Overlay -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 transition-opacity">
      <div class="flex flex-col items-center gap-3">
        <div class="h-8 w-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initializing...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure chart takes full container */
.echarts {
  width: 100%;
  height: 100%;
}
</style>
