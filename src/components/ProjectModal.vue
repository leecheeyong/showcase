<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-2 sm:p-6"
    @click="$emit('close')"
  >
    <div
      class="bg-white dark:bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-800 flex flex-col"
      @click.stop
    >
      <div class="relative h-48 sm:h-64 md:h-80 w-full">
        <template v-if="isVideoType(displayedImage)">
          <video
            :src="displayedImage"
            autoplay
            muted
            loop
            :alt="project.title"
            loading="lazy"
            class="w-full h-full object-cover rounded-t-2xl"
          />
        </template>
        <template v-else>
          <img
            :src="displayedImage"
            :alt="project.title"
            loading="lazy"
            class="w-full h-full object-cover rounded-t-2xl"
          />
        </template>
        <button
          v-if="imagesArray.length > 1"
          @click.stop="prevImage"
          class="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors z-10"
        >
          <svg
            class="w-6 h-6 text-blue-600 dark:text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          v-if="imagesArray.length > 1"
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors z-10"
        >
          <svg
            class="w-6 h-6 text-blue-600 dark:text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <div
          class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10"
        >
          <span
            v-for="(img, idx) in imagesArray"
            :key="idx"
            class="w-3 h-3 rounded-full border border-white dark:border-gray-800 cursor-pointer"
            :class="
              carouselIndex === idx
                ? 'bg-blue-500'
                : 'bg-gray-300 dark:bg-gray-700'
            "
            @click.stop="goToImage(idx)"
          />
        </div>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
        ></div>
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div class="absolute top-4 left-4">
          <span
            class="px-3 py-1 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full shadow border border-blue-200 dark:border-blue-700"
          >
            {{ project.category }}
          </span>
        </div>
      </div>
      <div class="p-5 sm:p-8 overflow-y-auto max-h-[calc(92vh-12rem)]">
        <div class="max-w-2xl mx-auto">
          <h2
            class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight"
          >
            {{ project.title }}
          </h2>
          <p
            class="text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6"
          >
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium border border-blue-200 dark:border-blue-700"
            >
              {{ tech }}
            </span>
          </div>
          <div class="flex gap-3 mb-8 flex-wrap">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              class="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2 shadow"
            >
              <svg
                class="w-5 h-5"
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
              <span>View Live</span>
            </a>
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              class="px-5 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold flex items-center space-x-2 shadow"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              <span>View Code</span>
            </a>
          </div>
          <div v-if="project.longDescription" class="mb-8">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
              About This Project
            </h3>
            <div class="bg-gray-50 dark:bg-gray-800/60 rounded-xl p-5">
              <p class="text-gray-700 dark:text-gray-200 leading-relaxed">
                <span v-for="(line, idx) in longDescriptionLines" :key="idx">
                  {{ line }}<br v-if="idx < longDescriptionLines.length - 1" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
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
const prevImage = () => {
  carouselIndex.value =
    (carouselIndex.value - 1 + imagesArray.value.length) %
    imagesArray.value.length;
};
const nextImage = () => {
  carouselIndex.value = (carouselIndex.value + 1) % imagesArray.value.length;
};
const goToImage = (idx) => {
  carouselIndex.value = idx;
};
const isVideoType = (url) => /\.(webm|mp4)$/i.test(url);
const emit = defineEmits(["close"]);
const longDescriptionLines = computed(() =>
  props.project.longDescription
    ? props.project.longDescription.split(/\r?\n/)
    : [],
);
</script>
