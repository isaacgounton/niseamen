// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3zU2TFyASwkVHKlNFf57CJhp_9wnwRVU",
  authDomain: "niseamen.firebaseapp.com",
  databaseURL: "https://niseamen.firebaseio.com",
  projectId: "niseamen",
  storageBucket: "niseamen.appspot.com",
  messagingSenderId: "578866985713",
  appId: "1:578866985713:web:05df1380459293b50bc750"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();


const audio = new Audio();
const playPauseBtn = document.querySelector('.play-pause');
const progressBar = document.querySelector('.progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const lyricsEl = document.getElementById('lyrics');
const songTitleEl = document.getElementById('song-title');
const songArtistEl = document.getElementById('song-artist');
const albumArtEl = document.getElementById('album-art');
const playlistEl = document.getElementById('playlist');
let lyricsData = {};
let playlist = []; // Declare a global playlist array


// Firebase configuration is already correctly initialized.
const auth = firebase.auth();

// Google Sign-In function
function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log(`User signed in: ${result.user.displayName}`);
      document.getElementById('sign-in-button').style.display = 'none';
      document.getElementById('sign-out-button').style.display = 'block';
      fetchPlaylist(); // Fetch playlist only after sign-in
    })
    .catch((error) => {
      console.error('Error signing in:', error);
    });
}

