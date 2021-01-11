import asyncHandler from 'express-async-handler';

import { app } from '../server';
import { createApplication } from '../lib/application';
import { Joi, validate } from 'express-validation';

const applicationValidation = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

app.post(
  '/applications',
  validate(applicationValidation),
  asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const id = await createApplication(name);
    res.status(201).json({ id });
  }),
);
