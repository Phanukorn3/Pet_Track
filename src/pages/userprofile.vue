```vue
<script setup>
import ChooseImage from "@/assets/choose_image_user.png";
import { ref } from "vue";

const userImage = ref(null);
const file = ref(null);

function handleFileChange(event) {
  const selectedFile = event.target.files[0];
  if (!selectedFile) return;
  file.value = selectedFile;
  userImage.value = URL.createObjectURL(selectedFile);
}
// --- ข้อมูลผู้ใช้ ---
const name = ref("Bibi");
const email = ref("bibi@example.com");
const age = ref("23");
const phone = ref("0912345678");
const description = ref("I love my pets!");

// ใช้อันนี้ถ้าเขียน back แล้ว

// const name = ref("");
// const email = ref("");
// const age = ref("");
// const phone = ref("");
// const description = ref("");

// --- State สำหรับแต่ละช่อง ---
const newName = ref("");
const newEmail = ref("");
const newAge = ref("");
const newPhone = ref("");
const newDescription = ref("");

const isEditingName = ref(false);
const isEditingEmail = ref(false);
const isEditingAge = ref(false);
const isEditingPhone = ref(false);
const isEditingDescription = ref(false);

function startEditing(field) {
  if (field === "name") {
    newName.value = name.value;
    isEditingName.value = true;
  } else if (field === "email") {
    newEmail.value = email.value;
    isEditingEmail.value = true;
  } else if (field === "age") {
    newAge.value = age.value;
    isEditingAge.value = true;
  } else if (field === "phone") {
    newPhone.value = phone.value;
    isEditingPhone.value = true;
  } else if (field === "description") {
    newDescription.value = description.value;
    isEditingDescription.value = true;
  }
}

function saveEdit(field) {
  if (field === "name") {
    if (!newName.value.trim()) return alert("กรุณาใส่ชื่อ");
    name.value = newName.value.trim();
    isEditingName.value = false;
  } else if (field === "email") {
    if (!newEmail.value.trim()) return alert("กรุณาใส่อีเมล");
    email.value = newEmail.value.trim();
    isEditingEmail.value = false;
  } else if (field === "age") {
    if (!newAge.value.trim()) return alert("กรุณาใส่อายุ");
    age.value = newAge.value.trim();
    isEditingAge.value = false;
  } else if (field === "phone") {
    if (!newPhone.value.trim()) return alert("กรุณาใส่เบอร์โทร");
    phone.value = newPhone.value.trim();
    isEditingPhone.value = false;
  } else if (field === "description") {
    if (!newDescription.value.trim()) return alert("กรุณาใส่คำอธิบาย");
    description.value = newDescription.value.trim();
    isEditingDescription.value = false;
  }
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center">
    <div
      class="absolute inset-0 bg-[url('@/assets/map.jpg')] bg-cover bg-center"
    ></div>
    <div class="absolute inset-0 bg-gray-500/70"></div>

    <div
      class="relative bg-[#F4D9A2] p-10 pr-20 pl-20 rounded-2xl shadow-lg flex flex-col w-320 h-200"
    >
      <div class="bg-[#FFF7E2]/62 p-4 shadow-md w-full h-50 rounded-t-2xl mt-4">
        <div class="flex justify-end mb-0">
        <router-link
          to="/"
          class="text-[#B26D38] py-2 px-4 border border-gray-300 bg-[#FFF7E2] rounded-3xl hover:bg-[#d6caab] transition-colors duration-200"
        >
          Home
        </router-link></div>
        <div class="flex items-start mt-12 ml-20 gap-10">
          <input
            id="user-image"
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="hidden"
          />
          <label v-if="userImage" for="user-image" class="cursor-pointer">
            <img
              :src="userImage"
              alt="User Image"
              class="w-48 h-48 object-cover rounded-full border border-[#F4D9A2]"
            />
          </label>
          <label
            v-else
            for="user-image"
            class="cursor-pointer flex flex-col items-center"
          >
            <img
              :src="ChooseImage"
              alt="Choose Image"
              class="w-48 h-48 object-cover rounded-full border border-[#F4D9A2]"
            />
            <p class="text-sm text-gray-400">Click to upload</p>
          </label>

          <!-- ชื่อ -->
          <div class="mt-30 flex ml-10 gap-2">
            <template v-if="!isEditingName">
              <p class="text-lg font-semibold text-[#FF7F50]">{{ name }}</p>
              <button @click="startEditing('name')">
                <img
                  src="@/assets/edit.png"
                  alt="Edit"
                  class="w-4 h-4 hover:scale-110 transition-transform duration-200 ml-2"
                />
              </button>
            </template>
            <template v-else>
              <input
                v-model="newName"
                type="text"
                class="text-lg font-semibold text-[#FF7F50]/80 border-b focus:outline-none w-40"
              />
              <button
                @click="saveEdit('name')"
                class="text-green-600 font-medium hover:text-green-800 ml-2"
              >
                ✓
              </button>
            </template>
          </div>
        </div>

        <!-- Personal Info -->
        <div class="flex flex-col mt-5 ml-10">
          <p class="text-2xl text-[#FF7F50]">Personal Information</p>
          <p class="text-sm text-[#FF7F50]/60 ml-1">Update your information</p>

          <!-- Email -->
          <div class="flex items-center mt-10 ml-10">
            <p class="text-[#FF7F50] text-lg w-40">Email</p>
            <template v-if="!isEditingEmail">
              <p
                class="text-lg font-semibold text-[#FF7F50] w-60 truncate ml-10"
              >
                {{ email }}
              </p>
              <button @click="startEditing('email')" class="ml-2">
                <img
                  src="@/assets/edit.png"
                  alt="Edit"
                  class="w-4 h-4 hover:scale-110 transition-transform duration-200"
                />
              </button>
            </template>
            <template v-else>
              <input
                v-model="newEmail"
                type="text"
                class="text-lg font-semibold text-[#FF7F50]/80 border-b focus:outline-none w-60 ml-10"
              />
              <button
                @click="saveEdit('email')"
                class="text-green-600 font-medium hover:text-green-800 ml-2"
              >
                ✓
              </button>
            </template>
          </div>

          <!-- Age -->
          <div class="flex items-center mt-10 ml-10">
            <p class="text-[#FF7F50] text-lg w-40">Age</p>
            <template v-if="!isEditingAge">
              <p
                class="text-lg font-semibold text-[#FF7F50] w-60 truncate ml-10"
              >
                {{ age }}
              </p>
              <button @click="startEditing('age')" class="ml-2">
                <img
                  src="@/assets/edit.png"
                  alt="Edit"
                  class="w-4 h-4 hover:scale-110 transition-transform duration-200"
                />
              </button>
            </template>
            <template v-else>
              <input
                v-model="newAge"
                type="text"
                class="text-lg font-semibold text-[#FF7F50]/80 border-b focus:outline-none w-60 ml-10"
              />
              <button
                @click="saveEdit('age')"
                class="text-green-600 font-medium hover:text-green-800 ml-2"
              >
                ✓
              </button>
            </template>
          </div>

          <!-- Phone -->
          <div class="flex items-center mt-10 ml-10">
            <p class="text-[#FF7F50] text-lg w-40">Phone</p>
            <template v-if="!isEditingPhone">
              <p
                class="text-lg font-semibold text-[#FF7F50] w-60 truncate ml-10"
              >
                {{ phone }}
              </p>
              <button @click="startEditing('phone')" class="ml-2">
                <img
                  src="@/assets/edit.png"
                  alt="Edit"
                  class="w-4 h-4 hover:scale-110 transition-transform duration-200"
                />
              </button>
            </template>
            <template v-else>
              <input
                v-model="newPhone"
                type="text"
                class="text-lg font-semibold text-[#FF7F50]/80 border-b focus:outline-none w-60 ml-10"
              />
              <button
                @click="saveEdit('phone')"
                class="text-green-600 font-medium hover:text-green-800 ml-2"
              >
                ✓
              </button>
            </template>
          </div>

          <!-- Description -->
          <div class="flex items-center mt-10 ml-10">
            <p class="text-[#FF7F50] text-lg w-40">Description</p>
            <template v-if="!isEditingDescription">
              <p
                class="text-lg font-semibold text-[#FF7F50] w-60 truncate ml-10"
              >
                {{ description }}
              </p>
              <button @click="startEditing('description')" class="ml-2">
                <img
                  src="@/assets/edit.png"
                  alt="Edit"
                  class="w-4 h-4 hover:scale-110 transition-transform duration-200"
                />
              </button>
            </template>
            <template v-else>
              <input
                v-model="newDescription"
                type="text"
                class="text-lg font-semibold text-[#FF7F50]/80 border-b focus:outline-none w-60 ml-10"
              />
              <button
                @click="saveEdit('description')"
                class="text-green-600 font-medium hover:text-green-800 ml-2"
              >
                ✓
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```
