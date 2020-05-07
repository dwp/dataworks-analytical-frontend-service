import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HandleDelay from './components/startupDelay';


Enzyme.configure({adapter: new Adapter() });

test('Displays signin button', () => {
});

// test("response status from connection to the Orchestration Service",()=>{
//     try{fetch.then(response => {
//       expect(response.status).toBe(200 || 503 || 502)
//     })
//     }catch(e){
//       fetch.then(response =>{
//         expect(response.status).toBe("error")
//       })
//     }
//   }
//   )
//   test("cluster URL from the Orchestration Service",()=>{
//     try{fetch.then(response => {
//       expect(response.body).toBe(URL.toString)
//     })
//     }catch(e){
//       fetch.then(response =>{
//         expect(response.body).toBe("error")
//       })
//     }
//   }
//   )

describe('HandleDelay',()=>{
    it('response status from connection to the Orchestration Service',()=>{
        const wrapper = shallow(<HandleDelay {... getClusterUrl()} />);
        expect(wrapper.instance().getClusterUrl()).toBe("{}")

    })
})