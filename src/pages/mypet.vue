<script setup>
import Nav from "@/components/nav.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

// for test เด้อ ***** เปลี่ยนเป็นค่าที่ดึงมาจาก database

const pets = ref([]);
onMounted(async () => {
  try {
    const res = await axios.get("api/pets"); // เปลี่ยนเป็น endpoint จริง รอต้า
    pets.value = res.data;
  } catch (err) {
    console.error("Failed to fetch pets:", err);
  }
});
async function deletePet(id) {
  try {
    await axios.delete(`/api/pets/${id}`);
    pets.value = pets.value.filter((pet) => pet.id !== id);
    alert("Pet deleted successfully");
  } catch (err) {
    console.error("Failed to delete pet:", err);
    alert("Failed to delete pet");
  }
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <!-- รูปพื้นหลัง -->
    <div class="absolute inset-0 bg-gray-500/70"></div>

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
            class="relative flex flex-col items-center w-40 group"
          >
            <img
              class="w-40 h-40 rounded-full object-cover flex-shrink-0 border border-gray-300"
              :src="pet.image"
              :alt="pet.name"
            />
            <button
              @click="deletePet(pet.id)"
              class="absolute top-0 left-0 w-40 h-40 flex items-center justify-center text-red-700 text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
            >
              Delete
            </button>
            <p class="mt-2 text-md text-[#B26D38]">{{ pet.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>