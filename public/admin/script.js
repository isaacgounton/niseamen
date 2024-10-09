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

  // Initialize Firestore
  const firestore = firebase.firestore();

document.getElementById('lyricsForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the form from submitting
    
    const songId = document.getElementById('songId').value.trim();
    const lyrics = document.getElementById('lyrics').value.trim();
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    if (songId && lyrics) {
    try {
        await firestore.collection('lyrics').doc(songId).set({
        text: lyrics
        });
        successMessage.style.display = 'block';
    } catch (error) {
        console.error('Error saving lyrics:', error);
        errorMessage.style.display = 'block';
    }
    } else {
    alert('Please enter both the song ID and lyrics.');
    }
});
