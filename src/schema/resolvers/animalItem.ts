import { IResolvers } from 'graphql-tools';
import getAnimalItems from '../../sql-queries/animalItem';

// const animalItems = [
//     {
//         id: 1,
//         animal_id: 2,
//         item_name: 'Test item',
//     },
//     {
//         id: 2,
//         animal_id: 3,
//         item_name: 'Test item 1',
//     },
// ];

const resolvers: IResolvers = {
    Query: {
        animalItems: async (_, __, { pgClient }) => {
            const result = await pgClient.query(getAnimalItems());
            return result.rows;
        },
    },
};

export default resolvers;
