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
                _id: new ObjectId(_id),
                pending: true
            }).then((data) => {
                if (data?.pending) {
                    delete data.pass
                    resolve(data)
                } else if (data) {
                    reject({ status: 422, text: 'Already registered' })
                } else {
                    reject({ status: 404, text: 'Not Found' })
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
            }, [{
                $project: {
                    fName: fName,
                    lName: lName,
                    email: '$email',
                    pass: '$pass',
                    _id: '$_id'
                }
            }]).then((done) => {
                if (done?.modifiedCount > 0) {
                    resolve(done)
                } else {
                    reject({ text: "Something Wrong" })
                }
            }).catch((err) => {
                reject(err)
            })
        })
    },
    login: ({ email, pass, manual }) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.collection(collections.USER).findOne({ email: email, pending: { $exists: false } })
                .catch((err) => {
                    reject(err)
                })

            if (user) {
                if (manual === 'false') {
                    delete user.pass
                    resolve(user)
                } else {
                    let check
                    try {
                        check = await bcrypt.compare(pass, user.pass)
                    } catch (err) {
                        reject(err)
                    } finally {
                        if (check) {
                            delete user.pass
                            resolve(user)
                        } else {
                            reject({
                                status: 422
                            })
                        }
                    }
                }
            } else {
                reject({
                    status: 422
                })
            }
        })
    },
    forgotRequest: ({ email }, secret) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.collection(collections.USER).findOne({ email: email, pending: { $exists: false } })
                .catch((err) => reject(err))

            if (user) {
                let done = null

                try {
                    await db.collection(collections.TEMP)
                        .createIndex({ userId: 1 }, { unique: true })
                    await db.collection(collections.TEMP)
                        .createIndex({ expireAt: 1 }, { expireAfterSeconds: 3600 })
                    done = await db.collection(collections.TEMP).insertOne({
                        userId: user._id.toString(),
                        email: email,
                        secret: secret,
                        expireAt: new Date()
                    })
                } catch (err) {
                    if (err?.code === 11000) {
                        secret = await db.collection(collections.TEMP).findOne({
                            userId: user._id.toString()
                        }).catch((err) => {
                            reject(err)
                        })

                        if (secret) {
                            done = true
                        }

                    } else if (err?.code === 85) {
                        done = await db.collection(collections.TEMP).insertOne({
                            userId: user._id.toString(),
                            email: email,
                            secret: secret,
                            expireAt: new Date()
                        }).catch(async (err) => {
                            if (err?.code === 11000) {
                                secret = await db.collection(collections.TEMP).findOne({
                                    userId: user._id.toString()
                                }).catch((err) => {
                                    reject(err)
                                })

                                if (secret) {
                                    done = true
                                }
                            } else {
                                reject(err)
                            }
                        })
                    } else {
                        reject(err)
                    }
                } finally {
                    if (done) {
                        if (typeof secret === 'object') {
                            resolve({ secret: secret?.secret, _id: user?._id })
                        } else {
                            resolve({ secret, _id: user?._id })
                        }
                    }
                }
            } else {
                reject({ status: 422 })
            }
        })
    },
    resetPassword: ({ newPass, userId, secret }) => {
        return new Promise(async (resolve, reject) => {
            let checkSecret = db.collection(collections.TEMP).findOne({
                userId: userId,
                secret: secret
            }).catch((err) => {
                reject(err)
            })

            let done = null

            if (checkSecret) {
                try {
                    newPass = await bcrypt.hash(newPass, 10)
                    done = await db.collection(collections.USER).updateOne({
                        _id: new ObjectId(userId),
                        pending: { $exists: false }
                    }, {
                        $set: {
                            pass: newPass
                        }
                    })
                } catch (err) {
                    reject(err)
                } finally {
                    if (done?.modifiedCount > 0) {
                        let res = await db.collection(collections.TEMP).deleteOne({
                            userId: userId
                        }).catch((err) => {
                            reject(err)
                        })

                        resolve({ done, res })
                    } else {
                        reject({ text: "Something Wrong" })
                    }
                }
            } else {
                reject({ status: 404 })
            }
        })
    },
    checkForgot: ({ userId, secret }) => {
        return new Promise(async (resolve, reject) => {
            let check = await db.collection(collections.TEMP).findOne({
                userId: userId,
                secret: secret
            }).catch((err) => {
                reject(err)
            })

            if (check) {
                resolve(check)
            } else {
                reject({ status: 404 })
            }
        })
    },
    checkUserFound: ({ _id }) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.collection(collections.USER).findOne({ _id: new ObjectId(_id), pending: { $exists: false } })
                .catch((err) => {
                    console.log(err)
                    reject(err)
                })

            if (user) {
                resolve(user)
            } else {
                reject({ notExists: true, text: 'Not found' })
            }
        })
    }
}