import prisma from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FileIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import DefaultImage from "@/public/default.png";

async function getData(userId: string) {
  const data = await prisma.site.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

const SitesRoute = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }

  const data = await getData(user.id);

  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href={"/dashboard/sites/new"}>
            <PlusCircleIcon className="mr-2 size-4" />
            New Site
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
            <Link href={"/dashboard/sites/new"}>
              <PlusCircleIcon className="mr-2 size-4" />
              New Site
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.map((item, i) => {
            return (
              <Card key={i}>
                <Image
                  src={item.imageUrl ?? DefaultImage}
                  alt={item.name}
                  className="rounded-t-lg object-cover w-full h-[200px]"
                  width={400}
                  height={200}
                />
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/sites/${item.id}`}>
                      View Article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SitesRoute;
