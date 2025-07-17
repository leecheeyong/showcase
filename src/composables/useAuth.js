import { ref, computed } from "vue";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const user = ref(null);
const loading = ref(false);
const error = ref(null);
const initialized = ref(false);

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  const login = async (email, password) => {
    loading.value = true;
    error.value = null;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      user.value = userCredential.user;
      return userCredential.user;
    } catch (err) {
      error.value = getErrorMessage(err.code);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (err) {
      error.value = getErrorMessage(err.code);
      throw err;
    }
  };

  const initAuth = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (authUser) => {
        user.value = authUser;
        initialized.value = true;
        unsubscribe();
        resolve(authUser);
      });
    });
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/user-not-found":
        return "No user found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "auth/invalid-credential":
        return "Invalid email or password.";
      default:
        return "Login failed. Please check your credentials and try again.";
    }
  };

  return {
    user,
    loading,
    error,
    initialized,
    isAuthenticated,
    login,
    logout,
    initAuth,
  };
}
