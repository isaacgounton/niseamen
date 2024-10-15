<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-800 to-purple-600 flex flex-col">
    <nav class="bg-blue-600 text-white p-4 sticky top-0 z-50">
      <div class="container mx-auto flex justify-center items-center">
        <div class="flex space-x-4 overflow-x-auto whitespace-nowrap">
          <router-link 
            v-for="item in menuItems" 
            :key="item.text"
            :to="item.path"
            class="hover:text-blue-200 transition-colors cursor-pointer text-lg font-medium flex-shrink-0"
          >
            {{ item.text }}
          </router-link>
        </div>
        
        <!-- Auth Section -->
        <div v-if="!user" class="ml-4 flex-shrink-0">
          <button 
            @click="signIn" 
            class="flex items-center justify-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium"
          >
            <i class="fas fa-sign-in-alt"></i> <span>Sign In</span>
          </button>
        </div>
        <div v-else class="flex items-center space-x-4 ml-4 flex-shrink-0">
          <img :src="user.photoURL" :alt="user.displayName" class="w-8 h-8 rounded-full">
          <button 
            @click="signOut"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </nav>

    <main class="flex-grow container mx-auto p-4 flex-col">
      <router-view 
        :songs="songs"
        :currentSong="currentSong"
        :isPlaying="isPlaying"
        :currentTime="currentTime"
        :duration="duration"
        :progress="progress"
        :currentLyrics="currentLyrics"
        @playSong="playSong"
        @previousTrack="previousTrack"
        @nextTrack="nextTrack"
        @togglePlay="togglePlay"
        @seek="seek"
      ></router-view>
    </main>
  </div>
</template>
  
<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { auth, storage } from './firebase'
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { songService } from './services/firebase'

