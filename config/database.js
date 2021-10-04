const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE,err => {
    if(err) throw err;
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
