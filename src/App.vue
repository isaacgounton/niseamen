<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-800 to-purple-600">
    <nav class="bg-blue-600 text-white p-4 sticky top-0 z-50">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex space-x-6">
          <router-link 
            v-for="item in menuItems" 
            :key="item.text"
            :to="item.path"
            class="hover:text-blue-200 transition-colors cursor-pointer"
          >
            {{ item.text }}
          </router-link>
        </div>
        
        <!-- Auth Section -->
        <div v-if="!user">
          <button 
            @click="signIn" 
            class="flex items-center space-x-2 bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span>Sign in with Google</span>
          </button>
        </div>
        <div v-else class="flex items-center space-x-4">
          <span>{{ user.displayName }}</span>
          <button 
            @click="signOut"
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>

    <main class="container mx-auto p-4">
      <router-view 
        :songs="songs"
        :currentSong="currentSong"
        :isPlaying="isPlaying"
        :currentTime="currentTime"
        :duration="duration"
        :progress="progress"
        :currentLyrics="currentLyrics"
        @previousTrack="previousTrack"
        @nextTrack="nextTrack"
        @togglePlay="togglePlay"
        @playSong="playSong"
        @seek="seek"
      ></router-view>
    </main>
  </div>
</template>
  
<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from './firebase'
import { songService } from './services/firebase'
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth'

export default {
  name: 'App',
  setup() {
    const router = useRouter()

    // State
    const user = ref(null)
    const songs = ref([])
    const currentSong = ref(null)
    const currentLyrics = ref(null)
    const audio = ref(new Audio())
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


    const restoreLastPlayed = async (userId) => {
        try {
          const lastPlayed = await songService.getLastPlayed(userId)
          if (lastPlayed) {
            const song = songs.value.find(s => s.id === lastPlayed.songId)
            if (song) {
              currentSong.value = song
              audio.value.src = song.url
              
              // Wait for audio metadata to load before setting time
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

      // New method to save current state
      const saveCurrentState = async () => {
        if (user.value && currentSong.value) {
          await songService.saveLastPlayed(
            user.value.uid,
            currentSong.value.id,
            audio.value.currentTime,
            Date.now()
          )
        }
      }          

      
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

    const loadSongs = async () => {
      try {
        songs.value = await songService.fetchSongs()
        
        if (user.value) {
          await restoreLastPlayed(user.value.uid)
        }
        
        if (!currentSong.value && songs.value.length > 0) {
          currentSong.value = songs.value[0]
          audio.value.src = songs.value[0].url
          await loadLyrics(songs.value[0].id)
        }
      } catch (error) {
        console.error('Error loading songs:', error)
      }
    }

    const loadLyrics = async (songId) => {
      try {
        currentLyrics.value = await songService.fetchLyrics(songId)
      } catch (error) {
        console.error('Error loading lyrics:', error)
      }
    }

    const playSong = async (song) => {
      currentSong.value = song
      audio.value.src = song.url
      audio.value.play()
      isPlaying.value = true
      await loadLyrics(song.id)
    }

    const togglePlay = async () => {
      if (audio.value.paused) {
        audio.value.play()
        isPlaying.value = true
      } else {
        audio.value.pause()
        isPlaying.value = false
        await saveCurrentState()
      }
    }

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
      loadSongs()

      onAuthStateChanged(auth, async (userData) => {
        user.value = userData
        if (userData) {
          await restoreLastPlayed(userData.uid)
        }
      })

      window.addEventListener('beforeunload', saveCurrentState)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          saveCurrentState()
        }
      })

      audio.value.addEventListener('timeupdate', () => {
        currentTime.value = audio.value.currentTime
      })

      audio.value.addEventListener('loadedmetadata', () => {
        duration.value = audio.value.duration
      })

      audio.value.addEventListener('ended', nextTrack)

      return () => {
        window.removeEventListener('beforeunload', saveCurrentState)
        document.removeEventListener('visibilitychange', saveCurrentState)
        audio.value.removeEventListener('timeupdate', null)
        audio.value.removeEventListener('loadedmetadata', null)
        audio.value.removeEventListener('ended', nextTrack)
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
        seek
      }
    }
  }
  </script>