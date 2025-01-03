// Handler for the beforeinstallprompt Event
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log(`'beforeinstallprompt' event was fired.`);

  const addButton = document.getElementById('installButton');
  if (addButton) {
    addButton.style.display = 'block';

    addButton.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      console.log('Service Worker Registered!', registration.scope);
    }, function(error) {
      console.log('Service Worker Registration failed:', error);
    });
  });
}

const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");
const previewImage = document.querySelector("#PreviewImage");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
      "songSrc": "./music/001 Cantique ECC.mp3",
      "title": "001 - Jerimoyamah",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_001.png"
  },
  {
      "songSrc": "./music/002 Cantique ECC.mp3",
      "title": "002 - Yarasarah",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_002.png"
  },
  {
      "songSrc": "./music/003 Cantique ECC.mp3",
      "title": "003 - Yaramah",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_003.png"
  },
  {
      "songSrc": "./music/004 Cantique ECC.mp3",
      "title": "004 - O Christ Ahol sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_004.png"
  },
  {
      "songSrc": "./music/005 Cantique ECC.mp3",
      "title": "005 - Olorun!! l'Oba iye Special universel",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_005.png"
  },
  {
      "songSrc": "./music/006 Cantique ECC.mp3",
      "title": "006 - Iram Jamah Jaribam",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_006.png"
  },
  {
      "songSrc": "./music/007 Cantique ECC.mp3",
      "title": "007 - Wléaou nado sen Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_007.png"
  },
  {
      "songSrc": "./music/008 Cantique ECC.mp3",
      "title": "008 - Mi kpa Kluno mè wiwe lè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_008.png"
  },
  {
      "songSrc": "./music/009 Cantique ECC.mp3",
      "title": "009 - Pè wè jè mi mèpo do na dona Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_009.png"
  },
  {
      "songSrc": "./music/010 Cantique ECC.mp3",
      "title": "010 - Mi kpa Jiyewhe Gigogan",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_010.png"
  },
  {
      "songSrc": "./music/011 Cantique ECC.mp3",
      "title": "011 - Karifaya",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_011.png"
  },
  {
      "songSrc": "./music/012 Cantique ECC.mp3",
      "title": "012 - Mi ji han vivi nè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_012.png"
  },
  {
      "songSrc": "./music/013 Cantique ECC.mp3",
      "title": "013 - Jehovah Ayajèno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_013.png"
  },
  {
      "songSrc": "./music/014 Cantique ECC.mp3",
      "title": "014 - Halleluyah hlan lon wiwe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_014.png"
  },
  {
      "songSrc": "./music/015 Cantique ECC.mp3",
      "title": "015 - Halleluyah, Halleluyah, Halleluyah Angel lè jaya",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_015.png"
  },
  {
      "songSrc": "./music/016 Cantique ECC.mp3",
      "title": "016 - Pè wè jè mi ni do na To",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_016.png"
  },
  {
      "songSrc": "./music/017 Cantique ECC.mp3",
      "title": "017 - Angeli wiwe lè to ayajè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_017.png"
  },
  {
      "songSrc": "./music/018 Cantique ECC.mp3",
      "title": "018 - Jesu dohèto ayi sie ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_018.png"
  },
  {
      "songSrc": "./music/019 Cantique ECC.mp3",
      "title": "019 - Mi pa kluno, mi pa Kluno, Mi pa Kluno Na gigo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_019.png"
  },
  {
      "songSrc": "./music/020 Cantique ECC.mp3",
      "title": "020 - Mi pa Okluno Halleluyah",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_020.png"
  },
  {
      "songSrc": "./music/021 Cantique ECC.mp3",
      "title": "021 - Opè dido zan gbe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_021.png"
  },
  {
      "songSrc": "./music/022 Cantique ECC.mp3",
      "title": "022 - Mi pa Kluno Aholu lèblanu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_022.png"
  },
  {
      "songSrc": "./music/023 Cantique ECC.mp3",
      "title": "023 - Mi ze Ota miton lè d'aga",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_023.png"
  },
  {
      "songSrc": "./music/024 Cantique ECC.mp3",
      "title": "024 - Mi ji han bo ze gbe d'aga",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_024.png"
  },
  {
      "songSrc": "./music/025 Cantique ECC.mp3",
      "title": "025 - Hanjigbè Agun wiwe lon ton lè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_025.png"
  },
  {
      "songSrc": "./music/026 Cantique ECC.mp3",
      "title": "026 - Jiwheyewhe Hol' hinhonno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_026.png"
  },
  {
      "songSrc": "./music/027 Cantique ECC.mp3",
      "title": "027 - Mi wa mi ni dope",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_027.png"
  },
  {
      "songSrc": "./music/028 Cantique ECC.mp3",
      "title": "028 - Ojle Oto ton wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_028.png"
  },
  {
      "songSrc": "./music/029 Cantique ECC.mp3",
      "title": "029 - Mi pa Kluno Agun dodono we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_029.png"
  },
  {
      "songSrc": "./music/030 Cantique ECC.mp3",
      "title": "030 - Jesu d'Aholu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_030.png"
  },
  {
      "songSrc": "./music/031 Cantique ECC.mp3",
      "title": "031 - Kluno na dagbewanyi t'we so le?",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_031.png"
  },
  {
      "songSrc": "./music/032 Cantique ECC.mp3",
      "title": "032 - Awhànpa wiwe lon ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_032.png"
  },
  {
      "songSrc": "./music/033 Cantique ECC.mp3",
      "title": "033 - Gbo mi n'jaya, hlan Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_033.png"
  },
  {
      "songSrc": "./music/034 Cantique ECC.mp3",
      "title": "034 - Mi sén mi sén Kluno Jiwheyewhe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_034.png"
  },
  {
      "songSrc": "./music/035 Cantique ECC.mp3",
      "title": "035 - Angeli le yi ayaje daho de",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_035.png"
  },
  {
      "songSrc": "./music/036 Cantique ECC.mp3",
      "title": "036 - Owhe, Osun, hinhon po sunwhlevu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_036.png"
  },
  {
      "songSrc": "./music/037 Cantique ECC.mp3",
      "title": "037 - Mi na opé  hlan Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_037.png"
  },
  {
      "songSrc": "./music/038 Cantique ECC.mp3",
      "title": "038 - Mi pa Jesu, mi pa Jesu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_038.png"
  },
  {
      "songSrc": "./music/039 Cantique ECC.mp3",
      "title": "039 - Zé pipahàn lo d'aga",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_039.png"
  },
  {
      "songSrc": "./music/040 Cantique ECC.mp3",
      "title": "040 - Aihon,  mi go n'ayaje",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_040.png"
  },
  {
      "songSrc": "./music/041 Cantique ECC.mp3",
      "title": "041 - Mi t'ayaje, angeli le we t'ayaje",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_041.png"
  },
  {
      "songSrc": "./music/042 Cantique ECC.mp3",
      "title": "042 - Wiwé, wiwé, wiwé",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_042.png"
  },
  {
      "songSrc": "./music/043 Cantique ECC.mp3",
      "title": "043 - Ovo ovo ovo ovo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_043.png"
  },
  {
      "songSrc": "./music/044 Cantique ECC.mp3",
      "title": "044 - N'aihon lepo n'jla yin Jesu ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_044.png"
  },
  {
      "songSrc": "./music/045 Cantique ECC.mp3",
      "title": "045 - Agun wiwe mi wa mi n'yi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_045.png"
  },
  {
      "songSrc": "./music/046 Cantique ECC.mp3",
      "title": "046 - N'aïhon lèpo ze Jesu d'aga",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_046.png"
  },
  {
      "songSrc": "./music/046 Bis Cantique ECC.mp3",
      "title": "046bis - Mi gbo mi dopè na Oto",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_046bis.png"
  },
  {
      "songSrc": "./music/047 Cantique ECC.mp3",
      "title": "047 - Mi sén, mi sén Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_047.png"
  },
  {
      "songSrc": "./music/048 Cantique ECC.mp3",
      "title": "048 - Home sie hun do'Kluno sie go",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_048.png"
  },
  {
      "songSrc": "./music/049 Cantique ECC.mp3",
      "title": "049 - To huhlon de mé",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_049.png"
  },
  {
      "songSrc": "./music/050 Cantique ECC.mp3",
      "title": "050 - Mi jihàn bo zégbè d'aga",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_050.png"
  },
  {
      "songSrc": "./music/051 Cantique ECC.mp3",
      "title": "051 - Oto yi opé sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_051.png"
  },
  {
      "songSrc": "./music/052 Cantique ECC.mp3",
      "title": "052 - Ni yen tle tindo'dé foton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_052.png"
  },
  {
      "songSrc": "./music/053 Cantique ECC.mp3",
      "title": "053 - Jorih-Hah-Hihu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_053.png"
  },
  {
      "songSrc": "./music/054 Cantique ECC.mp3",
      "title": "054 - Gbo mi n'dopè na Jelimoyah he mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_054.png"
  },
  {
      "songSrc": "./music/055 Cantique ECC.mp3",
      "title": "055 - Ogbè sie to alo towe mè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_055.png"
  },
  {
      "songSrc": "./music/056 Cantique ECC.mp3",
      "title": "056 - Mi ni no po do pa Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_056.png"
  },
  {
      "songSrc": "./music/057 Cantique ECC.mp3",
      "title": "057 - Jesu Klisti miwulè wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_057.png"
  },
  {
      "songSrc": "./music/058 Cantique ECC.mp3",
      "title": "058 - Miwulè so wa nukon towe Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_058.png"
  },
  {
      "songSrc": "./music/059 Cantique ECC.mp3",
      "title": "059 - Mi sionai' nkun ton le ji",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_059.png"
  },
  {
      "songSrc": "./music/060 Cantique ECC.mp3",
      "title": "060 - Jesu vi Jiyewe ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_060.png"
  },
  {
      "songSrc": "./music/061 Cantique ECC.mp3",
      "title": "061 - Jiyewe gbè whan na ylando wiwa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_061.png"
  },
  {
      "songSrc": "./music/062 Cantique ECC.mp3",
      "title": "062 - Jesu honton ylandono ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_062.png"
  },
  {
      "songSrc": "./music/088 Cantique ECC.mp3",
      "title": "088 - Gbigbo wiwé jijohono",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_088.png"
  },
  {
      "songSrc": "./music/089 Cantique ECC.mp3",
      "title": "089 - Gbigbo wiwé jete do mi me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_089.png"
  },
  {
      "songSrc": "./music/090 Cantique ECC.mp3",
      "title": "090 - Gbigbo wiwé no bio mi me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_090.png"
  },
  {
      "songSrc": "./music/091 Cantique ECC.mp3",
      "title": "091 - Mi sèn Okluno to agun wiwé me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_091.png"
  },
  {
      "songSrc": "./music/092 Cantique ECC.mp3",
      "title": "092 - Huhlon tin to' hun Lengbovu lo ton me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_092.png"
  },
  {
      "songSrc": "./music/093 Cantique ECC.mp3",
      "title": "093 - Huhlonlotin, huhlonlotin, huhlonlotin",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_093.png"
  },
  {
      "songSrc": "./music/094 Cantique ECC.mp3",
      "title": "094 - Whànpa lon ton mi ze 'whégbe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_094.png"
  },
  {
      "songSrc": "./music/095 Cantique ECC.mp3",
      "title": "095 - Huhlon wiwe daho ton son lon sinawe me wà",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_095.png"
  },
  {
      "songSrc": "./music/096 Cantique ECC.mp3",
      "title": "096 - Jesu wa na huhlon mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_096.png"
  },
  {
      "songSrc": "./music/097 Cantique ECC.mp3",
      "title": "097 - Awhànpa wiwe' lon ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_097.png"
  },
  {
      "songSrc": "./music/098 Cantique ECC.mp3",
      "title": "098 - Huhlon daho lo wé jéte",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_098.png"
  },
  {
      "songSrc": "./music/099 Cantique ECC.mp3",
      "title": "099 - Ohuhlon lo yen we no na",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_099.png"
  },
  {
      "songSrc": "./music/100 Cantique ECC.mp3",
      "title": "100 - Le h' To jlo do we' no w'azon eton do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_100.png"
  },
  {
      "songSrc": "./music/101 Cantique ECC.mp3",
      "title": "101 - Wiwé, wiwe we' yin Jesu ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_101.png"
  },
  {
      "songSrc": "./music/102 Cantique ECC.mp3",
      "title": "102 - Gbigbo wiwé apoe olon ton e!",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_102.png"
  },
  {
      "songSrc": "./music/103 Cantique ECC.mp3",
      "title": "103 - Gbigbo wiwé huhlonno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_103.png"
  },
  {
      "songSrc": "./music/104 Cantique ECC.mp3",
      "title": "104 - Owa dagbé we yen bio na mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_104.png"
  },
  {
      "songSrc": "./music/105 Cantique ECC.mp3",
      "title": "105 - Jehovah wa na huhlon mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_105.png"
  },
  {
      "songSrc": "./music/106 Cantique ECC.mp3",
      "title": "106 - Le h' Jesu to yiylo wa wa, ylandono wà",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_106.png"
  },
  {
      "songSrc": "./music/107 Cantique ECC.mp3",
      "title": "107 - Yen sé wanyigbeTt'we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_107.png"
  },
  {
      "songSrc": "./music/108 Cantique ECC.mp3",
      "title": "108 - Wiwe we Jesu Klisti",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_108.png"
  },
  {
      "songSrc": "./music/109 Cantique ECC.mp3",
      "title": "109 - Oto miton ni wa whlen",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_109.png"
  },
  {
      "songSrc": "./music/110 Cantique ECC.mp3",
      "title": "110 - Jesu Ahol ' hinhonno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_110.png"
  },
  {
      "songSrc": "./music/111 Cantique ECC.mp3",
      "title": "111 - Na miwu ylan no le ni lenvojo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_111.png"
  },
  {
      "songSrc": "./music/112 Cantique ECC.mp3",
      "title": "112 - Eko den mi danbu bo to ylan me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_112.png"
  },
  {
      "songSrc": "./music/113 Cantique ECC.mp3",
      "title": "113 - Jesu we yin hinhon sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_113.png"
  },
  {
      "songSrc": "./music/114 Cantique ECC.mp3",
      "title": "114 - Yen ko mo, yen ko mo bo so yonen",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_114.png"
  },
  {
      "songSrc": "./music/115 Cantique ECC.mp3",
      "title": "115 - Yen ko yonen do ylandono yen yin",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_115.png"
  },
  {
      "songSrc": "./music/116 Cantique ECC.mp3",
      "title": "116 - Wa jo ylando na vi T'we le Oto",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_116.png"
  },
  {
      "songSrc": "./music/117 Cantique ECC.mp3",
      "title": "117 - Jona miwu ylandono le",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_117.png"
  },
  {
      "songSrc": "./music/118 Cantique ECC.mp3",
      "title": "118 - Ete sogan le mi we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_118.png"
  },
  {
      "songSrc": "./music/119 Cantique ECC.mp3",
      "title": "119 - Fon gigo sie , fon huhlon sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_119.png"
  },
  {
      "songSrc": "./music/120 Cantique ECC.mp3",
      "title": "120 - Gbigbo wiiwé wiwé wiwé",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_120.png"
  },
  {
      "songSrc": "./music/121 Cantique ECC.mp3",
      "title": "121 - Jesu doheto ayi sie ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_121.png"
  },
  {
      "songSrc": "./music/122 Cantique ECC.mp3",
      "title": "122 - Jesu mi wa po",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_122.png"
  },
  {
      "songSrc": "./music/123 Cantique ECC.mp3",
      "title": "123 - Jesu yen hon su we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_123.png"
  },
  {
      "songSrc": "./music/124 Cantique ECC.mp3",
      "title": "124 - Gbo gbigbo towe do mi ji",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_124.png"
  },
  {
      "songSrc": "./music/125 Cantique ECC.mp3",
      "title": "125 - Klisti ' Holu gigono",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_125.png"
  },
  {
      "songSrc": "./music/126 Cantique ECC.mp3",
      "title": "126 - Oto E, Oto E Oto E",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_126.png"
  },
  {
      "songSrc": "./music/127 Cantique ECC.mp3",
      "title": "127 - Jiyewhe m' ton to whé",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_127.png"
  },
  {
      "songSrc": "./music/128 Cantique ECC.mp3",
      "title": "128 - Gbigbo wiwe jète",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_128.png"
  },
  {
      "songSrc": "./music/129 Cantique ECC.mp3",
      "title": "129 - Gbigbo wiwe lon ton To ma do podo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_129.png"
  },
  {
      "songSrc": "./music/152 Cantique ECC.mp3",
      "title": "152 - Vo se jla do vo se jla do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_152.png"
  },
  {
      "songSrc": "./music/153 Cantique ECC.mp3",
      "title": "153 - Kluno mewhlento jale whlen mi gan",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_153.png"
  },
  {
      "songSrc": "./music/154 Cantique ECC.mp3",
      "title": "154 - To Jesu, To Jesu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_154.png"
  },
  {
      "songSrc": "./music/155 Cantique ECC.mp3",
      "title": "155 - Zinvlu ma sogan sinon hinhon ji",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_155.png"
  },
  {
      "songSrc": "./music/156 Cantique ECC.mp3",
      "title": "156 - Oto, to' jle he lo me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_156.png"
  },
  {
      "songSrc": "./music/157 Cantique ECC.mp3",
      "title": "157 - Pon Okluno t'ote mi pon",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_157.png"
  },
  {
      "songSrc": "./music/158 Cantique ECC.mp3",
      "title": "158 - Yah Kira I jah",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_158.png"
  },
  {
      "songSrc": "./music/159 Cantique ECC.mp3",
      "title": "159 - N'aihon lepo tle fon atè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_159.png"
  },
  {
      "songSrc": "./music/160 Cantique ECC.mp3",
      "title": "160 - Jesu yen na yi we sè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_160.png"
  },
  {
      "songSrc": "./music/161 Cantique ECC.mp3",
      "title": "161 - Ye ko be zege miton yi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_161.png"
  },
  {
      "songSrc": "./music/162 Cantique ECC.mp3",
      "title": "162 - Mi sèn Okluno to agun wiwe me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_162.png"
  },
  {
      "songSrc": "./music/163 Cantique ECC.mp3",
      "title": "163 - Yen we a so dibu blo Yen we Aholu lo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_163.png"
  },
  {
      "songSrc": "./music/164 Cantique ECC.mp3",
      "title": "164 - El Beraka Bered Eli Okluno sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_164.png"
  },
  {
      "songSrc": "./music/165 Cantique ECC.mp3",
      "title": "165 - Jiyewhe Aholu sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_165.png"
  },
  {
      "songSrc": "./music/166 Cantique ECC.mp3",
      "title": "166 - Okluno miwu' vi T'we le wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_166.png"
  },
  {
      "songSrc": "./music/167 Cantique ECC.mp3",
      "title": "167 - Jéhovah nupoponameto",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_167.png"
  },
  {
      "songSrc": "./music/168 Cantique ECC.mp3",
      "title": "168 - Dona sin azangbè u we egbé",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_168.png"
  },
  {
      "songSrc": "./music/169 Cantique ECC.mp3",
      "title": "169 - Huhlon sinawe le",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_169.png"
  },
  {
      "songSrc": "./music/170 Cantique ECC.mp3",
      "title": "170 - Jiwheyewhe Beteli ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_170.png"
  },
  {
      "songSrc": "./music/171 Cantique ECC.mp3",
      "title": "171 - Jikun gbigbo wiwe ton na ja",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_171.png"
  },
  {
      "songSrc": "./music/172 Cantique ECC.mp3",
      "title": "172 - Jesu oveseto sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_172.png"
  },
  {
      "songSrc": "./music/173 Cantique ECC.mp3",
      "title": "173 - To wiwe he tin sensen m' ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_173.png"
  },
  {
      "songSrc": "./music/174 Cantique ECC.mp3",
      "title": "174 - Owhè po osun sunwhlevu emi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_174.png"
  },
  {
      "songSrc": "./music/175 Cantique ECC.mp3",
      "title": "175 - Agun wiwe lon ton 'vi le",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_175.png"
  },
  {
      "songSrc": "./music/176 Cantique ECC.mp3",
      "title": "176 - Okluno Elbérakah",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_176.png"
  },
  {
      "songSrc": "./music/177 Cantique ECC.mp3",
      "title": "177 - Halleluyah, Yajè m'ton ja",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_177.png"
  },
  {
      "songSrc": "./music/178 Cantique ECC.mp3",
      "title": "178 - Okluno, Okluno, Okluno Whlenganto Agun",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_178.png"
  },
  {
      "songSrc": "./music/179 Cantique ECC.mp3",
      "title": "179 - Jesu Klisti whlenganto miton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_179.png"
  },
  {
      "songSrc": "./music/180 Cantique ECC.mp3",
      "title": "180 - Huhlon lo tin to hun Jesu ton mè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_180.png"
  },
  {
      "songSrc": "./music/181 Cantique ECC.mp3",
      "title": "181 - Oto, Oto, t'ojle dinvie ton me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_181.png"
  },
  {
      "songSrc": "./music/182 Cantique ECC.mp3",
      "title": "182 - Jona ylan m' ton le ton mi bibio",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_182.png"
  },
  {
      "songSrc": "./music/183 Cantique ECC.mp3",
      "title": "183 - Wa no he mi, bo dona mi' Holu wiwe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_183.png"
  },
  {
      "songSrc": "./music/184 Cantique ECC.mp3",
      "title": "184 - Jéhovah Jesu Klisti",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_184.png"
  },
  {
      "songSrc": "./music/185 Cantique ECC.mp3",
      "title": "185 - Donano wè Okluno ayajè wiwe lon ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_185.png"
  },
  {
      "songSrc": "./music/186 Cantique ECC.mp3",
      "title": "186 - Whlenganto sie a jo mi do blo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_186.png"
  },
  {
      "songSrc": "./music/187 Cantique ECC.mp3",
      "title": "187 - Halleluyah Gigo Eton gbe to te",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_187.png"
  },
  {
      "songSrc": "./music/188 Cantique ECC.mp3",
      "title": "188 - Jehovah Jireh",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_188.png"
  },
  {
      "songSrc": "./music/189 Cantique ECC.mp3",
      "title": "189 - Agun wiwe odè ton, agun dagbe de wè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_189.png"
  },
  {
      "songSrc": "./music/190 Cantique ECC.mp3",
      "title": "190 - Yise do whé he na yon na mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_190.png"
  },
  {
      "songSrc": "./music/191 Cantique ECC.mp3",
      "title": "191 - Okluno we doheto sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_191.png"
  },
  {
      "songSrc": "./music/192 Cantique ECC.mp3",
      "title": "192 - Yajeno hen ' yaje wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_192.png"
  },
  {
      "songSrc": "./music/193 Cantique ECC.mp3",
      "title": "193 - Okluno mewhlenganto",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_193.png"
  },
  {
      "songSrc": "./music/194 Cantique ECC.mp3",
      "title": "194 - Pon azon he aylo mi na",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_194.png"
  },
  {
      "songSrc": "./music/195 Cantique ECC.mp3",
      "title": "195 - Mi ko zin yé do do mi ko dù yé ji",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_195.png"
  },
  {
      "songSrc": "./music/196 Cantique ECC.mp3",
      "title": "196 - Zinvlu ma gan dù deji",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_196.png"
  },
  {
      "songSrc": "./music/197 Cantique ECC.mp3",
      "title": "197 - Wa hen homè sie hun",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_197.png"
  },
  {
      "songSrc": "./music/198 Cantique ECC.mp3",
      "title": "198 - Donano we Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_198.png"
  },
  {
      "songSrc": "./music/199 Cantique ECC.mp3",
      "title": "199 - Donano wè Okluno miton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_199.png"
  },
  {
      "songSrc": "./music/200 Cantique ECC.mp3",
      "title": "200 - Ali Jiyewhe Gbon gede",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_200.png"
  },
  {
      "songSrc": "./music/201 Cantique ECC.mp3",
      "title": "201 - Jesu we Ahol' sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_201.png"
  },
  {
      "songSrc": "./music/202 Cantique ECC.mp3",
      "title": "202 - Yen na zé nukun sie le d'aga",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_202.png"
  },
  {
      "songSrc": "./music/203 Cantique ECC.mp3",
      "title": "203 - Yen so mo olon yoyo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_203.png"
  },
  {
      "songSrc": "./music/204 Cantique ECC.mp3",
      "title": "204 - Yaje Kluno ton ma ponou",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_204.png"
  },
  {
      "songSrc": "./music/205 Cantique ECC.mp3",
      "title": "205 - Jesu Klisti wa gba' whan",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_205.png"
  },
  {
      "songSrc": "./music/206 Cantique ECC.mp3",
      "title": "206 - Me sogan whlen mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_206.png"
  },
  {
      "songSrc": "./music/207 Cantique ECC.mp3",
      "title": "207 - Jaya jaya jaya",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_207.png"
  },
  {
      "songSrc": "./music/208 Cantique ECC.mp3",
      "title": "208 - Hun leblanuhon lo' Kluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_208.png"
  },
  {
      "songSrc": "./music/209 Cantique ECC.mp3",
      "title": "209 - Agun wiwe mi vo gbajabla",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_209.png"
  },
  {
      "songSrc": "./music/210 Cantique ECC.mp3",
      "title": "210 - Jla yin na Kluno mi akota lepo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_210.png"
  },
  {
      "songSrc": "./music/211 Cantique ECC.mp3",
      "title": "211 - Holudu aïhon ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_211.png"
  },
  {
      "songSrc": "./music/212 Cantique ECC.mp3",
      "title": "212 - Jesu a jo mi do blo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_212.png"
  },
  {
      "songSrc": "./music/213 Cantique ECC.mp3",
      "title": "213 - Jesu se odè towe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_213.png"
  },
  {
      "songSrc": "./music/225 Cantique ECC.mp3",
      "title": "225 - Bèlèle",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_225.png"
  },
  {
      "songSrc": "./music/226 Cantique ECC.mp3",
      "title": "226 - Ahi mi wa, ahi mi wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_226.png"
  },
  {
      "songSrc": "./music/227 Cantique ECC.mp3",
      "title": "227 - When' me wiwe' le jeyi whe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_227.png"
  },
  {
      "songSrc": "./music/228 Cantique ECC.mp3",
      "title": "228 - Leblanu T'we To miton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_228.png"
  },
  {
      "songSrc": "./music/229 Cantique ECC.mp3",
      "title": "229 - Dotu hiè yiseno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_229.png"
  },
  {
      "songSrc": "./music/230 Cantique ECC.mp3",
      "title": "230 - Me miton yiseno le",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_230.png"
  },
  {
      "songSrc": "./music/231 Cantique ECC.mp3",
      "title": "231 - Oto sie whé t'olon me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_231.png"
  },
  {
      "songSrc": "./music/232 Cantique ECC.mp3",
      "title": "232 - Mi w'azon na lewé gbigbo miton ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_232.png"
  },
  {
      "songSrc": "./music/233 Cantique ECC.mp3",
      "title": "233 - Egbe Jesu yiylo we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_233.png"
  },
  {
      "songSrc": "./music/234 Cantique ECC.mp3",
      "title": "234 - Mi wazon mè wiwe lè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_234.png"
  },
  {
      "songSrc": "./music/235 Cantique ECC.mp3",
      "title": "235 - Miwu Jesu ton le mi basi novi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_235.png"
  },
  {
      "songSrc": "./music/236 Cantique ECC.mp3",
      "title": "236 - Noten wiwe de tin na miwule",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_236.png"
  },
  {
      "songSrc": "./music/237 Cantique ECC.mp3",
      "title": "237 - Jesu' Meyinwan na mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_237.png"
  },
  {
      "songSrc": "./music/238 Cantique ECC.mp3",
      "title": "238 - Yen tin to dodo me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_238.png"
  },
  {
      "songSrc": "./music/239 Cantique ECC.mp3",
      "title": "239 - Van sika ton to nudo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_239.png"
  },
  {
      "songSrc": "./music/240 Cantique ECC.mp3",
      "title": "240 - Mi ni no po, mi ni no po",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_240.png"
  },
  {
      "songSrc": "./music/241 Cantique ECC.mp3",
      "title": "241 - Oto de gbe son lon wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_241.png"
  },
  {
      "songSrc": "./music/242 Cantique ECC.mp3",
      "title": "242 - Halleluyah ! Halleluyah! Klisti To miton tin",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_242.png"
  },
  {
      "songSrc": "./music/243 Cantique ECC.mp3",
      "title": "243 - Jiwheyewhe do, yen ma na jo we do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_243.png"
  },
  {
      "songSrc": "./music/244 Cantique ECC.mp3",
      "title": "244 - Jle godo ton me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_244.png"
  },
  {
      "songSrc": "./music/245 Cantique ECC.mp3",
      "title": "245 - Ho 'Kluno ton jète do mi ji",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_245.png"
  },
  {
      "songSrc": "./music/246 Cantique ECC.mp3",
      "title": "246 - To azon lo wa ma ko len gbodjè blo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_246.png"
  },
  {
      "songSrc": "./music/247 Cantique ECC.mp3",
      "title": "247 - A hanu Jesu wa me blo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_247.png"
  },
  {
      "songSrc": "./music/248 Cantique ECC.mp3",
      "title": "248 - Yen ja yen Jesu ja",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_248.png"
  },
  {
      "songSrc": "./music/249 Cantique ECC.mp3",
      "title": "249 - Hanwen vive de we ' Kluno do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_249.png"
  },
  {
      "songSrc": "./music/250 Cantique ECC.mp3",
      "title": "250 - Aihon he ko j'ada ji",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_250.png"
  },
  {
      "songSrc": "./music/251 Cantique ECC.mp3",
      "title": "251 - When' pen' lon ton na donu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_251.png"
  },
  {
      "songSrc": "./music/252 Cantique ECC.mp3",
      "title": "252 - Azan lo pé t'egbe agun wiwe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_252.png"
  },
  {
      "songSrc": "./music/253 Cantique ECC.mp3",
      "title": "253 - Lenponvojo jle wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_253.png"
  },
  {
      "songSrc": "./music/254 Cantique ECC.mp3",
      "title": "254 - Agun dodono we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_254.png"
  },
  {
      "songSrc": "./music/255 Cantique ECC.mp3",
      "title": "255 - Jesu ku n'aïhon",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_255.png"
  },
  {
      "songSrc": "./music/256 Cantique ECC.mp3",
      "title": "256 - Mede mono klo Oyen gba",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_256.png"
  },
  {
      "songSrc": "./music/257 Cantique ECC.mp3",
      "title": "257 - Yen ko dopa nado jo-aihon do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_257.png"
  },
  {
      "songSrc": "./music/258 Cantique ECC.mp3",
      "title": "258 - Pon aga to' lon wiwe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_258.png"
  },
  {
      "songSrc": "./music/259 Cantique ECC.mp3",
      "title": "259 - Aholu de ma so tin Jesu wè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_259.png"
  },
  {
      "songSrc": "./music/260 Cantique ECC.mp3",
      "title": "260 - Ojlè godo ton lo wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_260.png"
  },
  {
      "songSrc": "./music/261 Cantique ECC.mp3",
      "title": "261 - Oho t'we we din mi mo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_261.png"
  },
  {
      "songSrc": "./music/262 Cantique ECC.mp3",
      "title": "262 - Whennu Okluno de-agun wiwe jète",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_262.png"
  },
  {
      "songSrc": "./music/263 Cantique ECC.mp3",
      "title": "263 - Jesu gbigbo wè ayiha wiwe wè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_263.png"
  },
  {
      "songSrc": "./music/264 Cantique ECC.mp3",
      "title": "264 - Jesu to mi ylo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_264.png"
  },
  {
      "songSrc": "./music/265 Cantique ECC.mp3",
      "title": "265 - Fie assuka aïhon mè ton lè te",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_265.png"
  },
  {
      "songSrc": "./music/266 Cantique ECC.mp3",
      "title": "266 - Wleawu na ojlè lenvojo t'we ton wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_266.png"
  },
  {
      "songSrc": "./music/267 Cantique ECC.mp3",
      "title": "267 - Aihon ma na pe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_267.png"
  },
  {
      "songSrc": "./music/268 Cantique ECC.mp3",
      "title": "268 - Jesu Klisti jete",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_268.png"
  },
  {
      "songSrc": "./music/269 Cantique ECC.mp3",
      "title": "269 - Na we ena den so",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_269.png"
  },
  {
      "songSrc": "./music/270 Cantique ECC.mp3",
      "title": "270 - Ogan agun lon ton lo wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_270.png"
  },
  {
      "songSrc": "./music/271 Cantique ECC.mp3",
      "title": "271 - Jesu tin  tegbe doyi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_271.png"
  },
  {
      "songSrc": "./music/272 Cantique ECC.mp3",
      "title": "272 - O  O O Okluno, mi pa Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_272.png"
  },
  {
      "songSrc": "./music/273 Cantique ECC.mp3",
      "title": "273 - Okluno awhankpa lè ton ylo we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_273.png"
  },
  {
      "songSrc": "./music/274 Cantique ECC.mp3",
      "title": "274 - Yen to yiyi Jerusalem",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_274.png"
  },
  {
      "songSrc": "./music/275 Cantique ECC.mp3",
      "title": "275 - A pon godo blo sa  to yiyi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_275.png"
  },
  {
      "songSrc": "./music/276 Cantique ECC.mp3",
      "title": "276 - De do nukon hie vi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_276.png"
  },
  {
      "songSrc": "./music/277 Cantique ECC.mp3",
      "title": "277 - N'se gbe lengbohoto ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_277.png"
  },
  {
      "songSrc": "./music/278 Cantique ECC.mp3",
      "title": "278 - Té mi na len , ' té mi na do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_278.png"
  },
  {
      "songSrc": "./music/279 Cantique ECC.mp3",
      "title": "279 - N'aihon ma yon mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_279.png"
  },
  {
      "songSrc": "./music/280 Cantique ECC.mp3",
      "title": "280 - Miwu agun wiwe vi emi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_280.png"
  },
  {
      "songSrc": "./music/281 Cantique ECC.mp3",
      "title": "281 - Gigo hlan Okluno miton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_281.png"
  },
  {
      "songSrc": "./music/282 Cantique ECC.mp3",
      "title": "282 - Yen so gbe daho de son lon",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_282.png"
  },
  {
      "songSrc": "./music/283 Cantique ECC.mp3",
      "title": "283 - Segbe Kluno ton to azonwato lè ylo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_283.png"
  },
  {
      "songSrc": "./music/284 Cantique ECC.mp3",
      "title": "284 - Ogbé de he do son Olon me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_284.png"
  },
  {
      "songSrc": "./music/285 Cantique ECC.mp3",
      "title": "285 - Jesu Oto aihon lepo ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_285.png"
  },
  {
      "songSrc": "./music/295 Cantique ECC.mp3",
      "title": "295 - Donano we mehe d'amlon",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_295.png"
  },
  {
      "songSrc": "./music/296 Cantique ECC.mp3",
      "title": "296 - Ma den m'na mo-afonnu gigo ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_296.png"
  },
  {
      "songSrc": "./music/297 Cantique ECC.mp3",
      "title": "297 - Oto wiwe me hisino emi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_297.png"
  },
  {
      "songSrc": "./music/298 Cantique ECC.mp3",
      "title": "298 - Oto he sin ' ho mi dido lo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_298.png"
  },
  {
      "songSrc": "./music/299 Cantique ECC.mp3",
      "title": "299 - Whenu azon miton le na vo to gbeme fi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_299.png"
  },
  {
      "songSrc": "./music/300 Cantique ECC.mp3",
      "title": "300 - Jelusalemu lon ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_300.png"
  },
  {
      "songSrc": "./music/301 Cantique ECC.mp3",
      "title": "301 - When' pen godo ton na donu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_301.png"
  },
  {
      "songSrc": "./music/302 Cantique ECC.mp3",
      "title": "302 - N'azon lo na yon so to nukon t'we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_302.png"
  },
  {
      "songSrc": "./music/304 Cantique ECC.mp3",
      "title": "304 - When' azon sie vo ' gbeme",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_304.png"
  },
  {
      "songSrc": "./music/305 Cantique ECC.mp3",
      "title": "305 - T'afonnu fonsonku gbe ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_305.png"
  },
  {
      "songSrc": "./music/306 Cantique ECC.mp3",
      "title": "306 - Whenu alogo de ma tin",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_306.png"
  },
  {
      "songSrc": "./music/307 Cantique ECC.mp3",
      "title": "307 - Kluno na awa ' hon ton mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_307.png"
  },
  {
      "songSrc": "./music/308 Cantique ECC.mp3",
      "title": "308 - Jesu tin tegbe kakadoyi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_308.png"
  },
  {
      "songSrc": "./music/309 Cantique ECC.mp3",
      "title": "309 - Azan daho deja ' zan daho deja",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_309.png"
  },
  {
      "songSrc": "./music/310 Cantique ECC.mp3",
      "title": "310 - Sen liai, sen liai a po-e d'ai blo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_310.png"
  },
  {
      "songSrc": "./music/311 Cantique ECC.mp3",
      "title": "311 - When'open Kluno ton na donu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_311.png"
  },
  {
      "songSrc": "./music/312 Cantique ECC.mp3",
      "title": "312 - A sinai tata when' azon tin na wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_312.png"
  },
  {
      "songSrc": "./music/313 Cantique ECC.mp3",
      "title": "313 - B'a ma jlo na wen ' kogan ylando ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_313.png"
  },
  {
      "songSrc": "./music/314 Cantique ECC.mp3",
      "title": "314 - Jla miyongbantin m' ton le do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_314.png"
  },
  {
      "songSrc": "./music/315 Cantique ECC.mp3",
      "title": "315 - T'aihon me yewhe de ma so tin",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_315.png"
  },
  {
      "songSrc": "./music/316 Cantique ECC.mp3",
      "title": "316 - Viv-aihon ton le ni jo mi do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_316.png"
  },
  {
      "songSrc": "./music/317 Cantique ECC.mp3",
      "title": "317 - Mi pon-en aihonmenu-emi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_317.png"
  },
  {
      "songSrc": "./music/318 Cantique ECC.mp3",
      "title": "318 - Ylo-azon t' we do azon novi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_318.png"
  },
  {
      "songSrc": "./music/319 Cantique ECC.mp3",
      "title": "319 - Towhejai jle' ku whenu' ton ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_319.png"
  },
  {
      "songSrc": "./music/320 Cantique ECC.mp3",
      "title": "320 - Wendagun Klist' ton he t'okun' ho",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_320.png"
  },
  {
      "songSrc": "./music/321 Cantique ECC.mp3",
      "title": "321 - Yen ma do' nu de, ete yen tindo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_321.png"
  },
  {
      "songSrc": "./music/322 Cantique ECC.mp3",
      "title": "322 - To lon le po-aihon po me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_322.png"
  },
  {
      "songSrc": "./music/323 Cantique ECC.mp3",
      "title": "323 - Azon tin to jipa Kluno ton me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_323.png"
  },
  {
      "songSrc": "./music/324 Cantique ECC.mp3",
      "title": "324 - Do' kun na gbigbo, doji  tegbe tegbe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_324.png"
  },
  {
      "songSrc": "./music/325 Cantique ECC.mp3",
      "title": "325 - Ojle Oto ton wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_325.png"
  },
  {
      "songSrc": "./music/326 Cantique ECC.mp3",
      "title": "326 - Hosiana ke hosiana",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_326.png"
  },
  {
      "songSrc": "./music/327 Cantique ECC.mp3",
      "title": "327 - Do 'so ' zon mi yi gigo T'we me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_327.png"
  },
  {
      "songSrc": "./music/328 Cantique ECC.mp3",
      "title": "328 - Hosiana, Hosiana, Hosiana t'oji aga",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_328.png"
  },
  {
      "songSrc": "./music/329 Cantique ECC.mp3",
      "title": "329 - Han miton, ni yin Hosiana",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_329.png"
  },
  {
      "songSrc": "./music/330 Cantique ECC.mp3",
      "title": "330 - Mèkento lè lo mè wè Jesu jo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_330.png"
  },
  {
      "songSrc": "./music/331 Cantique ECC.mp3",
      "title": "331 - Mi pipa we Okluno jijè ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_331.png"
  },
  {
      "songSrc": "./music/332 Cantique ECC.mp3",
      "title": "332 - Pon ojijè zan whè lon ton ton sise po",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_332.png"
  },
  {
      "songSrc": "./music/333 Cantique ECC.mp3",
      "title": "333 - Okluno sie ete na na we?",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_333.png"
  },
  {
      "songSrc": "./music/334 Cantique ECC.mp3",
      "title": "334 - Donano we yin Kluno ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_334.png"
  },
  {
      "songSrc": "./music/335 Cantique ECC.mp3",
      "title": "335 - Mi la yin Kluno ton na aihon lepo ni sé",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_335.png"
  },
  {
      "songSrc": "./music/336 Cantique ECC.mp3",
      "title": "336 - Mi jaya mi jaya to yise mè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_336.png"
  },
  {
      "songSrc": "./music/337 Cantique ECC.mp3",
      "title": "337 - Mi li tai bo sèn",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_337.png"
  },
  {
      "songSrc": "./music/338 Cantique ECC.mp3",
      "title": "338 - Vi yonnu zionni ton emi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_338.png"
  },
  {
      "songSrc": "./music/339 Cantique ECC.mp3",
      "title": "339 - Yiseno fon bo ze satin towe kpan",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_339.png"
  },
  {
      "songSrc": "./music/340 Cantique ECC.mp3",
      "title": "340 - To' yu jehon aihon he ton le me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_340.png"
  },
  {
      "songSrc": "./music/341 Cantique ECC.mp3",
      "title": "341 - Afo dopo hlan Jesu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_341.png"
  },
  {
      "songSrc": "./music/342 Cantique ECC.mp3",
      "title": "342 - Mi fan satin Whlenganto ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_342.png"
  },
  {
      "songSrc": "./music/343 Cantique ECC.mp3",
      "title": "343 - Whlenganto de pagbe eton jète",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_343.png"
  },
  {
      "songSrc": "./music/344 Cantique ECC.mp3",
      "title": "344 - Hie asisa ogbè ton he ji mi yiyi te",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_344.png"
  },
  {
      "songSrc": "./music/345 Cantique ECC.mp3",
      "title": "345 - Jihan hlan Okluno jijè ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_345.png"
  },
  {
      "songSrc": "./music/346 Cantique ECC.mp3",
      "title": "346 - Jesu Klisti vi emi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_346.png"
  },
  {
      "songSrc": "./music/347 Cantique ECC.mp3",
      "title": "347 - Té yen na wa dopa we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_347.png"
  },
  {
      "songSrc": "./music/348 Cantique ECC.mp3",
      "title": "348 - Mi jéyi whendo miton le me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_348.png"
  },
  {
      "songSrc": "./music/349 Cantique ECC.mp3",
      "title": "349 - Mose pla mi jeyi Kana",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_349.png"
  },
  {
      "songSrc": "./music/350 Cantique ECC.mp3",
      "title": "350 - Ah yen do tindo dé foton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_350.png"
  },
  {
      "songSrc": "./music/351 Cantique ECC.mp3",
      "title": "351 - Gbigbo we' gbè lo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_351.png"
  },
  {
      "songSrc": "./music/352 Cantique ECC.mp3",
      "title": "352 - Avun lèpo ko jè podo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_352.png"
  },
  {
      "songSrc": "./music/353 Cantique ECC.mp3",
      "title": "353 - Okluno Holu Agun wiwe ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_353.png"
  },
  {
      "songSrc": "./music/354 Cantique ECC.mp3",
      "title": "354 - Mi ku d'ayi sinsin novi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_354.png"
  },
  {
      "songSrc": "./music/355 Cantique ECC.mp3",
      "title": "355 - Atin he gbigbo do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_355.png"
  },
  {
      "songSrc": "./music/356 Cantique ECC.mp3",
      "title": "356 - Okluno Aholu jijè ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_356.png"
  },
  {
      "songSrc": "./music/357 Cantique ECC.mp3",
      "title": "357 - Mi ma yon whenu Jesu na wa",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_357.png"
  },
  {
      "songSrc": "./music/358 Cantique ECC.mp3",
      "title": "358 - Etè yen na hlan we Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_358.png"
  },
  {
      "songSrc": "./music/359 Cantique ECC.mp3",
      "title": "359 - Ah ni yen do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_359.png"
  },
  {
      "songSrc": "./music/360 Cantique ECC.mp3",
      "title": "360 - Yen t'aliho na wiwa whè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_360.png"
  },
  {
      "songSrc": "./music/361 Cantique ECC.mp3",
      "title": "361 - Olon p'aihon po",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_361.png"
  },
  {
      "songSrc": "./music/362 Cantique ECC.mp3",
      "title": "362 - Yiha sie na jaya when afo sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_362.png"
  },
  {
      "songSrc": "./music/363 Cantique ECC.mp3",
      "title": "363 - Gigo hlan Jiwheyewhe to aga",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_363.png"
  },
  {
      "songSrc": "./music/364 Cantique ECC.mp3",
      "title": "364 - Jibéto to jipa lo me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_364.png"
  },
  {
      "songSrc": "./music/365 Cantique ECC.mp3",
      "title": "365 - Yeyi dona sionna",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_365.png"
  },
  {
      "songSrc": "./music/366 Cantique ECC.mp3",
      "title": "366 - Mi dope na we Kluno Ganhunupo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_366.png"
  },
  {
      "songSrc": "./music/367 Cantique ECC.mp3",
      "title": "367 - Aïhon jlè gli no he",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_367.png"
  },
  {
      "songSrc": "./music/368 Cantique ECC.mp3",
      "title": "368 - Egbe we yajezan Jelusalem ton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_368.png"
  },
  {
      "songSrc": "./music/369 Cantique ECC.mp3",
      "title": "369 - Fon, fon azon fligo ton wato",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_369.png"
  },
  {
      "songSrc": "./music/370 Cantique ECC.mp3",
      "title": "370 - Yen na no pa Jiwheyewhe gigo sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_370.png"
  },
  {
      "songSrc": "./music/371 Cantique ECC.mp3",
      "title": "371 - Azon tin to gle jijè ton lo me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_371.png"
  },
  {
      "songSrc": "./music/372 Cantique ECC.mp3",
      "title": "372 - T'afonnufudame bo whenu dangbodji",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_372.png"
  },
  {
      "songSrc": "./music/373 Cantique ECC.mp3",
      "title": "373 - Jle nudido ton do tukla",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_373.png"
  },
  {
      "songSrc": "./music/374 Cantique ECC.mp3",
      "title": "374 - Oto whanpèno de tin",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_374.png"
  },
  {
      "songSrc": "./music/375 Cantique ECC.mp3",
      "title": "375 - Yen na sinon ojégbakun when' na jè whè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_375.png"
  },
  {
      "songSrc": "./music/376 Cantique ECC.mp3",
      "title": "376 - Lé agbowhen tle blibli",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_376.png"
  },
  {
      "songSrc": "./music/377 Cantique ECC.mp3",
      "title": "377 - Na jle lo na vivi do whenu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_377.png"
  },
  {
      "songSrc": "./music/378 Cantique ECC.mp3",
      "title": "378 - Mi dedozon",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_378.png"
  },
  {
      "songSrc": "./music/379 Cantique ECC.mp3",
      "title": "379 - Jle de yen ko danyi son nukon T'we",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_379.png"
  },
  {
      "songSrc": "./music/380 Cantique ECC.mp3",
      "title": "380 - Okluno Okluno' Kluno Whlenganto",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_380.png"
  },
  {
      "songSrc": "./music/381 Cantique ECC.mp3",
      "title": "381 - Yen pon' yihon me maso mo yewhe de",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_381.png"
  },
  {
      "songSrc": "./music/382 Cantique ECC.mp3",
      "title": "382 - Yen jlo na yin T'we Okluno to' gbèzan sie me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_382.png"
  },
  {
      "songSrc": "./music/383 Cantique ECC.mp3",
      "title": "383 - Fon devi awuvivino le",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_383.png"
  },
  {
      "songSrc": "./music/384 Cantique ECC.mp3",
      "title": "384 - Yen mo honton Jesu me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_384.png"
  },
  {
      "songSrc": "./music/385 Cantique ECC.mp3",
      "title": "385 - Whlenganto miton ko fon son yo me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_385.png"
  },
  {
      "songSrc": "./music/386 Cantique ECC.mp3",
      "title": "386 - Okluno we whlenganto sie",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_386.png"
  },
  {
      "songSrc": "./music/387 Cantique ECC.mp3",
      "title": "387 - Papa Oshoffa ko hen' ho lo wa na mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_387.png"
  },
  {
      "songSrc": "./music/388 Cantique ECC.mp3",
      "title": "388 - Kluno son whèwhèwhenu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_388.png"
  },
  {
      "songSrc": "./music/389 Cantique ECC.mp3",
      "title": "389 - When' len dona t' we le",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_389.png"
  },
  {
      "songSrc": "./music/390 Cantique ECC.mp3",
      "title": "390 - Pe jan mi na do na We ' Kluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_390.png"
  },
  {
      "songSrc": "./music/391 Cantique ECC.mp3",
      "title": "391 - Okluno na basi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_391.png"
  },
  {
      "songSrc": "./music/392 Cantique ECC.mp3",
      "title": "392 - David ma do n'de hu-akoto ' npe",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_392.png"
  },
  {
      "songSrc": "./music/393 Cantique ECC.mp3",
      "title": "393 - Honton dagbe de ma tin di Jesu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_393.png"
  },
  {
      "songSrc": "./music/394 Cantique ECC.mp3",
      "title": "394 - Yé gigo son ' fi popo do whégbè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_394.png"
  },
  {
      "songSrc": "./music/395 Cantique ECC.mp3",
      "title": "395 - Sisa dindon we jeyi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_395.png"
  },
  {
      "songSrc": "./music/396 Cantique ECC.mp3",
      "title": "396 - Yen ko yonen do",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_396.png"
  },
  {
      "songSrc": "./music/397 Cantique ECC.mp3",
      "title": "397 - Me susu we' Kluno ylo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_397.png"
  },
  {
      "songSrc": "./music/398 Cantique ECC.mp3",
      "title": "398 - Jlayin na Jesu' ke emi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_398.png"
  },
  {
      "songSrc": "./music/399 Cantique ECC.mp3",
      "title": "399 - T' we kakayi T'we kakayi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_399.png"
  },
  {
      "songSrc": "./music/400 Cantique ECC.mp3",
      "title": "400 - Mi gbé so tin to' gbè",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_400.png"
  },
  {
      "songSrc": "./music/401 Cantique ECC.mp3",
      "title": "401 - Site t'ahi me jlé lepo me t'adido me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_401.png"
  },
  {
      "songSrc": "./music/402 Cantique ECC.mp3",
      "title": "402 - Jiwheyewhe Gbeno mi do' pe na We",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_402.png"
  },
  {
      "songSrc": "./music/403 Cantique ECC.mp3",
      "title": "403 - Gbojé de ma ko tin na mi yiseno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_403.png"
  },
  {
      "songSrc": "./music/404 Cantique ECC.mp3",
      "title": "404 - Gbigbo wiwe sè' dè miton",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_404.png"
  },
  {
      "songSrc": "./music/405 Cantique ECC.mp3",
      "title": "405 - Mi ko sè' han son Sika yigba ji",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_405.png"
  },
  {
      "songSrc": "./music/406 Cantique ECC.mp3",
      "title": "406 - Kluno jomimiono",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_406.png"
  },
  {
      "songSrc": "./music/407 Cantique ECC.mp3",
      "title": "407 - Azan daho we azan he yen de",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_407.png"
  },
  {
      "songSrc": "./music/408 Cantique ECC.mp3",
      "title": "408 - Halleluyah Halleluyah Jesu Klist ko fon",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_408.png"
  },
  {
      "songSrc": "./music/409 Cantique ECC.mp3",
      "title": "409 - To kota po' so he yiji po",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_409.png"
  },
  {
      "songSrc": "./music/410 Cantique ECC.mp3",
      "title": "410 - Jesu na hen homehun ni wanyi tin",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_410.png"
  },
  {
      "songSrc": "./music/411 Cantique ECC.mp3",
      "title": "411 - Mi jihan fonsonku ton Halleluyah",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_411.png"
  },
  {
      "songSrc": "./music/412 Cantique ECC.mp3",
      "title": "412 - Jibéto to ojipa lo me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_412.png"
  },
  {
      "songSrc": "./music/413 Cantique ECC.mp3",
      "title": "413 - Novi jaya to Klisti me",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_413.png"
  },
  {
      "songSrc": "./music/414 Cantique ECC.mp3",
      "title": "414 - Ayi sie go na yaje t'egbé",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_414.png"
  },
  {
      "songSrc": "./music/415 Cantique ECC.mp3",
      "title": "415 - Gbe lili lo to hlan me se lepo",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_415.png"
  },
  {
      "songSrc": "./music/416 Cantique ECC.mp3",
      "title": "416 - Pipa we jè he Okluno",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_416.png"
  },
  {
      "songSrc": "./music/417 Cantique ECC.mp3",
      "title": "417 - Kluno wa leblanu na mi",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_417.png"
  },
  {
      "songSrc": "./music/418 Cantique ECC.mp3",
      "title": "418 - Yen mo gbè yi to Jesu",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_418.png"
  },
  {
      "songSrc": "./music/419 Cantique ECC.mp3",
      "title": "419 - Finfan dona ton le na tin",
      "artist": "Église du christianisme céleste",
      "imgSrc": "./img/CantiqueECC.webp",
      "previewImgSrc": "./images/cantiques/Cantique_419.png"
  }
];


