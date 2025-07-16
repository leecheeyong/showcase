<template>
  <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 group">
    <div class="relative overflow-hidden aspect-[4/3]">
      <img 
        :src="project.image || 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'" 
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      >
      
      <div class="absolute top-4 left-4">
        <span class="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white text-xs font-semibold rounded-full border border-gray-200/50 dark:border-gray-700/50">
          {{ project.category }}
        </span>
      </div>

      <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div class="flex space-x-3">
          <a 
            v-if="project.liveUrl" 
            :href="project.liveUrl" 
            target="_blank"
            @click.stop
            class="px-4 py-2 bg-white text-gray-800 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            <span>Live</span>
          </a>
          <a 
            v-if="project.githubUrl" 
            :href="project.githubUrl" 
            target="_blank"
            @click.stop
            class="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors text-sm font-medium flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span>Code</span>
          </a>
        </div>
      </div>
    </div>
    
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {{ project.title }}
        </h3>
        <div class="ml-4 flex-shrink-0">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
            <svg class="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <p class="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
        {{ project.description }}
      </p>
      
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tech in project.technologies?.slice(0, 4)" 
          :key="tech"
          class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium"
        >
          {{ tech }}
        </span>
        <span 
          v-if="project.technologies?.length > 4"
          class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
        >
          +{{ project.technologies.length - 4 }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
