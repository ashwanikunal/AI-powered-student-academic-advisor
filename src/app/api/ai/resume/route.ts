import { NextResponse } from 'next/server';
import { aiProvider } from '@/lib/services/aiProvider';

export const dynamic = 'force-dynamic';


export async function POST(req: Request) {
  try {
    const { resumeText, targetRole } = await req.json();
    const result = await aiProvider.analyzeResume(
      resumeText || 'Fullstack React developer with project experience in MongoDB.',
      targetRole || 'Software Engineer'
    );
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
