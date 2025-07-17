<template>
  <div
    class="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-blue-950 dark:to-purple-900 transition-colors duration-500"
  >
    <div class="absolute inset-0 pointer-events-none z-0">
      <div
        class="absolute animate-float-slow left-10 top-20 w-32 h-32 bg-gradient-to-tr from-blue-400/40 to-purple-300/40 rounded-full blur-2xl"
      ></div>
      <div
        class="absolute animate-float-fast right-20 top-32 w-24 h-24 bg-gradient-to-br from-pink-300/40 to-yellow-200/40 rounded-full blur-2xl"
      ></div>
      <div
        class="absolute animate-float-mid left-1/4 bottom-24 w-20 h-20 bg-gradient-to-tl from-green-300/40 to-blue-200/40 rounded-full blur-2xl"
      ></div>
      <div
        class="absolute animate-float-mid right-1/3 bottom-10 w-28 h-28 bg-gradient-to-tr from-yellow-300/40 to-pink-200/40 rounded-full blur-2xl"
      ></div>
    </div>

    <nav
      class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-xl px-4"
    >
      <div
        class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-full px-10 py-5 shadow-2xl border border-blue-200/30 dark:border-blue-800/30 flex items-center justify-between transition-all duration-500 hover:scale-105"
      >
        <span
          class="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 dark:from-blue-400 dark:via-purple-300 dark:to-pink-200 tracking-tight animate-gradient"
          >Showcase</span
        >
        <span
          class="text-xs md:text-base text-blue-600 dark:text-blue-400 font-bold animate-bounce"
          >{{ filteredProjects.length }} Projects</span
        >
      </div>
    </nav>

    <section
      class="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 min-h-[60vh] pt-32 md:pt-40 relative z-10"
    >
      <div class="relative w-full max-w-3xl mx-auto text-center py-16 md:py-24">
        <h1
          class="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 dark:from-blue-400 dark:via-purple-300 dark:to-pink-200 mb-8 tracking-tight leading-none drop-shadow-2xl animate-gradient cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <span class="inline-block animate-wiggle">Inspiration .</span><br />
          <span class="inline-block animate-wiggle">Innovation</span>
        </h1>
        <p
          class="text-xl md:text-3xl text-gray-700 dark:text-gray-300 font-light mb-12 animate-fade-in"
        >
          Explore Joe's Projects
        </p>
        <div
          class="flex flex-col md:flex-row gap-4 justify-center items-center w-full animate-fade-in"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="🔍 Search projects..."
            class="w-full md:w-72 px-5 py-4 bg-white/90 dark:bg-gray-800/90 border border-blue-200 dark:border-blue-700 rounded-xl shadow-lg focus:ring-2 focus:ring-pink-400 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-300"
          />
        </div>
      </div>
    </section>

    <section
      class="flex flex-wrap justify-center gap-3 mb-10 px-4 animate-fade-in"
    >
      <button
        @click="selectedCategory = ''"
        :class="[
          'px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-110 hover:bg-blue-600 hover:text-white shadow-md',
          selectedCategory === ''
            ? 'bg-gradient-to-r from-blue-500 to-purple-400 text-white shadow-lg scale-105'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-blue-200 dark:border-blue-700',
        ]"
      >
        All Projects
      </button>
      <button
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        :class="[
          'px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-110 hover:bg-purple-500 hover:text-white shadow-md',
          selectedCategory === category
            ? 'bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-lg scale-105'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-purple-200 dark:border-purple-700',
        ]"
      >
        {{ category }}
      </button>
    </section>

    <section class="pb-24 px-4 md:px-8 lg:px-16 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div v-if="loading" class="flex justify-center py-20">
          <div
            class="w-16 h-16 border-4 border-blue-200 dark:border-blue-700 rounded-full animate-spin border-t-pink-400"
          ></div>
        </div>

        <div
          v-else-if="filteredProjects.length === 0"
          class="text-center py-20 animate-fade-in"
        >
          <h3
            class="text-3xl font-extrabold text-pink-500 dark:text-pink-300 mb-4"
          >
            No projects found
          </h3>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter
          </p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10"
        >
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="group cursor-pointer transition-transform duration-500 hover:-translate-y-3 hover:scale-105 animate-fade-in"
            @click="openProjectModal(project)"
          >
            <ProjectCard :project="project" immersive fun />
          </div>
        </div>
      </div>
    </section>

    <ProjectModal
      :isOpen="isModalOpen"
      :project="selectedProject"
      @close="closeProjectModal"
    />
    <Footer bgColor="black" />
  </div>
</template>

<style>
@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.05);
  }
}
@keyframes float-fast {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-60px) scale(1.1);
  }
}
@keyframes float-mid {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-40px) scale(1.07);
  }
}
@keyframes gradient {
  0%,
  100% {
    background-position: left;
  }
  50% {
    background-position: right;
  }
}
@keyframes wiggle {
  0%,
  100% {
    transform: rotate(-2deg) scale(1);
  }
  50% {
    transform: rotate(2deg) scale(1.05);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}
.animate-float-fast {
  animation: float-fast 6s ease-in-out infinite;
}
.animate-float-mid {
  animation: float-mid 7s ease-in-out infinite;
}
.animate-gradient {
  animation: gradient 5s ease-in-out infinite alternate;
  background-size: 200% 200%;
}
.animate-wiggle {
  animation: wiggle 2s ease-in-out infinite;
  display: inline-block;
}
.animate-fade-in {
  animation: fade-in 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
}
</style>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProjects } from "../composables/useProjects";
import ProjectCard from "../components/ProjectCard.vue";
import ProjectModal from "../components/ProjectModal.vue";
import Footer from "../components/Footer.vue";

const { projects, loading, categories, subscribeToProjects } = useProjects();

const selectedCategory = ref("");
const searchQuery = ref("");
const isModalOpen = ref(false);
const selectedProject = ref({});

const filteredProjects = computed(() => {
  let filtered = projects.value;

  if (selectedCategory.value) {
    filtered = filtered.filter(
      (project) => project.category === selectedCategory.value,
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies?.some((tech) =>
          tech.toLowerCase().includes(query),
        ),
    );
  }

  return filtered;
});

const openProjectModal = (project) => {
  selectedProject.value = project;
  isModalOpen.value = true;
};

const closeProjectModal = () => {
  isModalOpen.value = false;
  selectedProject.value = {};
};

onMounted(() => {
  subscribeToProjects();
});
</script>
