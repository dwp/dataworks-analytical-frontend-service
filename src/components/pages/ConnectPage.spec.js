import React from "react";
import {mount} from "enzyme";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import ConnectPage from "./ConnectPage";
import {mockAuthHelper, mockFetch} from "../../utils/testUtils";
import {Pages} from "../NavigationComponent";
import {AuthContext} from "../../utils/Auth";

const mockNav = {go: jest.fn()}

const authMock = mockAuthHelper();
const MockAuthProvider = ({children}) => <AuthContext.Provider
    value={authMock.AuthHelper()}>{children}</AuthContext.Provider>;

describe("<ConnectPage/>", () => {
    beforeEach(() => jest.clearAllMocks())

    it("Navigates to DESKTOP page when 200 received", async (done) => {
        mockFetch(200);
        const desktopUrl = "http://test.url?token=token"
        const wrapper = mount(<ConnectPage url={desktopUrl} nav={mockNav}/>);

        process.nextTick(() => {
            expect(mockNav.go).toBeCalledWith(Pages.DESKTOP, { desktopUrl: desktopUrl });
            done();
        })
    });

    it("Dispatches error toast and navigates to Main Page when timeout reached", async (done) => {
        mockFetch(504);
        const desktopUrl = "http://test.url?token=token"
        const wrapper = mount(
            <MockAuthProvider>
                <ConnectPage url={desktopUrl} nav={mockNav} timeout={-1000 * 10000} interval={0}/>
            </MockAuthProvider>);

        process.nextTick(() => {
            expect(global.fetch).toBeCalledTimes(1);
            expect(mockNav.go).toBeCalledWith(Pages.MAIN);
            expect(authMock.dispatchAuthToast).toBeCalledTimes(1);
            done();
        });

    });
});
