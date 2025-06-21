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
    name: 'Purva',
    photo: '/unity.avif',
    // symbol: '/globe.svg',
  },
  {
    name: 'Rajvi',
    photo: '/tree_with_crown.png',
    // symbol: '/vercel.svg',
  },
  {
    name: 'Pari',
    photo: '/eagle.jpg',
    symbol: '',
  },
  {
    name: "candidate 4",
    photo: '/lion.jpg',
    symbol: '',
  },
  {
    name: "candidate 5",
    photo: '/chakra.jpg',
    symbol: '',
  },
  {
    name: "candidate 6",
    photo: '/justice.jpg',
    symbol: '',
  },
  
];

const insert = db.prepare('INSERT INTO candidates (name, photo, symbol) VALUES (?, ?, ?)');
candidates.forEach(c => {
  insert.run(c.name, c.photo, c.symbol);
});

console.log('Database initialized with candidates.');
db.close(); 