import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  code?: string;
  termNumber: number; // Semester / Year / Phase number
  credits: number;
  currentGradeMarks?: number;
  targetGradeMarks?: number;
  attendancePercentage?: number;
  upcomingExamDate?: Date;
  upcomingExamType?: 'midterm' | 'final' | 'quiz' | 'viva' | 'assignment';
  perceivedDifficulty: 'low' | 'medium' | 'high';
  calculatedPriorityScore: number; // Deterministically computed priority (0 - 100)
  createdAt: Date;
  updatedAt: Date;
}

const SubjectSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    code: { type: String, default: '' },
    termNumber: { type: Number, required: true, default: 1 },
    credits: { type: Number, default: 3 },
    currentGradeMarks: { type: Number, default: 70 },
    targetGradeMarks: { type: Number, default: 90 },
    attendancePercentage: { type: Number, default: 85 },
    upcomingExamDate: { type: Date },
    upcomingExamType: {
      type: String,
      enum: ['midterm', 'final', 'quiz', 'viva', 'assignment'],
      default: 'final',
    },
    perceivedDifficulty: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    calculatedPriorityScore: { type: Number, default: 50 },
  },
  { timestamps: true }
);

export default mongoose.models.Subject || mongoose.model<ISubject>('Subject', SubjectSchema);
