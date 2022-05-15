import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';

/**
 * Defines the pipe for MongoDB ObjectId validation and transformation
 */
@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, ObjectId> {
  /**
   * Validates and transforms a value to a MongoDB ObjectID
   *
   * @remarks
   * Throws a ArgumentException if the validation fails
   *
   * @param value - The value to validate and transform
   * @returns The MongoDB ObjectID
   */
  public transform(value: any): ObjectId {
    try {
      const transformedObjectId: ObjectId = new ObjectId(value);
      return transformedObjectId;
    } catch (error) {
      throw new HttpException(
        'Validation failed (ObjectId is expected',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
