import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { connect } from '../../Connection/db';
import note from '../../model/Note';
import schema from './schema';

const helloWorld: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await connect();

  console.log(event.pathParameters.id);
  const data = await note.findByIdAndRemove({ '_id': event.pathParameters.id });
  console.log(data);
  return formatJSONResponse({
    message: `Data deleted successfully`,
    event,
  });
};

export const main = middyfy(helloWorld);
