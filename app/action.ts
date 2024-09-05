"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/app/utils/zodSchemas";
import prisma from "./utils/db";

export async function CreateSiteAction(prevState: any, formDate: FormData) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const submisstion = parseWithZod(formDate, {
    schema: siteSchema,
  });

  if (submisstion.status !== "success") {
    return submisstion.reply();
  }

  const response = await prisma.site.create({
    data: {
      name: submisstion.value.name,
      description: submisstion.value.description,
      subdirectory: submisstion.value.subdirectory,
      userId: user.id,
    },
  });

  return redirect("/dashboard/sites");
}
