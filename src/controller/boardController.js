const {boardService} = require("../service");


const boardController = {

    async getBoardAll(req, res, next){
        try {
            const boardAll = await boardService.getBoardAll();
            res.json(boardAll);

        } catch (error) {
            next(error);
        }
    }

};

module.exports = boardController;
