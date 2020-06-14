const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const server = require('../server');

describe('API tests', () => {

    const expectedGenres = [
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
                    expect(response.body).to.deep.equal(expectedGenres);

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
                    expect(response.body).to.deep.equal(expectedGenres[1]);
                    done();
                });
        });

    });
});