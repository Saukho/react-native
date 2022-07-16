import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase(
  {name: 'example.db', location: 'default'},
  () => {
    console.log('database opened successfully');
  },
  err => {
    console.log('database error:', err);
  },
);

var table = 'student';

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //
      // tx.executeSql('DROP TABLE IF EXISTS student', []);
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS' +
          table +
          ' (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(255) NOT NULL;',
        [],
        () => {
          resolve();
        },
        //if error, reject(error)
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const addStudent = name => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO ' + table + '(name) VALUES(?,?);',
        [name],

        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const updateStudent = name => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE ' + table + 'set name=? WHERE id=?',
        [name, id],

        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const deleteStudent = name => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM' + table + 'WHERE id=?;',
        [],

        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
