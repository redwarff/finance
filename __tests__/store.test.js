import GuestStore from 'stores/GuestStore.js'

describe('Guest store', () => {
  it('creates new guests', () => {
    const store = new GuestStore()
    store.addGuest('Mariah')
    store.addGuest('John')
    expect(store.guests.length).toBe(2)
    expect(store.guests[0].guest).toBe('Mariah')
    expect(store.guests[1].guest).toBe('John')
  })
})