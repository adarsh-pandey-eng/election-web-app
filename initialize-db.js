const Database = require('better-sqlite3');
const db = new Database('election.db');

db.exec(`
  DROP TABLE IF EXISTS candidates;
  CREATE TABLE candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    photo TEXT,
    symbol TEXT,
    votes INTEGER DEFAULT 0
  );
`);

const candidates = [
  {
    name: 'Jannat Arora',
    photo: '/river.svg',
    symbol: '',
  },
  {
    name: 'Muskam Janyani',
    photo: '/smile.svg',
    symbol: '',
  },
  {
    name: 'Suhani Rao',
    photo: '/girl-face.avif',
    symbol: '',
  },
  {
    name: 'Sadhana Rawal',
    photo: '/rishi_muni.jpg',
    symbol: '',
  },
  {
    name: 'Rutvi Sukhadiya',
    photo: '/rain.svg',
    symbol: '',
  },
  {
    name: 'Nisha Tomar',
    photo: '/night-moon-star.svg',
    symbol: '',
  },
  {
    name: 'Vihan Gujjar',
    photo: '/pen-paper.svg',
    symbol: '',
  },
  {
    name: 'Vaideek Kulkarni',
    photo: '/red-book.jpg',
    symbol: '',
  },
  {
    name: 'Ashish Mandal',
    photo: '/blessing-hand.jpg',
    symbol: '',
  },
  {
    name: 'Mehta Sarthak',
    photo: '/tree.svg',
    symbol: '',
  },
  {
    name: 'Prince Modi',
    photo: '/crown.svg',
    symbol: '',
  },
  {
    name: 'Pratik Prajapati',
    photo: '/bulb.svg',
    symbol: '',
  },
  {
    name: 'Raj Prajapati',
    photo: '/lotus.svg',
    symbol: '',
  },
  {
    name: 'Krishna Sharma',
    photo: '/flute-bansuri.svg',
    symbol: '',
  },
  {
    name: 'Ronak Yadav',
    photo: '/diya.svg',
    symbol: '',
  },
  {
    name: 'Tejis Yadav',
    photo: '/tejas-hal.jpeg',
    symbol: '',
  },
 
  {
    name: 'Baheta Bhoomi',
    photo: '/globe.svg',
    symbol: '',
  },
  {
    name: 'Baheta Prem',
    photo: '/watch.svg',

    symbol: '',
  },
  {
    name: 'Rathod Yashvi',
    photo: '/Hawan_kund.png',

    symbol: '',
  },
  {
    name: 'Ujjwal Tiwari',
    photo: '/umbrella.svg',
    symbol: '',
  }
];

const insert = db.prepare('INSERT INTO candidates (name, photo, symbol) VALUES (?, ?, ?)');
candidates.forEach(c => {
  insert.run(c.name, c.photo, c.symbol);
});

console.log('Database initialized with candidates.');
db.close(); 