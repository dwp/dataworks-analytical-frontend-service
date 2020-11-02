import apiCall from "./api";
import {mockAuthHelper, mockFetch} from "./testUtils";

describe('Create environment function', () => {
    beforeEach(() => jest.clearAllMocks())

    it('Successfully returns desktop url', async (done) => {
        mockFetch(200, 'envurl.local');
        const {AuthHelper, getCurrentUser} = mockAuthHelper();
        const desktopUrl = await (apiCall(AuthHelper(), "connect"))

        expect(global.fetch).toBeCalledTimes(1);
        expect(getCurrentUser).toBeCalledTimes(1);
        expect(desktopUrl).toEqual('https://envurl.local?token=token')
        done();
    });

    it('Throws on backend error', async (done) => {
        mockFetch(500, {message: 'Error encountered', error: "Internal Server Error"});
        const {AuthHelper} = mockAuthHelper();

        await expect(apiCall(AuthHelper(), "connect")).rejects.toEqual(new Error('500 Internal Server Error: Error encountered'));
        done();
    });

    it('Throws on connection error', async(done) => {
        const {AuthHelper, getCurrentUser} = mockAuthHelper();
        const err = new Error('Connection Error');
        jest.spyOn(global, 'fetch').mockImplementation(() => {throw err});
        await expect(apiCall(AuthHelper(), "connect")).rejects.toEqual(err);
        done();
    });
});

describe('Destroy environment function', () => {
    beforeEach(() => jest.clearAllMocks());

    it('Successfully destroys environment', async (done) => {
        mockFetch(200);
        const {AuthHelper} = mockAuthHelper();
        await apiCall(AuthHelper(), "disconnect");

        expect(global.fetch).toBeCalledWith('/disconnect?id_token=token');
        done();
    });

    it('Throws on backend error', async (done) => {
        mockFetch(500, {message: 'Error encountered', error: "Internal Server Error"});
        const {AuthHelper} = mockAuthHelper();

        await expect(apiCall(AuthHelper(), "disconnect")).rejects.toEqual(new Error('500 Internal Server Error: Error encountered'));
        done();
    });

    it('Throws on connection error', async(done) => {
        const {AuthHelper } = mockAuthHelper();
        const err = new Error('Connection Error');
        jest.spyOn(global, 'fetch').mockImplementation(() => {throw err});
        await expect(apiCall(AuthHelper(), "disconnect")).rejects.toEqual(err);
        done();
    });
});

describe('Verify user attributes in JWT function', () => {
    beforeEach(() => jest.clearAllMocks())

    it('Calls endpoint and returns true if user attributes are in JWT', async(done) => {
        mockFetch(200);
        const {AuthHelper} = mockAuthHelper();
        const result = await apiCall(AuthHelper(), "verify-user");

        expect(result).toBe(true);
        expect(global.fetch).toBeCalledWith('/verify-user?id_token=token');
        done();
    })    
    
    it('Calls endpoint and redturns false, if user attributes aren`t in JWT', async(done) => {
        mockFetch(404);
        const {AuthHelper} = mockAuthHelper();
        const result = await apiCall(AuthHelper(), "verify-user");

        expect(result).toBe(false);
        expect(global.fetch).toBeCalledWith('/verify-user?id_token=token');
        done();
    })
})
