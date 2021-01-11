import asyncHandler from 'express-async-handler';

import { app } from '../server';

app.get(
  '/health',
  asyncHandler(async (req, res, next) => {
    res.status(200).send('OK');
  }),
);
