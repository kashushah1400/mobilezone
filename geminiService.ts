
import { GoogleGenAI, Type } from "@google/genai";
import { MobilePhone } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const searchMobileWithAI = async (query: string): Promise<{
  text: string;
  groundingSources: any[];
  structuredData?: MobilePhone[];
}> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Find information about mobile phones matching this query: "${query}". Focus on latest prices in Pakistan, key specs, and release dates.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            phones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  brand: { type: Type.STRING },
                  price: { type: Type.NUMBER },
                  processor: { type: Type.STRING },
                  ram: { type: Type.STRING },
                  camera: { type: Type.STRING },
                  battery: { type: Type.STRING },
                },
                required: ["name", "brand", "price"]
              }
            }
          }
        }
      },
    });

    // Fix: Provide fallback empty string to satisfy TypeScript string requirement for JSON.parse
    const jsonString = response.text || '{"summary": "No data found.", "phones": []}';
    const parsedData = JSON.parse(jsonString);
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text: parsedData.summary || "Search complete.",
      groundingSources: groundingChunks,
      structuredData: parsedData.phones?.map((p: any, idx: number) => ({
        id: `ai-${idx}-${Date.now()}`,
        name: p.name,
        brand: p.brand,
        price: p.price,
        currency: 'Rs.',
        image: `https://picsum.photos/seed/${encodeURIComponent(p.name)}/400/500`,
        specs: {
          processor: p.processor || 'N/A',
          ram: p.ram || 'N/A',
          storage: 'N/A',
          display: 'N/A',
          camera: p.camera || 'N/A',
          battery: p.battery || 'N/A',
          os: 'N/A'
        },
        releaseDate: 'Recently',
        rating: 4.0
      }))
    };
  } catch (error) {
    console.error("Gemini AI Search Error:", error);
    return { text: "Error fetching live data. Please try again later.", groundingSources: [] };
  }
};
