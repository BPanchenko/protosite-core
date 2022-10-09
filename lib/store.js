import EventEmmiter from "./event-emmiter.js"

export default class Store extends EventEmmiter {
	#actions = {}
	#debug = false
	#mutations = {}

	state
	status = 'resting'

	constructor(params) {
		super()
		
		if(params.hasOwnProperty('actions')) {
			this.#actions = params.actions
		}

		if(params.hasOwnProperty('debug')) {
			this.#debug = params.debug
		}

		if(params.hasOwnProperty('mutations')) {
			this.#mutations = params.mutations
		}

		this.state = new Proxy((params.state || {}), {
			set: (state, key, value) => {
				const previosValue = state[key]
				const previosState = { ...state }

				state[key] = value

				if (this.#debug) console.log(`change:state:${key}`, value, previosValue)
				this.trigger(`change:state:${key}`, value, previosValue)
				
				if (this.#debug) console.log('update:state', state, previosState)
				this.trigger('update:state', state, previosState)

				if(this.status !== 'mutation') {
					console.warn(`You should use a mutation to set ${key}`)
				}

				this.status = 'resting'

				return true
			}
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
		if(typeof this.#actions[actionKey] !== 'function') {
			console.error(`Action "${actionKey} doesn't exist.`)
			return false
		}

		// Create a console group which will contain the logs from our Proxy etc
		console.groupCollapsed(`ACTION: ${actionKey}`)

		// Let anything that's watching the status know that we're dispatching an action
		this.status = 'action'

		// Actually call the action and pass it the Store context and whatever payload was passed
		this.#actions[actionKey](this, payload)

		// Close our console group to keep things nice and neat
		console.groupEnd()

		return true
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
		if(typeof this.#mutations[mutationKey] !== 'function') {
			console.log(`Mutation "${mutationKey}" doesn't exist mate`);
			return false;
		}

		// Let anything that's watching the status know that we're mutating state
		this.status = 'mutation';

		// Get a new version of the state by running the mutation and storing the result of it
		let newState = this.#mutations[mutationKey](this.state, payload);

		// Merge the old and new together to create a new state and set it
		this.state = Object.assign(this.state, newState);

		return true;
	}
}
