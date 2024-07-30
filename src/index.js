import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import amqp from 'amqplib';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import AWS from 'aws-sdk';

// AWS region and Lambda function configuration
const region = "us-east-2";
const lambdaFunctionName = "fetchSecretsFunction_gr8";

// Function to invoke Lambda and fetch secrets
async function getSecretFromLambda() {
  const lambda = new AWS.Lambda({ region: region });
  const params = {
    FunctionName: lambdaFunctionName,
  };

  try {
    const response = await lambda.invoke(params).promise();
    const payload = JSON.parse(response.Payload);
    if (payload.errorMessage) {
      throw new Error(payload.errorMessage);
    }
    const body = JSON.parse(payload.body);
    return JSON.parse(body.secret);
  } catch (error) {
    console.error('Error invoking Lambda function:', error);
    throw error;
  }
}

// Function to start the service
async function startService() {
  let secrets;
  try {
    secrets = await getSecretFromLambda();
  } catch (error) {
    console.error(`Error starting service: ${error}`);
    return;
  }

  AWS.config.update({
    region: region,
    accessKeyId: secrets.AWS_ACCESS_KEY_ID,
    secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY,
  });

  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const app = express();
  const port = 8084;

  app.use(cors());
  app.use(express.json());

  // Swagger setup
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Update User Service API',
        version: '1.0.0',
        description: 'API for updating users'
      }
    },
    apis: ['./src/index.js']
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // RabbitMQ setup
  let channel;
  async function connectRabbitMQ() {
    try {
      const connection = await amqp.connect('amqp://3.136.72.14:5672/');
      channel = await connection.createChannel();
      await channel.assertQueue('user-events', { durable: true });
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  // Publish event to RabbitMQ
  const publishEvent = async (eventType, data) => {
    const event = { eventType, data };
    try {
      if (channel) {
        channel.sendToQueue('user-events', Buffer.from(JSON.stringify(event)), { persistent: true });
        console.log('Event published to RabbitMQ:', event);
      } else {
        console.error('Channel is not initialized');
      }
    } catch (error) {
      console.error('Error publishing event to RabbitMQ:', error);
    }
  };

  await connectRabbitMQ();

  app.put('/users/:username', async (req, res) => {
    const { username } = req.params;
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = {
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword
    };

    const params = {
      TableName: 'Users_gr8',
      Key: { username },
      UpdateExpression: 'set firstName = :fn, lastName = :ln, email = :em, #pw = :pw',
      ExpressionAttributeValues: {
        ':fn': firstName,
        ':ln': lastName,
        ':em': email,
        ':pw': hashedPassword
      },
      ExpressionAttributeNames: {
        '#pw': 'password'
      },
      ReturnValues: 'UPDATED_NEW'
    };

    try {
      const result = await dynamoDB.update(params).promise();
      publishEvent('UserUpdated', updatedUser);
      res.send({ message: 'User updated', result });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send({ message: 'Error updating user', error });
    }
  });

  app.get('/', (req, res) => {
    res.send('Update User Service Running');
  });

  app.listen(port, () => {
    console.log(`Update User service listening at http://localhost:${port}`);
  });
}

startService();
