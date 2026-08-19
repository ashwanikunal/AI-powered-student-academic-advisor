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
      if (!user) {
        return reply.code(404).send({ success: false, message: 'No user profile found' });
      }

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
    } catch (err: any) {
      return reply.code(500).send({ success: false, error: err.message });
    }
  });
};
