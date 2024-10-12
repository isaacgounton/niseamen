<template>
  <div class="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
    <div class="flex items-center space-x-4 mb-6">
      <div class="flex-1">
        <h2 class="text-xl font-semibold text-white">{{ currentSong?.title || 'Select a song' }}</h2>
        <p class="text-white/80">{{ currentSong?.artist || 'Église du christianisme céleste' }}</p>
      </div>
      <div class="w-16 h-16 relative">
        <img 
          :src="currentSong?.albumArt || './img/CantiqueECC.webp'" 
          :class="['w-full h-full rounded-full object-cover', { 'animate-spin': isPlaying }]"
          alt="Album Art"
        />
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="mb-6">
      <div 
        class="bg-white/20 h-2 rounded-full cursor-pointer"
        @click="seek"
        ref="progressBar"
      >
        <div 
          class="bg-cyan-400 h-full rounded-full"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
      <div class="flex justify-between text-white/70 text-sm mt-1">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex justify-center items-center space-x-8 mb-8">
      <button 
        @click="previousTrack"
        class="text-white/80 hover:text-white transition-colors"
      >
        <i class="fas fa-step-backward text-2xl"></i>
      </button>
      <button 
        @click="togglePlay"
        class="w-14 h-14 bg-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
      >
        <i :class="['fas', isPlaying ? 'fa-pause' : 'fa-play', 'text-purple-900 text-xl']"></i>
      </button>
      <button 
        @click="nextTrack"
        class="text-white/80 hover:text-white transition-colors"
      >
        <i class="fas fa-step-forward text-2xl"></i>
      </button>
    </div>


    <!-- Search input -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search songs..."
        class="w-full p-2 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </div>


     <!-- Playlist -->
     <div class="bg-white/5 rounded-lg p-4 max-h-96 overflow-y-auto">
      <div 
        v-for="song in filteredSongs"
        :key="song.id"
        :class="[
          'p-3 rounded-lg cursor-pointer transition-colors',
          currentSong?.id === song.id ? 'bg-cyan-400 text-purple-900' : 'text-white hover:bg-white/10'
        ]"
        @click="playSong(song)"
      >
        {{ song.title }}
      </div>
    </div>

  </div>
</template>


<script>
import { ref, computed } from 'vue'

export default {
  name: 'Home',
  props: ['songs', 'currentSong', 'isPlaying', 'currentTime', 'duration', 'progress'],
  emits: ['previousTrack', 'nextTrack', 'togglePlay', 'playSong', 'seek'],
  setup(props, { emit }) {
    const searchQuery = ref('')

    const filteredSongs = computed(() => {
      if (!searchQuery.value) return props.songs

      const query = searchQuery.value.toLowerCase()
      return props.songs.filter(song => 
        song.title.toLowerCase().includes(query) ||
        (song.artist && song.artist.toLowerCase().includes(query))
      )
    })

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const previousTrack = () => emit('previousTrack')
    const nextTrack = () => emit('nextTrack')
    const togglePlay = () => emit('togglePlay')
    const playSong = (song) => emit('playSong', song)
    const seek = (event) => emit('seek', event)

    return {
      searchQuery,
      filteredSongs,
      formatTime,
      previousTrack,
      nextTrack,
      togglePlay,
      playSong,
      seek
    }
  }
}
</script>