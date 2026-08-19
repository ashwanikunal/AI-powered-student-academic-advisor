import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  userId: mongoose.Types.ObjectId;
  country: string;
  location: string;
  degreeProgram: string; // B.Tech, M.Tech, BCA, MCA, BBA, MBA, B.Sc, M.Sc, MBBS, BDS, B.Pharm, LLB, PhD, Custom
  specialization: string;
  institution: string;
  programDurationYears: number;
  academicStructureType: 'semesters' | 'years' | 'trimesters' | 'clinical_phases' | 'custom';
  totalTerms: number;
  currentYear: number;
  currentTerm: number;
  expectedCompletionDate: Date;
  currentCGPA: number;
  availableHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  weeklyHolidays: string[];
  interests: string[];
  targetRoles: string[];
  targetCompanies: string[];
  placementSeasonDate?: Date;
  placementReadinessScore: number;
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentProfileSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    country: { type: String, default: 'India' },
    location: { type: String, default: '' },
    degreeProgram: { type: String, required: true },
    specialization: { type: String, default: '' },
    institution: { type: String, default: '' },
    programDurationYears: { type: Number, default: 4 },
    academicStructureType: {
      type: String,
      enum: ['semesters', 'years', 'trimesters', 'clinical_phases', 'custom'],
      default: 'semesters',
    },
    totalTerms: { type: Number, default: 8 },
    currentYear: { type: Number, default: 3 },
    currentTerm: { type: Number, default: 5 },
    expectedCompletionDate: { type: Date },
    currentCGPA: { type: Number, default: 0 },
    availableHoursPerDay: { type: Number, default: 4 },
    preferredStudyTime: { type: String, enum: ['morning', 'afternoon', 'evening', 'night'], default: 'evening' },
    weeklyHolidays: { type: [String], default: ['Sunday'] },
    interests: { type: [String], default: [] },
    targetRoles: { type: [String], default: [] },
    targetCompanies: { type: [String], default: [] },
    placementSeasonDate: { type: Date },
    placementReadinessScore: { type: Number, default: 50 },
    isOnboarded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.StudentProfile || mongoose.model<IStudentProfile>('StudentProfile', StudentProfileSchema);
