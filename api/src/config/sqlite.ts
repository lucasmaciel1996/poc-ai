import sqlite from 'sqlite3'

const DatabaseSqlite = new sqlite.Database('db.sqlite',(err)=>{
    if(err){
        console.error('❌ Failed to connect to database:', err.message);
        return
    }
    console.log('✅ Connected to SQLite database.');
})


export { DatabaseSqlite }