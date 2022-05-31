import { ModelPortfolio, type IPortfolio } from '../../models/portfolio';
import mongoose from 'mongoose';
import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

const { Types } = mongoose;

export const get: RequestHandler = async function ({ }): Promise<RequestHandlerOutput> {
  // await ModelPortfolio.deleteMany({});

  let portfolio = await ModelPortfolio.findOne().exec();

  if (!portfolio) {
    portfolio = new ModelPortfolio<IPortfolio>({
      profile: { name: "Your Name", description: 'Your Description', image: '', likes: 0 },
      about: {
        description: 'Your Description', additional: [
          { title: "Location", description: "Your Location" },
          { title: "Email", description: "Your Email" },
          { title: "Current Job", description: "Your Current Job" },
        ]
      },
      expriences: [],
      projects: []
    });
  }

  // console.log('[get]', portfolio);

  return {
    status: 200,
    body: { portfolio, id_portfolio: portfolio._id.toString() },
  };
}

export const post: RequestHandler = async function ({ request }): Promise<RequestHandlerOutput> {
  const data = await request.json() as IPortfolio;
  const portfolio = new ModelPortfolio<IPortfolio>(data);

  // console.log('[post]', portfolio);

  try {
    if (!portfolio.profile) {
      throw new Error("Profile empty");
    }
    if (await ModelPortfolio.exists({ _id: new Types.ObjectId(portfolio._id) })) {
      await ModelPortfolio.findByIdAndUpdate(new Types.ObjectId(portfolio._id), portfolio.toObject())
    } else {
      await portfolio.save();
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
