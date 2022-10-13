import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { connect } from '../../Connection/db';
import note from '../../model/Note';
import schema from './schema';

const getData: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  await connect()
  let page:number=Number(event.pathParameters.page);
  let result = await note.find({}).limit(10*1).skip((page-1)*10);
  return formatJSONResponse({
    data: result,
  })
};

export const main = middyfy(getData);
