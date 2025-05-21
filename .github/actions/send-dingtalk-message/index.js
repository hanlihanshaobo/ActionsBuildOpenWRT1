const crypto = require('crypto');
const axios = require('axios');
const core = require('@actions/core');

async function run() {
  try {
    const webhook = core.getInput('webhook');
    const secret = core.getInput('secret');
    const message = core.getInput('message');

    let url = webhook;

    if (secret) {
      const timestamp = Date.now();
      const stringToSign = `${timestamp}\n${secret}`;
      const sign = crypto
        .createHmac('sha256', secret)
        .update(stringToSign)
        .digest('base64');
      const encodedSign = encodeURIComponent(sign);

      url += `&timestamp=${timestamp}&sign=${encodedSign}`;
    }

    await axios.post(url, {
      msgtype: 'text',
      text: { content: message }
    });

    console.log('✅ Message sent successfully.');
  } catch (error) {
    core.setFailed(`❌ Failed to send message: ${error.message}`);
  }
}

run();
