const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options ={
    swaggerDefinition : {
        openapi : "3.0.3",
        info : {
            title : "파릇파릇",
            version : "1.0.0",
            description : "교통봉사 중개 서비스 파릇파릇 API"
        },
        servers : [
            {
                url : "http://localhost:3000",  //요청 url
            }
        ]
    },
    apis : ["src/**/**/*.js"] //Swagger 파일 연동
}

const specs = swaggerJsdoc(options)

module.exports = { swaggerUi, specs}