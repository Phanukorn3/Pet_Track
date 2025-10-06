<script setup>
import { ref } from "vue";
import Nav from "@/components/nav.vue";
import TextInput from "@/components/textInput.vue";
import ChooseImage from "@/assets/choose_image.png";
import axios from "axios";

const petName = ref("");
const petAge = ref("");
const petSex = ref("");
const petWeight = ref("");
const petFavoriteFood = ref("");

const petImage = ref(null); // preview URL
const file = ref(null); // เก็บไฟล์จริง

function handleFileChange(event) {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;
  file.value = selectedFile;
  petImage.value = URL.createObjectURL(selectedFile);
}

async function handleSubmit() {

    if (!file.value) {
    alert("กรุณาใส่รูปภาพสัตว์เลี้ยง");
    return false;
  }

  // ชื่อสัตว์เลี้ยง
  if (!petName.value || typeof petName.value !== "string" || petName.value.trim() === "") {
    alert("กรุณาใส่ชื่อสัตว์เลี้ยงเป็นข้อความที่ถูกต้อง");
    return false;
  }

  // อายุสัตว์เลี้ยง (ต้องเป็นตัวเลขบวก)
  const ageNum = Number(petAge.value);
  if (!petAge.value || isNaN(ageNum) || ageNum <= 0) {
    alert("กรุณาใส่อายุสัตว์เลี้ยงเป็นตัวเลข");
    return false;
  }

  // เพศสัตว์เลี้ยง
  if (!petSex.value || !["male", "female"].includes(petSex.value)) {
    alert("กรุณาเลือกเพศสัตว์เลี้ยง");
    return false;
  }

  // น้ำหนักสัตว์เลี้ยง (ต้องเป็นตัวเลขบวก)
  const weightNum = Number(petWeight.value);
  if (!petWeight.value || isNaN(weightNum) || weightNum <= 0) {
    alert("กรุณาใส่น้ำหนักสัตว์เลี้ยงเป็นตัวเลข");
    return false;
  }

  // อาหารที่ชื่นชอบ
  if (!petFavoriteFood.value || petFavoriteFood.value.trim() === "" || typeof petFavoriteFood.value !== "string") {
    alert("กรุณาใส่อาหารที่สัตว์เลี้ยงชอบ");
    return false;
  }

  const formData = new FormData();
  formData.append("name", petName.value);
  formData.append("age", petAge.value);
  formData.append("sex", petSex.value);
  formData.append("weight", petWeight.value);
  formData.append("favoriteFood", petFavoriteFood.value);
  formData.append("image", file.value);

  try {
    const res = await axios.post("/api/pets", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Added pet:", res.data);
    alert("Add pet successfully!");
    // ล้างฟอร์ม
    petName.value = "";
    petAge.value = "";
    petSex.value = "";
    petWeight.value = "";
    petFavoriteFood.value = "";
    petImage.value = null;
    file.value = null;
  } catch (err) {
    console.error("Failed to add pet:", err);
    alert("Failed to add pet");
  }
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-[url('@/assets/map.jpg')] bg-cover bg-center"
    ></div>
    <div class="absolute inset-0 bg-gray-500/70"></div>

    <div class="relative bg-[#F4D9A2] p-8 rounded-2xl shadow-lg w-320 h-200">
      <Nav />
      <div
        class="bg-[#FFF7E2]/62 pt-6 pl-6 pr-6 shadow-md w-full h-155 rounded-2xl mt-8 flex gap-8 items-start"
      >
        <!-- Left: Image -->
        <div class="flex flex-col items-center mt-25 ml-20">
          <input
            id="pet-image"
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="hidden"
          />
          <label for="pet-image" class="cursor-pointer">
            <img
              :src="petImage || ChooseImage"
              alt="Choose Image"
              class="w-48 h-48 rounded-full object-cover border border-gray-300"
            />
          </label>
          <p class="mt-2 text-sm text-gray-400">Clickto upload</p>
        </div>

        <!-- Right: Form -->
        <div class="flex flex-col flex-1 gap-4 mt-20 mr-20 ml-20">
          <TextInput
            v-model="petName"
            label="Name"
            placeholder="Enter pet name"
            class="w-140"
          />
          <div class="flex gap-5">
            <TextInput
              v-model="petAge"
              label="Age"
              placeholder="Enter pet age"
              class="w-65"
            />
            <div class="mt-1 w-70">
              <label class="ml-5 text-gray-700">Pet Sex</label>
              <select
                v-model="petSex"
                class="w-full p-2 border border-black rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#a79d9d] pl-4 text-[#000000]"
              >
                <option disabled value="">Select sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <TextInput
            v-model="petWeight"
            label="Weight"
            placeholder="Enter pet weight"
            class="w-140"
          />
          <TextInput
            v-model="petFavoriteFood"
            label="Favorite Food"
            placeholder="Enter pet favorite food"
            class="w-140"
          />
          <button
            @click="handleSubmit"
            class="w-140 bg-[#FF7F50] text-white py-2 rounded-3xl hover:bg-[#FF7F50] transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
