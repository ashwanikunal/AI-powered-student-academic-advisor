export interface TimelineMetrics {
  daysUntilTarget: number;
  daysUntilExam?: number;
  daysUntilGraduation?: number;
  daysUntilPlacement?: number;
  availableHoursPerDay: number;
  weeklyCapacityHours: number;
  isExamSeason: boolean;
}

export function calculateTimelineMetrics(input: {
  targetDate?: Date | string;
  upcomingExamDate?: Date | string;
  expectedCompletionDate?: Date | string;
  placementSeasonDate?: Date | string;
  availableHoursPerDay?: number;
}): TimelineMetrics {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const getDays = (dateInput?: Date | string): number | undefined => {
    if (!dateInput) return undefined;
    const d = new Date(dateInput);
    d.setHours(0, 0, 0, 0);
    const diffTime = d.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  const daysUntilTarget = getDays(input.targetDate) ?? 90;
  const daysUntilExam = getDays(input.upcomingExamDate);
  const daysUntilGraduation = getDays(input.expectedCompletionDate);
  const daysUntilPlacement = getDays(input.placementSeasonDate);

  const hoursPerDay = input.availableHoursPerDay ?? 4;
  const weeklyCapacityHours = hoursPerDay * 7;

  // Exam season defined as upcoming exam within 14 days
  const isExamSeason = daysUntilExam !== undefined && daysUntilExam <= 14;

  return {
    daysUntilTarget,
    daysUntilExam,
    daysUntilGraduation,
    daysUntilPlacement,
    availableHoursPerDay: hoursPerDay,
    weeklyCapacityHours,
    isExamSeason,
  };
}
