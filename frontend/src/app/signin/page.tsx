"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from "next/image";
import axios from "axios";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SingUp = () => {
    const genAI = new GoogleGenerativeAI(
        "AIzaSyAC6CWSxzL9GgDdIoBrYd830ZhRb_eQT9w"
    );

    // ...

    async function run() {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Make me a course on mongodb. suggest multiple modules on the Course along with the estimated time required to complete the course. Start with the basics first. Return me the output in JSON in the following format.
        Example output:
        [
            {
                "title": "Python Basics",
                "description": "Learn the basics of Python programming"
                "time-required": "2 hours"
            },
            {
                "title": "Python Advanced",
                "description": "Learn advanced Python programming"
                "time-required": "10 hours"
            }
            ...MORE MODULES...
        ]`;

        const result: any = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const jsonWithoutBackticks = text.replace(/^```json|```$/g, "");

        // Parse the JSON data
        const parsedData = JSON.parse(jsonWithoutBackticks);

        // Store the array of objects in a variable

        // Output the variable containing the array of objects
        console.log(parsedData);

        // console.log(text);
    }

    run();

    const formSchema = z.object({
        email: z.string().email({
            message: "Invalid email format.",
        }),
        password: z.string().min(2, {
            message: "Password must be at least 8 characters long.",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleFormData = async (data: any) => {
        async function postData() {
            try {
                // Request body
                console.log(data);
                const requestBody = {
                    username: data.email,
                    password: data.password,
                };

                // Request headers
                const headers = {
                    "Content-Type": "application/json",
                    // Authorization: "Bearer YourAccessTokenHere",
                };

                const response = await axios.post(
                    "http://localhost:3001/user/login",
                    requestBody,
                    { headers }
                );

                console.log("Response:", response.data);
            } catch (error: any) {
                console.error("Error:", error.response.data);
            }
        }

        // console.log(data);
        postData();
    };
    return (
        <div className="flex flex-col w-full justify-center items-center bg-[#f1f1f1] h-screen">
            <div className=" h-40 mb-10 ">
                <Image
                    src="/mindmate-logo.png"
                    width={500}
                    height={500}
                    alt="Picture of the author"
                />
            </div>
            <div className=" w-2/5 flex justify-center items-start mt-10">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleFormData)}
                        className="space-y-1 flex flex-col w-2/3"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Your Email Address"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Your Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            style={{
                                marginTop: "2rem",
                            }}
                            variant={"default"}
                            type="submit"
                        >
                            <div className=" font-bold text-md text-white ">
                                Continue
                            </div>
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default SingUp;
