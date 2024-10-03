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

// Load the lyrics file and parse the content
fetch('lyrics.txt')
  .then(response => response.text())
  .then(text => {
    // Split the text into individual lines
    const lines = text.trim().split('\n');
    let currentId = '';
    let currentLyrics = [];

    lines.forEach(line => {
      line = line.trim(); // Remove leading and trailing whitespace
      if (/^\d+$/.test(line)) {
        // If the line is a number, it's an ID
        if (currentId) {
          // Store the previous song's lyrics if there was an ID already
          lyricsData[currentId] = currentLyrics;
        }
        currentId = line;
        currentLyrics = [];
      } else if (line) {
        // Otherwise, it's a lyric line, so add it to the current lyrics array
        currentLyrics.push(line);
      }
    });

    // Store the last song's lyrics
    if (currentId) {
      lyricsData[currentId] = currentLyrics;
    }

    console.log('Parsed lyrics data:', lyricsData);

    // Initialize the playlist display
    updatePlaylist();
    // Load the first track's lyrics
    if (playlist[currentTrackIndex]) {
      updateLyrics(lyricsData[playlist[currentTrackIndex].id]);
    }
  })
  .catch(error => console.error('Error loading lyrics:', error));


const playlist = [
  {
    "title": "001 - Jerimoyamah",
    "artist": "Église du christianisme céleste",
    "url": "./music/001 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "001"
  },
  {
    "title": "002 - Yarasarah",
    "artist": "Église du christianisme céleste",
    "url": "./music/002 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "002"
  },
  {
    "title": "003 - Yaramah",
    "artist": "Église du christianisme céleste",
    "url": "./music/003 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "003"
  },
  {
    "title": "004 - O Christ Ahol sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/004 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "004"
  },
  {
    "title": "005 - Olorun!! lOba iye Special universel",
    "artist": "Église du christianisme céleste",
    "url": "./music/005 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "005"
  },
  {
    "title": "006 - Iram Jamah Jaribam",
    "artist": "Église du christianisme céleste",
    "url": "./music/006 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "006"
  },
  {
    "title": "007 - Wléaou nado sen Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/007 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "007"
  },
  {
    "title": "008 - Mi kpa Kluno mè wiwe lè",
    "artist": "Église du christianisme céleste",
    "url": "./music/008 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "008"
  },
  {
    "title": "009 - Pè wè jè mi mèpo do na dona Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/009 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "009"
  },
  {
    "title": "010 - Mi kpa Jiyewhe Gigogan",
    "artist": "Église du christianisme céleste",
    "url": "./music/010 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "010"
  },
  {
    "title": "011 - Karifaya",
    "artist": "Église du christianisme céleste",
    "url": "./music/011 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "011"
  },
  {
    "title": "012 - Mi ji han vivi nè",
    "artist": "Église du christianisme céleste",
    "url": "./music/012 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "012"
  },
  {
    "title": "013 - Jehovah Ayajèno",
    "artist": "Église du christianisme céleste",
    "url": "./music/013 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "013"
  },
  {
    "title": "014 - Halleluyah hlan lon wiwe",
    "artist": "Église du christianisme céleste",
    "url": "./music/014 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "014"
  },
  {
    "title": "015 - Halleluyah, Halleluyah, Halleluyah Angel lè jaya",
    "artist": "Église du christianisme céleste",
    "url": "./music/015 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "015"
  },
  {
    "title": "016 - Pè wè jè mi ni do na To",
    "artist": "Église du christianisme céleste",
    "url": "./music/016 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "016"
  },
  {
    "title": "017 - Angeli wiwe lè to ayajè",
    "artist": "Église du christianisme céleste",
    "url": "./music/017 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "017"
  },
  {
    "title": "018 - Jesu dohèto ayi sie ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/018 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "018"
  },
  {
    "title": "019 - Mi pa kluno, mi pa Kluno, Mi pa Kluno Na gigo",
    "artist": "Église du christianisme céleste",
    "url": "./music/019 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "019"
  },
  {
    "title": "020 - Mi pa Okluno Halleluyah",
    "artist": "Église du christianisme céleste",
    "url": "./music/020 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "020"
  },
  {
    "title": "021 - Opè dido zan gbe",
    "artist": "Église du christianisme céleste",
    "url": "./music/021 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "021"
  },
  {
    "title": "022 - Mi pa Kluno Aholu lèblanu",
    "artist": "Église du christianisme céleste",
    "url": "./music/022 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "022"
  },
  {
    "title": "023 - Mi ze Ota miton lè daga",
    "artist": "Église du christianisme céleste",
    "url": "./music/023 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "023"
  },
  {
    "title": "024 - Mi ji han bo ze gbe daga",
    "artist": "Église du christianisme céleste",
    "url": "./music/024 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "024"
  },
  {
    "title": "025 - Hanjigbè Agun wiwe lon ton lè",
    "artist": "Église du christianisme céleste",
    "url": "./music/025 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "025"
  },
  {
    "title": "026 - Jiwheyewhe Hol hinhonno",
    "artist": "Église du christianisme céleste",
    "url": "./music/026 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "026"
  },
  {
    "title": "027 - Mi wa mi ni dope",
    "artist": "Église du christianisme céleste",
    "url": "./music/027 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "027"
  },
  {
    "title": "028 - Ojle Oto ton wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/028 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "028"
  },
  {
    "title": "029 - Mi pa Kluno Agun dodono we",
    "artist": "Église du christianisme céleste",
    "url": "./music/029 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "029"
  },
  {
    "title": "030 - Jesu dAholu",
    "artist": "Église du christianisme céleste",
    "url": "./music/030 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "030"
  },
  {
    "title": "031 - Kluno na dagbewanyi twe so le?",
    "artist": "Église du christianisme céleste",
    "url": "./music/031 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "031"
  },
  {
    "title": "032 - Awhànpa wiwe lon ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/032 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "032"
  },
  {
    "title": "033 - Gbo mi njaya, hlan Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/033 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "033"
  },
  {
    "title": "034 - Mi sén mi sén Kluno Jiwheyewhe",
    "artist": "Église du christianisme céleste",
    "url": "./music/034 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "034"
  },
  {
    "title": "035 - Angeli le yi ayaje daho de",
    "artist": "Église du christianisme céleste",
    "url": "./music/035 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "035"
  },
  {
    "title": "036 - Owhe, Osun, hinhon po sunwhlevu",
    "artist": "Église du christianisme céleste",
    "url": "./music/036 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "036"
  },
  {
    "title": "037 - Mi na opé  hlan Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/037 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "037"
  },
  {
    "title": "038 - Mi pa Jesu, mi pa Jesu",
    "artist": "Église du christianisme céleste",
    "url": "./music/038 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "038"
  },
  {
    "title": "039 - Zé pipahàn lo daga",
    "artist": "Église du christianisme céleste",
    "url": "./music/039 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "039"
  },
  {
    "title": "040 - Aihon, mi go nayaje",
    "artist": "Église du christianisme céleste",
    "url": "./music/040 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "040"
  },
  {
    "title": "041 - Mi tayaje, angeli le we t ayaje",
    "artist": "Église du christianisme céleste",
    "url": "./music/041 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "041"
  },
  {
    "title": "042 - Wiwé, wiwé, wiwé",
    "artist": "Église du christianisme céleste",
    "url": "./music/042 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "042"
  },
  {
    "title": "043 - Ovo ovo ovo ovo",
    "artist": "Église du christianisme céleste",
    "url": "./music/043 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "043"
  },
  {
    "title": "044 - N aihon lepo njla yin Jesu ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/044 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "044"
  },
  {
    "title": "045 - Agun wiwe mi wa mi n yi",
    "artist": "Église du christianisme céleste",
    "url": "./music/045 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "045"
  },
  {
    "title": "046 - N aïhon lèpo ze Jesu daga",
    "artist": "Église du christianisme céleste",
    "url": "./music/046 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "046"
  },
  {
    "title": "046bis - Mi gbo mi dopè na Oto",
    "artist": "Église du christianisme céleste",
    "url": "./music/046 Bis Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "046bis"
  },
  {
    "title": "047 - Mi sén, mi sén Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/047 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "047"
  },
  {
    "title": "048 - Home sie hun do Kluno sie go",
    "artist": "Église du christianisme céleste",
    "url": "./music/048 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "048"
  },
  {
    "title": "049 - To huhlon de mé",
    "artist": "Église du christianisme céleste",
    "url": "./music/049 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "049"
  },
  {
    "title": "050 - Mi jihàn bo zégbè d aga",
    "artist": "Église du christianisme céleste",
    "url": "./music/050 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "050"
  },
  {
    "title": "051 - Oto yi opé sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/051 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "051"
  },
  {
    "title": "052 - Ni yen tle tindo dé foton",
    "artist": "Église du christianisme céleste",
    "url": "./music/052 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "052"
  },
  {
    "title": "053 - Jorih-Hah-Hihu",
    "artist": "Église du christianisme céleste",
    "url": "./music/053 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "053"
  },
  {
    "title": "054 - Gbo mi n dopè na Jelimoyah he mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/054 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "054"
  },
  {
    "title": "055 - Ogbè sie to alo towe mè",
    "artist": "Église du christianisme céleste",
    "url": "./music/055 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "055"
  },
  {
    "title": "056 - Mi ni no po do pa Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/056 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "056"
  },
  {
    "title": "057 - Jesu Klisti miwulè wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/057 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "057"
  },
  {
    "title": "058 - Miwulè so wa nukon towe Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/058 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "058"
  },
  {
    "title": "059 - Mi sionai  nkun ton le ji",
    "artist": "Église du christianisme céleste",
    "url": "./music/059 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "059"
  },
  {
    "title": "060 - Jesu vi Jiyewe ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/060 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "060"
  },
  {
    "title": "061 - Jiyewe gbè whan na ylando wiwa",
    "artist": "Église du christianisme céleste",
    "url": "./music/061 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "061"
  },
  {
    "title": "062 - Jesu honton ylandono ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/062 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "062"
  },
  {
    "title": "088 - Gbigbo wiwé jijohono",
    "artist": "Église du christianisme céleste",
    "url": "./music/088 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "088"
  },
  {
    "title": "089 - Gbigbo wiwé jete do mi me",
    "artist": "Église du christianisme céleste",
    "url": "./music/089 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "089"
  },
  {
    "title": "090 - Gbigbo wiwé no bio mi me",
    "artist": "Église du christianisme céleste",
    "url": "./music/090 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "090"
  },
  {
    "title": "091 - Mi sèn Okluno to agun wiwé me",
    "artist": "Église du christianisme céleste",
    "url": "./music/091 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "091"
  },
  {
    "title": "092 - Huhlon tin to  hun Lengbovu lo ton me",
    "artist": "Église du christianisme céleste",
    "url": "./music/092 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "092"
  },
  {
    "title": "093 - Huhlonlotin, huhlonlotin, huhlonlotin",
    "artist": "Église du christianisme céleste",
    "url": "./music/093 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "093"
  },
  {
    "title": "094 - Whànpa lon ton mi ze  whégbe",
    "artist": "Église du christianisme céleste",
    "url": "./music/094 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "094"
  },
  {
    "title": "095 - Huhlon wiwe daho ton son lon sinawe me wà",
    "artist": "Église du christianisme céleste",
    "url": "./music/095 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "095"
  },
  {
    "title": "096 - Jesu wa na huhlon mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/096 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "096"
  },
  {
    "title": "097 - Awhànpa wiwe  lon ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/097 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "097"
  },
  {
    "title": "098 - Huhlon daho lo wé jéte",
    "artist": "Église du christianisme céleste",
    "url": "./music/098 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "098"
  },
  {
    "title": "099 - Ohuhlon lo yen we no na",
    "artist": "Église du christianisme céleste",
    "url": "./music/099 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "099"
  },
  {
    "title": "100 - Le h  To jlo do we  no w azon eton do",
    "artist": "Église du christianisme céleste",
    "url": "./music/100 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "100"
  },
  {
    "title": "101 - Wiwé, wiwe we  yin Jesu ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/101 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "101"
  },
  {
    "title": "102 - Gbigbo wiwé apoe olon ton e!",
    "artist": "Église du christianisme céleste",
    "url": "./music/102 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "102"
  },
  {
    "title": "103 - Gbigbo wiwé huhlonno",
    "artist": "Église du christianisme céleste",
    "url": "./music/103 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "103"
  },
  {
    "title": "104 - Owa dagbé we yen bio na mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/104 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "104"
  },
  {
    "title": "105 - Jehovah wa na huhlon mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/105 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "105"
  },
  {
    "title": "106 - Le h  Jesu to yiylo wa wa, ylandono wà",
    "artist": "Église du christianisme céleste",
    "url": "./music/106 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "106"
  },
  {
    "title": "107 - Yen sé wanyigbeTt we",
    "artist": "Église du christianisme céleste",
    "url": "./music/107 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "107"
  },
  {
    "title": "108 - Wiwe we Jesu Klisti",
    "artist": "Église du christianisme céleste",
    "url": "./music/108 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "108"
  },
  {
    "title": "109 - Oto miton ni wa whlen",
    "artist": "Église du christianisme céleste",
    "url": "./music/109 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "109"
  },
  {
    "title": "110 - Jesu Ahol   hinhonno",
    "artist": "Église du christianisme céleste",
    "url": "./music/110 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "110"
  },
  {
    "title": "111 - Na miwu ylan no le ni lenvojo",
    "artist": "Église du christianisme céleste",
    "url": "./music/111 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "111"
  },
  {
    "title": "112 - Eko den mi danbu bo to ylan me",
    "artist": "Église du christianisme céleste",
    "url": "./music/112 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "112"
  },
  {
    "title": "113 - Jesu we yin hinhon sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/113 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "113"
  },
  {
    "title": "114 - Yen ko mo, yen ko mo bo so yonen",
    "artist": "Église du christianisme céleste",
    "url": "./music/114 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "114"
  },
  {
    "title": "115 - Yen ko yonen do ylandono yen yin",
    "artist": "Église du christianisme céleste",
    "url": "./music/115 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "115"
  },
  {
    "title": "116 - Wa jo ylando na vi T we le Oto",
    "artist": "Église du christianisme céleste",
    "url": "./music/116 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "116"
  },
  {
    "title": "117 - Jona miwu ylandono le",
    "artist": "Église du christianisme céleste",
    "url": "./music/117 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "117"
  },
  {
    "title": "118 - Ete sogan le mi we",
    "artist": "Église du christianisme céleste",
    "url": "./music/118 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "118"
  },
  {
    "title": "119 - Fon gigo sie, fon huhlon sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/119 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "119"
  },
  {
    "title": "120 - Gbigbo wiiwé wiwé wiwé",
    "artist": "Église du christianisme céleste",
    "url": "./music/120 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "120"
  },
  {
    "title": "121 - Jesu doheto ayi sie ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/121 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "121"
  },
  {
    "title": "122 - Jesu mi wa po",
    "artist": "Église du christianisme céleste",
    "url": "./music/122 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "122"
  },
  {
    "title": "123 - Jesu yen hon su we",
    "artist": "Église du christianisme céleste",
    "url": "./music/123 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "123"
  },
  {
    "title": "124 - Gbo gbigbo towe do mi ji",
    "artist": "Église du christianisme céleste",
    "url": "./music/124 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "124"
  },
  {
    "title": "125 - Klisti   Holu gigono",
    "artist": "Église du christianisme céleste",
    "url": "./music/125 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "125"
  },
  {
    "title": "126 - Oto E, Oto E Oto E",
    "artist": "Église du christianisme céleste",
    "url": "./music/126 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "126"
  },
  {
    "title": "127 - Jiyewhe m  ton to whé",
    "artist": "Église du christianisme céleste",
    "url": "./music/127 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "127"
  },
  {
    "title": "128 - Gbigbo wiwe jète",
    "artist": "Église du christianisme céleste",
    "url": "./music/128 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "128"
  },
  {
    "title": "129 - Gbigbo wiwe lon ton To ma do podo",
    "artist": "Église du christianisme céleste",
    "url": "./music/129 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "129"
  },
  {
    "title": "152 - Vo se jla do vo se jla do",
    "artist": "Église du christianisme céleste",
    "url": "./music/152 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "152"
  },
  {
    "title": "153 - Kluno mewhlento jale whlen mi gan",
    "artist": "Église du christianisme céleste",
    "url": "./music/153 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "153"
  },
  {
    "title": "154 - To Jesu, To Jesu",
    "artist": "Église du christianisme céleste",
    "url": "./music/154 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "154"
  },
  {
    "title": "155 - Zinvlu ma sogan sinon hinhon ji",
    "artist": "Église du christianisme céleste",
    "url": "./music/155 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "155"
  },
  {
    "title": "156 - Oto, to  jle he lo me",
    "artist": "Église du christianisme céleste",
    "url": "./music/156 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "156"
  },
  {
    "title": "157 - Pon Okluno t ote mi pon",
    "artist": "Église du christianisme céleste",
    "url": "./music/157 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "157"
  },
  {
    "title": "158 - Yah Kira I jah",
    "artist": "Église du christianisme céleste",
    "url": "./music/158 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "158"
  },
  {
    "title": "159 - N aihon lepo tle fon atè",
    "artist": "Église du christianisme céleste",
    "url": "./music/159 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "159"
  },
  {
    "title": "160 - Jesu yen na yi we sè",
    "artist": "Église du christianisme céleste",
    "url": "./music/160 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "160"
  },
  {
    "title": "161 - Ye ko be zege miton yi",
    "artist": "Église du christianisme céleste",
    "url": "./music/161 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "161"
  },
  {
    "title": "162 - Mi sèn Okluno to agun wiwe me",
    "artist": "Église du christianisme céleste",
    "url": "./music/162 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "162"
  },
  {
    "title": "163 - Yen we a so dibu blo Yen we Aholu lo",
    "artist": "Église du christianisme céleste",
    "url": "./music/163 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "163"
  },
  {
    "title": "164 - El Beraka Bered Eli Okluno sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/164 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "164"
  },
  {
    "title": "165 - Jiyewhe Aholu sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/165 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "165"
  },
  {
    "title": "166 - Okluno miwu  vi T we le wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/166 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "166"
  },
  {
    "title": "167 - Jéhovah nupoponameto",
    "artist": "Église du christianisme céleste",
    "url": "./music/167 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "167"
  },
  {
    "title": "168 - Dona sin azangbè u we egbé",
    "artist": "Église du christianisme céleste",
    "url": "./music/168 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "168"
  },
  {
    "title": "169 - Huhlon sinawe le",
    "artist": "Église du christianisme céleste",
    "url": "./music/169 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "169"
  },
  {
    "title": "170 - Jiwheyewhe Beteli ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/170 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "170"
  },
  {
    "title": "171 - Jikun gbigbo wiwe ton na ja",
    "artist": "Église du christianisme céleste",
    "url": "./music/171 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "171"
  },
  {
    "title": "172 - Jesu oveseto sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/172 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "172"
  },
  {
    "title": "173 - To wiwe he tin sensen m  ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/173 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "173"
  },
  {
    "title": "174 - Owhè po osun sunwhlevu emi",
    "artist": "Église du christianisme céleste",
    "url": "./music/174 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "174"
  },
  {
    "title": "175 - Agun wiwe lon ton  vi le",
    "artist": "Église du christianisme céleste",
    "url": "./music/175 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "175"
  },
  {
    "title": "176 - Okluno Elbérakah",
    "artist": "Église du christianisme céleste",
    "url": "./music/176 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "176"
  },
  {
    "title": "177 - Halleluyah, Yajè m ton ja",
    "artist": "Église du christianisme céleste",
    "url": "./music/177 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "177"
  },
  {
    "title": "178 - Okluno, Okluno, Okluno Whlenganto Agun",
    "artist": "Église du christianisme céleste",
    "url": "./music/178 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "178"
  },
  {
    "title": "179 - Jesu Klisti whlenganto miton",
    "artist": "Église du christianisme céleste",
    "url": "./music/179 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "179"
  },
  {
    "title": "180 - Huhlon lo tin to hun Jesu ton mè",
    "artist": "Église du christianisme céleste",
    "url": "./music/180 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "180"
  },
  {
    "title": "181 - Oto, Oto, t ojle dinvie ton me",
    "artist": "Église du christianisme céleste",
    "url": "./music/181 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "181"
  },
  {
    "title": "182 - Jona ylan m  ton le ton mi bibio",
    "artist": "Église du christianisme céleste",
    "url": "./music/182 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "182"
  },
  {
    "title": "183 - Wa no he mi, bo dona mi  Holu wiwe",
    "artist": "Église du christianisme céleste",
    "url": "./music/183 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "183"
  },
  {
    "title": "184 - Jéhovah Jesu Klisti",
    "artist": "Église du christianisme céleste",
    "url": "./music/184 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "184"
  },
  {
    "title": "185 - Donano wè Okluno ayajè wiwe lon ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/185 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "185"
  },
  {
    "title": "186 - Whlenganto sie a jo mi do blo",
    "artist": "Église du christianisme céleste",
    "url": "./music/186 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "186"
  },
  {
    "title": "187 - Halleluyah Gigo Eton gbe to te",
    "artist": "Église du christianisme céleste",
    "url": "./music/187 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "187"
  },
  {
    "title": "188 - Jehovah Jireh",
    "artist": "Église du christianisme céleste",
    "url": "./music/188 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "188"
  },
  {
    "title": "189 - Agun wiwe odè ton, agun dagbe de wè",
    "artist": "Église du christianisme céleste",
    "url": "./music/189 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "189"
  },
  {
    "title": "190 - Yise do whé he na yon na mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/190 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "190"
  },
  {
    "title": "191 - Okluno we doheto sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/191 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "191"
  },
  {
    "title": "192 - Yajeno hen   yaje wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/192 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "192"
  },
  {
    "title": "193 - Okluno mewhlenganto",
    "artist": "Église du christianisme céleste",
    "url": "./music/193 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "193"
  },
  {
    "title": "194 - Pon azon he aylo mi na",
    "artist": "Église du christianisme céleste",
    "url": "./music/194 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "194"
  },
  {
    "title": "195 - Mi ko zin yé do do mi ko dù yé ji",
    "artist": "Église du christianisme céleste",
    "url": "./music/195 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "195"
  },
  {
    "title": "196 - Zinvlu ma gan dù deji",
    "artist": "Église du christianisme céleste",
    "url": "./music/196 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "196"
  },
  {
    "title": "197 - Wa hen homè sie hun",
    "artist": "Église du christianisme céleste",
    "url": "./music/197 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "197"
  },
  {
    "title": "198 - Donano we Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/198 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "198"
  },
  {
    "title": "199 - Donano wè Okluno miton",
    "artist": "Église du christianisme céleste",
    "url": "./music/199 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "199"
  },
  {
    "title": "200 - Ali Jiyewhe Gbon gede",
    "artist": "Église du christianisme céleste",
    "url": "./music/200 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "200"
  },
  {
    "title": "201 - Jesu we Ahol  sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/201 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "201"
  },
  {
    "title": "202 - Yen na zé nukun sie le d aga",
    "artist": "Église du christianisme céleste",
    "url": "./music/202 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "202"
  },
  {
    "title": "203 - Yen so mo olon yoyo",
    "artist": "Église du christianisme céleste",
    "url": "./music/203 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "203"
  },
  {
    "title": "204 - Yaje Kluno ton ma ponou",
    "artist": "Église du christianisme céleste",
    "url": "./music/204 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "204"
  },
  {
    "title": "205 - Jesu Klisti wa gba  whan",
    "artist": "Église du christianisme céleste",
    "url": "./music/205 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "205"
  },
  {
    "title": "206 - Me sogan whlen mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/206 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "206"
  },
  {
    "title": "207 - Jaya jaya jaya",
    "artist": "Église du christianisme céleste",
    "url": "./music/207 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "207"
  },
  {
    "title": "208 - Hun leblanuhon lo  Kluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/208 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "208"
  },
  {
    "title": "209 - Agun wiwe mi vo gbajabla",
    "artist": "Église du christianisme céleste",
    "url": "./music/209 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "209"
  },
  {
    "title": "210 - Jla yin na Kluno mi akota lepo",
    "artist": "Église du christianisme céleste",
    "url": "./music/210 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "210"
  },
  {
    "title": "211 - Holudu aïhon ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/211 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "211"
  },
  {
    "title": "212 - Jesu a jo mi do blo",
    "artist": "Église du christianisme céleste",
    "url": "./music/212 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "212"
  },
  {
    "title": "213 - Jesu se odè towe",
    "artist": "Église du christianisme céleste",
    "url": "./music/213 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "213"
  },
  {
    "title": "225 - Bèlèle",
    "artist": "Église du christianisme céleste",
    "url": "./music/225 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "225"
  },
  {
    "title": "226 - Ahi mi wa, ahi mi wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/226 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "226"
  },
  {
    "title": "227 - When  me wiwe  le jeyi whe",
    "artist": "Église du christianisme céleste",
    "url": "./music/227 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "227"
  },
  {
    "title": "228 - Leblanu T we To miton",
    "artist": "Église du christianisme céleste",
    "url": "./music/228 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "228"
  },
  {
    "title": "229 - Dotu hiè yiseno",
    "artist": "Église du christianisme céleste",
    "url": "./music/229 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "229"
  },
  {
    "title": "230 - Me miton yiseno le",
    "artist": "Église du christianisme céleste",
    "url": "./music/230 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "230"
  },
  {
    "title": "231 - Oto sie whé t olon me",
    "artist": "Église du christianisme céleste",
    "url": "./music/231 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "231"
  },
  {
    "title": "232 - Mi w azon na lewé gbigbo miton ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/232 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "232"
  },
  {
    "title": "233 - Egbe Jesu yiylo we",
    "artist": "Église du christianisme céleste",
    "url": "./music/233 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "233"
  },
  {
    "title": "234 - Mi wazon mè wiwe lè",
    "artist": "Église du christianisme céleste",
    "url": "./music/234 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "234"
  },
  {
    "title": "235 - Miwu Jesu ton le mi basi novi",
    "artist": "Église du christianisme céleste",
    "url": "./music/235 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "235"
  },
  {
    "title": "236 - Noten wiwe de tin na miwule",
    "artist": "Église du christianisme céleste",
    "url": "./music/236 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "236"
  },
  {
    "title": "237 - Jesu  Meyinwan na mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/237 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "237"
  },
  {
    "title": "238 - Yen tin to dodo me",
    "artist": "Église du christianisme céleste",
    "url": "./music/238 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "238"
  },
  {
    "title": "239 - Van sika ton to nudo",
    "artist": "Église du christianisme céleste",
    "url": "./music/239 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "239"
  },
  {
    "title": "240 - Mi ni no po, mi ni no po",
    "artist": "Église du christianisme céleste",
    "url": "./music/240 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "240"
  },
  {
    "title": "241 - Oto de gbe son lon wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/241 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "241"
  },
  {
    "title": "242 - Halleluyah ! Halleluyah! Klisti To miton tin",
    "artist": "Église du christianisme céleste",
    "url": "./music/242 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "242"
  },
  {
    "title": "243 - Jiwheyewhe do, yen ma na jo we do",
    "artist": "Église du christianisme céleste",
    "url": "./music/243 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "243"
  },
  {
    "title": "244 - Jle godo ton me",
    "artist": "Église du christianisme céleste",
    "url": "./music/244 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "244"
  },
  {
    "title": "245 - Ho  Kluno ton jète do mi ji",
    "artist": "Église du christianisme céleste",
    "url": "./music/245 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "245"
  },
  {
    "title": "246 - To azon lo wa ma ko len gbodjè blo",
    "artist": "Église du christianisme céleste",
    "url": "./music/246 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "246"
  },
  {
    "title": "247 - A hanu Jesu wa me blo",
    "artist": "Église du christianisme céleste",
    "url": "./music/247 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "247"
  },
  {
    "title": "248 - Yen ja yen Jesu ja",
    "artist": "Église du christianisme céleste",
    "url": "./music/248 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "248"
  },
  {
    "title": "249 - Hanwen vive de we   Kluno do",
    "artist": "Église du christianisme céleste",
    "url": "./music/249 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "249"
  },
  {
    "title": "250 - Aihon he ko j ada ji",
    "artist": "Église du christianisme céleste",
    "url": "./music/250 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "250"
  },
  {
    "title": "251 - When  pen  lon ton na donu",
    "artist": "Église du christianisme céleste",
    "url": "./music/251 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "251"
  },
  {
    "title": "252 - Azan lo pé t egbe agun wiwe",
    "artist": "Église du christianisme céleste",
    "url": "./music/252 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "252"
  },
  {
    "title": "253 - Lenponvojo jle wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/253 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "253"
  },
  {
    "title": "254 - Agun dodono we",
    "artist": "Église du christianisme céleste",
    "url": "./music/254 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "254"
  },
  {
    "title": "255 - Jesu ku n aïhon",
    "artist": "Église du christianisme céleste",
    "url": "./music/255 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "255"
  },
  {
    "title": "256 - Mede mono klo Oyen gba",
    "artist": "Église du christianisme céleste",
    "url": "./music/256 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "256"
  },
  {
    "title": "257 - Yen ko dopa nado jo-aihon do",
    "artist": "Église du christianisme céleste",
    "url": "./music/257 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "257"
  },
  {
    "title": "258 - Pon aga to  lon wiwe",
    "artist": "Église du christianisme céleste",
    "url": "./music/258 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "258"
  },
  {
    "title": "259 - Aholu de ma so tin Jesu wè",
    "artist": "Église du christianisme céleste",
    "url": "./music/259 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "259"
  },
  {
    "title": "260 - Ojlè godo ton lo wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/260 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "260"
  },
  {
    "title": "261 - Oho t we we din mi mo",
    "artist": "Église du christianisme céleste",
    "url": "./music/261 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "261"
  },
  {
    "title": "262 - Whennu Okluno de-agun wiwe jète",
    "artist": "Église du christianisme céleste",
    "url": "./music/262 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "262"
  },
  {
    "title": "263 - Jesu gbigbo wè ayiha wiwe wè",
    "artist": "Église du christianisme céleste",
    "url": "./music/263 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "263"
  },
  {
    "title": "264 - Jesu to mi ylo",
    "artist": "Église du christianisme céleste",
    "url": "./music/264 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "264"
  },
  {
    "title": "265 - Fie assuka aïhon mè ton lè te",
    "artist": "Église du christianisme céleste",
    "url": "./music/265 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "265"
  },
  {
    "title": "266 - Wleawu na ojlè lenvojo t we ton wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/266 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "266"
  },
  {
    "title": "267 - Aihon ma na pe",
    "artist": "Église du christianisme céleste",
    "url": "./music/267 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "267"
  },
  {
    "title": "268 - Jesu Klisti jete",
    "artist": "Église du christianisme céleste",
    "url": "./music/268 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "268"
  },
  {
    "title": "269 - Na we ena den so",
    "artist": "Église du christianisme céleste",
    "url": "./music/269 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "269"
  },
  {
    "title": "270 - Ogan agun lon ton lo wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/270 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "270"
  },
  {
    "title": "271 - Jesu tin  tegbe doyi",
    "artist": "Église du christianisme céleste",
    "url": "./music/271 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "271"
  },
  {
    "title": "272 - O  O O Okluno, mi pa Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/272 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "272"
  },
  {
    "title": "273 - Okluno awhankpa lè ton ylo we",
    "artist": "Église du christianisme céleste",
    "url": "./music/273 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "273"
  },
  {
    "title": "274 - Yen to yiyi Jerusalem",
    "artist": "Église du christianisme céleste",
    "url": "./music/274 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "274"
  },
  {
    "title": "275 - A pon godo blo sa  to yiyi",
    "artist": "Église du christianisme céleste",
    "url": "./music/275 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "275"
  },
  {
    "title": "276 - De do nukon hie vi",
    "artist": "Église du christianisme céleste",
    "url": "./music/276 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "276"
  },
  {
    "title": "277 - N se gbe lengbohoto ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/277 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "277"
  },
  {
    "title": "278 - Té mi na len, té mi na do",
    "artist": "Église du christianisme céleste",
    "url": "./music/278 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "278"
  },
  {
    "title": "279 - N aihon ma yon mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/279 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "279"
  },
  {
    "title": "280 - Miwu agun wiwe vi emi",
    "artist": "Église du christianisme céleste",
    "url": "./music/280 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "280"
  },
  {
    "title": "281 - Gigo hlan Okluno miton",
    "artist": "Église du christianisme céleste",
    "url": "./music/281 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "281"
  },
  {
    "title": "282 - Yen so gbe daho de son lon",
    "artist": "Église du christianisme céleste",
    "url": "./music/282 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "282"
  },
  {
    "title": "283 - Segbe Kluno ton to azonwato lè ylo",
    "artist": "Église du christianisme céleste",
    "url": "./music/283 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "283"
  },
  {
    "title": "284 - Ogbé de he do son Olon me",
    "artist": "Église du christianisme céleste",
    "url": "./music/284 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "284"
  },
  {
    "title": "285 - Jesu Oto aihon lepo ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/285 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "285"
  },
  {
    "title": "295 - Donano we mehe d amlon",
    "artist": "Église du christianisme céleste",
    "url": "./music/295 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "295"
  },
  {
    "title": "296 - Ma den m na mo-afonnu gigo ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/296 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "296"
  },
  {
    "title": "297 - Oto wiwe me hisino emi",
    "artist": "Église du christianisme céleste",
    "url": "./music/297 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "297"
  },
  {
    "title": "298 - Oto he sin   ho mi dido lo",
    "artist": "Église du christianisme céleste",
    "url": "./music/298 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "298"
  },
  {
    "title": "299 - Whenu azon miton le na vo to gbeme fi",
    "artist": "Église du christianisme céleste",
    "url": "./music/299 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "299"
  },
  {
    "title": "300 - Jelusalemu lon ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/300 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "300"
  },
  {
    "title": "301 - When  pen godo ton na donu",
    "artist": "Église du christianisme céleste",
    "url": "./music/301 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "301"
  },
  {
    "title": "302 - N azon lo na yon so to nukon t we",
    "artist": "Église du christianisme céleste",
    "url": "./music/302 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "302"
  },
  {
    "title": "304 - When  azon sie vo   gbeme",
    "artist": "Église du christianisme céleste",
    "url": "./music/304 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "304"
  },
  {
    "title": "305 - T afonnu fonsonku gbe ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/305 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "305"
  },
  {
    "title": "306 - Whenu alogo de ma tin",
    "artist": "Église du christianisme céleste",
    "url": "./music/306 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "306"
  },
  {
    "title": "307 - Kluno na awa   hon ton mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/307 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "307"
  },
  {
    "title": "308 - Jesu tin tegbe kakadoyi",
    "artist": "Église du christianisme céleste",
    "url": "./music/308 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "308"
  },
  {
    "title": "309 - Azan daho deja   zan daho deja",
    "artist": "Église du christianisme céleste",
    "url": "./music/309 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "309"
  },
  {
    "title": "310 - Sen liai, sen liai a po-e d ai blo",
    "artist": "Église du christianisme céleste",
    "url": "./music/310 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "310"
  },
  {
    "title": "311 - When open Kluno ton na donu",
    "artist": "Église du christianisme céleste",
    "url": "./music/311 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "311"
  },
  {
    "title": "312 - A sinai tata when  azon tin na wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/312 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "312"
  },
  {
    "title": "313 - B a ma jlo na wen   kogan ylando ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/313 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "313"
  },
  {
    "title": "314 - Jla miyongbantin m  ton le do",
    "artist": "Église du christianisme céleste",
    "url": "./music/314 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "314"
  },
  {
    "title": "315 - T aihon me yewhe de ma so tin",
    "artist": "Église du christianisme céleste",
    "url": "./music/315 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "315"
  },
  {
    "title": "316 - Viv-aihon ton le ni jo mi do",
    "artist": "Église du christianisme céleste",
    "url": "./music/316 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "316"
  },
  {
    "title": "317 - Mi pon-en aihonmenu-emi",
    "artist": "Église du christianisme céleste",
    "url": "./music/317 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "317"
  },
  {
    "title": "318 - Ylo-azon t  we do azon novi",
    "artist": "Église du christianisme céleste",
    "url": "./music/318 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "318"
  },
  {
    "title": "319 - Towhejai jle  ku whenu  ton ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/319 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "319"
  },
  {
    "title": "320 - Wendagun Klist  ton he t okun  ho",
    "artist": "Église du christianisme céleste",
    "url": "./music/320 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "320"
  },
  {
    "title": "321 - Yen ma do  nu de, ete yen tindo",
    "artist": "Église du christianisme céleste",
    "url": "./music/321 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "321"
  },
  {
    "title": "322 - To lon le po-aihon po me",
    "artist": "Église du christianisme céleste",
    "url": "./music/322 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "322"
  },
  {
    "title": "323 - Azon tin to jipa Kluno ton me",
    "artist": "Église du christianisme céleste",
    "url": "./music/323 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "323"
  },
  {
    "title": "324 - Do  kun na gbigbo, doji  tegbe tegbe",
    "artist": "Église du christianisme céleste",
    "url": "./music/324 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "324"
  },
  {
    "title": "325 - Ojle Oto ton wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/325 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "325"
  },
  {
    "title": "326 - Hosiana ke hosiana",
    "artist": "Église du christianisme céleste",
    "url": "./music/326 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "326"
  },
  {
    "title": "327 - Do  so   zon mi yi gigo T we me",
    "artist": "Église du christianisme céleste",
    "url": "./music/327 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "327"
  },
  {
    "title": "328 - Hosiana, Hosiana, Hosiana t oji aga",
    "artist": "Église du christianisme céleste",
    "url": "./music/328 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "328"
  },
  {
    "title": "329 - Han miton, ni yin Hosiana",
    "artist": "Église du christianisme céleste",
    "url": "./music/329 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "329"
  },
  {
    "title": "330 - Mèkento lè lo mè wè Jesu jo",
    "artist": "Église du christianisme céleste",
    "url": "./music/330 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "330"
  },
  {
    "title": "331 - Mi pipa we Okluno jijè ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/331 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "331"
  },
  {
    "title": "332 - Pon ojijè zan whè lon ton ton sise po",
    "artist": "Église du christianisme céleste",
    "url": "./music/332 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "332"
  },
  {
    "title": "333 - Okluno sie ete na na we?",
    "artist": "Église du christianisme céleste",
    "url": "./music/333 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "333"
  },
  {
    "title": "334 - Donano we yin Kluno ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/334 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "334"
  },
  {
    "title": "335 - Mi la yin Kluno ton na aihon lepo ni sé",
    "artist": "Église du christianisme céleste",
    "url": "./music/335 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "335"
  },
  {
    "title": "336 - Mi jaya mi jaya to yise mè",
    "artist": "Église du christianisme céleste",
    "url": "./music/336 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "336"
  },
  {
    "title": "337 - Mi li tai bo sèn",
    "artist": "Église du christianisme céleste",
    "url": "./music/337 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "337"
  },
  {
    "title": "338 - Vi yonnu zionni ton emi",
    "artist": "Église du christianisme céleste",
    "url": "./music/338 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "338"
  },
  {
    "title": "339 - Yiseno fon bo ze satin towe kpan",
    "artist": "Église du christianisme céleste",
    "url": "./music/339 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "339"
  },
  {
    "title": "340 - To  yu jehon aihon he ton le me",
    "artist": "Église du christianisme céleste",
    "url": "./music/340 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "340"
  },
  {
    "title": "341 - Afo dopo hlan Jesu",
    "artist": "Église du christianisme céleste",
    "url": "./music/341 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "341"
  },
  {
    "title": "342 - Mi fan satin Whlenganto ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/342 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "342"
  },
  {
    "title": "343 - Whlenganto de pagbe eton jète",
    "artist": "Église du christianisme céleste",
    "url": "./music/343 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "343"
  },
  {
    "title": "344 - Hie asisa ogbè ton he ji mi yiyi te",
    "artist": "Église du christianisme céleste",
    "url": "./music/344 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "344"
  },
  {
    "title": "345 - Jihan hlan Okluno jijè ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/345 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "345"
  },
  {
    "title": "346 - Jesu Klisti vi emi",
    "artist": "Église du christianisme céleste",
    "url": "./music/346 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "346"
  },
  {
    "title": "347 - Té yen na wa dopa we",
    "artist": "Église du christianisme céleste",
    "url": "./music/347 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "347"
  },
  {
    "title": "348 - Mi jéyi whendo miton le me",
    "artist": "Église du christianisme céleste",
    "url": "./music/348 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "348"
  },
  {
    "title": "349 - Mose pla mi jeyi Kana",
    "artist": "Église du christianisme céleste",
    "url": "./music/349 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "349"
  },
  {
    "title": "350 - Ah yen do tindo dé foton",
    "artist": "Église du christianisme céleste",
    "url": "./music/350 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "350"
  },
  {
    "title": "351 - Gbigbo we  gbè lo",
    "artist": "Église du christianisme céleste",
    "url": "./music/351 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "351"
  },
  {
    "title": "352 - Avun lèpo ko jè podo",
    "artist": "Église du christianisme céleste",
    "url": "./music/352 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "352"
  },
  {
    "title": "353 - Okluno Holu Agun wiwe ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/353 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "353"
  },
  {
    "title": "354 - Mi ku d ayi sinsin novi",
    "artist": "Église du christianisme céleste",
    "url": "./music/354 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "354"
  },
  {
    "title": "355 - Atin he gbigbo do",
    "artist": "Église du christianisme céleste",
    "url": "./music/355 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "355"
  },
  {
    "title": "356 - Okluno Aholu jijè ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/356 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "356"
  },
  {
    "title": "357 - Mi ma yon whenu Jesu na wa",
    "artist": "Église du christianisme céleste",
    "url": "./music/357 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "357"
  },
  {
    "title": "358 - Etè yen na hlan we Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/358 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "358"
  },
  {
    "title": "359 - Ah ni yen do",
    "artist": "Église du christianisme céleste",
    "url": "./music/359 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "359"
  },
  {
    "title": "360 - Yen t aliho na wiwa whè",
    "artist": "Église du christianisme céleste",
    "url": "./music/360 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "360"
  },
  {
    "title": "361 - Olon p aihon po",
    "artist": "Église du christianisme céleste",
    "url": "./music/361 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "361"
  },
  {
    "title": "362 - Yiha sie na jaya when afo sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/362 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "362"
  },
  {
    "title": "363 - Gigo hlan Jiwheyewhe to aga",
    "artist": "Église du christianisme céleste",
    "url": "./music/363 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "363"
  },
  {
    "title": "364 - Jibéto to jipa lo me",
    "artist": "Église du christianisme céleste",
    "url": "./music/364 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "364"
  },
  {
    "title": "365 - Yeyi dona sionna",
    "artist": "Église du christianisme céleste",
    "url": "./music/365 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "365"
  },
  {
    "title": "366 - Mi dope na we Kluno Ganhunupo",
    "artist": "Église du christianisme céleste",
    "url": "./music/366 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "366"
  },
  {
    "title": "367 - Aïhon jlè gli no he",
    "artist": "Église du christianisme céleste",
    "url": "./music/367 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "367"
  },
  {
    "title": "368 - Egbe we yajezan Jelusalem ton",
    "artist": "Église du christianisme céleste",
    "url": "./music/368 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "368"
  },
  {
    "title": "369 - Fon, fon azon fligo ton wato",
    "artist": "Église du christianisme céleste",
    "url": "./music/369 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "369"
  },
  {
    "title": "370 - Yen na no pa Jiwheyewhe gigo sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/370 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "370"
  },
  {
    "title": "371 - Azon tin to gle jijè ton lo me",
    "artist": "Église du christianisme céleste",
    "url": "./music/371 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "371"
  },
  {
    "title": "372 - T afonnufudame bo whenu dangbodji",
    "artist": "Église du christianisme céleste",
    "url": "./music/372 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "372"
  },
  {
    "title": "373 - Jle nudido ton do tukla",
    "artist": "Église du christianisme céleste",
    "url": "./music/373 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "373"
  },
  {
    "title": "374 - Oto whanpèno de tin",
    "artist": "Église du christianisme céleste",
    "url": "./music/374 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "374"
  },
  {
    "title": "375 - Yen na sinon ojégbakun when  na jè whè",
    "artist": "Église du christianisme céleste",
    "url": "./music/375 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "375"
  },
  {
    "title": "376 - Lé agbowhen tle blibli",
    "artist": "Église du christianisme céleste",
    "url": "./music/376 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "376"
  },
  {
    "title": "377 - Na jle lo na vivi do whenu",
    "artist": "Église du christianisme céleste",
    "url": "./music/377 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "377"
  },
  {
    "title": "378 - Mi dedozon",
    "artist": "Église du christianisme céleste",
    "url": "./music/378 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "378"
  },
  {
    "title": "379 - Jle de yen ko danyi son nukon T we",
    "artist": "Église du christianisme céleste",
    "url": "./music/379 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "379"
  },
  {
    "title": "380 - Okluno Okluno  Kluno Whlenganto",
    "artist": "Église du christianisme céleste",
    "url": "./music/380 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "380"
  },
  {
    "title": "381 - Yen pon  yihon me maso mo yewhe de",
    "artist": "Église du christianisme céleste",
    "url": "./music/381 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "381"
  },
  {
    "title": "382 - Yen jlo na yin T we Okluno to  gbèzan sie me",
    "artist": "Église du christianisme céleste",
    "url": "./music/382 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "382"
  },
  {
    "title": "383 - Fon devi awuvivino le",
    "artist": "Église du christianisme céleste",
    "url": "./music/383 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "383"
  },
  {
    "title": "384 - Yen mo honton Jesu me",
    "artist": "Église du christianisme céleste",
    "url": "./music/384 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "384"
  },
  {
    "title": "385 - Whlenganto miton ko fon son yo me",
    "artist": "Église du christianisme céleste",
    "url": "./music/385 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "385"
  },
  {
    "title": "386 - Okluno we whlenganto sie",
    "artist": "Église du christianisme céleste",
    "url": "./music/386 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "386"
  },
  {
    "title": "387 - Papa Oshoffa ko hen  ho lo wa na mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/387 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "387"
  },
  {
    "title": "388 - Kluno son whèwhèwhenu",
    "artist": "Église du christianisme céleste",
    "url": "./music/388 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "388"
  },
  {
    "title": "389 - When  len dona t  we le",
    "artist": "Église du christianisme céleste",
    "url": "./music/389 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "389"
  },
  {
    "title": "390 - Pe jan mi na do na We   Kluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/390 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "390"
  },
  {
    "title": "391 - Okluno na basi",
    "artist": "Église du christianisme céleste",
    "url": "./music/391 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "391"
  },
  {
    "title": "392 - David ma do n de hu-akoto   npe",
    "artist": "Église du christianisme céleste",
    "url": "./music/392 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "392"
  },
  {
    "title": "393 - Honton dagbe de ma tin di Jesu",
    "artist": "Église du christianisme céleste",
    "url": "./music/393 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "393"
  },
  {
    "title": "394 - Yé gigo son   fi popo do whégbè",
    "artist": "Église du christianisme céleste",
    "url": "./music/394 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "394"
  },
  {
    "title": "395 - Sisa dindon we jeyi",
    "artist": "Église du christianisme céleste",
    "url": "./music/395 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "395"
  },
  {
    "title": "396 - Yen ko yonen do",
    "artist": "Église du christianisme céleste",
    "url": "./music/396 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "396"
  },
  {
    "title": "397 - Me susu we  Kluno ylo",
    "artist": "Église du christianisme céleste",
    "url": "./music/397 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "397"
  },
  {
    "title": "398 - Jlayin na Jesu  ke emi",
    "artist": "Église du christianisme céleste",
    "url": "./music/398 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "398"
  },
  {
    "title": "399 - T  we kakayi T we kakayi",
    "artist": "Église du christianisme céleste",
    "url": "./music/399 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "399"
  },
  {
    "title": "400 - Mi gbé so tin to  gbè",
    "artist": "Église du christianisme céleste",
    "url": "./music/400 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "400"
  },
  {
    "title": "401 - Site t ahi me jlé lepo me t adido me",
    "artist": "Église du christianisme céleste",
    "url": "./music/401 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "401"
  },
  {
    "title": "402 - Jiwheyewhe Gbeno mi do  pe na We",
    "artist": "Église du christianisme céleste",
    "url": "./music/402 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "402"
  },
  {
    "title": "403 - Gbojé de ma ko tin na mi yiseno",
    "artist": "Église du christianisme céleste",
    "url": "./music/403 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "403"
  },
  {
    "title": "404 - Gbigbo wiwe sè  dè miton",
    "artist": "Église du christianisme céleste",
    "url": "./music/404 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "404"
  },
  {
    "title": "405 - Mi ko sè  han son Sika yigba ji",
    "artist": "Église du christianisme céleste",
    "url": "./music/405 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "405"
  },
  {
    "title": "406 - Kluno jomimiono",
    "artist": "Église du christianisme céleste",
    "url": "./music/406 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "406"
  },
  {
    "title": "407 - Azan daho we azan he yen de",
    "artist": "Église du christianisme céleste",
    "url": "./music/407 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "407"
  },
  {
    "title": "408 - Halleluyah Halleluyah Jesu Klist ko fon",
    "artist": "Église du christianisme céleste",
    "url": "./music/408 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "408"
  },
  {
    "title": "409 - To kota po  so he yiji po",
    "artist": "Église du christianisme céleste",
    "url": "./music/409 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "409"
  },
  {
    "title": "410 - Jesu na hen homehun ni wanyi tin",
    "artist": "Église du christianisme céleste",
    "url": "./music/410 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "410"
  },
  {
    "title": "411 - Mi jihan fonsonku ton Halleluyah",
    "artist": "Église du christianisme céleste",
    "url": "./music/411 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "411"
  },
  {
    "title": "412 - Jibéto to ojipa lo me",
    "artist": "Église du christianisme céleste",
    "url": "./music/412 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "412"
  },
  {
    "title": "413 - Novi jaya to Klisti me",
    "artist": "Église du christianisme céleste",
    "url": "./music/413 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "413"
  },
  {
    "title": "414 - Ayi sie go na yaje t egbé",
    "artist": "Église du christianisme céleste",
    "url": "./music/414 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "414"
  },
  {
    "title": "415 - Gbe lili lo to hlan me se lepo",
    "artist": "Église du christianisme céleste",
    "url": "./music/415 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "415"
  },
  {
    "title": "416 - Pipa we jè he Okluno",
    "artist": "Église du christianisme céleste",
    "url": "./music/416 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "416"
  },
  {
    "title": "417 - Kluno wa leblanu na mi",
    "artist": "Église du christianisme céleste",
    "url": "./music/417 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "417"
  },
  {
    "title": "418 - Yen mo gbè yi to Jesu",
    "artist": "Église du christianisme céleste",
    "url": "./music/418 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "418"
  },
  {
    "title": "419 - Finfan dona ton le na tin",
    "artist": "Église du christianisme céleste",
    "url": "./music/419 Cantique ECC.mp3",
    "albumArt": "./img/CantiqueECC.webp",
    "id": "419"
  }
];

