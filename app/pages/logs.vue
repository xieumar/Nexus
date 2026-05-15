<script setup lang="ts">
import { 
  Terminal, 
  Search, 
  Filter, 
  Download, 
  Trash2,
  AlertCircle,
  CheckCircle2,
  Info,
  ChevronUp,
  ChevronDown,
  ArrowUpDown
} from 'lucide-vue-next'
import { 
  useVueTable, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel,
  createColumnHelper,
  FlexRender,
  type SortingState,
  type ColumnFiltersState
} from '@tanstack/vue-table'
import { useMagicKeys, whenever, onClickOutside } from '@vueuse/core'
import { useTelemetryStore } from '~/stores/telemetry'
import { cn } from '~/lib/utils'

definePageMeta({
  layout: 'dashboard'
})

const telemetry = useTelemetryStore()

const tableState = reactive({
  sorting: [] as SortingState,
  columnFilters: [] as ColumnFiltersState,
  globalFilter: '',
})

const columnHelper = createColumnHelper<any>()

const columns = [
  columnHelper.accessor('timestamp', {
    header: 'Timestamp',
    cell: info => new Date(info.getValue()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  }),
  columnHelper.accessor('severity', {
    header: 'Severity',
    cell: info => {
      const severity = info.getValue()
      return h('span', {
        class: [
          'inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase',
          severity === 'critical' ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' :
          severity === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
          'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
        ]
      }, [
        h(severity === 'critical' ? AlertCircle : severity === 'success' ? CheckCircle2 : Info, { size: 12 }),
        severity
      ])
    },
    filterFn: 'equals'
  }),
  columnHelper.accessor('source', {
    header: 'Source',
    cell: info => info.getValue(),
    enableGlobalFilter: true,
  }),
  columnHelper.accessor('message', {
    header: 'Message',
    cell: info => h('div', { class: 'max-w-[300px] truncate' }, info.getValue()),
    enableGlobalFilter: true,
  }),
]

const table = useVueTable({
  data: computed(() => telemetry.events),
  columns,
  state: tableState,
  onSortingChange: updater => {
    tableState.sorting = typeof updater === 'function' ? updater(tableState.sorting) : updater
  },
  onColumnFiltersChange: updater => {
    tableState.columnFilters = typeof updater === 'function' ? updater(tableState.columnFilters) : updater
  },
  onGlobalFilterChange: updater => {
    tableState.globalFilter = typeof updater === 'function' ? updater(tableState.globalFilter) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: 'includesString',
  enableGlobalFilter: true,
})

const severities = [
  { id: 'all', name: 'All Events' },
  { id: 'critical', name: 'Critical' },
  { id: 'warning', name: 'Warning' },
  { id: 'success', name: 'Success' },
  { id: 'info', name: 'Information' },
]

const isSeverityOpen = ref(false)
const severityRef = ref(null)
onClickOutside(severityRef, () => isSeverityOpen.value = false)

const selectedSeverity = computed({
  get: () => (tableState.columnFilters.find(f => f.id === 'severity')?.value as string) || 'all',
  set: (val) => {
    if (val === 'all') {
      tableState.columnFilters = tableState.columnFilters.filter(f => f.id !== 'severity')
    } else {
      const idx = tableState.columnFilters.findIndex(f => f.id === 'severity')
      if (idx > -1) {
        const filter = tableState.columnFilters[idx]
        if (filter) filter.value = val
      } else {
        tableState.columnFilters.push({ id: 'severity', value: val })
      }
    }
  }
})

const selectedSeverityName = computed(() => {
  return severities.find(s => s.id === selectedSeverity.value)?.name || 'All Events'
})
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-4 md:px-0">
      <div class="flex flex-col gap-1 text-center lg:text-left">
        <h1 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">System Logs</h1>
        <p class="text-slate-500 dark:text-white/40 text-sm font-medium">Real-time audit trail and event stream.</p>
      </div>
      <div class="flex items-center justify-center lg:justify-end gap-3">
        <button class="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#002d39] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-white/60 text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
          <Download :size="16" />
          <span class="hidden sm:inline">Export CSV</span>
          <span class="sm:hidden">Export</span>
        </button>
        <button @click="telemetry.clearLogs" class="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all">
          <Trash2 :size="16" />
          <span class="hidden sm:inline">Clear Logs</span>
          <span class="sm:hidden">Clear</span>
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-0">
      <div class="md:col-span-2 relative">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" :size="18" />
        <input 
          v-model="tableState.globalFilter"
          type="text" 
          placeholder="Filter events..." 
          class="w-full pl-12 pr-4 h-12 rounded-2xl bg-white dark:bg-[#002d39] border border-slate-200 dark:border-white/5 outline-none focus:ring-2 focus:ring-cyan-500/20 text-slate-700 dark:text-white/80 text-sm"
        />
      </div>
      <div class="relative" ref="severityRef">
        <button 
          @click="isSeverityOpen = !isSeverityOpen"
          class="w-full flex items-center justify-between px-4 h-12 rounded-2xl bg-white dark:bg-[#002d39] border border-slate-200 dark:border-white/5 outline-none focus:ring-2 focus:ring-cyan-500/20 text-slate-700 dark:text-white/80 text-sm transition-all"
        >
          <div class="flex items-center gap-3">
            <Filter class="text-slate-400" :size="18" />
            <span class="font-bold">{{ selectedSeverityName }}</span>
          </div>
          <ChevronDown :class="['text-slate-400 transition-transform duration-300', isSeverityOpen ? 'rotate-180' : '']" :size="16" />
        </button>

        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <div v-if="isSeverityOpen" class="absolute z-50 mt-2 w-full bg-white dark:bg-[#003d4d] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 backdrop-blur-xl">
            <button 
              v-for="s in severities" 
              :key="s.id"
              @click="selectedSeverity = s.id; isSeverityOpen = false"
              :class="cn(
                'w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-colors',
                selectedSeverity === s.id ? 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-white/40 hover:bg-slate-50 dark:hover:bg-white/5'
              )"
            >
              <div v-if="s.id !== 'all'" :class="[
                'h-1.5 w-1.5 rounded-full',
                s.id === 'critical' ? 'bg-red-500' :
                s.id === 'warning' ? 'bg-amber-500' :
                s.id === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
              ]"></div>
              {{ s.name }}
            </button>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Logs Table -->
    <div class="px-4 md:px-0">
      <div class="bg-white dark:bg-[#002d39] rounded-3xl border border-slate-100 dark:border-white/5 overflow-hidden">
        <div class="overflow-x-auto custom-scrollbar">
          <table class="w-full text-left min-w-[600px]">
            <thead>
              <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="border-b border-slate-50 dark:border-white/5">
                <th 
                  v-for="header in headerGroup.headers" 
                  :key="header.id"
                  class="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600 dark:hover:text-white transition-colors group"
                  @click="header.column.getToggleSortingHandler()?.($event)"
                >
                  <div class="flex items-center gap-2">
                    <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                    <span v-if="header.column.getCanSort()" class="transition-opacity">
                      <ChevronUp v-if="header.column.getIsSorted() === 'asc'" :size="12" />
                      <ChevronDown v-else-if="header.column.getIsSorted() === 'desc'" :size="12" />
                      <ArrowUpDown v-else :size="12" class="opacity-0 group-hover:opacity-50" />
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50 dark:divide-white/5">
              <tr 
                v-for="row in table.getRowModel().rows" 
                :key="row.id" 
                class="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <td 
                  v-for="cell in row.getVisibleCells()" 
                  :key="cell.id"
                  class="px-6 py-4 whitespace-nowrap text-xs font-medium text-slate-700 dark:text-white/70"
                >
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </td>
              </tr>
              <tr v-if="table.getRowModel().rows.length === 0">
                <td :colspan="columns.length" class="px-6 py-20 text-center">
                  <div class="flex flex-col items-center gap-3 opacity-30">
                    <Terminal :size="48" />
                    <p class="text-sm font-bold">No logs matching your criteria</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
