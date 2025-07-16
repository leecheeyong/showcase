<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <header class="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-lg font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p class="text-xs text-gray-400 dark:text-gray-500">Manage your projects</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="hidden sm:flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs text-blue-700 dark:text-blue-300 font-medium">
              <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              {{ projects.length }} Projects
            </span>
            <button 
              @click="$router.push('/')"
              class="px-3 py-2 text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg"
              title="Go to Home"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </button>
            <button 
              @click="handleLogout"
              class="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div class="xl:col-span-4">
          <div class="sticky top-24">
            <ModernProjectForm 
              :project="editingProject"
              :loading="formLoading"
              @submit="handleProjectSubmit"
              @cancel="cancelEdit"
            />
          </div>
        </div>
        <div class="xl:col-span-8">
          <div class="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 p-5 mb-8">
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </div>
                  <input 
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search projects..."
                    class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-gray-900 dark:text-white"
                  >
                </div>
              </div>
              <select 
                v-model="filterCategory"
                class="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-900 transition-all duration-300 text-gray-900 dark:text-white"
              >
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
          </div>
          <div class="space-y-6">
            <div v-if="loading" class="flex justify-center py-12">
              <div class="relative">
                <div class="w-12 h-12 border-4 border-gray-100 dark:border-gray-800 rounded-full"></div>
                <div class="absolute top-0 left-0 w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <div v-else-if="filteredProjects.length === 0" class="text-center py-12">
              <div class="w-20 h-20 bg-gray-100 dark:bg-gray-900 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-2">No projects found</h3>
              <p class="text-gray-400 dark:text-gray-500">{{ searchQuery || filterCategory ? 'Try adjusting your search criteria' : 'Add your first project to get started!' }}</p>
            </div>
            <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div 
                v-for="project in filteredProjects" 
                :key="project.id"
                class="bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div class="relative h-44 overflow-hidden">
                  <img 
                    :src="project.image || 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'" 
                    :alt="project.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                  <div class="absolute top-3 left-3">
                    <span class="px-3 py-1 bg-white dark:bg-gray-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full shadow border border-blue-200 dark:border-blue-700">
                      {{ project.category }}
                    </span>
                  </div>
                  <div class="absolute top-3 right-3 flex space-x-2">
                    <button 
                      @click="editProject(project)"
                      class="w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                      title="Edit project"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button 
                      @click="deleteProjectById(project.id)"
                      class="w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
                      title="Delete project"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="p-5">
                  <h3 class="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {{ project.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                    {{ project.description }}
                  </p>
                  <div class="flex flex-wrap gap-2 mb-4">
                    <span 
                      v-for="tech in project.technologies?.slice(0, 3)" 
                      :key="tech"
                      class="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium border border-blue-200 dark:border-blue-700"
                    >
                      {{ tech }}
                    </span>
                    <span 
                      v-if="project.technologies?.length > 3"
                      class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium border border-blue-200 dark:border-blue-700"
                    >
                      +{{ project.technologies.length - 3 }}
                    </span>
                  </div>
                  <div class="flex space-x-3">
                    <a 
                      v-if="project.liveUrl" 
                      :href="project.liveUrl" 
                      target="_blank"
                      class="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-xs font-semibold shadow"
                    >
                      Live Demo
                    </a>
                    <a 
                      v-if="project.githubUrl" 
                      :href="project.githubUrl" 
                      target="_blank"
                      class="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-center text-xs font-semibold shadow"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '../composables/useProjects'
import { useAuth } from '../composables/useAuth'
import ModernProjectForm from '../components/ProjectForm.vue'

const router = useRouter()
const { logout } = useAuth()
const { 
  projects, 
  loading, 
  categories,
  addProject, 
  updateProject, 
  deleteProject, 
  subscribeToProjects 
} = useProjects()

const editingProject = ref(null)
const formLoading = ref(false)
const searchQuery = ref('')
const filterCategory = ref('')

const filteredProjects = computed(() => {
  let filtered = projects.value

  if (filterCategory.value) {
    filtered = filtered.filter(project => project.category === filterCategory.value)
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

const handleProjectSubmit = async (projectData) => {
  formLoading.value = true
  
  try {
    if (editingProject.value) {
      await updateProject(editingProject.value.id, projectData)
    } else {
      await addProject(projectData)
    }
    
    editingProject.value = null
  } catch (error) {
    console.error('Error saving project:', error)
  } finally {
    formLoading.value = false
  }
}

const editProject = (project) => {
  editingProject.value = { ...project }
}

const cancelEdit = () => {
  editingProject.value = null
}

const deleteProjectById = async (id) => {
  if (confirm('Are you sure you want to delete this project?')) {
    try {
      await deleteProject(id)
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onMounted(() => {
  subscribeToProjects()
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
