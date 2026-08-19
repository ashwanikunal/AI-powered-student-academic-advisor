import { FastifyPluginAsync } from 'fastify';
import { aiProvider } from '../../../lib/services/aiProvider';

export const mockInterviewRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/', async (request, reply) => {
    try {
      const { question, answer } = request.body as { question?: string; answer?: string };
      const result = await aiProvider.evaluateInterviewAnswer(
        question || 'Explain how indexing improves MongoDB query performance.',
        answer || 'Indexes create B-Tree structures so queries avoid scanning full collections.'
      );
      return reply.send(result);
    } catch (err: any) {
      return reply.code(500).send({ success: false, error: err.message });
    }
  });
};
