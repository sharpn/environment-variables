import asyncRequest from 'express-async-handler';

import { app } from '../server';
import { addNewVariableValue, createVariable } from '../lib/variables';

app.post(
  '/applications/:application_id/variables',
  asyncRequest(async (req, res, next) => {
    // const { application_id, key, value } = pickRqr(
    //   { application_id: string, key: string, value: string },
    //   req.params,
    //   req.body,
    // );
    // const id = await createVariable(application_id, key, value);
    // res.status(201).json({ id });
  }),
);

app.put(
  '/applications/:application_id/variables/:variable_id',
  asyncRequest(async (req, res, next) => {
    // const { application_id, variable_id, value } = pickRqr(
    //   {
    //     application_id: string,
    //     variable_id: string,
    //     value: string,
    //   },
    //   req.params,
    //   req.body,
    // );
    // await addNewVariableValue(application_id, variable_id, value);
    // res.status(202).send();
  }),
);
