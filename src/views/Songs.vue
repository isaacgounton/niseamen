<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold text-white mb-4">Songs</h1>
    <div class="song-list">
      <div 
        v-for="song in songs" 
        :key="song.id" 
        :class="['song-item', { 'current-song': song.id === currentSong?.id }]"
        @click="playSong(song)"
      >
        {{ song.id }} - {{ song.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Songs',
  props: {
    songs: {
      type: Array,
      required: true
    },
    currentSong: {
      type: Object,
      default: null
    }
  },
  emits: ['playSong'],
  methods: {
    playSong(song) {
      this.$emit('playSong', song)
    }
  }
}
</script>

<style scoped>
.song-list {
  @apply space-y-2;
}

.song-item {
  @apply p-3 rounded cursor-pointer text-white transition-colors duration-300 ease-in-out;
}

.song-item:hover {
  @apply bg-purple-700;
}

.current-song {
  @apply bg-cyan-500 bg-opacity-20 font-bold;
}
</style>