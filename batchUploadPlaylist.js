const batchUploadPlaylist = async () => {
    const batch = firestore.batch(); // Initialize a batch operation
  
    // Assuming 'playlist' is your array of songs
    playlist.forEach((song) => {
      // Create a reference to the document for each song
      const songRef = firestore.collection("songs").doc(song.id);
      // Add the set operation to the batch
      batch.set(songRef, song);
    });
  
    // Commit the batch operation
    try {
      await batch.commit();
      console.log('Playlist uploaded successfully!');
    } catch (error) {
      console.error('Error uploading playlist:', error);
    }
  };
  
  // Call the function to upload the playlist
  batchUploadPlaylist();
  