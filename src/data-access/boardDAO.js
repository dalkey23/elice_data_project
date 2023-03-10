const { Board } = require("./model")

const boardDAO = {  
    async findAll(){
        const boardAll = await Board.find({});
        return boardAll;
    }

};

module.exports = boardDAO;