import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] });

export default async function handle(req, res) {
  const playerId = req.query.id;

  if (req.method === "GET") {
    console.log("handle get..");
  } else if (req.method === "DELETE") {
    handleDelete(playerId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/player/:id
async function handleGet(playerId, res) {
  const post = await prisma.player.findUnique({
    where: { id: parseInt(playerId) },
  });
  res.json(post);
}

// DELETE /api/player/:id
async function handleDelete(playerId, res) {
  const post = await prisma.player.delete({
    where: { id: parseInt(playerId) },
  });
  res.json(post);
}
