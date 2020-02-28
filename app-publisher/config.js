module.exports = {
    //Rabbit
    rabbirMQConnectionString: "amqp://localhost:5672",

    //Queue
    rabbirMQQueue: "message.queue",
    rabbitMQExchange: "message.exchange",
    rabbitMQRoutingKey: "message",

    //Dead Letter
    rabbitMQDeadLetterExchange: "message-dead-letter.exchange",
    rabbitMQDeadLetterRoutingKey: "message-dead-letter"
}