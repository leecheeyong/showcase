<template>
  <div v-if="authInitialized">
    <router-view />
  </div>
  <div
    v-else
    class="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center"
  >
    <div class="text-center">
      <div
        class="w-8 h-8 border border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full animate-spin mx-auto mb-4"
      ></div>
      <p class="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "./composables/useAuth";

const { initAuth, initialized } = useAuth();
const authInitialized = ref(false);

onMounted(async () => {
  await initAuth();
  authInitialized.value = true;
});
</script>
