'use strict';

const service = require('../services/rabbitmq-service');

exports.post = async (req, res, next) => 
{
    try 
    {
        let initialMessage = JSON.stringify(req.body);
        let resp = await service.sendMessage(initialMessage);

        res.status(200).send({
            message: resp
        });
    } 
    catch (e) 
    {
        console.log(e);
        res.status(500).send({
            message: 'Falha no cadastro do pedido'
        });
    }
}