import mongoose, { Schema, Document } from 'mongoose';

export interface ICareerRole extends Document {
  title: string;
  category: string;
  description: string;
  requiredSkills: string[];
  recommendedSubjects: string[];
  commonInterviewTopics: string[];
  averagePlacementReadinessWeight: {
    dsa: number;
    development: number;
    csFundamentals: number;
    projects: number;
    resume: number;
    communication: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CareerRoleSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    requiredSkills: [{ type: String }],
    recommendedSubjects: [{ type: String }],
    commonInterviewTopics: [{ type: String }],
    averagePlacementReadinessWeight: {
      dsa: { type: Number, default: 0.3 },
      development: { type: Number, default: 0.25 },
      csFundamentals: { type: Number, default: 0.15 },
      projects: { type: Number, default: 0.15 },
      resume: { type: Number, default: 0.08 },
      communication: { type: Number, default: 0.07 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.CareerRole || mongoose.model<ICareerRole>('CareerRole', CareerRoleSchema);
