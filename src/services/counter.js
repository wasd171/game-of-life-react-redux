export default {
	counter: 3,

	get: function (id, params, callback) {
		console.log('get triggered', this.counter);
		callback(null, {counter: this.counter});
	},

	update: function (id, data, params, callback) {
		console.log('update triggered', data);
		this.counter = data.counter;
		callback(null, {counter: this.counter});
	}
}