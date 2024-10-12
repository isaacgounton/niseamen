<template>
  <div class="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
    <h2 class="text-2xl font-bold text-white mb-4">Lyrics</h2>
    <h4 class="text-2x1 font-bold text-white mb-4">{{ currentSong?.title || 'Select a song' }}</h4>
    <div v-if="currentLyrics" class="bg-white/5 rounded-lg p-4 max-h-[60vh] overflow-y-auto">
      <div class="text-white/90 whitespace-pre-line">
        {{ currentLyrics }}
      </div>
    </div>
    <div v-else class="text-white/70 text-center py-8">
      Select a song to view lyrics
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lyrics',
  props: ['currentLyrics', 'currentSong']
}
</script>