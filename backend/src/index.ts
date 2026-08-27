import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import dbConnect from './lib/db/dbConnect';

// Route handlers
import { advisorRoutes } from './routes/ai/advisor/route';
import { mockInterviewRoutes } from './routes/ai/mock-interview/route';
import { resumeRoutes } from './routes/ai/resume/route';
import { onboardingRoutes } from './routes/onboarding/route';
import { profileRoutes } from './routes/profile/route';

const server = Fastify({ logger: true });

// Register CORS — allow frontend dev server
server.register(cors, {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

// Register all route plugins
server.register(advisorRoutes, { prefix: '/api/ai/advisor' });
server.register(mockInterviewRoutes, { prefix: '/api/ai/mock-interview' });
server.register(resumeRoutes, { prefix: '/api/ai/resume' });
server.register(onboardingRoutes, { prefix: '/api/onboarding' });
server.register(profileRoutes, { prefix: '/api/profile' });

// Health check
server.get('/health', async () => ({ status: 'ok', service: 'AI Student Advisor API' }));

// Start server
const start = async () => {
  try {
    const port = Number(process.env.PORT) || 5000;
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`\n🚀 Backend API running at http://localhost:${port}`);

    try {
      await dbConnect();
      server.log.info('MongoDB connected successfully');
    } catch (dbErr: any) {
      console.warn(`\n⚠️ MongoDB Connection Warning: ${dbErr.message || dbErr}\n   (Backend is running, but database features require MongoDB at process.env.MONGODB_URI)`);
    }
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
