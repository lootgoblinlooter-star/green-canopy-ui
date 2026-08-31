import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  prompt: z.string().trim().min(3).max(500),
});

const resultSchema = z.object({
  name: z.string().min(1).max(80),
  category: z.string().min(1).max(50),
  headline: z.string().min(1).max(100),
  supportingText: z.string().min(1).max(180),
  navigation: z.array(z.string().max(30)).min(2).max(5),
  cards: z.array(
    z.object({
      label: z.string().min(1).max(40),
      value: z.string().min(1).max(40),
    }),
  ).min(3).max(3),
  primaryAction: z.string().min(1).max(30),
});

export type GeneratedInterface = z.infer<typeof resultSchema>;

export const generateInterface = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("The generation service is not configured.");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.5-flash",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content:
              "You are Dope UI, a product interface designer. Turn the user's request into one concise interface concept. Return only valid JSON with these keys: name, category, headline, supportingText, navigation (2-5 short labels), cards (exactly 3 objects with label and value), primaryAction. Do not use markdown or add keys.",
          },
          { role: "user", content: data.prompt },
        ],
      }),
    });

    if (!response.ok) throw new Error("Generation failed. Please try again.");

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) throw new Error("The generator returned an empty result.");

    const cleaned = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    return resultSchema.parse(JSON.parse(cleaned));
  });