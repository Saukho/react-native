import SQlite from 'react-native-sqlite-storage'

var db = SQlite.openDatabase({name:'boot.db', location: 'default'},()=>{console.log('database opened successfully')}, err=>{console.log('database error:', err)});

var table = 'boot'

export const init=()=>{
    const promise = new Promise((resolve, reject) =>{
        db.transaction((tx)=>{
            // 
            tx.executeSql('DROP TABLE IF EXISTS boot', [])
            tx.executeSql('CREATE TABLE IF NOT EXISTS' + table + ' (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, type VARCHAR(255) NOT NULL, size VARCHAR(255);',[],
            () => { 
                resolve()
            },
            //if error, reject(error)
            (_, err) => { reject(err) 
        }
        )
    })
})
return promise
}

export const addBoot = (type, size)=>{
    const promise = new Promise((resolve, reject) =>{
        db.transaction((tx)=>{
            tx.executeSql("INSERT INTO " + table + "(type, size) VALUES(?,?);",
            [type,size],

            ()=>{
                resolve()
            },
            (_,err)=>{ 
                reject(err)
            }
            )
        })
    })
    return promise
}

export const updateBoot = (type, size)=>{
    const promise = new Promise((resolve, reject) =>{
        db.transaction((tx)=>{
            tx.executeSql("UPDATE " + table + "set type=?, size=? WHERE id=?",
            [type,size, id],

            ()=>{
                resolve()
            },
            (_,err)=>{ 
                reject(err)
            }
            )
        })
    })
    return promise
}

export const deleteBoot = (type, size)=>{
    const promise = new Promise((resolve, reject) =>{
        db.transaction((tx)=>{
            tx.executeSql("DELETE FROM" + table + "WHERE id=?;",
            [],

            ()=>{
                resolve()
            },
            (_,err)=>{ 
                reject(err)
            }
            )
        })
    })
    return promise
}
