import { connect } from "mongoose";

export class MongoDb {
    private static instance:typeof import("mongoose");
    public static init(url:string, dbName:string) {
        if(MongoDb.instance == null) {
            connect(url, {
                dbName
            }).then(db => MongoDb.instance = db)
            .catch((error) => {
                console.log("connection failed! ", error);
            });
        }
    }
    public get db() {
        return MongoDb.instance;
    }
}