import {AuthContext, AuthHelper} from "./Auth";
import {createEnvironment, destroyEnvironment} from "./api";

const mockFetch = (statusCode, body) => {
    const mockFetchPromise = Promise.resolve({
        status: statusCode,
        json: () => Promise.resolve(body),
        text: () => Promise.resolve(body)
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
}


const mockAuthHelper = () => {
    const getCurrentUser = jest.fn().mockImplementation(() => ({signInUserSession: {idToken: {jwtToken: "token"}}}));
    return {
        getCurrentUser,
        AuthHelper: jest.fn().mockImplementation(() => ({
            getCurrentUser,
        }))
    };
}

describe('Create environment function', () => {
    beforeEach(() => jest.clearAllMocks())

    it('Successfully returns desktop url', async (done) => {
        mockFetch(200, 'envurl.local');
        const {AuthHelper, getCurrentUser} = mockAuthHelper();
        const desktopUrl = await (createEnvironment(AuthHelper()))

        expect(global.fetch).toBeCalledTimes(1);
        expect(getCurrentUser).toBeCalledTimes(1);
        expect(desktopUrl).toEqual('https://envurl.local?token=token')
        done();
    });

    it('Throws on backend error', async (done) => {
        mockFetch(500, {message: 'Error encountered', error: "Internal Server Error"});
        const {AuthHelper} = mockAuthHelper();

        await expect(createEnvironment(AuthHelper())).rejects.toEqual(new Error('500 Internal Server Error: Error encountered'));
        done();
    });

    it('Throws on connection error', async(done) => {
        const {AuthHelper, getCurrentUser} = mockAuthHelper();
        const err = new Error('Connection Error');
        jest.spyOn(global, 'fetch').mockImplementation(() => {throw err});
        await expect(createEnvironment(AuthHelper())).rejects.toEqual(err);
        done();
    });
});

describe('Destroy environment function', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Successfully destroys environment', async (done) => {
        mockFetch(200);
        const {AuthHelper} = mockAuthHelper();
        await destroyEnvironment(AuthHelper());

        expect(global.fetch).toBeCalledWith('/disconnect?id_token=token');
        done();
    });

    it('Throws on backend error', async (done) => {
        mockFetch(500, {message: 'Error encountered', error: "Internal Server Error"});
        const {AuthHelper} = mockAuthHelper();

        await expect(destroyEnvironment(AuthHelper())).rejects.toEqual(new Error('500 Internal Server Error: Error encountered'));
        done();
    });

    it('Throws on connection error', async(done) => {
        const {AuthHelper } = mockAuthHelper();
        const err = new Error('Connection Error');
        jest.spyOn(global, 'fetch').mockImplementation(() => {throw err});
        await expect(destroyEnvironment(AuthHelper())).rejects.toEqual(err);
        done();
    });
});
