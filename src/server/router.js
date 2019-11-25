const mainController = require('./controllers/main-controller');
const gameController = require('./controllers/game-controller');

class Router {
    constructor(app) {
        app.get('/ping', mainController.ping);

        app.get('/v1/game', gameController.get);

        app.get('/v1/game/:id', gameController.getById);

        app.post('/v1/game', gameController.insert);

        app.put('/v1/game/:id', gameController.update);

        app.delete('/v1/game/:id', gameController.delete)
    }
}

module.exports = Router;
