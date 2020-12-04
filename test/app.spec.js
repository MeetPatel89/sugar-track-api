
const app = require('../src/app');

describe('App', () => {
    it('GET / responds with 200 containing "Hello, sugar-track-api!"', () => {
        return supertest(app)
            .get('/')
          
            .expect(200, 'Hello, sugar-track-api!');

    });

});

