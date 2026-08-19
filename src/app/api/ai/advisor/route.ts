import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db/dbConnect';

export const dynamic = 'force-dynamic';

import User from '@/lib/db/models/User';
import StudentProfile from '@/lib/db/models/StudentProfile';
import Goal from '@/lib/db/models/Goal';
import Subject from '@/lib/db/models/Subject';
import Skill from '@/lib/db/models/Skill';
import { buildStudentContext } from '@/lib/services/contextBuilder';
import { aiProvider } from '@/lib/services/aiProvider';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { question } = await req.json();

    const user = await User.findOne({});
    if (!user) {
      return NextResponse.json({ success: false, error: 'User profile missing' }, { status: 400 });
    }

    const profile = await StudentProfile.findOne({ userId: user._id });
    const goals = await Goal.find({ userId: user._id });
    const subjects = await Subject.find({ userId: user._id });
    const skills = await Skill.find({ userId: user._id });

    const studentContext = buildStudentContext(profile, goals, subjects, skills);
    const adviceResult = await aiProvider.getDailyAdvice(studentContext);

    return NextResponse.json({
      success: true,
      question,
      context: studentContext,
      advice: adviceResult.data,
      providerUsed: adviceResult.providerUsed,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
