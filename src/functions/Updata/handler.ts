import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { connect } from '../../Connection/db';
import note from '../../model/Note';
import schema from './schema';

const helloWorld: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await connect();
  let data = {
    title: event.body.title,
    description: event.body.description
  }
  const update = await note.findByIdAndUpdate(event.pathParameters.id, data, { new: true })
   if(update) {
      return formatJSONResponse({
    message: `data is updated`
  });
  }
};

export const main = middyfy(helloWorld);
