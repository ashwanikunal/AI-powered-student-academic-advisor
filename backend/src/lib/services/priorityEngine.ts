export interface PriorityInput {
  goalRelevance: number; // 0 - 10
  daysUntilDeadline?: number; // Urgent if low
  currentWeakness: number; // 0 - 10 (10 = highest weakness)
  academicImportance: number; // 0 - 10 (Credits / Weightage)
  marketRelevance: number; // 0 - 10
}

export function calculatePriorityScore(input: PriorityInput): number {
  const {
    goalRelevance = 5,
    daysUntilDeadline,
    currentWeakness = 5,
    academicImportance = 5,
    marketRelevance = 5,
  } = input;

  // Calculate Urgency Score (0 - 10)
  let urgencyScore = 3;
  if (daysUntilDeadline !== undefined) {
    if (daysUntilDeadline <= 2) urgencyScore = 10;
    else if (daysUntilDeadline <= 7) urgencyScore = 8.5;
    else if (daysUntilDeadline <= 14) urgencyScore = 7;
    else if (daysUntilDeadline <= 30) urgencyScore = 5;
    else if (daysUntilDeadline <= 60) urgencyScore = 3;
    else urgencyScore = 1.5;
  }

  // Weightings:
  // Goal Relevance: 30%
  // Urgency: 30%
  // Weakness: 20%
  // Academic Importance: 10%
  // Market Relevance: 10%
  const score =
    goalRelevance * 0.3 +
    urgencyScore * 0.3 +
    currentWeakness * 0.2 +
    academicImportance * 0.1 +
    marketRelevance * 0.1;

  // Scale to 0 - 100 integer
  return Math.round(score * 10);
}

export function generateRecommendationReason(input: {
  itemName: string;
  category: string;
  daysUntilDeadline?: number;
  goalTitle?: string;
  weaknessScore?: number;
}): string {
  const { itemName, category, daysUntilDeadline, goalTitle, weaknessScore } = input;
  const reasons: string[] = [];

  if (daysUntilDeadline !== undefined && daysUntilDeadline <= 7) {
    reasons.push(`your ${category} assessment is only ${daysUntilDeadline} day(s) away`);
  }

  if (goalTitle) {
    reasons.push(`it directly advances your target goal of "${goalTitle}"`);
  }

  if (weaknessScore && weaknessScore >= 6) {
    reasons.push(`your current proficiency level indicates a growth opportunity in ${itemName}`);
  }

  if (reasons.length === 0) {
    reasons.push(`it optimizes your daily progress towards your primary milestones`);
  }

  return `${itemName} is prioritized because ${reasons.join(', and ')}.`;
}
