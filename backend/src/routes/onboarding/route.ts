import { FastifyPluginAsync } from 'fastify';
import dbConnect from '../../lib/db/dbConnect';
import User from '../../lib/db/models/User';
import StudentProfile from '../../lib/db/models/StudentProfile';
import Goal from '../../lib/db/models/Goal';
import Subject from '../../lib/db/models/Subject';
import Skill from '../../lib/db/models/Skill';
import Task from '../../lib/db/models/Task';
import { calculatePriorityScore } from '../../lib/services/priorityEngine';
import { calculateTimelineMetrics } from '../../lib/services/timelineEngine';
import { calculateCategoryRatios, generateDailyActionPlan } from '../../lib/services/adaptivePlanner';

export const onboardingRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/', async (request, reply) => {
    try {
      await dbConnect();
      const body = request.body as any;

      const {
        name,
        email,
        country,
        location,
        degreeProgram,
        specialization,
        institution,
        programDurationYears,
        academicStructureType,
        totalTerms,
        currentYear,
        currentTerm,
        expectedCompletionDate,
        goals,
        subjects,
        skills,
        targetRole,
        availableHoursPerDay,
        preferredStudyTime,
        interests,
        placementSeasonDate,
      } = body;

      // 1. Find or create user
      let user = await User.findOne({ email: email || 'student@vesper.ai' });
      if (!user) {
        user = await User.create({
          name: name || 'Student User',
          email: email || 'student@vesper.ai',
        });
      }

      // 2. Create or update StudentProfile
      let profile = await StudentProfile.findOne({ userId: user._id });
      const profileData = {
        userId: user._id,
        country: country || 'India',
        location: location || '',
        degreeProgram: degreeProgram || 'B.Tech',
        specialization: specialization || 'Computer Science & Engineering',
        institution: institution || 'Technology Institute',
        programDurationYears: Number(programDurationYears) || 4,
        academicStructureType: academicStructureType || 'semesters',
        totalTerms: Number(totalTerms) || 8,
        currentYear: Number(currentYear) || 3,
        currentTerm: Number(currentTerm) || 5,
        expectedCompletionDate: expectedCompletionDate ? new Date(expectedCompletionDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        availableHoursPerDay: Number(availableHoursPerDay) || 4,
        preferredStudyTime: preferredStudyTime || 'evening',
        interests: Array.isArray(interests) ? interests : ['Web Development', 'AI/ML'],
        targetRoles: targetRole ? [targetRole] : ['Software Engineer'],
        placementSeasonDate: placementSeasonDate ? new Date(placementSeasonDate) : undefined,
        placementReadinessScore: 68,
        isOnboarded: true,
      };

      if (profile) {
        Object.assign(profile, profileData);
        await profile.save();
      } else {
        profile = await StudentProfile.create(profileData);
      }

      // 3. Clear existing data for clean onboarding
      await Goal.deleteMany({ userId: user._id });
      await Subject.deleteMany({ userId: user._id });
      await Skill.deleteMany({ userId: user._id });
      await Task.deleteMany({ userId: user._id });

      // 4. Create Goals
      const goalDocs = [];
      if (Array.isArray(goals) && goals.length > 0) {
        for (const g of goals) {
          const doc = await Goal.create({
            userId: user._id,
            type: g.type || 'Placement / Job',
            title: g.title || g.type || 'Career Milestone',
            priority: g.priority || 'primary',
            targetDate: g.targetDate ? new Date(g.targetDate) : new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
            progressPercentage: 15,
            milestones: [
              { id: 'm1', title: 'Core Skill Mastery', completed: false },
              { id: 'm2', title: 'Project Capstone Build', completed: false },
              { id: 'm3', title: 'Placement Mock Interview', completed: false },
            ],
          });
          goalDocs.push(doc);
        }
      } else {
        const defaultGoal = await Goal.create({
          userId: user._id,
          type: 'Placement / Job',
          title: 'Software Engineer Placement',
          priority: 'primary',
          targetDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
          progressPercentage: 20,
          milestones: [
            { id: 'm1', title: 'DSA 150 Patterns Mastery', completed: false },
            { id: 'm2', title: 'Fullstack Next.js Capstone', completed: false },
            { id: 'm3', title: 'Mock Interview Evaluation', completed: false },
          ],
        });
        goalDocs.push(defaultGoal);
      }

      // 5. Create Subjects with dynamic priority
      const subjectDocs = [];
      const rawSubjects = Array.isArray(subjects) && subjects.length > 0
        ? subjects
        : [
            { name: 'Data Structures & Algorithms', credits: 4, marks: 75, examDays: 12 },
            { name: 'Database Management Systems', credits: 3, marks: 68, examDays: 5 },
            { name: 'Operating Systems', credits: 3, marks: 82, examDays: 20 },
            { name: 'Computer Networks', credits: 3, marks: 70, examDays: 18 },
          ];

      for (const sub of rawSubjects) {
        const priorityScore = calculatePriorityScore({
          goalRelevance: 9,
          daysUntilDeadline: sub.examDays,
          currentWeakness: Math.max(0, 10 - Math.round((sub.marks || 70) / 10)),
          academicImportance: sub.credits || 3,
          marketRelevance: 8,
        });

        const doc = await Subject.create({
          userId: user._id,
          name: sub.name,
          termNumber: currentTerm || 5,
          credits: sub.credits || 3,
          currentGradeMarks: sub.marks || 70,
          upcomingExamDate: sub.examDays ? new Date(Date.now() + sub.examDays * 24 * 60 * 60 * 1000) : undefined,
          calculatedPriorityScore: priorityScore,
        });
        subjectDocs.push(doc);
      }

      // 6. Create Skills
      const rawSkills = Array.isArray(skills) && skills.length > 0
        ? skills
        : [
            { name: 'Data Structures & Algorithms', level: 4, target: 9, category: 'technical' },
            { name: 'React / Next.js', level: 6, target: 9, category: 'technical' },
            { name: 'System Design', level: 3, target: 8, category: 'technical' },
            { name: 'Interview Communication', level: 5, target: 9, category: 'professional' },
          ];

      const skillDocs = [];
      for (const sk of rawSkills) {
        const currentLevel = sk.level || 4;
        const targetLevel = sk.target || 8;
        const doc = await Skill.create({
          userId: user._id,
          name: sk.name,
          category: sk.category || 'technical',
          currentLevel,
          targetLevel,
          skillGap: Math.max(0, targetLevel - currentLevel),
          relevanceToGoals: 8,
        });
        skillDocs.push(doc);
      }

      // 7. Generate initial daily action plan
      const timeline = calculateTimelineMetrics({
        targetDate: goalDocs[0]?.targetDate,
        upcomingExamDate: subjectDocs[0]?.upcomingExamDate,
        availableHoursPerDay: profile.availableHoursPerDay,
      });

      const primaryGoalType = goalDocs[0]?.type || 'Placement / Job';
      const ratios = calculateCategoryRatios(timeline, primaryGoalType);
      const recommendedTasks = generateDailyActionPlan({
        ratios,
        availableMinutes: profile.availableHoursPerDay * 60,
        subjects: subjectDocs.map((s: any) => ({ name: s.name, priorityScore: s.calculatedPriorityScore })),
        skills: skillDocs.map((sk: any) => ({ name: sk.name, gap: sk.skillGap })),
        targetRole,
      });

      for (const t of recommendedTasks) {
        await Task.create({
          userId: user._id,
          title: t.title,
          category: t.category,
          estimatedMinutes: t.estimatedMinutes,
          priorityScore: t.priorityScore,
          recommendationReason: t.recommendationReason,
          dueDate: new Date(),
          status: 'pending',
        });
      }

      return reply.send({
        success: true,
        message: 'Onboarding completed successfully',
        user: { id: user._id, name: user.name, email: user.email },
        profile,
      });
    } catch (err: any) {
      fastify.log.error('Onboarding API Error:', err);
      return reply.code(500).send({ success: false, error: err.message });
    }
  });
};
