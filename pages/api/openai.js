const OpenAI = require("openai-api");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async (req, res) => {
  // Promt values
  const beforePromt = `Summarize this into comic strips:`;
  const afterPromt = `Create incremental comic strips:`;
  const breakPoint = `\n\n'''\n\n`;

  // Construct the prompt
  let prompt = `${beforePromt} ${breakPoint} ${req.body.name} ${breakPoint} ${afterPromt}`;

  // Log promt
  console.log(prompt);

  // Call OpenAI API
  const gptResponse = await openai.complete({
    engine: "text-davinci-003",
    prompt: `${prompt}`,
    maxTokens: 1500,
    temperature: 0.7,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0.5,
    bestOf: 1,
    n: 1,
  });

  res.status(200).json({ text: `${gptResponse.data.choices[0].text}` });
};
// model: "text-davinci-003",
// prompt: "",
