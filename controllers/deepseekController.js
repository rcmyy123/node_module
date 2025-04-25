const { Configuration, OpenAIApi } = require('openai');
const asyncHandler = require('express-async-handler');

// 初始化DeepSeek客户端
const configuration = new Configuration({
  apiKey: process.env.DEEPSEEK_API_KEY,
  basePath: process.env.DEEPSEEK_BASE_URL
});
const deepseekClient = new OpenAIApi(configuration);

// 聊天接口
const chatCompletion = asyncHandler(async (req, res) => {
  try {
    const { messages, model = "deepseek-chat", stream = false } = req.body;
    
    const completion = await deepseekClient.createChatCompletion({
      model,
      messages,
      stream
    });
    
    res.json(completion.data);
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
