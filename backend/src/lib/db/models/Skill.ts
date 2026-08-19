import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  category: 'technical' | 'professional' | 'custom';
  currentLevel: number; // 0 - 10
  targetLevel: number; // 0 - 10
  skillGap: number; // calculated: targetLevel - currentLevel
  relevanceToGoals: number; // 0 - 10
  lastPracticedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    category: { type: String, enum: ['technical', 'professional', 'custom'], default: 'technical' },
    currentLevel: { type: Number, default: 3, min: 0, max: 10 },
    targetLevel: { type: Number, default: 8, min: 0, max: 10 },
    skillGap: { type: Number, default: 5 },
    relevanceToGoals: { type: Number, default: 8, min: 0, max: 10 },
    lastPracticedDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
