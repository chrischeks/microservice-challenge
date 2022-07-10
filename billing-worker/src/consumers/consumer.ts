import BillWorkerService from '@/services/billing-worker.service';
import amqp, { Message } from 'amqplib/callback_api';

const createMQConsumer = (amqpURl: string, queueName: string) => {
  console.log(' Connecting to RabbitMQ...');
  return () => {
    amqp.connect(amqpURl, (connectionError, connection) => {
      if (connectionError) {
        throw connectionError;
      }

      connection.createChannel((channelError, channel: amqp.Channel) => {
        if (channelError) {
          throw channelError;
        }

        console.log('Connected to RabbitMQ');
        channel.assertQueue(queueName, { durable: true });
        channel.consume(
          queueName,
          (msg: Message | null) => {
            if (msg) {
              const parsed = JSON.parse(msg.content.toString());

              new BillWorkerService().updateTransaction(parsed);
            }
          },
          { noAck: true },
        );
      });
    });
  };
};

export default createMQConsumer;
