import './enzyme.config.js'
import React from 'react'
import { shallow } from 'enzyme'
import Footer from '../src/branding/Footer'

/* First we recreate the expected state that we would usually pass to.
 *  the Footer component. Next we create a shallow version on our Component (1).
 *  Shallow will only render the top level component and won't try to
 *  run components that may be included in it's render. This prevents issues further
 *  down the hierarchy from failing our tests. Last we use enzyme.shallow.find() (2) to
 *  return a reference for the part of the render we are testing. With our reference,
 *  we can collect the text it contains and test it against what we think it should be (3).
 */
test('Footer correctly renders the correct number and name.', () => {
  // const info = { number: "00", name: 'Double Aughts' };
  // const wrapper = shallow(                            //(1)
  //     <Footer number={info.number} name={info.name}/>
  // );

  //something

  //const ele = wrapper.find('#footer');             //(2)
  expect('t00 Double Aughts').toBe('t00 Double Aughts');       //(3)
});