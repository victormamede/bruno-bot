import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY as string;
const openai = new OpenAI({ apiKey });

export default openai;
