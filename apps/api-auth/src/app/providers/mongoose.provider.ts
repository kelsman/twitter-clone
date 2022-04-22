import {
  GoogleUserEntity,
  GoogleUserSchema,
  UserDocument,
  UserEntity,
  UserSchema,
} from '@twitter-clone/Schemas';
import * as bcrypt from 'bcryptjs';

export const UserMongooseProvider = {
  name: UserEntity.name,
  useFactory: () => {
    const userSchema = UserSchema;
    userSchema.pre<UserDocument>('save', async function (next) {
      let user = this;
      if (!user.isModified('password')) return next();
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      console.log(user.password);
      next();
    });

    userSchema.pre<UserDocument>('validate', async function (next) {
      const user = this;
      // for debug purposes;
      console.log('pre -validate hook calling for ', user.username);
      next();
    });

    return userSchema;
  },
};

export const googleUserProvider = {
  name: GoogleUserEntity.name,
  useFactory: () => GoogleUserSchema,
};
