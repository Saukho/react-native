import {openDatabase} from 'react-native-sqlite-storage';
const DATABASE = 'user.db';

var db = openDatabase({name: DATABASE});
var tableName = 'user';
//method returns a Promise - in the calling side .then(...).then(...)....catch(...) can be used

export async function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `create table if not exists
          ${tableName}(id integer not null primary key, name text not null, email text not null, contact text not null);`,
        [], //second parameters of execution:empty square brackets - this parameter is not needed when creating table
        //If the transaction succeeds, this is called
        () => {
          console.log('Transaction succeeded', tx.toString());
          resolve(); //There is no need to return anything
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
}
export async function addUser(name, email, contact) {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        `insert into  ${tableName} (name,email,contact) values(?,?,?);`,
        //And the values come here
        [name, email, contact],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
          console.log('add transaction', err);
        },
      );
    });
  });
  return promise;
}
export async function updateUser(id, name, contact, email) {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        `update  ${tableName} set name=? email=? contact=?, where id=?;`,
        //And the values come here
        [name, contact, email, id],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
}
export async function deleteUser(id) {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we use the Prepared statement, just putting placeholders to the values to be inserted
      tx.executeSql(
        'delete from ' + tableName + ' where id=?;',
        //And the values come here
        [id],
        //If the transaction succeeds, this is called
        () => {
          resolve();
        },
        //If the transaction fails, this is called
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
}

export async function getAllUsers() {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      //Here we select all from the table user
      tx.executeSql(
        'select name, email, contact from ' + tableName,
        [],
        (tx, result) => {
          let items = []; //Create a new empty Javascript array
          //And add all the items of the result (database rows/records) into that table
          if (items.length <= 0) {
            resolve;
          }
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i)); //The form of an item is {"breed": "Pike", "id": 1, "weight": 5000}
            console.log('SQLite result: get all users', result.rows.item(i)); //For debugging purposes to see the data in console window
          }
          resolve(items); //The data the Promise will have when returned
        },
        (tx, err) => {
          console.log('Err');
          console.log('message:', err);
          reject(err);
        },
      );
    });
  });
  return promise;
}
