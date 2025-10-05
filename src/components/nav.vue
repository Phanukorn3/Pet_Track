<script setup>
import Logo from "@/components/logo.vue";
import UserProfile from "@/assets/user_profile.png";
import { useRouter } from "vue-router";

const defaultImage = UserProfile;

// ต้องมาแก้ด้วย **************
const username = "Bibi"; // test ชื่อ

const router = useRouter();

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
</script>
<template>
  <nav class="bg-[#FFF7E2]/62 p-4 shadow-md w-full h-18 rounded-2xl">
    <div class="container mx-auto flex items-center h-11">
      <Logo />

      <!-- border-2 border-gray-300 bg-[#FFF7E2] rounded-3xl p-1.5 -->
      <div class="flex space-x-4 ml-75">
        <router-link to="/" class="text-[#B26D38] text-xl mr-8"
          >Overview</router-link
        >
        <router-link to="/mypet" class="text-[#B26D38] text-xl"
          >My Pet</router-link
        >
      </div>
      <div class="ml-auto">
        <!-- <router-link to="/profile"> -->
          <img
            :src="defaultImage"
            alt="Profile"
            class="w-10 h-10 rounded-full object-cover border-1 border-gray-200"
        />
      <!-- </router-link> -->
        <!-- <img
        :src="user.profileImageUrl || defaultImage"
        alt="Profile"
        class="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
       /> -->
      </div>
      <div>
        <select
          name="profile"
          id="profile"
          class="ml-2 text-[#EA580C] text-lg rounded-md transition-all duration-300 hover:text-[#613818] bg-transparent border-none focus:outline-none"
          @change="handleProfileChange"
        >
          <option disabled selected hidden>{{ username }}</option>
          <option value="profile">Profile</option>
          <option value="logout">Logout</option>
        </select>
      </div>
    </div>
  </nav>
</template>
