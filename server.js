// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect('your_mongo_uri_here', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

// DangerZone Model
const dangerSchema = new mongoose.Schema({
  location: { lat: Number, lng: Number },
  type: String,
  description: String,
});
const DangerZone = mongoose.model('DangerZone', dangerSchema);

// Routes
app.post('/report-danger', async (req, res) => {
  const report = new DangerZone(req.body);
  await report.save();
  res.send({ message: 'Danger reported' });
});

app.get('/danger-zones', async (req, res) => {
  const reports = await DangerZone.find();
  res.send(reports);
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
