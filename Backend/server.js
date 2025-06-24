const express = require('express');
const cors = require('cors');
const app = express();
const queryRoute = require('./routes/queryRoute');

app.use(cors());
app.use(express.json());
app.use('/api/query', queryRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
