"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/ai/gemini";
import { db } from "@/utils/db/db";
import { MockInterview } from "@/utils/db/schema";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function AddNewInterview() {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobExp, setJobExp] = useState("");
  const user = useUser();

  const handleSubmit = async () => {
    const prompt =
      "Job description: " +
      jobDescription +
      " Job title: " +
      jobTitle +
      " Job experience: " +
      jobExp +
      "give 5 interview questions and answers in json format, questions and answers should be in fields in json";

    const result = await chatSession.sendMessage(prompt);
    const mockResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "")
      .trim();
    console.log(JSON.parse(mockResp));

    const res = await db
      .insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jobDescription,
        jobTitle,
        jobExp,
        mockResp,
        jsonMockResponse: JSON.parse(mockResp),
        createdAt: new Date(),
        createdBy: user.user?.id,
      })
      .returning({ mockId: MockInterview.mockId });

    console.log(res);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <section className="relative flex gap-6">
          <div className="w-full lg:w-1/2 py-6">
            <div className="mx-auto max-w-lg">
              <h1 className="text-2xl font-bold sm:text-3xl">
                Get started today!
              </h1>

              <p className="mt-2 text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                libero nulla eaque error neque ipsa culpa autem, at itaque
                nostrum!
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <Input
                onChange={(e) => setJobTitle(e.target.value)}
                type="text"
                placeholder="Role"
              />
              <Input
                onChange={(e) => setJobExp(e.target.value)}
                type="text"
                placeholder="Exp"
              />
              <Textarea
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Desc"
              />
            </div>

            <Button onClick={handleSubmit} className="mt-4" type="submit">
              Save changes
            </Button>
          </div>

          <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </section>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
