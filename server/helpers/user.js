import { db } from "../db/connection.js";
import collections from "../db/collections.js";
import bcrypt from 'bcrypt'
import { ObjectId } from "mongodb";

export default {
    signup: ({ email, pass, manual, pending }) => {
        return new Promise(async (resolve, reject) => {

            let done = null

            try {

                pass = await bcrypt.hash(pass, 10)

                await db.collection(collections.USER).createIndex({ email: 1 }, { unique: true })

                done = await db.collection(collections.USER).insertOne({
                    email: email,
                    pass: pass,
                    manual: manual,
                    pending: pending
                })
            } catch (err) {
                if (err?.code === 11000) {
                    done = await db.collection(collections.USER).findOneAndUpdate({
                        email: email,
                        pending: true
                    }, {
                        $set: {
                            pass: pass,
                            manual: manual
                        }
                    }).catch((err) => {
                        reject(err)
                    })
                } else {
                    reject(err)
                }
            } finally {
                if (done?.value) {
                    resolve({ _id: done?.value?._id.toString(), manual })
                } else if (done?.insertedId) {
                    resolve({ _id: done?.insertedId?.toString(), manual })
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
    },
    login: ({ email, pass }) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.collection(collections.USER).findOne({ email: email, pending: false })

            if (user) {
                let check
                try {
                    check = await bcrypt.compare(pass, user.pass)
                } catch (err) {
                    reject(err)
                } finally {
                    if (check) {
                        user.pass = null
                        resolve(user)
                    } else {
                        reject({
                            status: 422
                        })
                    }
                }
            } else {
                reject({
                    status: 422
                })
            }
        })
    }
}