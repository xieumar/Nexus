<template>
  <div class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden">
    <div class="relative flex flex-col items-center z-10">
      <!-- Logo Container -->
      <div class="relative mb-10">
        <div class="absolute inset-0 bg-[#003d4d]/5 blur-[60px] rounded-full scale-150"></div>
        <img src="/logo.png" alt="Nexus Logo" class="relative h-24 w-auto object-contain" />
      </div>
      
      <!-- Loading Text -->
      <div class="flex flex-col items-center gap-6">
        <div class="flex flex-col items-center">
           <h2 class="text-3xl font-semibold text-slate-900 uppercase">
            Nexus <span class="text-[#003d4d]">Pulse</span>
          </h2>
          <div class="mt-2 h-[1px] w-48 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        </div>
        
        <!-- Loading Bar -->
        <div class="flex flex-col items-center gap-4">
          <div class="h-[3px] w-64 overflow-hidden rounded-full bg-slate-100">
            <div class="h-full animate-progress bg-[#003d4d] shadow-[0_0_10px_rgba(0,61,77,0.2)]"></div>
          </div>
          
          <p class="text-[10px] font-semibold text-slate-400 uppercase">
            Initializing Core Systems
          </p>
        </div>
      </div>
    </div>

    <!-- Subtle Background Texture -->
    <div class="absolute inset-0 z-0 opacity-[0.03]" 
         style="background-image: radial-gradient(#003d4d 1px, transparent 1px); background-size: 32px 32px;">
    </div>
    
    <!-- Large Soft Ambient Glows -->
    <div class="absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-slate-50 blur-[120px]"></div>
    <div class="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-[#003d4d]/5 blur-[120px]"></div>
  </div>
</template>

<script setup lang="ts">
// Visibility is controlled by the parent (app.vue)
</script>

<style scoped>
@keyframes progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-progress {
  animation: progress 2s infinite linear;
}
</style>
