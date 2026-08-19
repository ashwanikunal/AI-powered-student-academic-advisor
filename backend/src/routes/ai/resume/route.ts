import { FastifyPluginAsync } from 'fastify';
import { aiProvider } from '../../../lib/services/aiProvider';

export const resumeRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/', async (request, reply) => {
    try {
      const { resumeText, targetRole } = request.body as { resumeText?: string; targetRole?: string };
      const result = await aiProvider.analyzeResume(
        resumeText || 'Fullstack React developer with project experience in MongoDB.',
        targetRole || 'Software Engineer'
      );
      return reply.send(result);
    } catch (err: any) {
      return reply.code(500).send({ success: false, error: err.message });
    }
  });
};
