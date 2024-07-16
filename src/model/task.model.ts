import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true, maxlength: 250 },
  description: { type: String, required: true, maxlength: 450 },
  username: { type: String, required: true, maxLength: 50 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  completedAt: { type: Date },
});

export const Task = model('Task', taskSchema);
