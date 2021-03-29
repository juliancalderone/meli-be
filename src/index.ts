import axios from 'axios';
import cors from 'cors';
import express from 'express';
import {
  getDescriptionEndpoint,
  getDetailsEndpoint,
  getSearchEndpoint,
} from './apiEndpoints';
import formatDetailResponse from './formatDetailResponse';
import formatItemsResponse from './formatItemsResponse';

const app = express();
const PORT = 8080;

app.use(cors());

app.get('/api/items', async (req, res) => {
  const query = req.query.q;
  const searchAPIUrl = getSearchEndpoint(query as string);

  try {
    const { data } = await axios.get(searchAPIUrl);
    const response = formatItemsResponse(data);

    res.json(response);
  } catch (e) {
    res.json(e);
  }
});

app.get('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  const detailsAPIUrl = getDetailsEndpoint(id);
  const descriptionAPIUrl = getDescriptionEndpoint(id);

  try {
    const requests = [axios.get(detailsAPIUrl), axios.get(descriptionAPIUrl)];
    const [{data: detail}, {data: description}] = await Promise.all(requests);
    const response = formatDetailResponse(detail, description);

    res.json(response);
  } catch (e) {
    res.json(e);
  }
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
