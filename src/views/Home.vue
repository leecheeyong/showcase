<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <nav class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full px-8 py-4 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
        <div class="flex items-center space-x-8">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Portfolio</span>
          <div class="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ filteredProjects.length }} Projects</span>
        </div>
      </div>
    </nav>

    <section class="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-20 left-10 w-32 h-32 border border-blue-200 dark:border-blue-800 rounded-full opacity-30"></div>
        <div class="absolute top-40 right-20 w-24 h-24 bg-purple-100 dark:bg-purple-900/30 rounded-lg rotate-45 opacity-40"></div>
        <div class="absolute bottom-32 left-1/4 w-16 h-16 border-2 border-green-200 dark:border-green-800 rotate-12 opacity-50"></div>
        <div class="absolute bottom-20 right-1/3 w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full opacity-30"></div>
      </div>

      <div class="relative max-w-6xl mx-auto text-center">
        <div class="mb-12">
          <div class="inline-flex items-center space-x-4 mb-8">
            <div class="w-12 h-px bg-gray-400 dark:bg-gray-600"></div>
            <span class="text-xs tracking-[0.3em] text-gray-500 dark:text-gray-400 uppercase font-medium">Creative Works</span>
            <div class="w-12 h-px bg-gray-400 dark:bg-gray-600"></div>
          </div>
          
          <h1 class="text-7xl md:text-9xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-none">
            <span class="block">PROJ</span>
            <span class="block text-blue-600 dark:text-blue-400">ECTS</span>
          </h1>
          
          <div class="max-w-2xl mx-auto">
            <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
              Crafting digital experiences through innovative design and cutting-edge technology
            </p>
          </div>
        </div>

        <div class="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div class="flex flex-col items-center space-y-2">
            <div class="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
              <div class="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-bounce"></div>
            </div>
            <span class="text-xs text-gray-400 dark:text-gray-500 tracking-wider">SCROLL</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-16">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div class="lg:col-span-2">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input 
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search projects, technologies..."
                  class="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500"
                >
              </div>
            </div>

            <div>
              <select 
                v-model="selectedCategory"
                class="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white"
              >
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap justify-center gap-3 mb-20">
          <button
            @click="selectedCategory = ''"
            :class="[
              'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105',
              selectedCategory === '' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            ]"
          >
            All Projects
          </button>
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105',
              selectedCategory === category 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <section class="pb-32 px-6">
      <div class="max-w-7xl mx-auto">
        <div v-if="loading" class="flex justify-center py-20">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
            <div class="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>

        <div v-else-if="filteredProjects.length === 0" class="text-center py-20">
          <div class="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">No projects found</h3>
          <p class="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <div 
            v-for="(project, index) in filteredProjects" 
            :key="project.id"
            class="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
            :style="{ animationDelay: `${index * 100}ms` }"
            @click="openProjectModal(project)"
          >
            <UniqueProjectCard :project="project" />
          </div>
        </div>
      </div>
    </section>

    <UniqueProjectModal 
      :isOpen="isModalOpen"
      :project="selectedProject"
      @close="closeProjectModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjects } from '../composables/useProjects'
import UniqueProjectCard from '../components/ProjectCard.vue'
import UniqueProjectModal from '../components/ProjectModal.vue'

const { projects, loading, categories, subscribeToProjects } = useProjects()

const selectedCategory = ref('')
const searchQuery = ref('')
const isModalOpen = ref(false)
const selectedProject = ref({})

const filteredProjects = computed(() => {
  let filtered = projects.value

  if (selectedCategory.value) {
    filtered = filtered.filter(project => project.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.technologies?.some(tech => tech.toLowerCase().includes(query))
    )
  }

  return filtered
})

const openProjectModal = (project) => {
  selectedProject.value = project
  isModalOpen.value = true
}

const closeProjectModal = () => {
  isModalOpen.value = false
  selectedProject.value = {}
}

onMounted(() => {
  subscribeToProjects()
})
</script>
