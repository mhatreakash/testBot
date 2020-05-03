const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

// const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://chatbot-rektta.firebaseio.com"
// });

const { SessionsClient } = require('dialogflow');


exports.dialogflowGateway = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const { queryInput, sessionId } = request.body;


    const sessionClient = new SessionsClient({ credentials: serviceAccount  });
    const session = sessionClient.sessionPath('chatbot-rektta', sessionId);


    const responses = await sessionClient.detectIntent({ session, queryInput});

    const result = responses[0].queryResult;
    console.log(result);
    response.send(result);
  });
});

const { WebhookClient } = require('dialogflow-fulfillment');

exports.dialogflowWebhook = functions.https.onRequest(async (request, response) => {
    const agent = new WebhookClient({ request, response });

    const result = request.body.queryResult;

    async function fileReportHandler(agent) {

     // Do backend stuff here
    //  const db = admin.firestore();
     const profile = db.collection('users').doc('akash');

     const { name, city } = result.parameters;

      await profile.set({ name, city })
      agent.add(`Welcome aboard my friend!`);
    }


    let intentMap = new Map();
    // intentMap.set('Default Welcome Intent', welcome);
    // intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('FileReport', fileReportHandler);
    agent.handleRequest(intentMap);
});

