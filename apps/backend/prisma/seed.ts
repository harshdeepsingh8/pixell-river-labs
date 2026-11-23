import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { departmentData } from "../src/data/departments";
import { roleData } from "../src/data/roles";

const prisma = new PrismaClient();

async function seed() {
  await prisma.$transaction(async (db) => {
    for (const [departmentIndex, department] of departmentData.entries()) {
      const departmentId = `seed-department-${departmentIndex + 1}`;

      await db.department.upsert({
        where: { id: departmentId },
        update: {},
        create: { id: departmentId, name: department.name },
      });

      for (const [employeeIndex, employee] of department.employees.entries()) {
        const id = `seed-department-employee-${departmentIndex + 1}-${employeeIndex + 1}`;

        await db.employee.upsert({
          where: { id },
          update: {},
          create: {
            id,
            firstName: employee.firstName,
            lastName: employee.lastName ?? null,
            departmentId,
          },
        });
      }
    }

    for (const [roleIndex, role] of roleData.entries()) {
      const roleId = `seed-role-${roleIndex + 1}`;
      let employeeId: string | null = null;

      if (role.employee) {
        employeeId = `seed-role-employee-${roleIndex + 1}`;

        await db.employee.upsert({
          where: { id: employeeId },
          update: {},
          create: {
            id: employeeId,
            firstName: role.employee.firstName,
            lastName: role.employee.lastName ?? null,
          },
        });
      }

      await db.role.upsert({
        where: { id: roleId },
        update: {},
        create: { id: roleId, title: role.title, employeeId },
      });
    }
  });

  console.log("Seeded the Pixell River departments, employees, and roles.");
}

seed()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());