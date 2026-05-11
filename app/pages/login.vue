<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Checkbox } from '~/components/ui/checkbox'
import { cn } from '~/lib/utils'
import { db } from '~/lib/db'
import { useLocalSession } from '~/stores/session'

definePageMeta({
  layout: 'auth'
})

const session = useLocalSession()
const isLoading = ref(false)
const serverError = ref<string | null>(null)
const showPassword = ref(false)

// Validation Schema
const schema = toTypedSchema(
  zod.object({
    email: zod.string().min(1, 'Email is required').email('Invalid email address'),
    password: zod.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: zod.boolean().optional()
  })
)

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: schema,
  initialValues: {
    rememberMe: false
  }
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')
const [rememberMe] = defineField('rememberMe')

const handleLogin = handleSubmit(async (values) => {
  isLoading.value = true
  serverError.value = null
  
  try {
    // Check IndexedDB
    const user = await db.users.where('email').equals(values.email).first()
    
    if (!user) {
      throw new Error('No account found with this email')
    }

    if (user.password !== values.password) {
      throw new Error('Incorrect password')
    }
    
    // Set local session
    session.login({ name: user.name, email: user.email })
    navigateTo('/')
  } catch (err: any) {
    serverError.value = err.message || 'An error occurred during login'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="w-full max-w-[400px] mx-auto">
    <div class="mb-10 text-center lg:text-left">
      <h1 class="text-3xl font-semibold text-slate-800 tracking-tight">Sign in</h1>
    </div>

    <div v-if="serverError" class="mb-6 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
      {{ serverError }}
    </div>

    <form @submit.prevent="handleLogin" class="space-y-5">
      <!-- Email Field -->
      <div class="grid gap-2">
        <Label for="email" :class="cn('text-xs font-semibold uppercase tracking-wide', errors.email ? 'text-red-500' : 'text-slate-500')">
          Email
        </Label>
        <Input 
          id="email"
          v-model="email"
          v-bind="emailProps"
          type="email"
          placeholder="Enter your mail"
          :class="cn('rounded-xl border-none bg-slate-50/80 h-12 focus-visible:ring-slate-200', errors.email && 'ring-1 ring-red-500 bg-red-50/30')"
        />
        <p v-if="errors.email" class="text-[10px] font-bold text-red-500 mt-0.5 ml-1">{{ errors.email }}</p>
      </div>

      <!-- Password Field -->
      <div class="grid gap-2">
        <div class="flex items-center justify-between">
          <Label for="password" :class="cn('text-xs font-semibold uppercase tracking-wide', errors.password ? 'text-red-500' : 'text-slate-500')">
            Password
          </Label>
        </div>
        <div class="relative">
          <Input 
            id="password"
            v-model="password"
            v-bind="passwordProps"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Enter your password"
            :class="cn('rounded-xl border-none bg-slate-50/80 h-12 focus-visible:ring-slate-200 pr-12', errors.password && 'ring-1 ring-red-500 bg-red-50/30')"
          />
          <button 
            type="button" 
            @click="showPassword = !showPassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
          </button>
        </div>
        <p v-if="errors.password" class="text-[10px] font-bold text-red-500 mt-0.5 ml-1">{{ errors.password }}</p>
      </div>

      <!-- Remember Me -->
      <div class="flex items-center space-x-3 pt-1">
        <Checkbox id="remember" v-model:checked="rememberMe" class="rounded border-slate-300 data-[state=checked]:bg-[#003d4d] data-[state=checked]:border-[#003d4d]" />
        <Label for="remember" class="text-[11px] font-medium text-slate-500 leading-none cursor-pointer">
          Remember me for 30 days
        </Label>
      </div>

      <!-- Submit Button -->
      <Button :disabled="isLoading" type="submit" class="w-full h-12 bg-[#003d4d] text-white rounded-xl font-bold text-sm hover:bg-[#002d39] disabled:opacity-70 disabled:cursor-not-allowed">
        <span v-if="isLoading" class="flex items-center gap-2">
          <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Signing in...
        </span>
        <span v-else>Sign in</span>
      </Button>
    </form>

    <p class="mt-6 text-center text-xs font-medium text-slate-400">
      Don't have an account? 
      <NuxtLink to="/register" class="font-bold text-[#003d4d] hover:underline">Sign up</NuxtLink>
    </p>
  </div>
</template>
