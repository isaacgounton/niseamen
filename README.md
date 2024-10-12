# NiseAmen

NiseAmen is a web-based music player application designed for playing and managing religious songs, specifically for the Église du Christianisme Céleste (Celestial Church of Christ).

## Features

- User authentication with Google Sign-In
- Playlist of religious songs
- Audio player with play, pause, next, and previous controls
- Progress bar for seeking within songs
- Display of song lyrics
- Automatic restoration of last played song and progress
- Responsive design for various screen sizes

## Tech Stack

- Vue.js 3 (with Composition API)
- Tailwind CSS for styling
- Firebase for authentication and data storage

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/niseamen.git
   cd niseamen
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Firebase:
   - Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Google Sign-In in the Authentication section
   - Create a Firestore database
   - Add your Firebase configuration to `src/firebase.js`

4. Run the development server:
   ```
   npm run serve
   ```

5. Build for production:
   ```
   npm run build
   ```

## Project Structure

- `src/App.vue`: Main application component
- `src/firebase.js`: Firebase configuration and initialization
- `src/services/firebase.js`: Firebase service methods for data management
- `public/`: Static assets including images and songs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Église du Christianisme Céleste for the inspiration and song content
- Vue.js and Firebase teams for their excellent frameworks and documentation