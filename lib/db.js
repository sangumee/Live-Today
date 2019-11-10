const mongoose = require('mongoose');
module.exports = () => {
    function connect() {
        const URL = process.env.URL;
        const user = process.env.user;
        const password = process.env.password;
        mongoose.connect(URL, {
            user: user,
            pass: password,
            dbName: 'LiveToday',
            useNewUrlParser: true
        }, function (err) {
            if (err) {
                console.error('mongodb connection error', err);
            }
            console.log('mongodb connected');
        });
    }
    connect();
    mongoose.connection.on('disconnected', connect);
    require('./user.js');
};