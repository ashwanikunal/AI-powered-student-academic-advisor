import { FastifyPluginAsync } from 'fastify';
import dbConnect from '../../../lib/db/dbConnect';
import User from '../../../lib/db/models/User';
import StudentProfile from '../../../lib/db/models/StudentProfile';
import Goal from '../../../lib/db/models/Goal';
import Subject from '../../../lib/db/models/Subject';
import Skill from '../../../lib/db/models/Skill';
import { buildStudentContext } from '../../../lib/services/contextBuilder';
import { aiProvider } from '../../../lib/services/aiProvider';

export const advisorRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/', async (request, reply) => {
    try {
      await dbConnect();
      const { question } = request.body as { question?: string };

      const user = await User.findOne({});
      if (!user) {
        return reply.code(400).send({ success: false, error: 'User profile missing' });
      }

      const profile = await StudentProfile.findOne({ userId: user._id });
      const goals = await Goal.find({ userId: user._id });
      const subjects = await Subject.find({ userId: user._id });
      const skills = await Skill.find({ userId: user._id });

      const studentContext = buildStudentContext(profile, goals, subjects, skills);
      const adviceResult = await aiProvider.getDailyAdvice(studentContext);

      return reply.send({
        success: true,
        question,
        context: studentContext,
        advice: adviceResult.data,
        providerUsed: adviceResult.providerUsed,
      });
    } catch (err: any) {
      return reply.code(500).send({ success: false, error: err.message });
    }
  });
};
