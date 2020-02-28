module.exports = {
    //Rabbit
    rabbitMQConnectionString: "amqp://localhost:5672",

    //Queue
    rabbitMQQueue: "message.queue",
    rabbitMQExchange: "message.exchange",
    rabbitMQRoutingKey: "message",

    //Dead Letter
    rabbitMQDeadLetterQueue: "message-dead-letter.queue",
    rabbitMQDeadLetterExchange: "message-dead-letter.exchange",
    rabbitMQDeadLetterRoutingKey: "message-dead-letter"
}