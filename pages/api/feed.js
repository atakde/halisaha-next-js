import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient({ log:  ['query', 'info', 'warn', 'error'] });
  try {
    const matches = await prisma.match.findMany({
      take: 1,
      where: {
        match_status: "active",
        match_type: req.query.type || 'NORMAL'
      },
    });
    const players = await prisma.player.findMany({
      where: {
        match_id: matches[0].id
      },
      orderBy: {
        id: "desc",
      },
    });
    res.status(200);
    res.json({ matches, players });
  } catch (e) {
    res.status(500);
    res.json({ error: e.message });
  }
}
