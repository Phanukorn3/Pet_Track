<script setup>
// import pictureLogin from "@/assets/pict_login.jpg";
// import api from "@/service/api.js";
import Nav from "@/components/nav.vue";
</script>
<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <!-- รูปพื้นหลัง -->
    <div
      class="absolute inset-0 bg-[url('@/assets/map.jpg')] bg-cover bg-center"
    ></div>

    <!-- ชั้น overlay สีเทาโปร่ง -->
    <div class="absolute inset-0 bg-gray-500/70"></div>

    <!-- เนื้อหาด้านใน -->
    <div
      class="relative bg-[#F4D9A2] p-8 rounded-2xl shadow-lg flex flex-col w-320 h-200"
    >
        <div class="bg-[#FFF7E2]/62 p-4 shadow-md w-full h-full rounded-2xl mt-8"></div>
    </div>
  </div>
</template>
