import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  Book,
  FileIcon,
  PlusCircle,
  PlusCircleIcon,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const getData = async (userId: string, siteId: string) => {
  const data = await prisma.post.findMany({
    where: {
      userId: userId,
      siteId: siteId,
    },
    select: {
      image: true,
      title: true,
      createdAt: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

export default async function SiteIdRoute({
  params,
}: {
  params: { siteId: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id, params.siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button variant="secondary" asChild>
          <Link href="#">
            <Book className="size-4 mr-2" /> View Blog
          </Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="#">
            <Settings className="size-4 mr-2" /> Setting
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircle className="size-4 mr-2" /> Create Article
          </Link>
        </Button>
      </div>

      {data === undefined || data.length == 0 ? (
        <div className="flex flex-col justify-center items-center rounded-md border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="size-10 text-primary" />
          </div>
          <h2 className="mt-6 text-lg font-semibold">
            You don't have any site created
          </h2>
          <p className="mb-8 mt-2 text-center leading-tight text-muted-foreground max-w-md mx-auto">
            You currently don't have any site. Please create some so you can see
            them right here!
          </p>
          <Button asChild>
            <Link href={`/dashboard/sites/${params.siteId}/create`}>
              <PlusCircleIcon className="mr-2 size-4" />
              Create Article
            </Link>
          </Button>
        </div>
      ) : (
        <h1>Some Data</h1>
      )}
    </>
  );
}
