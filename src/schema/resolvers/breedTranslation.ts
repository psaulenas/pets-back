import { IResolvers } from 'graphql-tools';
import createBreedTranslationQuery from '../../sql-queries/breedTranslation';

const resolvers: IResolvers = {
    Mutation: {
        createBreedTranslation: async (_, { input }, { pgClient }) => {
            const dbResponse = await pgClient.query(
                createBreedTranslationQuery(input)
            );

            return dbResponse.rows[0];
        },
    },
};

export default resolvers;
