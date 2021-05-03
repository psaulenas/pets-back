import { IResolvers } from 'graphql-tools';
import {
    getAnimalFoundEventsQuery,
    createAnimalFoundEventQuery,
} from '../../sql-queries/animalEventFound';

const resolvers: IResolvers = {
    Query: {
        foundEvents: async (_, __, { pgClient }) => {
            const dbResponse = await pgClient.query(
                getAnimalFoundEventsQuery()
            );
            return dbResponse.rows;
        },
    },
    Mutation: {
        createFoundEvent: async (_, { input }, { pgClient }) => {
            const createFoundEventResult = await pgClient.query(
                createAnimalFoundEventQuery(input)
            );

            return createFoundEventResult.rows[0];
        },
    },
};

export default resolvers;
