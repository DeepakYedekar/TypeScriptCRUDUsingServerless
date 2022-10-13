import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { connect } from '../../Connection/db';
import note from '../../model/Note';
import schema from './schema';

const getData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await connect();
  const result = await note.findOne({ '_id': event.pathParameters.id });
  return formatJSONResponse({
    message: `This is the data`,
    result:result
      })

  
};

export const main = middyfy(getData);
