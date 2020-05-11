import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HandleDelay from './components/startupDelay';

test('Displays signin button', () => {
});

Enzyme.configure({adapter: new Adapter() });

describe('HandleDelay', () => {
  it('fetches data from server when server returns a successful response', done => {
    const mockSuccessResponse = "testurl";
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({ 
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    const wrapper = shallow(<HandleDelay />);
    wrapper.instance().getClusterUrl()
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:80/login', {"cache": "no-cache", "headers": {"Content-Type": "application/json"}, "method": "POST", "mode": "cors"});
    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        status:"Cluster Ready",waitTime:"",clusterUrl:"",minutes: 5,seconds: 0,status: "Please wait for For clusters to Spin up", waitTime: "Estimate Wait Time",
      });
      global.fetch.mockClear();
      done();
    });
  });
});
