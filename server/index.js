const express = require('express');
const SibApiV3Sdk = require('sib-api-v3-sdk');
const app = express();
const cors=require('cors')
const ejs=require('ejs')
const fs=require('fs')
app.use(express.json())
app.use(cors())
//configure the Sendinblue API client
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

//define a route to handle the email submission
app.post('/api/sendEmail', async (req, res) => {
  const { name, email } = req.body;

  try {
    const template = fs.readFileSync('./template.ejs', 'utf-8');
    const htmlContent = ejs.render(template, { name });

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    //prepare the email data
    const sender = {
      email:"manasaa.adusumilli@gmail.com",
      name: "Sellerkin",
    }
    const receivers=[
      {
        email:email
      }
    ]

    //send the transactional email
    const response = await apiInstance.sendTransacEmail({
      sender,
      to:receivers,
      subject: "Hey there! You Subscribed to us!",
      textContent:"Welcome to Sellerkin!",
      htmlContent:htmlContent,
    });
    console.log('Email sent successfully:', response);
    res.sendStatus(200);
  } catch (error) {
    console.error('Failed to send email:', error);
    res.sendStatus(500);
  }
});

//start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});