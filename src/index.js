import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';
import { getContactsById } from './services/contacts.js';

const bootstrap = async () => {
  await initMongoConnection();
  startServer();

  const cont = await getContactsById('6655cea2739dbe553d68d9bd');
  console.log(cont);
};

bootstrap();
