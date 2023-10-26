const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/excel', (req, res) => {
  const csvFilePath = path.join(__dirname, 'src/assets/file/testData.xlsx');
  res.setHeader('Content-Type', 'text/csv');
  res.sendFile(csvFilePath);
});

const port = process.env.PORT || 3000; // Use the desired port, e.g., 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});