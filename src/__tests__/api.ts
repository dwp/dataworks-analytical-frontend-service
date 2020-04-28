import {connect} from '../utils/api.js'
import appConfig from "../utils/appConfig";

describe ("canConnect",() => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it("returns url on success", async () => {
    fetch.mockResponseOnce(JSON.stringify({
      status: 200,
      body : 'myurl' 
    }));
    expect( await connect('mytoken')).toBe('myurl');

    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual(appConfig.REACT_APP_API_CONNECT_ENDPOINT)

  });
})
