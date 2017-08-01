import { mount } from 'enzyme'
import React from 'react'
import GuestStore from 'stores/GuestStore'

import GuestEntry from 'components/GuestEntry.jsx'

describe("GuestEntry", function () {
  const store = {
    guests: [],
    addGuest: guest => {
      store.guests.push({ guest: guest })
    }
  }

  const realStore = new GuestStore()

  it("calls addGuest on enter key", () => {
    const wrapper = mount(<GuestEntry guestStore={store} />)

    const input = wrapper.find("input")
    input.get(0).value = 'Euron'
    input.simulate("keydown", { keyCode: 13, preventDefault: () => {} })

    expect(store.guests.length).toBe(1)
    expect(store.guests[0].guest).toBe('Euron')
  })

  it("updates store guests when guest added on enter key", () => {
    const wrapper = mount(<GuestEntry guestStore={realStore} />)

    const input = wrapper.find("input")
    input.get(0).value = 'Euron'
    input.simulate("keydown", { keyCode: 13, preventDefault: () => {} })

    expect(realStore.guests.length).toBe(1)
    expect(realStore.guests[0].guest).toBe('Euron')
  })

})

