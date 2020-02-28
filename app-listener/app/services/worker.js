var amqp = require('amqplib/callback_api');
var config = require('../../config');

amqp.connect(config.rabbitMQConnectionString, function (err, conn) 
{
    conn.createChannel(function (err, ch) 
    {
        //Dead Letter Exchange
        let queueDeadLetterOptions = { 
            durable: true,
            arguments : {
                "x-dead-letter-exchange": "message.exchange",
                "x-dead-letter-routing-key": "message",
                "x-queue-type": "classic",
                "x-message-ttl": 15000
            }
        };

        ch.assertExchange(config.rabbitMQDeadLetterExchange, 'direct', { durable: false });
        ch.assertQueue(config.rabbitMQDeadLetterQueue, queueDeadLetterOptions, (error, success) => 
        {
            if (success)
            {
                ch.bindQueue(config.rabbitMQDeadLetterQueue, config.rabbitMQDeadLetterExchange, config.rabbitMQDeadLetterRoutingKey)
            }
        });

        let queueOptions = {
            durable: false,
            arguments : {
                "x-dead-letter-exchange": config.rabbitMQDeadLetterExchange,
                "x-dead-letter-routing-key": config.rabbitMQDeadLetterRoutingKey
            }
        };

        ch.assertQueue(config.rabbitMQQueue, queueOptions);
        ch.prefetch(1);
        ch.consume(config.rabbitMQQueue, function (msg)
        {
            if (!msg.properties.headers["x-death"])
            {
                console.log("[listener][0] try process message...");
                ch.nack(msg, false, false);
            }
            else
            {
                let counter = msg.properties.headers["x-death"][0].count;
                console.log("[listener]["+counter+"] try process message...");

                if (counter == 4)
                {
                    console.log("[listener] retry limit reached...");
                    ch.ack(msg);
                }
                else
                {
                    ch.nack(msg, false, false);
                }
            }
        });
    });
});