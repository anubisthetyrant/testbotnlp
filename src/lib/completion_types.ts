import { OllamaResponse } from "./ollama_inference"

export type ResultMessage = {
    role: string
    content: string
    streamer?: Promise<OllamaResponse> | null
    animation?: boolean 
}

export type ChatComp = {
    role: string,
    content: string
}