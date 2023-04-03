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
                    details.password = await bcrypt.hash(details.password, 10)
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
    }
}