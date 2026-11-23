import { Prisma } from "@prisma/client";
import { assignPersonToRole } from "../repositories/organizationRepo";
import type { FormErrors, FormResult } from "../types/form";

export interface OrganizationInput {
  firstName: string;
  lastName: string;
  role: string;
}

type SavedRole = NonNullable<Awaited<ReturnType<typeof assignPersonToRole>>>;

export async function createOrganizationPerson(
  values: OrganizationInput,
): Promise<FormResult<SavedRole>> {
  const errors: FormErrors = {};
  const firstName = values.firstName.trim();
  const title = values.role.trim().replace(/\s+/g, " ");

  if (firstName.length < 3) {
    errors.firstName = "First name must contain at least 3 characters.";
  }

  if (!title) {
    errors.role = "Enter a role.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  try {
    const role = await assignPersonToRole(title, {
      firstName,
      lastName: values.lastName.trim() || undefined,
    });

    if (!role) {
      return {
        success: false,
        errors: { role: "This role already exists and is occupied." },
      };
    }

    return { success: true, data: role };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2034"
    ) {
      return {
        success: false,
        errors: { role: "The role changed during submission. Please try again." },
      };
    }

    throw error;
  }
}