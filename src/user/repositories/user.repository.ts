import { MongoDatabase } from "@nest-api-onet/database";
import { InsertOneResult, Document, ObjectId, UpdateResult } from "mongodb";
import { CreateUserDto } from "../dto";
import { Injectable } from "@nestjs/common";
import { User } from "../entities";

@Injectable()
export class UserRepository {
  private database: MongoDatabase;

  constructor() {
    this.database = MongoDatabase.getInstance();
  }

  async createUser(user: CreateUserDto): Promise<InsertOneResult<Document>> {
    return (await this.collection()).insertOne(user);
  }

  async getUsers(query?: QueryOptions): Promise<Document[]> {
    return (await this.collection()).find(query?.filter ?? {})
      .project(query?.projection ?? {})
      .sort(query?.sort ?? '_id', query?.way ?? -1)
      .skip(query?.offset ?? 0)
      .limit(query?.limit ?? 50)
      .toArray();
  }

  async getUserById(id: string) {
    return (await this.collection()).findOne({
      _id: new ObjectId(id),
    }) as unknown as User;
  }

  async updateUser(id: string, data: Document) {
    const _id = new ObjectId(id);

    return (await this.collection()).updateOne(
      { _id },
      { $set: { ...data, 'date.updated': new Date().valueOf() } },
    );
  }

  async deleteUser(id: string) {
    return (await this.collection()).deleteOne({ _id: new ObjectId(id) });
  }

  private async collection() {
    return (await this.database.getDatabase()).collection('users');
  }
}