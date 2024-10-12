// src/services/firebase.js
import { db, auth } from '../firebase'
import { 
  doc, 
  collection, 
  getDocs, 
  getDoc, 
  setDoc,
  query,
  orderBy 
} from 'firebase/firestore'

export const songService = {
  // Fetch all songs
  async fetchSongs() {
    try {
      const songsRef = collection(db, 'songs')
      const snapshot = await getDocs(songsRef)
      const songs = []
      
      snapshot.forEach((doc) => {
        const song = doc.data()
        songs.push({
          id: song.id,
          title: song.title,
          artist: song.artist,
          url: song.url,
          albumArt: song.albumArt
        })
      })
      
      // Sort songs by ID numerically
      return songs.sort((a, b) => {
        const numA = parseInt(a.id)
        const numB = parseInt(b.id)
        return numA - numB
      })
    } catch (error) {
      console.error('Error fetching songs:', error)
      throw error
    }
  },

  // Fetch lyrics for a specific song
  async fetchLyrics(songId) {
    try {
      const lyricRef = doc(db, 'lyrics', songId)
      const lyricDoc = await getDoc(lyricRef)
      
      if (lyricDoc.exists()) {
        return lyricDoc.data().text
      }
      return null
    } catch (error) {
      console.error('Error fetching lyrics:', error)
      throw error
    }
  },

  async saveLastPlayed(userId, songId, progress, timestamp) {
    try {
      const lastPlayedRef = doc(db, 'users', userId, 'lastPlayed', songId)
      await setDoc(lastPlayedRef, {
        songId,
        progress,
        timestamp
      })
    } catch (error) {
      console.error('Error saving last played:', error)
      throw error
    }
  },

  async getLastPlayed(userId) {
    try {
      const lastPlayedRef = collection(db, 'users', userId, 'lastPlayed')
      const q = query(lastPlayedRef, orderBy('timestamp', 'desc'))
      const snapshot = await getDocs(q)
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        return {
          songId: doc.data().songId,
          progress: doc.data().progress,
          timestamp: doc.data().timestamp
        }
      }
      
      return null
    } catch (error) {
      console.error('Error getting last played:', error)
      throw error
    }
  }
}