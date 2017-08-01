import React from 'react'
import {observer} from 'mobx-react'

const ENTER_KEY = 13

@observer
export default class GuestEntry extends React.Component {


	handleKeyDown = (event) => {
		if (event.keyCode !== ENTER_KEY) {
			return
		}

		event.preventDefault()

		const input = this.input
		const val = input.value.trim()
		if (val) {
			this.props.guestStore.addGuest(val)
			input.value = ''
		}
	}

	render() {
		return (
			<input
				ref={e => this.input = e}
				placeholder="Name"
				onKeyDown={this.handleKeyDown}
				autoFocus={true}
			/>
		)
	}
}