export default {
  name: 'App',
  setup() {
    const router = useRouter()

    // State
    const user = ref(null)
    const songs = ref([])
    const currentSong = ref(null)
    const currentLyrics = ref(null)
    const audio = ref(null)
    const isPlaying = ref(false)
    const currentTime = ref(0)
    const duration = ref(0)
    const progressBar = ref(null)

    // Menu items
    const menuItems = [
      { text: 'Songs', path: '/' },
      { text: 'Lyrics', path: '/lyrics' },
      { text: 'About', path: '/about' }
    ]
      
    // Computed
    const progress = computed(() => 
      (currentTime.value / duration.value) * 100 || 0
    )

    // Methods
    const signIn = async () => {
      try {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
      } catch (error) {
        console.error('Sign in error:', error)
      }
    }

    const signOut = async () => {
      try {
        await saveCurrentState()
        await firebaseSignOut(auth)
        user.value = null
      } catch (error) {
        console.error('Sign out error:', error)
      }
    }

    const initializeAudio = () => {
      if (!audio.value) {
        audio.value = new Audio()
        audio.value.preload = 'metadata'

        audio.value.addEventListener('timeupdate', () => {
          currentTime.value = audio.value.currentTime
        })

        audio.value.addEventListener('loadedmetadata', () => {
          duration.value = audio.value.duration
        })

        audio.value.addEventListener('ended', nextTrack)
      }
    }


    const restoreLastPlayed = async () => {
      if (user.value) {
        try {
          const lastPlayed = await songService.getLastPlayed(user.value.uid)
          if (lastPlayed) {
            const song = songs.value.find(s => s.id === lastPlayed.songId)
            if (song) {
              currentSong.value = song
              // Remove this line: audio.value.src = song.url
              
              // Instead, call playSong with autoplay set to false
              await playSong(song, false)
              
              // Set the currentTime after the audio has loaded
              audio.value.addEventListener('loadedmetadata', () => {
                audio.value.currentTime = lastPlayed.progress
              }, { once: true })

              await loadLyrics(song.id)
            }
          }
        } catch (error) {
          console.error('Error restoring last played song:', error)
        }
      }
    }


    const saveCurrentState = async () => {
      if (user.value && currentSong.value) {
        try {
          await songService.saveLastPlayed(
            user.value.uid,
            currentSong.value.id,
            audio.value.currentTime,
            Date.now()
          )
        } catch (error) {
          console.error('Error saving current state:', error)
        }
      }
    }


    const loadSongs = async () => {
      try {
        songs.value = await songService.fetchSongs()
        
        if (!currentSong.value && songs.value.length > 0) {
          currentSong.value = songs.value[0]
          if (audio.value) {
            const musicRef = storageRef(storage, songs.value[0].url)
            const downloadURL = await getDownloadURL(musicRef)
            audio.value.src = downloadURL
          }
          await loadLyrics(songs.value[0].id)
        }
      } catch (error) {
        console.error("Error loading songs:", error)
        // Handle the error (e.g., show a message to the user)
      }
    }


    const loadLyrics = async (songId) => {
      try {
        currentLyrics.value = await songService.fetchLyrics(songId)
      } catch (error) {
        console.error('Error loading lyrics:', error)
        currentLyrics.value = "Lyrics not available for this song."
      }
    }

    const playSong = async (song, autoplay = true) => {
      initializeAudio() // Ensure audio is initialized
      currentSong.value = song
      
      try {
        // Get the download URL from Firebase Storage
        const musicRef = storageRef(storage, song.url)
        const downloadURL = await getDownloadURL(musicRef)
        
        audio.value.src = downloadURL
        if (autoplay) {
          await audio.value.play()
          isPlaying.value = true
        }
      } catch (error) {
        console.error('Error playing audio:', error)
        isPlaying.value = false
        // Handle the error (e.g., show a message to the user)
        alert('Failed to play the song. Please try again later.')
      }
      await loadLyrics(song.id)
    }


    const togglePlay = async () => {
      if (!audio.value) return
      
      try {
        if (audio.value.paused) {
          if (!audio.value.src) {
            // If no song is loaded, play the current song
            await playSong(currentSong.value)
          } else {
            await audio.value.play()
          }
          isPlaying.value = true
        } else {
          audio.value.pause()
          isPlaying.value = false
          await saveCurrentState()
        }
      } catch (error) {
        console.error('Error toggling play:', error)
      }
    }


    // Add a watch for isPlaying to handle state changes
    watch(isPlaying, (newIsPlaying) => {
      if (newIsPlaying && audio.value && audio.value.paused) {
        audio.value.play().catch(error => console.error('Error playing audio:', error))
      } else if (!newIsPlaying && audio.value && !audio.value.paused) {
        audio.value.pause()
      }
    })


    const previousTrack = () => {
      const currentIndex = songs.value.findIndex(s => s.id === currentSong.value?.id)
      if (currentIndex > 0) {
        playSong(songs.value[currentIndex - 1])
      }
    }

    const nextTrack = () => {
      const currentIndex = songs.value.findIndex(s => s.id === currentSong.value?.id)
      if (currentIndex < songs.value.length - 1) {
        playSong(songs.value[currentIndex + 1])
      }
    }

    const seek = (event) => {
      if (!audio.value.duration) return
      
      const rect = progressBar.value.getBoundingClientRect()
      const clickPosition = event.clientX - rect.left
      const percent = clickPosition / rect.width
      const newTime = percent * audio.value.duration
      
      audio.value.currentTime = Math.max(0, Math.min(newTime, audio.value.duration))
    }

    // Lifecycle
    onMounted(() => {
      initializeAudio() // Initialize audio on component mount
      loadSongs()

      onAuthStateChanged(auth, async (userData) => {
        user.value = userData
        if (userData) {
          await restoreLastPlayed()
        }
      })

      // Event listener for saving state before unload
      window.addEventListener('beforeunload', saveCurrentState)

      // Event listener for saving state when page becomes hidden
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          saveCurrentState()
        }
      })

      // Cleanup function
      return () => {
        // Remove event listeners
        window.removeEventListener('beforeunload', saveCurrentState)
        document.removeEventListener('visibilitychange', saveCurrentState)

        // Clean up audio event listeners
        if (audio.value) {
          audio.value.removeEventListener('timeupdate', null)
          audio.value.removeEventListener('loadedmetadata', null)
          audio.value.removeEventListener('ended', nextTrack)
        }

        // If there's an ongoing audio playback, pause it
        if (audio.value && !audio.value.paused) {
          audio.value.pause()
        }

        // Save the current state one last time when component is unmounted
        saveCurrentState()
      }
    })
      
      return {
        user,
        menuItems,
        songs,
        currentSong,
        currentLyrics,
        isPlaying,
        currentTime,
        duration,
        progress,
        progressBar,
        signIn,
        signOut,
        playSong,
        togglePlay,
        previousTrack,
        nextTrack,
        seek,
        audio,
        loadLyrics
      }
    }
  }
  </script>