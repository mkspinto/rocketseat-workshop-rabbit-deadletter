module.exports = {
    //Rabbit
    rabbirMQConnectionString: "amqp://localhost:5672",

    //Queue
    rabbirMQQueue: "rocketseat-sample.queue",
    rabbitMQExchange: "rocketseat-sample.exchange",
    rabbitMQRoutingKey: "rocketseat-sample",

    //Dead Letter
    rabbitMQDeadLetterExchange: "rocketseat-sample-dead-letter.exchange",
    rabbitMQDeadLetterRoutingKey: "rocketseat-sample-dead-letter"
}