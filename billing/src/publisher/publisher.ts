import amqp, { Connection } from 'amqplib/callback_api';

const createMQPublisher = (amqpUrl: string, queueName: string) => {
  console.log('Connecting to RabbitMQ...');
  let queueChannel: amqp.Channel;
  amqp.connect(amqpUrl, (errorConnect: Error, connection: Connection) => {
    if (errorConnect) {
      console.log('Error connecting to RabbitMQ: ', errorConnect);
      return;
    }

    connection.createChannel((channelError, channel: amqp.Channel) => {
      if (channelError) {
        console.log('Error creating channel: ', channelError);
        return;
      }

      queueChannel = channel;
      console.log('Connected to RabbitMQ');
    });
  });
  return (msg: string) => {
    console.log('Produce message to RabbitMQ...');
    queueChannel.sendToQueue(queueName, Buffer.from(msg));
  };
};

export default createMQPublisher;
