const express = require('express');
const cors = require('cors');
const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = '689299467388-j3qc9vn4j3m5hmje3u6s56qf2534e7bq.apps.googleusercontent.com';


const client = new OAuth2Client(CLIENT_ID);
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    res.json({
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
