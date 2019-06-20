import { expect } from 'chai'
import AutocompleteProvider from '@/services/AutocompleteProvider'

describe('AutocompleteProvider Service', () => {
  it('should exist', () => {
    expect(new AutocompleteProvider()).to.not.be.undefined;
  });

  it('should ingest passages', () => {
    let acp = new AutocompleteProvider();
    acp.train('aardvark baboon camel');
    expect(acp.data.size).to.be.equal(3);
    expect(acp.data.get('a').get('aardvark')).to.be.equal(1);
  });

  it('should keep count of trained word frequency', () => {
    let acp = new AutocompleteProvider();
    acp.train('aardvark aardvark camel');
    expect(acp.data.size).to.be.equal(2);
    expect(acp.data.get('a').get('aardvark')).to.be.equal(2);
    expect(acp.data.get('c').get('camel')).to.be.equal(1);
    acp.train('camel donkey diploticus');
    expect(acp.data.get('c').get('camel')).to.be.equal(2);
  });

  it('should give no guesses if untrained', () => {
    let acp = new AutocompleteProvider();
    expect(acp.getWords('sadness')).to.be.empty;
  })

  it('should respect return limit', () => {
    let acp = new AutocompleteProvider(4);
    acp.train('hey horton how hungry have you been?')
    expect(acp.getWords('h').length).to.be.equal(4);
  });

  it('should learn symbols, but split on traditional punctuation', () => {
    let acp = new AutocompleteProvider();
    acp.train('n1c3 n#(3 nope,nada& nil');
    let out = acp.getWords('n');
    expect(out.length).to.be.equal(5);
    expect(out.map(v => v[0])).to.have.members(['n1c3', 'n#(3', 'nope', 'nada&', 'nil']);
  })

  it('should give ranked autocomplete guesses', () => {
    let acp = new AutocompleteProvider();
    acp.train('ant anteater antlion');
    expect(acp.getWords('an').length).to.be.equal(3);
    expect(acp.getWords('an').map(v => v[1])).to.have.members([1,1,1]);
    acp.train('ant anteater antaries auntjemima ant');
    expect(acp.getWords('an')[0][0]).to.be.equal('ant');
    expect(acp.getWords('an')[0][1]).to.be.equal(3);
    expect(acp.getWords('an')[1][0]).to.be.equal('anteater');
    expect(acp.getWords('an')[1][1]).to.be.equal(2);
  })

  it('should handle the Asymmetrik challenge example 1', () => {
    let acp = new AutocompleteProvider();
    acp.train('The third thing that I need to tell you is that this thing does not think thoroughly.');
    let out = acp.getWords('thi');
    let expected = [['thing', 2], ['think', 1], ['third', 1], ['this', 1]];
    expect(out[0]).to.have.members(expected[0]);
    expect(out.map(v => v[0])).to.have.members(expected.map(v=>v[0]));
    expect(out.length).to.be.equal(expected.length);
  })

  it('should handle the Asymmetrik challenge example 2', () => {
    let acp = new AutocompleteProvider();
    acp.train('The third thing that I need to tell you is that this thing does not think thoroughly.');
    let out = acp.getWords('nee');
    let expected = [['need', 1]];
    expect(out[0]).to.have.members(expected[0]);
    expect(out.map(v => v[0])).to.have.members(expected.map(v=>v[0]));
    expect(out.length).to.be.equal(expected.length);
  })

  it('should handle the Asymmetrik challenge example 3', () => {
    let acp = new AutocompleteProvider();
    acp.train('The third thing that I need to tell you is that this thing does not think thoroughly.');
    let out = acp.getWords('th');
    let expected = [['thing', 2], ['that', 2], ['think', 1], ['third', 1], ['this', 1], ['the', 1], ['thoroughly', 1] ];
    expect(out[0]).to.have.members(expected[0]);
    expect(out[1]).to.have.members(expected[1]);
    expect(out.map(v => v[0])).to.have.members(expected.map(v=>v[0]));
    expect(out.length).to.be.equal(expected.length);
  })

});
