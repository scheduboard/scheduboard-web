const functions = require('firebase-functions');
const express = require('express');
const app = express();

const router = require('./router/index');
app.use('/', router);

// import { onRequest } from 'firebase-functions/v2/https';
// import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info('Hello logs!', { structuredData: true });
//   response.send('Hello from Firebase!');
// });

exports.api = functions.region('asia-northeast1').https.onRequest(app);
