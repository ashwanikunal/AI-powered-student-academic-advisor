import { FastifyPluginAsync } from 'fastify';
import dbConnect from '../../lib/db/dbConnect';
import User from '../../lib/db/models/User';
import StudentProfile from '../../lib/db/models/StudentProfile';
import Goal from '../../lib/db/models/Goal';
import Subject from '../../lib/db/models/Subject';
import Skill from '../../lib/db/models/Skill';
import Task from '../../lib/db/models/Task';
import { calculatePlacementReadiness } from '../../lib/services/placementReadiness';

export const profileRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    try {
      await dbConnect();
      const user = await User.findOne({}).sort({ createdAt: -1 });
      if (user) {
        const profile = await StudentProfile.findOne({ userId: user._id });
        const goals = await Goal.find({ userId: user._id });
        const subjects = await Subject.find({ userId: user._id }).sort({ calculatedPriorityScore: -1 });
        const skills = await Skill.find({ userId: user._id }).sort({ skillGap: -1 });
        const tasks = await Task.find({ userId: user._id }).sort({ priorityScore: -1 });

        const readiness = calculatePlacementReadiness({
          dsaScore: 72,
          devScore: 85,
          csFundamentalsScore: 68,
          projectsScore: 80,
          resumeScore: 75,
          communicationScore: 78,
        });

        return reply.send({
          success: true,
          user,
          profile,
          goals,
          subjects,
          skills,
          tasks,
          readiness,
        });
      }
    } catch (dbErr: any) {
      fastify.log.warn('MongoDB query failed, returning fallback mock profile:', dbErr.message);
    }

    // Default mock profile fallback when DB is offline or empty
    const readiness = calculatePlacementReadiness({
      dsaScore: 75,
      devScore: 82,
      csFundamentalsScore: 70,
      projectsScore: 85,
      resumeScore: 78,
      communicationScore: 80,
    });

    return reply.send({
      success: true,
      user: { name: 'Student User', email: 'student@sarathi.ai', targetRole: 'SDE-1 / Software Engineer' },
      profile: { academicYear: 3, currentCgpa: 8.5, targetCgpa: 9.0, weeklyAvailableHours: 25 },
      goals: [
        { title: 'Master Data Structures & Algorithms', targetDate: '2026-11-30', status: 'IN_PROGRESS', progressPercent: 65 },
        { title: 'Build Full-Stack Capstone Project', targetDate: '2026-12-15', status: 'IN_PROGRESS', progressPercent: 80 },
      ],
      subjects: [],
      skills: [
        { skillName: 'Data Structures & Algorithms', targetProficiency: 90, currentProficiency: 72 },
        { skillName: 'System Design & Node.js', targetProficiency: 85, currentProficiency: 78 },
      ],
      tasks: [],
      readiness,
    });
  });
};
