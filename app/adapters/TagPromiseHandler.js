'use strict';
import Utils from '../utilities';

/**
 * TagPromiseHandler
 * hanle ajax promises which has special tag
 */
const getTag = (tags) => {

	if (Utils.isString(tags)) {
		return tags.toLowerCase();

	} else if (Utils.isArray(tags)) {
		return tags.join(',').toLowerCase();

	}

	throw new Error('wrong tag format');
};
const TagPromiseHandler = function () {
	this.store = {};
};

/**
 * [add description]
 * @param {[type]} tag     [description]
 * @param {[type]} request [description]
 */
TagPromiseHandler.prototype.add = function (tags) {
	const self = this;
	const tag = getTag(tags);

	if (!this.store[tag]) {
		const tags = {};

		tag.split(',').map(x=> {
			tags[x] = {
				isFinished: false,
				statusCode: 0,
				isSuccess: false
			};
		});

		this.store[tag] = {
			tag: tag,
			tags: tags,
			resolve: null,
			reject: null
		};
	}

	return {
		then: (resolve, reject) => {
			self.store[tag].resolve = resolve;
			self.store[tag].reject = reject;
			return this;
		}
	};
};

/**
 * [observe description]
 * @param  {[type]} tags    [description]
 * @param  {[type]} initial [description]
 * @param  {[type]} resolve [description]
 * @param  {[type]} reject  [description]
 * @param  {[type]} handler [description]
 * @return {[type]}         [description]
 */
TagPromiseHandler.prototype.observe = function (tag, statueCode, isSuccess) {
	const self = this,
	store = this.store;

	Object.keys(store).forEach(x => {
		const storeTag = store[x];

		if (storeTag.tags[tag]) {
			storeTag.tags[tag].statusCode = statueCode;
			storeTag.tags[tag].isSuccess = isSuccess;
			storeTag.tags[tag].isFinished = statueCode !== 0;

			self.handlePromise(storeTag);
		}
	});
};

/**
 * [handlePromise description]
 * @param  {[type]} tags [description]
 * @return {[type]}      [description]
 */
TagPromiseHandler.prototype.handlePromise = function (storeTag) {
	let isSuccess = true;
	let isFinished = true;

	Object.keys(storeTag.tags).forEach(x=> {
		if (!storeTag.tags[x].isFinished) {
			isFinished = false;
		}
		if (!storeTag.tags[x].isSuccess) {
			isSuccess = false;
		}
	});

	if (isFinished === true) {
		if (isSuccess === true) {
			storeTag.resolve();
		} else {
			storeTag.reject();
		}
	}
};

module.exports = TagPromiseHandler;