let currentTrackIndex = 0;

// Save the current song and time to localStorage
function saveCurrentSong() {
  const currentSong = playlist[currentTrackIndex];
  if (currentSong) {
    localStorage.setItem('lastSong', JSON.stringify({
      id: currentSong.id,
      currentTime: audio.currentTime
    }));
  }
}

// Load the saved song from localStorage and start playing from the saved position
function loadLastSong() {
  const lastSong = JSON.parse(localStorage.getItem('lastSong'));
  if (lastSong) {
    const songIndex = playlist.findIndex(song => song.id === lastSong.id);
    if (songIndex !== -1) {
      currentTrackIndex = songIndex;
      loadTrack(currentTrackIndex);
      audio.currentTime = lastSong.currentTime;
      audio.play();
    }
  }
}

// Add event listeners to save the current song and time
audio.addEventListener('timeupdate', saveCurrentSong);
window.addEventListener('beforeunload', saveCurrentSong);

// Call loadLastSong when the page loads
window.addEventListener('load', loadLastSong);

function loadTrack(index) {
  const track = playlist[index];
  console.log('Current track:', track);
  console.log('Track ID:', track.id);
  console.log('Lyrics data for this ID:', lyricsData[track.id]);
  audio.src = track.url;
  songTitleEl.textContent = track.title;
  songArtistEl.textContent = track.artist;
  albumArtEl.src = track.albumArt;
  albumArtEl.alt = `${track.title} album art`;

  if (lyricsData[track.id]) {
    updateLyrics(lyricsData[track.id]);
  } else {
    updateLyrics([]); // Display message or clear lyrics
  }

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
    //item.textContent = `${track.title} - ${track.artist}`; // Display title and artist
    item.textContent = `${track.title}`; // Display title only
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
    audio.pause();
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
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
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


// Initialize the first track
loadTrack(currentTrackIndex);
