import React from "react";

import MainPage from "./MainPage";
import {mount} from "enzyme";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import Button from "react-mdl/lib/Button";
import {AuthContext} from "../../utils/Auth";
import {mockAuthHelper} from "../../utils/testUtils";
import {createEnvironment} from "../../utils/api";
import {act} from "react-dom/test-utils";
import {Pages} from "../NavigationComponent";

jest.mock("../../utils/api");


const authMock = mockAuthHelper();
const mockNav = {go: jest.fn()}

const MockAuthProvider = ({children}) => <AuthContext.Provider
    value={authMock.AuthHelper()}>{children}</AuthContext.Provider>;

describe("<MainPage/>", () => {
    beforeEach(() => jest.clearAllMocks());

    it("Redirects to Setup MFA page if user does not have MFA set up", async (done) => {
        authMock.getCurrentUser.mockImplementation(() => ({preferredMFA: "NONE"}))
        authMock.isFederated.mockImplementation(() => false)
        const wrapper = mount(<MockAuthProvider><MainPage nav={mockNav}/></MockAuthProvider>)

        process.nextTick(() => {
            act(() => {
                wrapper.update();
            });
            expect(mockNav.go).toBeCalledWith(Pages.SETUP_MFA);
            done();
        });
    });

    it("Does not redirect to Setup MFA page if user is federated", async (done) => {
        authMock.getCurrentUser.mockImplementation(() => ({preferredMFA: "NONE"}))
        authMock.isFederated.mockImplementation(() => true)
        const wrapper = mount(<MockAuthProvider><MainPage nav={mockNav}/></MockAuthProvider>)

        process.nextTick(() => {
            act(() => {
                wrapper.update();
            });
            expect(mockNav.go).toBeCalledTimes(0);
            done();
        });
    });
});
