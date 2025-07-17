<template>
  <div
    class="relative rounded-3xl overflow-hidden group border border-transparent bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-blue-950 dark:to-purple-900 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-xl h-90 sm:h-[450px] md:h-[480px] lg:h-[520px] flex flex-col"
  >
    <div class="absolute inset-0 pointer-events-none z-0 animate-card-gradient">
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-400/20 via-pink-200/20 to-purple-300/20"
      ></div>
    </div>
    <div
      class="relative w-full h-40 sm:h-48 md:h-56 z-10 flex items-center justify-center mb-4"
    >
      <div class="w-full h-full relative flex items-center justify-center">
        <template v-if="isVideoType(displayedImage)">
          <video
            :src="displayedImage"
            loading="lazy"
            autoplay
            loop
            disablePictureInPicture
            muted
            playsinline
            class="w-full h-full object-cover transition-transform duration-300 ease-in-out"
          ></video>
        </template>
        <template v-else>
          <img
            v-if="displayedImage"
            :src="displayedImage"
            :alt="project.title"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-300 ease-in-out"
          />
          <img
            v-else
            src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg"
            alt="Project preview"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-300 ease-in-out"
          />
        </template>
        <div
          class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3"
        >
          <span
            v-for="(img, idx) in imagesArray"
            :key="idx"
            class="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
            :class="
              carouselIndex === idx
                ? 'bg-blue-500'
                : 'bg-gray-300 dark:bg-gray-700'
            "
          />
        </div>
      </div>
      <div class="absolute top-4 left-4">
        <span
          class="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200/50 dark:border-blue-700/50 shadow-md"
        >
          {{ project.category }}
        </span>
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-br from-white/50 via-blue-100/30 to-purple-100/30 dark:from-gray-900/50 dark:via-blue-900/30 dark:to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-xl z-20 flex items-center justify-center hidden sm:flex"
      >
        <div class="flex space-x-3">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            @click.stop
            class="px-4 py-2 bg-white/90 text-blue-700 rounded-full hover:bg-blue-50 transition-colors text-sm font-bold flex items-center space-x-2 shadow-lg"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
            <span>Live</span>
          </a>
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            @click.stop
            class="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors text-sm font-bold flex items-center space-x-2 shadow-lg"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span>Code</span>
          </a>
        </div>
      </div>
    </div>
    <div class="p-4 sm:p-6 md:p-7 lg:p-8 relative z-10 flex-1 flex flex-col">
      <div class="flex items-start justify-between mb-4">
        <h3
          class="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2"
        >
          {{ project.title }}
        </h3>
        <div class="ml-2 sm:ml-4 flex-shrink-0">
          <div
            class="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 shadow-md"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <p
        class="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 line-clamp-3 leading-relaxed text-sm sm:text-base md:text-lg"
      >
        {{ project.description }}
      </p>
      <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="tech in project.technologies?.slice(0, 4)"
          :key="tech"
          class="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 text-xs sm:text-sm md:text-base rounded-full shadow-sm"
        >
          {{ tech }}
        </span>
        <span
          v-if="project.technologies?.length > 4"
          class="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs sm:text-sm md:text-base rounded-full font-bold shadow-sm"
        >
          +{{ project.technologies.length - 4 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});
const carouselIndex = ref(0);
const imagesArray = computed(() => {
  if (Array.isArray(props.project.images) && props.project.images.length > 0) {
    return props.project.images;
  }
  return [
    props.project.image ||
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  ];
});
const displayedImage = computed(() => imagesArray.value[carouselIndex.value]);
const isVideoType = (url) => /\.(webm|mp4)$/i.test(url);
let intervalId = null;
onMounted(() => {
  intervalId = setInterval(() => {
    carouselIndex.value = (carouselIndex.value + 1) % imagesArray.value.length;
  }, 5000);
});
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
const longDescriptionLines = computed(() =>
  props.project.longDescription
    ? props.project.longDescription.split(/\r?\n/)
    : [],
);
</script>

<style scoped>
@keyframes card-gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-card-gradient {
  animation: card-gradient 8s ease-in-out infinite;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
