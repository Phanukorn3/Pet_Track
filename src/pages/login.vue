<script>
import TextInput from "@/components/textInput.vue";
import Logo from "@/components/logo.vue";
import pictureLogin from "@/assets/pict_login.jpg";
import api from "@/service/api.js";

export default {
  components: { TextInput, Logo },
  data() {
    return {
      username: "",
      password: "",
      pictureLogin,
    };
  },
  methods: {
    async handleLogin() {
      const loginData = {
        username: this.username,
        password: this.password,
      };
      console.log("Logging in:", loginData);

      try {
        const res = await api.post("/login", loginData);
        console.log("Login response:", res.data);
        alert("Login successful! Token: " + res.data.token);
      } catch (err) {
        console.error(err);
        alert(
          "Login failed: " +
            (err.response?.data?.message || "Something went wrong")
        );
      }
    },
  },
};
</script>
<template>
  <div class="bg-[#E0D2B6] min-h-screen flex items-center justify-center">
    <div class="bg-[#FFF7E2] p-8 rounded-2xl shadow-lg flex w-320 h-200">
      <div class="flex-1">
        <Logo />
        <h2 class="text-4xl font-semibold mb-6 ml-70">Sign In</h2>

        <TextInput
          class="w-100 ml-30 mb-4"
          label="Username / Email"
          placeholder="Enter your username"
          v-model="username"
        />
        <TextInput
          class="w-100 ml-30"
          label="Password"
          type="password"
          placeholder="Enter your password"
          v-model="password"
        />
        <a
          href="#"
          class="text-sm text-[#EA580C]/60 ml-35 mt-0 transition-all duration-300 hover:text-[#EA580C]"
          >Forgot Password?</a
        >
        <button
          @click="handleLogin"
          class="w-100 bg-[#EA580C] text-white py-2 rounded-3xl transition-all duration-300 hover:bg-[#EA580C]/80 ml-30 mt-5"
        >
          Login
        </button>

        <p class="mt-4 text-xs ml-55">
          Don't have an account?
          <router-link to="/signup" class="text-[#EA580C]">Sign Up</router-link>
        </p>
      </div>

      <div class="flex-1 flex justify-center items-center">
        <img class="w-140 h-auto rounded-2xl" :src="pictureLogin" alt="" />
      </div>
    </div>
  </div>
</template>
