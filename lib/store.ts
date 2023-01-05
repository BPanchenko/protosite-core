import EventEmmiter from './event-emmiter.js';
import isEqual from 'lodash/isEqual.js';
import isObject from 'lodash/isObject.js';

export default class Store extends EventEmmiter {
	#actions = {};
	#debug = false;
	#mutations = {};

	state;
	status = 'resting';

	constructor(params) {
		super();

		if (params.hasOwnProperty('actions')) {
			this.#actions = params.actions;
		}

		if (params.hasOwnProperty('debug')) {
			this.#debug = params.debug;
		}

		if (params.hasOwnProperty('mutations')) {
			this.#mutations = params.mutations;
		}

		this.state = new Proxy(params.state || {}, {
			set: (state, key, value) => {
				let previosValue = state[key];

				if (!isEqual(previosValue, value)) {
					if (isObject(state[key]) && isObject(value)) {
						previosValue = { ...previosValue };
						Object.assign(state[key], value);
					} else {
						state[key] = value;
					}

					if (this.#debug)
						console.log(`change:state:${key}`, {
							[key]: value,
							previos: previosValue,
							state: this.state,
						});

					this.trigger(`change:state:${key}`, {
						[key]: value,
						previos: previosValue,
						state: this.state,
					});
				}

				if (this.status !== 'mutation') {
					console.warn(`You should use a mutation to set ${key}`);
				}

				this.status = 'resting';

				return true;
			},
		});
	}

	/**
	 * A dispatcher for actions that looks in the actions
	 * collection and runs the action if it can find it
	 *
	 * @param {string} actionKey
	 * @param {mixed} payload
	 * @returns {boolean}
	 * @memberof Store
	 */
	dispatch(actionKey, payload) {
		// Run a quick check to see if the action actually exists
		// before we try to run it
		if (typeof this.#actions[actionKey] !== 'function') {
			console.error(`Action "${actionKey} doesn't exist.`);
			return false;
		}

		// Create a console group which will contain the logs from our Proxy etc
		if (this.#debug) console.groupCollapsed(`ACTION: ${actionKey}`);

		// Let anything that's watching the status know that we're dispatching an action
		this.status = 'action';

		// Actually call the action and pass it the Store context and whatever payload was passed
		this.#actions[actionKey](this, payload);

		// Close our console group to keep things nice and neat
		if (this.#debug) console.groupEnd();

		return true;
	}

	/**
	 * Look for a mutation and modify the state object
	 * if that mutation exists by calling it
	 *
	 * @param {string} mutationKey
	 * @param {mixed} payload
	 * @returns {boolean}
	 * @memberof Store
	 */
	commit(mutationKey, payload) {
		// Run a quick check to see if this mutation actually exists
		// before trying to run it
		if (typeof this.#mutations[mutationKey] !== 'function') {
			console.log(`Mutation "${mutationKey}" doesn't exist mate`);
			return false;
		}

		// Let anything that's watching the status know that we're mutating state
		this.status = 'mutation';

		const previosState = { ...this.state };
		const newState = this.#mutations[mutationKey](this.state, payload);

		Object.assign(this.state, newState);

		if (this.#debug)
			console.log('update:state', {
				state: this.state,
				previos: previosState,
			});
		this.trigger('update:state', {
			state: this.state,
			previos: previosState,
		});

		return true;
	}
}
