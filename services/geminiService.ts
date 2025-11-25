import { GoogleGenAI } from "@google/genai";

// Safe access to process.env.API_KEY to prevent "process is not defined" error in browsers
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';

// Ensure we only initialize if we have a key, otherwise we might error out later.
// But for now, we just initialize it. If the key is empty, requests will fail gracefully.
const ai = new GoogleGenAI({ apiKey: apiKey });

export const askTutor = async (question: string, context: string): Promise<string> => {
  if (!apiKey) {
    return "Chưa cấu hình API Key. Vui lòng kiểm tra lại môi trường phát triển.";
  }

  try {
    const systemPrompt = `
      Bạn là một trợ lý ảo STEM thân thiện dành cho học sinh lớp 8.
      Chủ đề bài học: "Cánh tay Robot Thủy lực xử lý rác thải độc hại".
      Nhiệm vụ của bạn là giải thích ngắn gọn, dễ hiểu về Nguyên lý Pascal, Cơ khí, và Vật liệu.
      Tránh dùng từ ngữ quá hàn lâm. Hãy khuyến khích học sinh tư duy.
      
      Bối cảnh hiện tại của học sinh: ${context}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 300,
      }
    });

    return response.text || "Xin lỗi, hiện tại thầy AI đang bận, em thử lại sau nhé!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Đã xảy ra lỗi khi kết nối với trợ lý AI.";
  }
};