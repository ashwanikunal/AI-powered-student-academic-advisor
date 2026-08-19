import { TimelineMetrics } from './timelineEngine';

export interface PlanCategoryRatio {
  academics: number; // percentage
  placement: number;
  skills: number;
  projects: number;
}

export function calculateCategoryRatios(metrics: TimelineMetrics, primaryGoalType: string): PlanCategoryRatio {
  // If exam is within 14 days, enter Exam Mode (Academics heavy)
  if (metrics.isExamSeason) {
    return {
      academics: 65,
      placement: 15,
      skills: 10,
      projects: 10,
    };
  }

  // Goal-driven default distributions
  switch (primaryGoalType) {
    case 'Placement / Job':
    case 'Internship':
      return {
        academics: 25,
        placement: 45,
        skills: 15,
        projects: 15,
      };
    case 'Academic Excellence':
      return {
        academics: 60,
        placement: 10,
        skills: 15,
        projects: 15,
      };
    case 'Higher Studies':
    case 'Research':
    case 'Competitive / Entrance Exam':
      return {
        academics: 50,
        placement: 10,
        skills: 20,
        projects: 20,
      };
    default:
      return {
        academics: 35,
        placement: 25,
        skills: 20,
        projects: 20,
      };
  }
}

export interface RecommendedTask {
  title: string;
  category: 'academic' | 'placement' | 'skill' | 'project' | 'general';
  estimatedMinutes: number;
  priorityScore: number;
  recommendationReason: string;
}

export function generateDailyActionPlan(input: {
  ratios: PlanCategoryRatio;
  availableMinutes: number;
  subjects: { name: string; priorityScore: number; upcomingExamDate?: Date | string }[];
  skills: { name: string; gap: number }[];
  targetRole?: string;
}): RecommendedTask[] {
  const { ratios, availableMinutes, subjects, skills, targetRole } = input;
  const tasks: RecommendedTask[] = [];

  // Sort subjects by priority
  const sortedSubjects = [...subjects].sort((a, b) => b.priorityScore - a.priorityScore);
  // Sort skills by gap size
  const sortedSkills = [...skills].sort((a, b) => b.gap - a.gap);

  const academicMinutes = Math.round((availableMinutes * ratios.academics) / 100);
  const placementMinutes = Math.round((availableMinutes * ratios.placement) / 100);
  const skillMinutes = Math.round((availableMinutes * ratios.skills) / 100);
  const projectMinutes = Math.round((availableMinutes * ratios.projects) / 100);

  // 1. Academic Task
  if (sortedSubjects.length > 0 && academicMinutes >= 30) {
    const topSub = sortedSubjects[0];
    tasks.push({
      title: `${topSub.name} — Exam Revision & Problem Solving`,
      category: 'academic',
      estimatedMinutes: Math.min(academicMinutes, 60),
      priorityScore: topSub.priorityScore,
      recommendationReason: `${topSub.name} is your highest priority academic module with score ${topSub.priorityScore}/100.`,
    });
  }

  // 2. Placement / DSA Task
  if (placementMinutes >= 30) {
    tasks.push({
      title: `Data Structures & Algorithms — Patterns & Practice`,
      category: 'placement',
      estimatedMinutes: Math.min(placementMinutes, 60),
      priorityScore: 88,
      recommendationReason: `Target role "${targetRole || 'Software Engineer'}" emphasizes algorithmic problem-solving speed.`,
    });
  }

  // 3. Skill Task
  if (sortedSkills.length > 0 && skillMinutes >= 20) {
    const topSkill = sortedSkills[0];
    tasks.push({
      title: `${topSkill.name} — Hands-on Practice`,
      category: 'skill',
      estimatedMinutes: Math.min(skillMinutes, 45),
      priorityScore: 75,
      recommendationReason: `${topSkill.name} has a current proficiency gap of ${topSkill.gap}/10 relative to market expectations.`,
    });
  }

  // 4. Project Task
  if (projectMinutes >= 20) {
    tasks.push({
      title: `Portfolio Project — Feature Implementation & Refactoring`,
      category: 'project',
      estimatedMinutes: Math.min(projectMinutes, 45),
      priorityScore: 70,
      recommendationReason: `Adding production features to your portfolio project strengthens resume alignment.`,
    });
  }

  return tasks;
}

export function rebalanceScheduleAfterMissed(input: {
  missedTaskCount: number;
  remainingDays: number;
  dailyCapacityMinutes: number;
}): { adjustedDailyMinutes: number; advice: string } {
  const { missedTaskCount, remainingDays, dailyCapacityMinutes } = input;
  // Increase daily commitment slightly (max 20% cap) to avoid student burnout
  const extraMinutes = Math.min(missedTaskCount * 15, dailyCapacityMinutes * 0.2);
  const adjustedDailyMinutes = Math.round(dailyCapacityMinutes + extraMinutes);

  return {
    adjustedDailyMinutes,
    advice: `Schedule rebalanced cleanly. Added +${Math.round(extraMinutes)} mins/day over ${remainingDays} days to catch up smoothly without overload.`,
  };
}
