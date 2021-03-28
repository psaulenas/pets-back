import { QueryConfig } from 'pg';

const getAnimalItems = (): QueryConfig => {
    const text = 'SELECT * from animal_item';
    return { text };
}

export default getAnimalItems;
