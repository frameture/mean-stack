import * as supertest from 'supertest';
import App from '../app';

declare const describe;
declare const beforeEach;
declare const it;

describe('server', () => {

  let request;
  beforeEach(() => {
    request = supertest(new App().start())
      .get('/users')
      .set('Accept', 'application/json');
  });

  it('GET users', (done) => {
    request
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        if (!res.text) {
          throw new Error();
        }
      })
      .end(done);
  });
});
