<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
          <p class="text-gray-600">Sign in to manage your projects</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <div
            v-if="error"
            class="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <p class="text-red-600 text-sm">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-black/20 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium disabled:opacity-50"
          >
            {{ loading ? "Signing in..." : "Sign In" }}
          </button>
        </form>

        <div class="mt-8 text-center">
          <button
            @click="$router.push('/')"
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Showcase
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { login, loading, error } = useAuth();

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
  }
};
</script>
