import SQLite from 'react-native-sqlite-storage';
global.db = SQLite.openDatabase(
  {
    name: 'SQLite',
    location: 'default',
    createFromLocation: '~SQLite.db',
  },
  () => {},
  error => {
    console.log('ERROR: ' + error);
  },
);
