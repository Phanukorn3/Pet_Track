<script setup>
// import api from "@/service/api.js";
import Nav from "@/components/nav.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

// for test เด้อ ***** เปลี่ยนเป็นค่าที่ดึงมาจาก database

const pets = ref([]);
onMounted(async () => {
  try {
    const res = await axios.get("/api/pets"); // เปลี่ยนเป็น endpoint จริง รอต้า
    pets.value = res.data;
  } catch (err) {
    console.error("Failed to fetch pets:", err);
  }
});
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
    <!-- ตรงส่วนนี้ยังไม่ได้ทำให้ scroll ลงได้ ยังหาวิธีทำอยู่ -->
    <div
      class="relative bg-[#F4D9A2] p-8 rounded-2xl shadow-lg flex flex-col w-320 h-200"
    >
      <Nav />
      <div class="bg-[#FFF7E2]/62 p-4 shadow-md w-full h-full rounded-2xl mt-8">
        <div class="flex justify-end mt-4">
          <router-link
            to="/mypet/petadd"
            class="text-[#B26D38] py-2 px-4 border border-gray-300 bg-[#FFF7E2] rounded-3xl hover:bg-[#d6caab] transition-colors duration-200"
          >
            Add Pet
          </router-link>
        </div>
        <div class="m-10 mt-3 flex flex-wrap gap-6 items-center">
          <div
            v-for="pet in pets"
            :key="pet.id"
            class="flex flex-col items-center w-[calc(100%/6rem)]"
          >
            <img
              class="w-40 h-40 rounded-full object-cover flex-shrink-0 border border-gray-300"
              :src="pet.image"
              :alt="pet.name"
            />
            <p class="mt-2 text-sm text-gray-800">{{ pet.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
