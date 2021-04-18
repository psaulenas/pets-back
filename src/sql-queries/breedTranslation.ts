import { QueryConfig } from 'pg';

interface CreateBreedTranslationInput {
    breed: number;
    language: String;
    translation: String;
}

export default (input: CreateBreedTranslationInput): QueryConfig => {
    const text = `INSERT INTO breed_translation
                   (breed,
                    language,
                    translation)
                  VALUES
                   ($1,
                    $2,
                    $3)
                  RETURNING
                    breed,
                    language,
                    translation;`;

    const query = {
        text,
        values: [input.breed, input.language, input.translation],
    };

    return query;
};
