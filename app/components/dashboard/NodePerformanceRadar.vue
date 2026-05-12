<script setup lang="ts">
import { useTelemetryStore } from '~/stores/telemetry'
import NexusChart from './NexusChart.vue'

const telemetry = useTelemetryStore()

const chartOption = computed(() => {
  return {
    backgroundColor: 'transparent',
    radar: {
      indicator: [
        { name: 'CPU (%)', max: 100 },
        { name: 'RAM (GB)', max: 32 },
        { name: 'Net (GB/s)', max: 10 },
        { name: 'Errors', max: 10 },
        { name: 'Latency (ms)', max: 100 }
      ],
      shape: 'polygon',
      splitNumber: 4,
      axisName: {
        color: '#94a3b8',
        fontSize: 10,
        fontWeight: 'bold'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      }
    },
    series: [
      {
        name: 'Node Performance',
        type: 'radar',
        data: [
          {
            value: [
              telemetry.cpu.current,
              12.4 + Math.random() * 2, // Mocking RAM for radar
              telemetry.throughput.current,
              telemetry.errors.current,
              telemetry.latency.current
            ],
            name: 'Primary Node',
            symbol: 'none',
            lineStyle: {
              width: 2,
              color: '#06b6d4'
            },
            areaStyle: {
              color: 'rgba(6, 182, 212, 0.2)'
            }
          },
          {
            value: [
              45,
              8.2,
              2.4,
              1,
              18
            ],
            name: 'Baseline',
            symbol: 'none',
            lineStyle: {
              width: 1,
              type: 'dashed',
              color: '#94a3b8'
            }
          }
        ]
      }
    ]
  }
})
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="flex items-center justify-between mb-4 shrink-0">
      <h3 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Node Multi-Metric Analysis</h3>
    </div>
    <div class="flex-1 min-h-0">
      <NexusChart :option="chartOption" />
    </div>
  </div>
</template>
