"use client";

import { UploadDropzone } from "@/app/utils/UploadThingsComponents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ArticleCreationRoute = ({ params }: { params: { siteId: string } }) => {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);

  return (
    <>
      <div className="flex items-center">
        <Button size={"icon"} variant="secondary" className="mr-3" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit,
            impedit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="Article Title" />
            </div>

            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input placeholder="Article Slug" />
              <Button className="w-fit" variant="secondary" type="button">
                <RefreshCcw className="size-4 mr-2" /> Generate Slug
              </Button>
            </div>

            <div className="grid gap-2">
              <Label>Small descrpition</Label>
              <Textarea placeholder="Small desciption for your blog article..." />
            </div>

            <div className="grid gap-2">
              <Label>Cover Image</Label>
              {imageUrl == undefined ? (
                <UploadDropzone
                  onClientUploadComplete={(res) => setImageUrl(res[0].url)}
                  endpoint="imageUploader"
                />
              ) : (
                <Image
                  src={imageUrl}
                  className="h-[400px] w-full"
                  alt="Cover Image"
                />
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ArticleCreationRoute;
