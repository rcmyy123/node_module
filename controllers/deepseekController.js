const { OpenAI } = require('openai');
const asyncHandler = require('express-async-handler');

// 初始化DeepSeek客户端
const deepseekClient = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL
});

// 聊天接口
const chatCompletion = asyncHandler(async (req, res) => {
  try {
    const { messages, model = "deepseek-chat", stream = false } = req.body;
    
    const completion = await deepseekClient.chat.completions.create({
      model,
      messages,
      stream
    });
    
    res.json(completion);
  } catch (error) {
    console.error('DeepSeek API错误:', error);
    res.status(500).json({
      message: '调用DeepSeek API时出错',
      error: error.message
    });
  }
});

module.exports = {
  chatCompletion
};
