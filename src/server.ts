import fastify from 'fastify';
import {z} from 'zod';
import { PrismaClient } from '@prisma/client'

const app = fastify();
const prisma = new PrismaClient({
  log: ['query'],
})

const port = 5000;

app.get('/', (request, reply)=> {
  return "Olá povo"
});

app.post('/events', async (request, reply)=> {
  const creatEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable()
  });

  const data = creatEventSchema.parse(request.body);

  const titleWords = data.title.toLowerCase().split(" ");
  const slug = titleWords.join("-");

  const event = await prisma.event.create({
    data: {
      title: data.title,
      slug,
      details: data.details,
      maximumAttendees: data.maximumAttendees
    }
  })

  return reply.status(201).send({ event })
  //return { eventId: event.id }
});

app.listen({ port }).then(() => {
  console.log(`HTTP server running on: http://127.0.0.1:${port}`);
});
