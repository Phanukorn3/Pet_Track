<script setup>
// import api from "@/service/api.js";
import Nav from "@/components/nav.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

// for test เด้อ ***** เปลี่ยนเป็นค่าที่ดึงมาจาก database

const pets = ref([]);
onMounted(async () => {
  try {
    const res = await axios.get("/"); // เปลี่ยนเป็น endpoint จริง รอต้า
    pets.value = res.data;
  } catch (err) {
    console.error("Failed to fetch pets:", err);
  }
});

</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <!-- รูปพื้นหลัง -->
    <div class="absolute inset-0 bg-gray-500/70"></div>

    <!-- เนื้อหาด้านใน -->
    <!-- ตรงส่วนนี้ยังไม่ได้ทำให้ scroll ลงได้ ยังหาวิธีทำอยู่ -->
    <div class="relative bg-[#F4D9A2] p-8 rounded-2xl shadow-lg flex flex-col w-320 h-200"></div>
  </div>
</template>