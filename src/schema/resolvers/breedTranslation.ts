import { IResolvers } from 'graphql-tools';
import { PubSub } from 'apollo-server-express';
import { Validator } from 'node-input-validator';
import createBreedTranslationQuery from '../../sql-queries/breedTranslation';

const pubsub = new PubSub();
const BREED_CREATED = 'BREED_CREATED';

const resolvers: IResolvers = {
    Mutation: {
        createBreedTranslation: async (_, { input }, { pgClient }) => {
            const v = new Validator(input, {
                breed: 'required',
                language: 'required|maxLength:4',
                translation: 'required',
            });

            const matched = await v.check();

            if (!matched) {
                throw new Error(JSON.stringify(v.errors));
            }

            const dbResponse = await pgClient.query(
                createBreedTranslationQuery(input)
            );

            pubsub.publish(BREED_CREATED, {
                breedTranslationCreated: dbResponse.rows[0],
            });

            return dbResponse.rows[0];
        },
    },
    Subscription: {
        breedTranslationCreated: {
            subscribe: () => pubsub.asyncIterator([BREED_CREATED]),
        },
    },
};

export default resolvers;
