import { AIResponse } from "../interfaces/Responses";

const API_KEY = "AIzaSyBQPjax5OqmiaGwmm9la8cQkr-U3MJ4Ux4"; // Usa variables de entorno en producción
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export const getResponseFromGemini = async (message: string): Promise<string | null> => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      });
  
      console.log("Estado de la respuesta:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json(); // Ver qué error devuelve la API
        console.error("Error en la API de Gemini:", errorData);
        throw new Error(`Error en la API: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Respuesta completa de Gemini:", data);
  
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      console.error("Error obteniendo respuesta de Gemini:", error);
      return null;
    }
  };
  