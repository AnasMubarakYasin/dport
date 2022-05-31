import { ModelPortfolio, type IPortfolio } from '../../models/portfolio';
import mongoose from 'mongoose';
import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

const { Types } = mongoose;

export const post: RequestHandler = async function ({ request }): Promise<RequestHandlerOutput> {
  const data = await request.json() as IAPILike;

  // console.log('[post like]', data);
  
  try {
    if (await ModelPortfolio.exists({ _id: new Types.ObjectId(data.id) })) {
      await ModelPortfolio.findByIdAndUpdate(new Types.ObjectId(data.id), { profile: { likes: data.likes } });
    } else {
      throw new Error("Not Found");
    }
    return {
      status: 201,
    };
  } catch (error: any) {
    return {
      status: 404,
      body: error,
    };
  }
}
