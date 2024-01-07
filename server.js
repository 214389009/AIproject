const express = require('express');
const { OpenAI } = require("openai");
const app = express();
const port = 5000;
const openAi = new OpenAI({ apiKey: 'xxxxxxxx'}); // Replace 'your-api-key' with your actual API key


app.use(express.static('public'));

app.get('/get', async (req, res) => {
  const params = req.query;
  if  (!params || !params.category || !params.event || !params.atmosphere)
  {
    res.status(421).send("חסרים פרמטרים");
  }
  let ask = " בבקשה כתוב " +"3 נוסחים של"+ params.category + " באווירה " + params.atmosphere + " ל " + params.event;
  if (params.age !== '')
  {
    const parse_age = parseInt(params.age);
    if (isNaN(parse_age))
    {
      res.status(421).send("הגיל שבחרתם אינו הגיוני")
    }
    ask += "עבור גיל " + params.age;
  }
  try {
    const result = await openai.chat.completions.create({
        messages: [{ role: 'user', content: ask }],
        model: 'gpt-3.5-turbo',
        temperature: 0.8
        });

    console.log(result.choices[0].message.content);
    res.send(result.choices[0].message.content);
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app };
