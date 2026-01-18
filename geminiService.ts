
import { GoogleGenAI, Type } from "@google/genai";
import { Question, Subject } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateQuestions(subject: Subject, level: number): Promise<Question[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 10 multiple-choice questions for the subject "${subject}" at difficulty level ${level}/50. 
      The questions should be appropriate for competitive exams like SSC and One Day exams.
      Ensure high quality and accurate answers.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Must be exactly 4 options"
              },
              correctAnswer: { 
                type: Type.INTEGER,
                description: "Zero-based index of the correct answer (0-3)"
              },
              explanation: { type: Type.STRING }
            },
            required: ["id", "question", "options", "correctAnswer"]
          }
        }
      }
    });

    const text = response.text.trim();
    return JSON.parse(text) as Question[];
  } catch (error) {
    console.error("Error generating questions:", error);
    // Fallback static data if API fails to ensure "offline" feel
    return Array.from({ length: 10 }, (_, i) => ({
      id: `fallback-${subject}-${level}-${i}`,
      question: `Sample question ${i + 1} for ${subject} Level ${level}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
      explanation: "This is a placeholder answer."
    }));
  }
}
