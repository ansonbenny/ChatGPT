import { db } from "../db/connection.js";
import collections from "../db/collections.js";
import bcrypt from 'bcrypt'
import { ObjectId } from "mongodb";

export default {
    signup: async (details) => {
        return new Promise(async (resolve, reject) => {
            let check = await db.collection(collections.USER).findOne({
                email: details.email
            }).catch((err) => {
                reject(err)
            })

            if (!check) {
                try {
                    details.pass = await bcrypt.hash(details.pass, 10)
                } catch (err) {
                    reject(err)
                } finally {
                    db.collection(collections.USER).insertOne(details)
                        .then((done) => {
                            resolve({ _id: done?.insertedId?.toString(), manual: details.manual })
                        }).catch((err) => {
                            reject(err)
                        })
                }
            } else {
                if (check?.pending) {
                    resolve({ _id: check?.['_id'], manual: check?.['manual'] })
                } else {
                    reject({ exists: true, text: 'Email already used' })
                }
            }
        })
    },
    checkPending: (_id) => {
        return new Promise((resolve, reject) => {
            db.collection(collections.USER).findOne({
                _id: new ObjectId(_id)
            }).then((data) => {
                if (data?.pending) {
                    data.pass = null
                    resolve(data)
                } else {
                    reject({ text: 'Already registered' })
                }
            }).catch((err) => {
                reject(err)
            })
        })
    },
    finishSignup: ({ fName, lName, _id }) => {
        return new Promise((resolve, reject) => {
            db.collection(collections.USER).updateOne({
                _id: new ObjectId(_id)
            }, {
                $set: {
                    fName: fName,
                    lName: lName,
                    pending: false
                }
            }).then((done) => {
                resolve(done)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}