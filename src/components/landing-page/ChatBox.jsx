import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

import Input from "../Input";

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
      <div className="w-full md:h-[600px] lg:h-screen flex flex-col justify-center items-center py-24 md:py-0">
        <h1 className="font-bold text-4xl">ChatBox</h1>
        <p className="font-extralight text-center md:text-start pb-8 p-2">
          Welcome to our ChatBox section. Here you can find answers to common
          questions
        </p>
        <div className="gap-y-2 flex flex-col pt-2">
          <div className="w-80 md:w-full md:flex justify-center md:gap-x-2">
            <input
              id="qna"
              type="text"
              placeholder="Ask a question..."
              value={prompt}
              autoComplete="off"
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full  rounded-[4px] h-10"
            />
            <button
              onClick={handleQnA}
              className=" bg-[#347C00] hover:bg-[#2B6700] text-white mt-2 md:mt-0 h-10 w-full md:w-28 rounded"
            >
              Ask
            </button>
          </div>
          <div className="h-80">
            <textarea
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full md:w-[32.5rem] text-black h-full rounded-md shadow-md"
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
