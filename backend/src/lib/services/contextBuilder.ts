export function buildStudentContext(profile: any, goals: any[], subjects: any[], skills: any[]) {
  const primaryGoal = goals.find((g) => g.priority === 'primary') || goals[0];

  return {
    degree: profile?.degreeProgram || 'Undergraduate Program',
    specialization: profile?.specialization || 'General',
    currentYear: profile?.currentYear || 3,
    currentTerm: profile?.currentTerm || 5,
    structureType: profile?.academicStructureType || 'semesters',
    primaryGoal: primaryGoal
      ? { title: primaryGoal.title, type: primaryGoal.type, targetDate: primaryGoal.targetDate }
      : null,
    cgpa: profile?.currentCGPA || 0,
    availableHoursPerDay: profile?.availableHoursPerDay || 4,
    topWeaknessSubjects: subjects
      .filter((s) => (s.currentGradeMarks || 100) < 75)
      .slice(0, 3)
      .map((s) => ({ name: s.name, currentGrade: s.currentGradeMarks })),
    topSkillGaps: skills
      .filter((s) => (s.skillGap || 0) > 3)
      .slice(0, 3)
      .map((s) => ({ name: s.name, gap: s.skillGap })),
  };
}

export function buildGoalContext(goal: any, relatedSubjects: any[], relatedSkills: any[]) {
  return {
    goalTitle: goal.title,
    goalType: goal.type,
    targetDate: goal.targetDate,
    priority: goal.priority,
    progressPercentage: goal.progressPercentage,
    milestones: goal.milestones || [],
    relatedSubjects: relatedSubjects.map((s) => s.name),
    relatedSkills: relatedSkills.map((s) => s.name),
  };
}
