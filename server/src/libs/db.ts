import { connect as MongoDBConnect } from "mongoose";

class Db {
  private url: string;
  private dbName: string;

  constructor(url: string, dbName:string) {
    this.url = url;
    this.dbName = dbName;
  }

  public async connect() {
    MongoDBConnect(this.url, {
      dbName: this.dbName,
    }).then((_) => {
      console.log("Connected to database.");
    });
  }
}

export default Db;