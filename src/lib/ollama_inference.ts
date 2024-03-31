import { ResultMessage } from "./completion_types";

import { ChatResponse } from 'ollama/browser'
import { Ollama } from 'ollama/browser'
export type OllamaResponse = AsyncGenerator<ChatResponse, unknown, unknown>;

const PASTEBIN_URL = "https://pastebin.com/raw/NYiPVCgd";

const resp = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(PASTEBIN_URL)}`, {cache: 'no-store'});
const jsonData = await resp.json();
const hostUrl = jsonData.contents.trim();

const ollama = new Ollama({
    fetch: (input: RequestInfo | URL , init?: RequestInit) => fetch(input, {...init, mode: 'cors', credentials: 'omit', headers: { 'Content-Type': 'application/json' }}),
    host: hostUrl || "http://localhost:11434/",
})

/*
 Select the model
 gemma and llama2 are big models
*/
export type Model = "phi:chat" | "tinyllama:chat" | "llama2:chat" | "gemma:2b-text" | "mistral";

const MODEL_NAME: Model = "mistral";

export const getChatCompletionStream = async (messages: ResultMessage[]): Promise<OllamaResponse> => {
    const response = await ollama.chat({
        model: MODEL_NAME,
        messages: messages,
        stream: true,
        options: {
            
            temperature: 0.2,
            top_p: 0.4,
            stop: ["["]
        }
    })
    return response;
}

export const getChatCompletion = async (messages: ResultMessage[]): Promise<ChatResponse> => {
    const response = await ollama.chat({
        model: MODEL_NAME,
        messages: messages,
        stream: false,
        options: {
            temperature: 0.2,
            top_p: 0.4,
            stop: ["$STOP$"]
        }
    })
    return response;
}