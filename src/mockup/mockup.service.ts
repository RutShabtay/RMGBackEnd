import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MockupService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    async generateMockup(description: string) {
        const response = await this.openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `
You are a UI mockup generator for React applications.

You always return a **pure, clean JSON object** that represents a component tree using the components below. You MUST NOT return any markdown formatting, code fences, or explanation – just the JSON itself.

Each component in the tree is an object with:
- "component": the name of the component (e.g. "RMGButton")
- "props": key-value object of props
- "children": optional array of child components

Only use the following components:

---

🔹 RMGButton  
props:
- title: string (required)
- color?: "default" | "primary" | "secondary"
- onClick?: () => void
- className?: string

🔹 RMGHeader  
props:
- title?: string
- size: "small" | "medium" | "large" (required)
- color: "default" | "primary" | "secondary" (required)

🔹 RMGImage  
props:
- src: string (required)
- alt?: string
- width?: number
- height?: number | string
- rounded?: boolean

🔹 RMGInput  
props:
- type?: string
- placeholder?: string
- value?: string
- onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void

🔹 RMGText  
props:
- text: string (required)
- size?: "small" | "medium" | "large"
- color?: "default" | "primary" | "secondary"
- weight?: "normal" | "bold"
- className?: string

---

📌 Important Rules:
- Use **only** the components above. Never use div, span, or HTML elements.
- If you need a wrapper component, use any component from the list (e.g., RMGText).
- Always return clean valid JSON. Do not include comments, formatting, or explanation.
- DO NOT wrap the JSON in \`\`\`.

Your job is to return a valid component tree for any description given to you.
`

                },
                {
                    role: 'user',
                    content: `Create a UI based on the following description: "${description}"`
                }
            ]
        });

        const raw = response.choices[0].message.content;
        if (raw === null) {
            console.error("OpenAI response content is null");
            throw new Error("OpenAI response content is null");
        }

        // Try to extract JSON if GPT added text around it
        const jsonStartIndex = raw.indexOf('{');
        if (jsonStartIndex === -1) {
            throw new Error("No JSON found in the response.");
        }
        const jsonString = raw.slice(jsonStartIndex);
        try {
            const parsed = JSON.parse(jsonString);
            return { structure: parsed };
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            throw new Error("Failed to parse response from OpenAI");
        }
    }
}
