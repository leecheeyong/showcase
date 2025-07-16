<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click="$emit('close')"
  >
    <div 
      class="bg-white dark:bg-gray-800 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
      @click.stop
    >
      <div class="relative">
        <img 
          :src="project.image || 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'" 
          :alt="project.title"
          class="w-full h-64 md:h-80 object-cover"
        >
        <div class="absolute inset-0 bg-black/20"></div>
        
        <button 
          @click="$emit('close')"
          class="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors group"
        >
          <svg class="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div class="absolute top-6 left-6">
          <span class="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white text-sm font-semibold rounded-full border border-gray-200/50 dark:border-gray-700/50">
            {{ project.category }}
          </span>
        </div>
      </div>
      
      <div class="p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
        <div class="max-w-4xl">
          <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div class="flex-1">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {{ project.title }}
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {{ project.description }}
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a 
                v-if="project.liveUrl" 
                :href="project.liveUrl" 
                target="_blank"
                class="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                <span>View Live</span>
              </a>
              <a 
                v-if="project.githubUrl" 
                :href="project.githubUrl" 
                target="_blank"
                class="px-6 py-3 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>View Code</span>
              </a>
            </div>
          </div>
          
          <div v-if="project.longDescription" class="mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">About This Project</h3>
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ project.longDescription }}
              </p>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <div 
                v-for="tech in project.technologies" 
                :key="tech"
                class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
              >
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])
</script>
