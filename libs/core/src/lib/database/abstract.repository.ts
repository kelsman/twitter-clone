import {AbstractDocument} from "./abstract.schema";
import {Logger, NotFoundException} from "@nestjs/common";
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';


export abstract  class AbstractRepository<TDocument extends AbstractDocument>{
  private readonly  logger = new Logger(AbstractRepository.name);


  constructor(
    protected readonly model: Model<TDocument>,
    private readonly  connection: Connection,
  ) {

  }


  async findOne(
    filterQuery: FilterQuery<TDocument>,
    projection?: string | any,
  ): Promise<TDocument> {
    const document = await this.model.findOne(filterQuery, projection, {lean:true});
    if(!document){
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }
    return document;
  }


  async findOneAndUpDate(
    filter: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument>{
     const document = await this.model.findOneAndUpdate(filter, update, {new: true, lean:true});
     if(!document){
       this.logger.warn('Document not found with filterQuery', filter);
       throw new NotFoundException('Document not found.');
     }
     return document;
  }

  async upsert(
    filterQuery: FilterQuery<TDocument>,
    document: Partial<TDocument>,
  ){
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async create(
    document: Omit<TDocument, '_id'>,
    options?: SaveOptions
  ){
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    })
    return (await createdDocument.save(options)).toJSON() as unknown as TDocument;
  }


  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async startTransaction(){
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }






}
