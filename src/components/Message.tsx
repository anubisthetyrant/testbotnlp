import { useState, useEffect } from "react";
import "./message.css"
import { ResultMessage, ChatComp } from "../lib/completion_types";
import { OllamaResponse } from "../lib/ollama_inference";

import TypingDots from "../components/TypingDots";

type Props = ResultMessage & {
    setInternalChat: React.Dispatch<React.SetStateAction<ChatComp[]>>
    messagesRef: React.RefObject<HTMLDivElement>
}

const Message = ({role, content, streamer, setInternalChat, messagesRef, animation}: Props) => {
    const [message, setMessage] = useState("")
    const [isStreamingDone, setIsStreamingDone] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const msg_clr = role === "user" ? "user-message" : "chatbot-message"

    useEffect(() => {
        const streamText = async (streamer: Promise<OllamaResponse>) => {
            const s = await streamer
            for await (const resp of s) {
                const cont = resp.message.content;
                setMessage((prev) => prev + cont)
                if (isGenerating) {
                    setIsGenerating(false)
                }
            }
            
            setIsStreamingDone(true)
        }

        if (streamer) {
            setIsGenerating(true)
            streamText(streamer)
        }
        else {
            if (animation && !isAnimating) {
                setIsAnimating(true)
                console.log("how many times")
                const textStream = content.split(" ")
                const interval = setInterval(() => {
                    setMessage((prev) => prev + (textStream.shift() ?? "") + " ")
                    if (textStream.length === 0) {
                        clearInterval(interval)
                    }
                }, 80)

            } else {
                setMessage(content)
            }
        }
    }, [setIsAnimating, streamer, content, role, setIsStreamingDone, setIsGenerating, isGenerating, animation])

    useEffect(() => {
        if (isStreamingDone) {
            setInternalChat((prev) => [...prev, {role, content: message}])
        }
    }, [isStreamingDone, message, role, setInternalChat])


    useEffect(() => {
        // smoothly scroll to bottom
        messagesRef.current?.scrollTo({top: messagesRef.current.scrollHeight, behavior: "smooth"})
    }, [message, messagesRef])
    
    
    return (
        <span className={`message-box ${msg_clr} ${message.length === 0 ? "indicator-width" : ""}`}>
            {message.length === 0 ? <TypingDots /> : <p>{message.trim()}</p>}
        </span>
    )
}

export default Message