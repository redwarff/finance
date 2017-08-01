import { shallow } from 'enzyme'
import React from 'react'

import Guest from 'components/Guest.jsx'

describe("Guest", function() {
  const guest = { guest: 'Mariah' }

  it("renders guest's name", () => {
    const wrapper = shallow(<Guest guest={guest} />)

    expect(wrapper.find('div').at(0).text()).toBe('Mariah')
  })

  it('renders correctly (snapshot)', () => {
  const wrapper = shallow(<Guest guest={guest} />)

  expect(wrapper).toMatchSnapshot();
});

})