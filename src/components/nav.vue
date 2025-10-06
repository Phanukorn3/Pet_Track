
<script setup>
import Logo from "@/components/logo.vue";
</script>

<template>
  <nav class="bg-[#FFF7E2]/62 p-4 shadow-md w-full h-18 rounded-2xl">
    <div class="container mx-auto flex items-center h-11">
      <Logo />
      <div class="flex space-x-4">
        <router-link to="/login" class="text-[#EA580C]">Login</router-link>
        <router-link to="/signup" class="text-[#EA580C]">Sign Up</router-link>
      </div>
    </div>
  </nav>
</template>
