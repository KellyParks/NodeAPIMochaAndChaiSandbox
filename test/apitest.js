const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const server = require('../server');
const data = require('../data');

describe('API tests', () => {

    const initialExpectedGenres = [
        { id: 1, genre: 'Science Fiction' },
        { id: 2, genre: 'Fantasy' },
        { id: 3, genre: 'Thriller' },
    ];

    describe('GET requests', () => {

        it('it should return all the genres', (done) => {
            chai.request(server)
                .get('/api/genres')
                /* end() is used to assert on the response. Assertions are done
                in the callback that's passed to it. */
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    /* 'deep' checks the values (but not their types) in an array
                    or object. I think if you don't specify 'deep' it will check 
                    if the two arrays are the same in memory. */
                    expect(response.body).to.deep.equal(initialExpectedGenres);

                    /* Assertions are done asynchronously. There needs to be a way to
                    tell Mocha that the callback is completed. Mocha waits until done()
                    is called, or the timeout expires. This is probably why I kept getting
                    timeout errors on my socket.io tests? */
                    done();
                    /* without done() the test may pass before it runs. Is it best practice to
                    always end with done() then? */
                });
        });

        it('it should return the requested genre by id', (done) => {
            chai.request(server)
                .get('/api/genres/2')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    expect(response.body).to.deep.equal(initialExpectedGenres[1]);
                    done();
                });
        });

        it('it should return an error if the id does not exist', (done) => {
            chai.request(server)
                .get('/api/genres/222')
                /* Looks like in chai v 4, 'error' no longer represents error status codes
                I'm guessing that means 'error' is used for test errors, but the docs aren't clear */
                .end((error, response) => {
                    expect(error).to.be.null;
                    response.should.have.status(404);
                    expect(response.body).to.be.empty;
                    expect(response.text).to.deep.equal('The genre for the passed ID was not found.');
                    done();
                });
        });
    });

    describe('POST requests', () => {

        it('it should create and return the new genre', (done) => {
            chai.request(server)
            .post('/api/genres')
            .send({
                genre: "Period Drama"
            })
            .end((error, response) => {
                expect(error).to.be.null;
                response.should.have.status(200);
                response.body.should.be.a('object');
                expect(response.body).to.deep.equal({
                    id: 4,
                    genre: "Period Drama"
                });
                console.log(data);
                done();
            });
        });
    });
});