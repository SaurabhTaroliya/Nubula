import { HfInference } from "@huggingface/inference";
const myToken = import.meta.env.VITE_Token2;

const inference = new HfInference(myToken);

const codeGenetor = async(prompt) =>{
    let result = '';
    for await (const chunk of inference.chatCompletionStream({
        model: "meta-llama/Meta-Llama-3-8B-Instruct",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
    })) {
        // result += process.stdout.write(chunk.choices[0]?.delta?.content || "");
        result += chunk.choices[0]?.delta?.content || "";
    }
    return result;
}

export default codeGenetor;