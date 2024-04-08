import { Router, Request, Response } from 'express';

import {
  DocumentData
} from "firebase/firestore";

const {
  initializeApp,
} = require("firebase-admin/app");

const {
  credential,
} = require("firebase-admin");

const {
  getFirestore,
} = require("firebase-admin/firestore");

const serviceAccountFile = require('../../serviceAccountFile.json')

const router = Router();

initializeApp({
  credential: credential.cert(serviceAccountFile),
  databaseURL: 'https://sheduboard-default-rtdb.firebaseio.com'
});

const endPoint = '/';

const db = getFirestore();

type User = {
  name: string;
  age: number;
  id: number;
}

router
  .route(endPoint)
  .get(async (req: Request, res: Response) => {
    // ここにコレクション等の取得を書く
    const messages = [] as User[]
    try {
      const querySnapshot = await db.collection('users').get();
      querySnapshot.forEach((doc: DocumentData) => {
        messages.push({
          ...doc.data()
        })
      });
    } catch (error) {
      throw new Error;
    }
    res.json({
      message: 'call by the GET method',
      messages
    });
  })
  .post(async (req: Request, res: Response) => {
    try {
      const { name, id, age } = req.body
      console.log("req.body++++++++++", req.body)
      const createdAt = new Date().toISOString() as string;

      const docRef = await db.collection('users').add({
        name, id, age, createdAt
      })
      const docSnapShot = await docRef.get()

      const createMessage = {
        id: docSnapShot.id,
        ...docSnapShot.data()
      }
      res.json({
        message: 'call by the POST method',
        data: createMessage
      });
    } catch (error) {
      throw new Error;
    }
  });

router
  .route(`${endPoint}:id`)
  .put(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age } = req.body
    const newData = {
      name, age
    }

    console.log("asdf+++++", newData, id)
    try {

      await db.collection('users').doc(id).update({ name, age, id: 5 })
      res.json({
        message: 'call by the PUT method ID:' + req.params.id,
      });
    } catch (error) {
      throw new Error;
    }
  })
  .delete(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await db.collection('users').doc(id).delete();
      res.json({
        message: 'call by the DELETE method ID:' + req.params.id,
      });
    } catch (error) {
      throw new Error;
    }
  });

module.exports = router;
