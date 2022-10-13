import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { connect } from '../../Connection/db';
import note from '../../model/Note';
import schema from './schema';

const helloWorld: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await connect();
  const {title,description } = event.body;
  const data=await note.create({title,description});
  return formatJSONResponse({
    message: `Data added`,
    data:data,
  });
};

export const main = middyfy(helloWorld);
