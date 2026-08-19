export interface PlacementReadinessComponents {
  dsaScore: number; // 0 - 100
  devScore: number; // 0 - 100
  csFundamentalsScore: number; // 0 - 100
  projectsScore: number; // 0 - 100
  resumeScore: number; // 0 - 100
  communicationScore: number; // 0 - 100
}

export interface PlacementReadinessResult {
  overallScore: number; // 0 - 100
  breakdown: {
    category: string;
    score: number;
    weightPercentage: number;
    contribution: number;
    recommendation: string;
  }[];
  explanation: string;
}

export function calculatePlacementReadiness(components: PlacementReadinessComponents): PlacementReadinessResult {
  const weights = [
    { category: 'DSA & Problem Solving', key: 'dsaScore' as const, weight: 0.3, rec: 'Focus on Trees, Dynamic Programming, and Graph patterns.' },
    { category: 'Development & Tech Stack', key: 'devScore' as const, weight: 0.25, rec: 'Build and deploy full-stack applications with test suites.' },
    { category: 'CS Fundamentals (DBMS, OS, CN)', key: 'csFundamentalsScore' as const, weight: 0.15, rec: 'Review Normalization, Thread Sync, and TCP/IP handshakes.' },
    { category: 'Projects & System Design', key: 'projectsScore' as const, weight: 0.15, rec: 'Document project architecture and add live deployment links.' },
    { category: 'Resume & Impact Framing', key: 'resumeScore' as const, weight: 0.08, rec: 'Quantify impact with metrics (e.g. reduced load time by 30%).' },
    { category: 'Mock Interview & Communication', key: 'communicationScore' as const, weight: 0.07, rec: 'Practice speaking out loud using the STAR framework.' },
  ];

  let overallScore = 0;
  const breakdown = weights.map((w) => {
    const score = Math.min(Math.max(components[w.key] ?? 50, 0), 100);
    const contribution = score * w.weight;
    overallScore += contribution;
    return {
      category: w.category,
      score: Math.round(score),
      weightPercentage: Math.round(w.weight * 100),
      contribution: Math.round(contribution),
      recommendation: w.rec,
    };
  });

  const finalScore = Math.round(overallScore);

  return {
    overallScore: finalScore,
    breakdown,
    explanation: `Your overall Placement Readiness score is ${finalScore}/100 based on weighted technical, academic, and behavioral preparation metrics. (This represents your readiness index, not a job guarantee).`,
  };
}
