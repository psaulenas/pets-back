import { QueryConfig } from 'pg';

export const getAnimalItems = (): QueryConfig => {
    const text = 'SELECT * from animal_item';
    return { text };
};

export const getAnimalItem = (id: number): QueryConfig => {
    const text = 'SELECT * from animal_item WHERE id = $1';
    return { text, values: [id] };
};
