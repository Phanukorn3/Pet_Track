<script>
//import UserProfile from "@/assets/user_profile.png";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const defaultImage = UserProfile;
const router = useRouter();

// ต้องมาแก้ด้วย **************

function handleProfileChange(event) {
  const value = event.target.value;
  if (!value) return;

  if (value === "profile") {
    router.push("/profile");
  } else if (value === "logout") {
    router.push("/login");
  }

  event.target.value = "";
}
const user = ref({
  profileImageUrl: "", // จะได้จาก backend
  name: "", // จะได้จาก backend
});

// fecth ค่าจาก backend *************
onMounted(async () => {
  try {
    const res = await axios.get("/profile");  // จาก backend
    user.value = res.data;
  } catch (err) {
    console.error("Failed to fetch user:", err);
  }
});
</script>

<template>
  <nav class="bg-[#FFF7E2]/62 p-4 shadow-md w-full h-18 rounded-2xl">
    <div class="container mx-auto flex items-center h-11">
      <Logo />

      <!-- border-2 border-gray-300 bg-[#FFF7E2] rounded-3xl p-1.5 -->
      <div class="flex space-x-4 ml-75">
        <router-link to="/" v-slot="{ isActive }">
          <span :class="[
            'text-[#B26D38] text-xl mr-8 px-3 py-1.5 rounded-3xl transition-all duration-300 hover:bg-[#FFF7E2]',
            isActive
              ? 'border-2 border-gray-300 bg-[#FFF7E2]'
              : 'border-2 border-transparent',
          ]">
            Overview
          </span>
        </router-link>
        <router-link to="/pets" v-slot="{ isActive }">
          <span :class="[
            'text-[#B26D38] text-xl px-3 py-1.5 rounded-3xl transition-all duration-300 hover:bg-[#FFF7E2]',
            isActive
              ? 'border-2 border-gray-300 bg-[#FFF7E2]'
              : 'border-2 border-transparent',
          ]">
            My Pet
          </span>
        </router-link>
      </div>
      <div class="ml-auto">
        <!-- <router-link to="/profile"> -->
        <!-- <img
          :src="defaultImage"
          alt="Profile"
          class="w-10 h-10 rounded-full object-cover border-1 border-gray-200" -->
        <!-- </router-link> -->
        <img :src="user.profileImageUrl || defaultImage" alt="Profile"
          class="w-10 h-10 rounded-full object-cover border-2 border-gray-200" />
      </div>
      <div>
        <select
          class="ml-2 text-[#EA580C] text-lg rounded-md transition-all duration-300 hover:text-[#613818] bg-transparent border-none focus:outline-none"
          @change="handleProfileChange">
          <option disabled selected hidden>{{ user.name }}</option>
          <option value="profile">Profile</option>
          <option value="logout">Logout</option>
        </select>
      </div>
    </div>
  </nav>
</template>