const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
  previewImage.src = songDataBase[index].previewImgSrc; // Mise à jour de l'image avant la sélection
};

audio.addEventListener("ended", () => {
  index = (index + 1) % songDataBase.length;
  loadMusic();
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  index = (index + 1) % songDataBase.length;
  loadMusic();
  play();
});

previousButton.addEventListener("click", () => {
  index = (index - 1 + songDataBase.length) % songDataBase.length;
  loadMusic();
  play();
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};

const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});

let minute, second;

const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};

audio.addEventListener("timeupdate", timeStamp);

progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress = (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

/*mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songImg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});

mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songImg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});*/

// Songselect
const songSelect = document.getElementById("songSelect");

songDataBase.forEach((song, idx) => {
  const option = document.createElement("option");
  option.value = idx;
  option.textContent = `${song.title}`;
  songSelect.appendChild(option);
});

songSelect.addEventListener("change", (event) => {
  index = parseInt(event.target.value);
  if (index !== -1) {
    const selectedSong = songDataBase[index];
    songName.textContent = selectedSong.title;
    artist.textContent = selectedSong.artist;
    songImg.src = selectedSong.imgSrc;
    audio.src = selectedSong.songSrc;
    previewImage.src = selectedSong.previewImgSrc; // Mise à jour de l'image avant la sélection
    audio.play();
    isPlaying = true;
    playPauseButton.classList.remove("fa-play");
    playPauseButton.classList.add("fa-pause");
  }
});
