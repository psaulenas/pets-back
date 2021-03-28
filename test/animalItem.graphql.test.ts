import { expect } from 'chai';
import supertest from 'supertest';
import validate from './validators/animalItem.interface.validator';

require('dotenv').config({ path: './test/.env' });

const url = process.env.TEST_URL || 'http://localhost:8081';
const request = supertest(url);

describe('Test animalItem query', () => {
    it('Returns all animal items', (done) => {
        request.post('/graphql')
            .send({
                query: `{ 
                animalItems
                {
                    id,
                    animalId,
                    itemName
                }
            }`
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    done(err);
                }
                const { body: { data: { animalItems } } } = res;
                expect(animalItems).to.be.an('array');
                validate(animalItems[0]);
                expect(animalItems.length).to.be.above(4);
                return done();
            })
    });
    
    it('Returns single animal item by id', (done) => {
        request.post('/graphql')
            .send({
                query: `{ 
                animalItem (id: 2)
                {
                    id,
                    animalId,
                    itemName
                }
            }`
            })
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    // eslint-disable-next-line no-console
                    console.log(res.body);
                    done(err);
                }
                const { body: { data: { animalItem } } } = res;
                validate(animalItem);
                return done();
            })
    });
});
