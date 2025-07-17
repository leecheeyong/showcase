<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ isEditing ? 'Edit Project' : 'Add New Project' }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ isEditing ? 'Update project details' : 'Create a new project entry' }}
          </p>
        </div>
        <div v-if="isEditing" class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span class="text-xs text-blue-600 dark:text-blue-400 font-medium">Editing</span>
        </div>
      </div>
    </div>
    
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
      <div class="grid grid-cols-1 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Project Title
          </label>
          <input 
            v-model="formData.title"
            type="text" 
            required
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500"
            placeholder="Enter project title"
          >
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Category
          </label>
          <select 
            v-model="formData.category"
            required
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white"
          >
            <option value="">Select category</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Desktop App">Desktop App</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Short Description
        </label>
        <textarea 
          v-model="formData.description"
          required
          rows="3"
          class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 resize-none"
          placeholder="Brief description of the project"
        ></textarea>
      </div>
      
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Detailed Description
          <span class="text-gray-400 font-normal">(Optional)</span>
        </label>
        <textarea 
          v-model="formData.longDescription"
          rows="4"
          class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 resize-none"
          placeholder="Detailed description of the project"
        ></textarea>
      </div>
      
      <div class="grid grid-cols-1 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Live Demo URL
            <span class="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input 
            v-model="formData.liveUrl"
            type="url"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500"
            placeholder="https://example.com"
          >
        </div>
        
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            GitHub Repository
            <span class="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input 
            v-model="formData.githubUrl"
            type="url"
            class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500"
            placeholder="https://github.com/username/repo"
          >
        </div>
      </div>
      
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Technologies Used
        </label>
        <input 
          v-model="technologiesInput"
          type="text"
          class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500"
          placeholder="React, Node.js, MongoDB (comma-separated)"
        >
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">Separate technologies with commas</p>
      </div>
      
      <div>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Project Images
          <span class="text-gray-400 font-normal">(Add multiple image URLs)</span>
        </label>
        <div class="space-y-2 mb-2">
          <div v-for="(img, idx) in formData.images" :key="idx" class="flex items-center gap-2">
            <input 
              :value="img"
              readonly
              class="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg text-gray-900 dark:text-white text-xs"
            >
            <button type="button" @click="removeImage(idx)" class="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800">Remove</button>
          </div>
        </div>
        <div class="flex gap-2">
          <input 
            v-model="newImageUrl"
            type="url"
            class="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-xs"
            placeholder="https://example.com/image.jpg"
          >
          <button type="button" @click="addImage" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-semibold">Add</button>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button 
          type="submit"
          :disabled="loading"
          class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center justify-center space-x-2"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ loading ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project') }}</span>
        </button>
        
        <button 
          type="button"
          @click="resetForm"
          class="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-semibold"
        >
          {{ isEditing ? 'Cancel' : 'Reset' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

const isEditing = computed(() => !!props.project)

const formData = ref({
  title: '',
  category: '',
  description: '',
  longDescription: '',
  liveUrl: '',
  githubUrl: '',
  images: [],
  technologies: []
})

const technologiesInput = ref('')
const newImageUrl = ref('')

const resetForm = () => {
  if (isEditing.value) {
    emit('cancel')
  } else {
    formData.value = {
      title: '',
      category: '',
      description: '',
      longDescription: '',
      liveUrl: '',
      githubUrl: '',
      images: [],
      technologies: []
    }
    technologiesInput.value = ''
  }
}

watch(() => props.project, (newProject) => {
  if (newProject) {
    formData.value = { ...newProject }
    technologiesInput.value = newProject.technologies?.join(', ') || ''
    formData.value.images = Array.isArray(newProject.images)
      ? newProject.images
      : (newProject.image ? [newProject.image] : [])
  } else {
    resetForm()
  }
}, { immediate: true })

const addImage = () => {
  if (!Array.isArray(formData.value.images)) formData.value.images = [];
  if (newImageUrl.value && !formData.value.images.includes(newImageUrl.value)) {
    formData.value.images.push(newImageUrl.value)
    newImageUrl.value = ''
  }
}

const removeImage = (idx) => {
  formData.value.images.splice(idx, 1)
}

const handleSubmit = () => {
  const technologies = technologiesInput.value
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)

  const projectData = {
    ...formData.value,
    technologies,
    image: formData.value.images[0] || '' 
  }

  emit('submit', projectData)
}
</script>
