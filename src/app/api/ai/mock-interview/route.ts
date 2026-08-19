import { NextResponse } from 'next/server';
import { aiProvider } from '@/lib/services/aiProvider';

export const dynamic = 'force-dynamic';


export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();
    const result = await aiProvider.evaluateInterviewAnswer(
      question || 'Explain how indexing improves MongoDB query performance.',
      answer || 'Indexes create B-Tree structures so queries avoid scanning full collections.'
    );
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
