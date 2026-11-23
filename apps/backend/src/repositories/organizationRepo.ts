import { Prisma } from "@prisma/client";
import { prisma } from "../db";

export function getRoles() {
  return prisma.role.findMany({
    orderBy: { title: "asc" },
    include: { employee: true },
  });
}

function normalizeTitle(title: string) {
  return title.trim().replace(/\s+/g, " ").toLowerCase();
}

export function assignPersonToRole(
  title: string,
  employee: { firstName: string; lastName?: string },
) {
  return prisma.$transaction(async (db) => {
    const roles = await db.role.findMany({
      orderBy: { id: "asc" },
      select: { id: true, title: true, employeeId: true },
    });

    const matching = roles.filter(
      (role) => normalizeTitle(role.title) === normalizeTitle(title),
    );

    if (matching.some((role) => role.employeeId !== null)) {
      return null;
    }

    const vacant = matching[0];

    if (vacant) {
      return db.role.update({
        where: { id: vacant.id },
        data: { employee: { create: employee } },
        include: { employee: true },
      });
    }

    return db.role.create({
      data: { title, employee: { create: employee } },
      include: { employee: true },
    });
  }, {
    isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
  });
}