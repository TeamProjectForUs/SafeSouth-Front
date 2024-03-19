import OpenAI from "openai";

export default async function completions() {
const openai = new OpenAI({apiKey: import.meta.env.VITE_OPENAI_API_KEY,dangerouslyAllowBrowser:true});
  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What color is the sky usually? " }
    ],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0]
}


