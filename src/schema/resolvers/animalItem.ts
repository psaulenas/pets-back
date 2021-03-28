import { IResolvers } from 'graphql-tools';
import { getAnimalItems, getAnimalItem } from '../../sql-queries/animalItem';

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
        animalItem: async (_, { id }, { pgClient }) => {
            const result = await pgClient.query(getAnimalItem(id));
            return result.rows[0];
        }
    },
};

export default resolvers;
