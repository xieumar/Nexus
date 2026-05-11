<template>
  <div class="flex min-h-screen w-full bg-white overflow-hidden">
    <!-- Left Side: Auth Form -->
    <div class="grid grid-rows-[auto_1fr_auto] min-h-screen w-full px-10 lg:w-1/2 xl:w-[45%] bg-white">
      <!-- Top: Logo -->
      <div class="pt-12">
        <div class="mx-auto w-full max-w-md">
          <div class="flex items-center gap-3">
            <img src="/logo.png" alt="Nexus Logo" class="h-8 w-auto" />
            <span class="text-xl font-semibold tracking-tight text-[#0f172a]">Nexus Pulse</span>
          </div>
        </div>
      </div>
      
      <!-- Middle: Form Container -->
      <div class="flex flex-col justify-center py-8">
        <div class="mx-auto w-full max-w-md">
          <slot />
        </div>
      </div>

      <!-- Bottom: Balance Spacer -->
      <div class="pb-12 invisible">
        <div class="mx-auto w-full max-w-md">
          <div class="h-8"></div>
        </div>
      </div>
    </div>

    <!-- Right Side: Decorative Inspiration -->
    <div class="relative hidden flex-1 lg:flex bg-[#003d4d] flex-col items-center justify-center p-12 overflow-hidden">
      <!-- Dot Texture Overlay -->
      <div class="absolute inset-0 z-0 opacity-[0.15]" 
           style="background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 24px 24px;">
      </div>

      <!-- Floating Analytics Card -->
      <div class="relative z-10 w-full max-w-lg mb-8">
        <div class="bg-white rounded-2xl p-6 shadow-2xl transform -translate-x-4 -translate-y-4 animate-in fade-in slide-in-from-left-8 duration-1000">
          <div class="flex items-center justify-between mb-8">
            <span class="text-xl font-semibold text-slate-800">Analytics</span>
            <div class="flex gap-2">
              <div class="px-3 py-1 text-[10px] font-bold rounded-full bg-slate-100 text-slate-400">Weekly</div>
              <div class="px-3 py-1 text-[10px] font-bold rounded-full bg-slate-100 text-slate-400">Monthly</div>
              <div class="px-3 py-1 text-[10px] font-bold rounded-full bg-slate-100 text-slate-400">Yearly</div>
            </div>
          </div>
          <!-- Mock Chart SVG -->
          <svg viewBox="0 0 400 100" class="w-full h-32 overflow-visible">
            <path d="M0,80 Q50,70 100,40 T200,60 T300,20 T400,50" fill="none" stroke="#003d4d" stroke-width="2" class="animate-dash" />
            <path d="M0,90 Q50,85 100,70 T200,80 T300,60 T400,75" fill="none" stroke="#cbd5e1" stroke-width="1.5" />
            <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" stroke-width="1" />
            <g class="text-[8px] fill-slate-400 font-bold">
              <text x="0" y="115">MON</text>
              <text x="80" y="115">TUE</text>
              <text x="160" y="115">WED</text>
              <text x="240" y="115">THU</text>
            </g>
          </svg>
        </div>

        <!-- Floating Gauge Card -->
        <div class="absolute -bottom-16 -right-4 w-48 bg-white rounded-2xl p-6 shadow-2xl transform translate-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div class="flex flex-col items-center justify-center py-2">
            <div class="relative h-24 w-24">
              <svg viewBox="0 0 36 36" class="h-24 w-24 transform -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" stroke-width="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#003d4d" stroke-width="3" stroke-dasharray="42, 100" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                <span class="text-xl font-bold text-slate-800">42%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Text Content -->
      <div class="mt-24 text-center z-10 px-12">
        <h2 class="text-2xl font-bold text-white mb-4">Very simple way you can engage</h2>
        <p class="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
          Welcome to Nexus Pulse! Efficiently track and manage your telemetry data with ease and precision.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-dash {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 3s ease-in-out forwards;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
