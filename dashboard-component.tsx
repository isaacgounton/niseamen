import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const Dashboard = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulated data for the chart
  const data = [
    { name: 'Mon', plays: 12 },
    { name: 'Tue', plays: 19 },
    { name: 'Wed', plays: 3 },
    { name: 'Thu', plays: 5 },
    { name: 'Fri', plays: 2 },
    { name: 'Sat', plays: 30 },
    { name: 'Sun', plays: 10 },
  ];

  useEffect(() => {
    // Simulated data loading
    setSongs([
      { id: 1, title: 'Song 1', artist: 'Artist 1' },
      { id: 2, title: 'Song 2', artist: 'Artist 2' },
      { id: 3, title: 'Song 3', artist: 'Artist 3' },
      // Add more songs as needed
    ]);
  }, []);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-hidden">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl h-full flex flex-col">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">{currentSong?.title || 'Select a song'}</h2>
              <p className="text-white/80">{currentSong?.artist || 'Église du christianisme céleste'}</p>
            </div>
            <div className="w-16 h-16 relative">
              <img 
                src={currentSong?.albumArt || '/img/CantiqueECC.webp'}
                className={`w-full h-full rounded-full object-cover ${isPlaying ? 'animate-spin' : ''}`}
                alt="Album Art"
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div 
              className="bg-white/20 h-2 rounded-full cursor-pointer"
              onClick={() => {/* Implement seek logic */}}
            >
              <div 
                className="bg-cyan-400 h-full rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-white/70 text-sm mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <button 
              onClick={() => {/* Implement previous track logic */}}
              className="text-white/80 hover:text-white transition-colors"
            >
              <i className="fas fa-step-backward text-2xl"></i>
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-14 h-14 bg-cyan-400 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
            >
              <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-purple-900 text-xl`}></i>
            </button>
            <button 
              onClick={() => {/* Implement next track logic */}}
              className="text-white/80 hover:text-white transition-colors"
            >
              <i className="fas fa-step-forward text-2xl"></i>
            </button>
          </div>

          {/* Search input */}
          <div className="mb-4">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search songs..."
              className="w-full p-2 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Playlist */}
          <div className="bg-white/5 rounded-lg p-4 flex-grow overflow-y-auto">
            {filteredSongs.map((song) => (
              <div 
                key={song.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentSong?.id === song.id ? 'bg-cyan-400 text-purple-900' : 'text-white hover:bg-white/10'
                }`}
                onClick={() => setCurrentSong(song)}
              >
                {song.title}
              </div>
            ))}
          </div>

          {/* Weekly Plays Chart */}
          <Card className="mt-6 bg-white/5 text-white">
            <CardHeader>Weekly Plays</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Bar dataKey="plays" fill="#22d3ee" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
