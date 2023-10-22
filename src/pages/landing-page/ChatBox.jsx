import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import Input from "../../components/Input";

const ChatBox = () => {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleQnA = async () => {
    setLoading(true);
    const qnaPrompt = `Question: ${prompt}\nAnswer:`;

    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: qnaPrompt,
        temperature: 0.5,
        max_tokens: 3000,
      })
      .then((response) => {
        setResult(response?.data?.choices[0].text);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  console.log("result", result);
  return (
    <div id="chatbox">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="font-bold text-4xl">ChatBox</h1>
        <p className="font-extralight pb-8 pt-2">
          Welcome to our ChatBox section. Here you can find answers to common
          questions
        </p>
        <div className="gap-y-2 flex flex-col pt-2">
          <div className="w-full flex justify-center gap-x-2">
            <Input
              id={"qna"}
              placeholder={"Ask a question..."}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleQnA}
              className=" bg-[#347C00] hover:bg-[#2B6700] text-white w-28 rounded"
            >
              Ask
            </button>
          </div>
          <div className="h-80">
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-[32.5rem] text-black h-full rounded-md shadow-md"
            ></textarea>
            {loading === true && (
              <div className="font-semibold text-red-500">
                Please Wait, your prompt in progress
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
