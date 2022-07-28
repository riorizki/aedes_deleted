const port = 1883;
const wsPort = 8883;

const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const httpServer = require('http').createServer();
const ws = require('websocket-stream');
ws.createServer({ server: httpServer }, aedes.handle);

let count = 0;

server.listen(port, function () {
  console.log('Ades MQTT listening on port: ' + port);
});

// emitted when a client connects to the broker
aedes.on('client', function (client) {
  console.log(
    `[CLIENT_CONNECTED] Client ${
      client ? client.id : client
    } connected to broker ${aedes.id}`
  );
});

// emitted when a client disconnects from the broker
aedes.on('clientDisconnect', function (client) {
  console.log(
    `[CLIENT_DISCONNECTED] Client ${
      client ? client.id : client
    } disconnected from the broker ${aedes.id}`
  );
});

// emitted when a client subscribes to a message topic
aedes.on('subscribe', function (subscriptions, client) {
  console.log(
    `[TOPIC_SUBSCRIBED] Client ${
      client ? client.id : client
    } subscribed to topics: ${subscriptions
      .map((s) => s.topic)
      .join(',')} on broker ${aedes.id}`
  );
});

// emitted when a client unsubscribes from a message topic
aedes.on('unsubscribe', function (subscriptions, client) {
  console.log(
    `[TOPIC_UNSUBSCRIBED] Client ${
      client ? client.id : client
    } unsubscribed to topics: ${subscriptions.join(',')} from broker ${
      aedes.id
    }`
  );
});

// emitted when a client publishes a message packet on the topic
aedes.on('publish', async function (packet, client) {
  if (client) {
    let payload = packet.payload.toString();
    console.log(
      `[MESSAGE_PUBLISHED] Client ${
        client ? client.id : 'BROKER_' + aedes.id
      } has published message on ${packet.topic} to broker ${
        aedes.id
      } = ${payload}`
    );
    if (packet.topic === 'ini-dari-client') {
      count++;
      console.log('oke');

      aedes.publish({
        topic: 'arduino',
        payload: payload,
      });
    }
  }
});

httpServer.listen(wsPort, function () {
  console.log('Aedes MQTT-WS listening on port: ' + wsPort);
  aedes.publish({ topic: 'aedes/hello', payload: "I'm broker " + aedes.id });
});
