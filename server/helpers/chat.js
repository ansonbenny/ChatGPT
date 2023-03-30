import { db } from "../db/connection.js";
import collections from "../db/collections.js";
import { ObjectId } from "mongodb";

export default {
    newResponse: (prompt, response) => {
        return new Promise(async (resolve, reject) => {
            let res = await db.collection(collections.CHAT).insertOne({
                data: [{
                    user: {
                        content: prompt
                    },
                    assistant: {
                        content: response.openai?.['data']?.choices[0].message.content
                    }
                }]
            }).catch((err) => {
                reject(err)
            })

            resolve(res)
        })
    },
    updateChat: (_id, prompt, response) => {
        return new Promise(async (resolve, reject) => {
            let res = await db.collection(collections.CHAT).updateOne({
                _id: new ObjectId(_id)
            }, {
                $push: {
                    data: {
                        user: {
                            content: prompt
                        },
                        assistant: {
                            content: response.openai?.['data']?.choices[0].message.content
                        }
                    }
                }
            }).catch((err) => {
                reject(err)
            })

            resolve(res)
        })
    }
}