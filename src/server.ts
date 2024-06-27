import fastify from 'fastify';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import { createSlug } from './utils/generate-slug';

const app = fastify();
const prisma = new PrismaClient({
  log: ['query'],
});

const port = 5000;

app.get('/', (request, reply) => {
  return 'Olá povo';
});

app.post('/events', async (request, reply) => {
  const creatEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  });

  const { title, details, maximumAttendees } = creatEventSchema.parse(
    request.body
  );

  const slug = createSlug(title);

  const eventWithSameSlug = await prisma.event.findUnique({
    where: {
      slug,
    },
  });

  if (eventWithSameSlug !== null) {
    throw new Error('Já existe um evento com o mesmo titulo');
  }

  const event = await prisma.event.create({
    data: {
      title: title,
      slug,
      details: details,
      maximumAttendees: maximumAttendees,
    },
  });

  return reply.status(201).send({ event });
});

app.listen({ port }).then(() => {
  console.log(`HTTP server running on: http://127.0.0.1:${port}`);
});