// Google Sign-Out function
function signOut() {
  auth.signOut()
    .then(() => {
      console.log('User signed out');
      document.getElementById('sign-in-button').style.display = 'block';
      document.getElementById('sign-out-button').style.display = 'none';
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
}

auth.onAuthStateChanged(async (user) => {
  if (user) {
    console.log('User is signed in');
    document.getElementById('sign-in-button').style.display = 'none';
    document.getElementById('sign-out-button').style.display = 'block';
    await fetchPlaylist();
    loadLastPlayedSongFromFirestore(); // Load the last played song only after the playlist is fetched
  } else {
    console.log('No user is signed in');
    document.getElementById('sign-in-button').style.display = 'block';
    document.getElementById('sign-out-button').style.display = 'none';
    await fetchPlaylist(); // Fetch playlist even if not logged in
    if (playlist.length > 0) {
      currentTrackIndex = 0;
      loadTrack(currentTrackIndex);
    }
  }
});




const fetchPlaylist = async () => {
  try {
    const querySnapshot = await firestore.collection("songs").get();
    playlist = [];

    querySnapshot.forEach((doc) => {
      playlist.push(doc.data());
    });

    updatePlaylist();

    // Removed the redundant loadLastPlayedSongFromFirestore() call

  } catch (error) {
    console.error('Error fetching playlist:', error);
  }
};


function saveLastPlayedSongToFirestore() {
  const user = auth.currentUser;
  if (user) {
    const currentSong = playlist[currentTrackIndex];
    if (currentSong) {
      firestore.collection('users').doc(user.uid).collection('lastPlayed').doc('lastSong').set({
        id: currentSong.id,
        currentTime: audio.currentTime
      })
      .then(() => {
        console.log(`Last played song saved to Firestore for user: ${user.uid}`);
      })
      .catch((error) => {
        console.error('Error saving last played song:', error);
      });
    }
  } else {
    console.log('User not signed in, skipping save.');
  }
}



// Listen for the 'pause', 'ended', and 'beforeunload' events to save the song state only if the user is logged in
audio.addEventListener('pause', saveLastPlayedSongToFirestore);
audio.addEventListener('ended', saveLastPlayedSongToFirestore);
window.addEventListener('beforeunload', saveLastPlayedSongToFirestore);



async function loadLastPlayedSongFromFirestore() {
  const user = auth.currentUser;
  if (user) {
    try {
      const lastSongDoc = await firestore.collection('users').doc(user.uid).collection('lastPlayed').doc('lastSong').get();
      if (lastSongDoc.exists) {
        const lastSong = lastSongDoc.data();

        // Find the last played song in the playlist
        const songIndex = playlist.findIndex(song => song.id === lastSong.id);
        if (songIndex !== -1) {
          currentTrackIndex = songIndex;
          loadTrack(currentTrackIndex);
          audio.currentTime = lastSong.currentTime;
          console.log('Last played song loaded from Firestore.');
        } else {
          console.log('The last played song no longer exists in the playlist. Loading first track.');
          currentTrackIndex = 0;
          loadTrack(currentTrackIndex);
        }
      } else {
        console.log('No last played song found in Firestore, loading first track.');
        if (playlist.length > 0) {
          currentTrackIndex = 0;
          loadTrack(currentTrackIndex);
        }
      }
    } catch (error) {
      console.error('Error fetching last played song from Firestore:', error);
    }
  } else {
    console.log('User not signed in, cannot load last played song. Loading first track by default.');
    if (playlist.length > 0) {
      currentTrackIndex = 0;
      loadTrack(currentTrackIndex);
    }
  }
}


// Real-time listener to update the playlist
firestore.collection("songs").onSnapshot((querySnapshot) => {
  playlist = []; // Use the global playlist
  querySnapshot.forEach((doc) => {
    playlist.push(doc.data());
  });

  // Update the UI in real-time
  updatePlaylist(); // Call without passing the playlist
});

// Real-time listener to update the playlist
firestore.collection("songs").onSnapshot((querySnapshot) => {
  playlist = []; // Use the global playlist
  querySnapshot.forEach((doc) => {
    playlist.push(doc.data());
  });

  // Update the UI in real-time
  updatePlaylist(); // Call without passing the playlist
});

let currentTrackIndex = 0;

function saveCurrentSong() {
  const currentSong = playlist[currentTrackIndex];
  if (currentSong) {
    console.log('Saving current song:', currentSong.title);  // Add this for debugging
    localStorage.setItem('lastSong', JSON.stringify({
      id: currentSong.id,
      currentTime: audio.currentTime
    }));
  }
}

// Add event listeners to save the current song and time
// audio.addEventListener('timeupdate', saveCurrentSong);
window.addEventListener('beforeunload', saveCurrentSong);

function loadTrack(index) {
  const track = playlist[index];
  console.log('Loading track:', track);
  
  // Set the audio source
  audio.src = track.url;
  songTitleEl.textContent = track.title;
  songArtistEl.textContent = track.artist;
  albumArtEl.src = track.albumArt;
  albumArtEl.alt = `${track.title} album art`;

  // Fetch lyrics from Firestore
  firestore.collection('lyrics').doc(track.id).get().then((doc) => {
    if (doc.exists) {
      const lyrics = doc.data().text;
      updateLyrics(lyrics.split('\n'));
    } else {
      updateLyrics([]);  // No lyrics available
    }
  }).catch((error) => {
    console.error('Error fetching lyrics:', error);
  });

  updatePlaylist();
}


function updatePlaylist() {
  playlistEl.innerHTML = '';
  playlist.forEach((track, index) => {
    const item = document.createElement('div');
    item.classList.add('playlist-item');
    if (index === currentTrackIndex) {
      item.classList.add('active');
    }
    item.textContent = `${track.title}`;
    item.onclick = () => {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      audio.play();
      updatePlayPauseIcon();
    };
    playlistEl.appendChild(item);
  });
}


function togglePlay() {
  if (audio.paused) {
    audio.play();
    albumArtEl.classList.add('anime'); // Start animation
  } else {
    audio.pause();  // The pause event will trigger save
    albumArtEl.classList.remove('anime'); // Stop animation
  }
  updatePlayPauseIcon();
}


audio.addEventListener('play', () => {
  albumArtEl.classList.add('anime'); // Start animation
});

audio.addEventListener('pause', () => {
  albumArtEl.classList.remove('anime'); // Stop animation
});

audio.addEventListener('ended', () => {
  nextTrack();
  albumArtEl.classList.remove('anime'); // Stop animation when the song ends
});


function updatePlayPauseIcon() {
  playPauseBtn.innerHTML = audio.paused ? '▶' : '❚❚';
}

function updateProgress() {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function seek(event) {
  const percent = event.offsetX / event.target.offsetWidth;
  audio.currentTime = percent * audio.duration;
}

function previousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrackIndex);
  audio.play();
  updatePlayPauseIcon();
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  audio.play();
  updatePlayPauseIcon();
}

function updateLyrics(lyrics) {
  if (lyrics && lyrics.length > 0) {
    lyricsEl.innerHTML = lyrics.map(line => `<p>${line}</p>`).join('');
  } else {
    lyricsEl.innerHTML = '<p>No lyrics available</p>';
  }
}



function searchSongs(query) {
  const filteredPlaylist = playlist.filter(track => 
    track.title.toLowerCase().includes(query.toLowerCase()) ||
    track.artist.toLowerCase().includes(query.toLowerCase())
  );

  playlistEl.innerHTML = '';
  filteredPlaylist.forEach((track, index) => {
    const item = document.createElement('div');
    item.classList.add('playlist-item');
    item.textContent = `${track.title}`;
    item.onclick = () => {
      currentTrackIndex = playlist.indexOf(track);
      loadTrack(currentTrackIndex);
      audio.play();
      updatePlayPauseIcon();
    };
    playlistEl.appendChild(item);
  });
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});
audio.addEventListener('ended', () => {
  nextTrack();
});
