const chai = require('chai');
const expect = chai.expect;
const morgan = require('../../middlewares/morgan');

describe('morgan', () => {
  context('#cloudflareIDtoken', () => {
    let request = { headers: { 'cf-ray': 123 } };

    it('returns the correct request header property', () => {
      expect(morgan.cloudflareIDToken(request)).to.eq(123);
    });

    context('when the header does not exist', () => {
      it('returns an undefined header', () => {
        delete request.headers['cf-ray']

        expect(morgan.cloudflareIDToken(request)).to.eq(undefined);
      });
    });
  });

  context('#typeToken', () => {
    it('returns the string "access', () => {
      expect(morgan.typeToken()).to.eq('access');
    });
  });
});

