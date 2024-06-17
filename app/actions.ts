"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function getResponse(question: string) {
    const { text, finishReason, usage } = await generateText({
        model: openai("gpt-3.5-turbo"),
        prompt: question,
        maxRetries: 0,
    })

    return { text, finishReason, usage }
}
