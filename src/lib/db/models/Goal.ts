import mongoose, { Schema, Document } from 'mongoose';

export type GoalType =
  | 'Academic Excellence'
  | 'Placement / Job'
  | 'Internship'
  | 'Higher Studies'
  | 'Research'
  | 'Competitive / Entrance Exam'
  | 'Study Abroad'
  | 'Professional Qualification'
  | 'Personal Skill Development'
  | 'Custom Goal';

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId;
  type: GoalType;
  title: string;
  description: string;
  priority: 'primary' | 'secondary' | 'optional';
  targetDate: Date;
  status: 'active' | 'completed' | 'paused';
  progressPercentage: number;
  milestones: {
    id: string;
    title: string;
    targetDate: Date;
    completed: boolean;
  }[];
  relatedSubjectIds: mongoose.Types.ObjectId[];
  relatedSkills: string[];
  requiredOutcomes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: {
      type: String,
      required: true,
      enum: [
        'Academic Excellence',
        'Placement / Job',
        'Internship',
        'Higher Studies',
        'Research',
        'Competitive / Entrance Exam',
        'Study Abroad',
        'Professional Qualification',
        'Personal Skill Development',
        'Custom Goal',
      ],
    },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    priority: { type: String, enum: ['primary', 'secondary', 'optional'], default: 'primary' },
    targetDate: { type: Date, required: true },
    status: { type: String, enum: ['active', 'completed', 'paused'], default: 'active' },
    progressPercentage: { type: Number, default: 0, min: 0, max: 100 },
    milestones: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        targetDate: { type: Date },
        completed: { type: Boolean, default: false },
      },
    ],
    relatedSubjectIds: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    relatedSkills: [{ type: String }],
    requiredOutcomes: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema);
