import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../users/schemas/user.schema";

export interface PhishingAttemptDocument extends PhishingAttempt, Document {
  createdAt: Date;
  updatedAt: Date;
  toObject(): PhishingAttempt & { id: string };
}

export enum PhishingStatus {
  SENT = "SENT",
  CLICKED = "CLICKED",
}

@Schema({
  timestamps: true,
  toJSON: {
    transform: (_, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    },
    virtuals: true,
  },
})
export class PhishingAttempt {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  createdBy: User;

  @Prop({ required: true })
  targetEmail: string;

  @Prop({ required: true })
  subject: string;

  @Prop({
    type: String,
    enum: PhishingStatus,
    default: PhishingStatus.SENT,
  })
  status: PhishingStatus;

  @Prop()
  sentAt?: Date;

  @Prop()
  errorMessage?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const PhishingAttemptSchema =
  SchemaFactory.createForClass(PhishingAttempt);

PhishingAttemptSchema.set("toObject", {
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
  virtuals: true,
});
