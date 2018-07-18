'use strict';
import Promise from './../helpers/promise';

/**
 * TagPromiseHandler
 * hanle ajax promises which has special tag
 */
const TagPromiseHandler = function () {
	this.store = [];
	this.sequence;
};

/**
 * [add description]
 * @param {[type]} tag     [description]
 * @param {[type]} request [description]
 */
TagPromiseHandler.prototype.add = function (tag, request) {
	const uuid = (new Date()).getTime();
	const isExist = this.store.find(x => x.tag === tag);

	if (!isExist) {
		this.store.push({
			tag: tag,
			promises: {}
		});
	}

	this.store.map(x => {
		if (x.tag === tag) {
			x.promises[uuid] = request;
		}
		return x;
	});
};
/**
 * [handle description]
 * @param  {[type]} tags    [description]
 * @param  {[type]} initial [description]
 * @return {[type]}         [description]
 */
TagPromiseHandler.prototype.handle = function (tags, initial) {
	const self = this;

	return new Promise((resolve, reject, handler) => {
		self.observe(tags, initial, resolve, reject, handler);
	});
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
TagPromiseHandler.prototype.observe = function (tags, initial, resolve, reject, handler) {
	const self = this,
	promiseStatic = {
		success: 0,
		fail: 0,
		pending: 0,
		total: 0
	},
	OnPromiseLoaded = () => {
		if (promiseStatic.total === promiseStatic.success) {
			resolve();
		} else if (promiseStatic.total === promiseStatic.success + promiseStatic.fail) {
			reject();
		}
	},
	tagPromiseStore = this.store.filter(x => tags.indexOf(x.tag) !== -1);

	this.sequence = !initial ? this.sequence : 0;

	if (!tagPromiseStore && tagPromiseStore.length) {
		return false;
	}

	tagPromiseStore.forEach(promise => {
		Object.keys(promise.promises).forEach(uuid => {
			promiseStatic.total++;
			promise.promises[uuid].xhr.onload = function (xhr) {
				const statusCode = xhr.target.status;

				if (statusCode === 0) {
					promiseStatic.pending++;
				} else if (statusCode >= 200 && statusCode < 300) {
					promiseStatic.success++;
				} else {
					promiseStatic.fail++;
				}

				OnPromiseLoaded();
			};
		});
	});

	if (this.sequence > 10) { return true; }
	this.sequence++;
	setTimeout(function () {
		self.observe(tags, false, resolve, reject, handler);
	}, 1000);

	return true;
};

module.exports = TagPromiseHandler;
