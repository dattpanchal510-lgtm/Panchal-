import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getCommunityInsights(query: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: "You are an AI assistant for the Panchal Samaj community website. Your goal is to provide accurate, respectful, and culturally relevant information about the Panchal community (also known as Vishwakarma community), their heritage, craftsmanship, and traditions. Use Google Search to find the latest and most accurate information if needed.",
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't retrieve that information right now. Please try again later.";
  }
}

export async function summarizeNews(newsContent: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: `Summarize the following community news in 2-3 concise bullet points:\n\n${newsContent}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Summary unavailable.";
  }
}

export async function analyzeMatchCompatibility(profile1: any, profile2: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: `Analyze the matrimonial compatibility between these two profiles from the Panchal community (Vishwakarma community). Provide a brief, respectful, and culturally nuanced analysis (max 120 words).

Consider the following aspects:
1. Shared Values: Alignment in life goals and cultural traditions.
2. Professional Synergy: How their careers and educational backgrounds complement each other.
3. Family Background: Alignment in family values and heritage within the Panchal community.
4. Expectations: How well they meet each other's stated requirements for a partner.

Profile 1:
- Name: ${profile1.name}
- Age: ${profile1.age}
- Education: ${profile1.education}
- Occupation: ${profile1.occupation}
- Family Background: ${profile1.familyDetails}
- Expectations: ${profile1.expectations}

Profile 2:
- Name: ${profile2.name}
- Age: ${profile2.age}
- Education: ${profile2.education}
- Occupation: ${profile2.occupation}
- Family Background: ${profile2.familyDetails}
- Expectations: ${profile2.expectations}

Provide the analysis in a supportive and encouraging tone, highlighting potential areas of strong connection.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Compatibility analysis unavailable.";
  }
}
