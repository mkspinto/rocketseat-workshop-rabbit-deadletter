'user strict'

var amqp = require('amqplib/callback_api');
const config = require('../../config');

exports.sendMessage = async (_message) =>
{
    amqp.connect(config.rabbirMQConnectionString, (err, conn) =>
    {
        conn.createChannel((err, ch) =>
        {
            //Configurations
            let queueOptions = { 
                durable: false,
                arguments : {
                    "x-dead-letter-exchange": config.rabbitMQDeadLetterExchange,
                    "x-dead-letter-routing-key": config.rabbitMQDeadLetterRoutingKey
                }
            };

            ch.assertExchange(config.rabbitMQExchange, 'direct', { durable: false });
            ch.assertQueue(config.rabbirMQQueue, queueOptions, (error, success) =>
            {
                if (success)
                {
                    ch.bindQueue(config.rabbirMQQueue, config.rabbitMQExchange, config.rabbitMQRoutingKey);
                }

                //Publica a mensagem no exchange
                let jsonMessage = JSON.stringify(_message);
                ch.publish(config.rabbitMQExchange, config.rabbitMQRoutingKey, new Buffer(jsonMessage), { persistent: true });
                return "OK";
            });
        });

        //Fecha a conexão
        setTimeout(() => 
        { 
            conn.close(); 
        }, 500);
    });

    return "message recived";
}