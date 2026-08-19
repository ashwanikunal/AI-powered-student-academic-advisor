import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  category: 'academic' | 'placement' | 'skill' | 'project' | 'general';
  goalId?: mongoose.Types.ObjectId;
  subjectId?: mongoose.Types.ObjectId;
  estimatedMinutes: number;
  priorityScore: number;
  recommendationReason: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['academic', 'placement', 'skill', 'project', 'general'],
      default: 'general',
    },
    goalId: { type: Schema.Types.ObjectId, ref: 'Goal' },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
    estimatedMinutes: { type: Number, default: 45 },
    priorityScore: { type: Number, default: 50 },
    recommendationReason: { type: String, default: '' },
    dueDate: { type: Date, required: true, index: true },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'skipped'],
      default: 'pending',
    },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
