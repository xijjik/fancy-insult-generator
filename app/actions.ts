"use server"

import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

export async function getResponse(question: string) {
    const { object } = await generateObject({
        model: openai("gpt-3.5-turbo"),
        schema: z.object({
            insults: z.array(z.string()),
        }),
        prompt: question,
    })

    return { object }
}
