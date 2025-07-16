import { ref, computed } from 'vue'
import { db } from '../firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'

export function useProjects() {
  const projects = ref([])
  const loading = ref(false)
  const error = ref(null)

  const categories = computed(() => {
    const uniqueCategories = [...new Set(projects.value.map(p => p.category))]
    return uniqueCategories.sort()
  })

  const fetchProjects = async () => {
    loading.value = true
    error.value = null
    
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'))
      projects.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (err) {
      error.value = err.message
      console.error('Error fetching projects:', err)
    } finally {
      loading.value = false
    }
  }

  const addProject = async (projectData) => {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return docRef.id
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const updateProject = async (id, projectData) => {
    try {
      await updateDoc(doc(db, 'projects', id), {
        ...projectData,
        updatedAt: new Date()
      })
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const deleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, 'projects', id))
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  const subscribeToProjects = (callback) => {
    return onSnapshot(collection(db, 'projects'), (snapshot) => {
      projects.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      if (callback) callback(projects.value)
    })
  }

  return {
    projects,
    loading,
    error,
    categories,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    subscribeToProjects
  }
}
