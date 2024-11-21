import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface UserDocument extends User, Document {
    toObject(): User;
}

@Schema({
    timestamps: true,
    toJSON: {
        transform: (_, ret) => {
            delete ret.password;
            return ret;
        },
    },
})
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toObject', {
    transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
    },
    virtuals: true,
});