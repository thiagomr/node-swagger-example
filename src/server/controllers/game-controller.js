const logger = require('../../lib/logger');
const Game = require('../../models/game');

class GameController {
    async get(req, res) {
        try {
            const games = await Game.find();
            return res.status(200).send(games);
        } catch (e) {
            logger.error(e);
            return res.status(500).send('error');
        }
    }

    async getById(req, res) {
        try {

            console.log(req.params.id);
            const game = await Game.findOne({_id: req.params.id});
            return res.status(200).send(game);
        } catch (e) {
            logger.error(e);
            return res.status(500).send('error');
        }
    }

    async insert(req, res) {
        try {
            const game = await Game.create({
                title: req.body.title,
                description: req.body.description,
                created_at: new Date(),
                updated_at: new Date()
            });

            return res.status(200).send(game);
        } catch (e) {
            logger.error(e);
            return res.status(500).send('error');
        }
    }

    async update(req, res) {
        try {
            const updated = await Game.findOneAndUpdate({_id: req.params.id}, {
                '$set': {
                    title: req.body.title,
                    description: req.body.description,
                    updated_at: new Date()
                }
            }, {
                new: true
            });

            return res.status(200).send(updated);
        } catch (e) {
            logger.error(e);
            return res.status(500).send('error');
        }
    }

    async delete(req, res) {
        try {
            const deleted = await Game.deleteOne({_id: req.params.id});

            if (!deleted.n) {
                return res.status(400).send({
                    _id: req.params.id,
                    message: 'game not found'
                });
            }

            return res.status(200).send('game deleted');
        } catch (e) {
            logger.error(e);
            return res.status(500).send('error');
        }
    }
}

module.exports = new GameController();
