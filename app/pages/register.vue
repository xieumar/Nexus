<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Checkbox } from '~/components/ui/checkbox'

definePageMeta({
  layout: 'auth'
})

const name = ref('')
const email = ref('')
const password = ref('')
const agreeTerms = ref(false)

const handleRegister = () => {
  console.log('Registering:', name.value, email.value)
}
</script>

<template>
  <div class="w-full max-w-[400px] mx-auto">
    <div class="mb-10 text-center lg:text-left">
      <h1 class="text-3xl font-semibold text-slate-800 tracking-tight">Create an account</h1>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-5">
      <!-- Name Field -->
      <div class="grid gap-2">
        <Label for="name" class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</Label>
        <Input 
          id="name"
          v-model="name"
          placeholder="Enter your name"
          class="rounded-xl border-none bg-slate-50/80 h-12 focus-visible:ring-slate-200"
        />
      </div>

      <!-- Email Field -->
      <div class="grid gap-2">
        <Label for="email" class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</Label>
        <Input 
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your mail"
          class="rounded-xl border-none bg-slate-50/80 h-12 focus-visible:ring-slate-200"
        />
      </div>

      <!-- Password Field -->
      <div class="grid gap-2">
        <Label for="password" class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Password</Label>
        <div class="relative">
          <Input 
            id="password"
            v-model="password"
            type="password" 
            placeholder="Enter your password"
            class="rounded-xl border-none bg-slate-50/80 h-12 focus-visible:ring-slate-200"
          />
          <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>

      <!-- Terms & Conditions -->
      <div class="flex items-center space-x-3 pt-1">
        <Checkbox id="terms" v-model:checked="agreeTerms" class="rounded border-slate-300 data-[state=checked]:bg-[#003d4d] data-[state=checked]:border-[#003d4d]" />
        <Label for="terms" class="text-[11px] font-medium text-slate-500 leading-none cursor-pointer">
          I agree to all the Terms & Conditions
        </Label>
      </div>

      <!-- Submit Button -->
      <Button type="submit" class="w-full h-12 bg-[#003d4d] text-white rounded-xl font-bold text-sm hover:bg-[#002d39]">
        Sign up
      </Button>
    </form>

    <p class="mt-6 text-center text-xs font-medium text-slate-400">
      Already have an account? 
      <NuxtLink to="/login" class="font-bold text-[#003d4d] hover:underline">Log in</NuxtLink>
    </p>
  </div>
</template>
