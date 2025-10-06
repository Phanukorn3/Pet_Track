<script setup>
import Nav from "@/components/nav.vue";
import { ref } from "vue";
import pictureLogin from "@/assets/pict_login.jpg"; // ลบออกได้ถ้าเทสเสร็จ

// testๆ
// const pets = ref([{ id: 1, image: pictureLogin, type: "Cat" }]);
const pets = ref([]);
</script>
<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <!-- รูปพื้นหลัง -->
    <div
      class="absolute inset-0 bg-[url('@/assets/map.jpg')] bg-cover bg-center"
    ></div>

    <!-- ชั้น overlay สีเทาโปร่ง -->
    <div class="absolute inset-0 bg-gray-500/70"></div>

    <div
      class="relative bg-[#F4D9A2] p-8 rounded-2xl shadow-lg flex flex-col w-320 h-200"
    >
      <Nav />
      <div class="flex gap-8 h-full mb-8">
        <div
          class="bg-[#FFF7E2]/62 p-4 shadow-md w-full h-full rounded-2xl mt-8"
        >
          <!-- ใส่เล่นๆไว้ก่อน 555555555555555 -->
          <!-- รุูป map -->
          <iframe
            class="w-full h-full rounded-2xl"
            src="https://www.google.com/maps/embed?pb=!4m14!1m7!3m6!1s0x311d664988a1bedf:0xcc678f180e221cd0!2z4Liq4LiW4Liy4Lia4Lix4LiZ4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li14Lie4Lij4Liw4LiI4Lit4Lih4LmA4LiB4Lil4LmJ4Liy4LmA4LiI4LmJ4Liy4LiE4Li44LiT4LiX4Lir4Liy4Lij4Lil4Liy4LiU4LiB4Lij4Liw4Lia4Lix4LiH!8m2!3d13.7298889!4d100.7782323!16zL20vMDRrbHZk!3m5!1s0x311d66308ce98ffd:0xcb43a76f038c38ca!8m2!3d13.7310002!4d100.7811136!16s%2Fg%2F11r99z9yb?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div
          class="bg-[#FFF7E2]/62 p-4 shadow-md w-full h-full rounded-2xl mt-8 flex flex-col gap-5"
        >
          <!-- รุูป pet -->
          <div class="bg-[#F4D9A2]/40 p-4 shadow-md w-full h-1/2 rounded-2xl">
            <div
              v-for="pet in pets"
              :key="pet.id"
              class="w-auto h-full rounded-2xl bg-cover bg-center"
              :style="{ backgroundImage: `url(${pet.image})` }"
            ></div>
          </div>
          <!-- pet info -->
          <div class="bg-[#F4D9A2]/40 p-4 shadow-md w-full h-1/2 rounded-2xl">
            <div class="flex flex-col mt-5 ml-5">
              <p class="text-2xl text-[#FF7F50] font-mono">Pet Information</p>
              <div class="grid grid-cols-2 gap-x-0 gap-y-5 mt-6 w-auto">
                <!-- 1 -->
                <div class="text-xl text-[#FF7F50]">
                  <span class="font-mono">Type:</span> {{ pets.type }}
                </div>
                <div class="text-xl text-[#FF7F50]">
                  <span class="font-mono">Name:</span> {{ pets.name }}
                </div>
                <div class="text-xl text-[#FF7F50]">
                  <span class="font-mono">Age:</span> {{ pets.age }}
                </div>

                <!-- 2 -->
                <div class="text-xl text-[#FF7F50]">
                  <span class="font-mono">Weight:</span> {{ pets.weight }}
                </div>
                <div class="text-xl text-[#FF7F50]">
                  <span class="font-mono">Sex:</span> {{ pets.sex }}
                </div>
                <div class="text-xl text-[#FF7F50]">
                  <span class="font-mono">Description:</span>
                  {{ pets.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
