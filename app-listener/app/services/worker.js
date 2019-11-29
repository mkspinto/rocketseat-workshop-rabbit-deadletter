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
                "x-dead-letter-exchange": "rocketseat-sample.exchange",
                "x-dead-letter-routing-key": "rocketseat-sample",
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
            try 
            {
                let content = JSON.parse(msg.content.toString());
                console.log("[worker]["+JSON.parse(content).name+"] new message revieved");                
            } 
            catch (error) 
            {
                console.log("[worker][invalid message] new message revieved");       
            }


            if (!msg.properties.headers["x-death"])
            {
                console.log("[worker][0] message processed");
                ch.nack(msg, false, false);
            }
            else
            {
                let counter = msg.properties.headers["x-death"][0].count;
                console.log("[worker]["+counter+"] message processed");

                if (counter == 5)
                {
                    console.log("[worker][5] message ignored");
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