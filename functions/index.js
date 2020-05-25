const functions = require('firebase-functions');
const cors = require('cors')({ origin: true});
const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
  	databaseURL: 'ws://chatbot-rektta.firebaseio.com/'
});

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
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  
  function fileReportHandler(agent){
    const text = agent.parameters.name;
    const text1 = agent.parameters.city;
    const text2 = agent.parameters.college;
    const text3 = agent.parameters.year;
    const text4 = agent.parameters.branch;
    const text5 = agent.parameters.age;
    
    return admin.database().ref("data").child("123").push().set({
    	name: text,
      	city: text1,
      	college: text2,
      	year: text3,
      	branch: text4,
      	age: text5
    });
  }
  
  function readfromDBHandler(agent){
    return admin.database().ref('data').once('value').then((snapshot)=> {
    	const value = snapshot.child('name').val();
      	// eslint-disable-next-line promise/always-return
      	if(value !== null){
        	agent.add(`The value from database is ${value}`);
        }
    });
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('FileReport', fileReportHandler);
  intentMap.set('readfromDB', readfromDBHandler);
  agent.handleRequest(intentMap);
});

// Sending email code
/*
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

const pdf = require('html-pdf');


exports.savePdf = functions.https.onRequest(async (request, response) => {
  return cors(request, response, () => {

    pdf.create(html, options).toBuffer((err, res) => {
      console.log(res);
      const data = Buffer.from(res)
      const attachment = data.toString("base64");
      const msg = {
        to: "akash.mhatre@spit.ac.in",
        from: "dilihi6808@provlst.com",
        subject: "Case Report",
        text: "You have a new complaint",
        attachments: [
          {
            content: attachment,
            filename: "complaint.pdf",
            type: "application/pdf",
            disposition: "attachment"
          }
        ]
      }

      if (err) {
        console.log(err);
        return response.send("PDF creation error");
      }
      console.log("pdf created locally");
      return sgMail.send(msg);
      sgMail.send(msg).then(res => {
        response.statusCode = 200;
        console.log(res);
        response.json({ msg: "mail sent" });
      }).catch(err => {
        console.log(err.response.body);
        response.json({ err: "Error" });
      })

      // return admin.storage().bucket().upload(localPDFFile, { destination: user.name + '.pdf', metadata: { contentType: 'application/pdf' } })

      // return storage.bucket('gs://chatbot-rektta.appspot.com/')
    })
  });
});

*/