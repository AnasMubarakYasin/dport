import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export interface IPortfolio {
  profile: {
    name: string;
    description: string;
    image: string;
    likes: number;
  };
  about: {
    description: string;
    additional: {
      title: string;
      description: string;
    }[]
  };
  expriences: [];
  projects: {
    logo: string;
    title: string;
    subtitle: string;
    description: string;
    link: string;
  }[];
}

const SchemaPortfolio = new Schema<IPortfolio>({
  profile: new Schema({
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: {
      type: Number,
    },
  }),
  about: new Schema({
    description: {
      type: String,
    },
    additional: [new Schema({
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    })]
  }),
  expriences: [],
  projects: [new Schema({
    logo: {
      type: String,
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
  })],
});

export const ModelPortfolio = model('Portfolio', SchemaPortfolio);
