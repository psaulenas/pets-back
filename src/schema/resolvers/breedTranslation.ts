import { IResolvers } from 'graphql-tools';
import { PubSub } from 'apollo-server-express';
import createBreedTranslationQuery from '../../sql-queries/breedTranslation';

const pubsub = new PubSub();
const BREED_CREATED = 'BREED_CREATED';

const resolvers: IResolvers = {
    Mutation: {
        createBreedTranslation: async (_, { input }, { pgClient }) => {
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
