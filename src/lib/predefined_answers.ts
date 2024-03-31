
import program from "./programs.json"

type Answer = {
    triggers: string[]
    answer: string
}

export const answers: Answer[] = program

export const containsTrigger = (trigger: string) => {
    return answers.some((answer) => {
        return answer.triggers.includes(trigger)
    })
}

export const findWithTrigger = (trigger: string) => {
    return answers.find((answer) => {
        return answer.triggers.includes(trigger)
    })
}