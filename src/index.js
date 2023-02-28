const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {PORT, FLIGHT_SERVICE_PATH} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const db = require('./models/index');

const setupAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/bookingservice/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);

        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }
        
    })
}

setupAndStartServer();