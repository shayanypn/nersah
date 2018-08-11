/* global describe, it, before */

import chai from 'chai';
import Nersah from '../dist/nersah.js';

chai.expect();
const expect = chai.expect;

describe('Given an instance of nersah library', () => {
	describe('when I need the name', () => {
		it('should return the name', () => {
			expect(Nersah.name).to.be.equal('nersah');
		});
	});
});