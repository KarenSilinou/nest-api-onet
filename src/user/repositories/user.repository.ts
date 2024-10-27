import { MongoDatabase } from "@nest-api-onet/database";
import { InsertOneResult, Document, ObjectId, UpdateResult } from "mongodb";
import { CreateUserDto } from "../dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    private database: MongoDatabase;

    constructor() {
        this.database = MongoDatabase.getInstance();
    }

    async createUser(user: CreateUserDto): Promise<InsertOneResult<Document>> {
        return (await this.collection()).insertOne(user);
      }    
    
      private async collection() {
        return (await this.database.getDatabase()).collection('users');
      }
}