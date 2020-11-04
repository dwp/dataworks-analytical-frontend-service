import React, { useEffect } from "react";

import MainPage from "./MainPage";
import {mount} from "enzyme";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import Button from "react-mdl/lib/Button";
import {AuthContext} from "../../utils/Auth";
import {mockAuthHelper} from "../../utils/testUtils";
import {act} from "react-dom/test-utils";
import {Pages} from "../NavigationComponent";
import apiCall from "../../utils/api"

const mockApiCall = jest.fn(()=>false)
const authMock = mockAuthHelper();
const mockNav = {go: jest.fn()};
jest.mock("../../utils/api", ()=>(jest.fn(()=>false)))
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
            expect(mockNav.go).not.toBeCalledWith(Pages.SETUP_MFA);
            done();
        });
    });

    it("Redirects to User Not Set Up page if api returns false", async (done) => {
        authMock.getCurrentUser.mockImplementation(() => ({
            signInUserSession:{
                idToken: {
                    jwtToken: "test_token"
                }
            },
            preferredMFA: "SOFTWARE_TOKEN_MFA"
        }))
        authMock.isFederated.mockImplementation(() => true)
        mockApiCall.mockImplementation(() => false)
        jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)
        const wrapper = mount(<MockAuthProvider><MainPage nav={mockNav}/></MockAuthProvider>)
        jest.useFakeTimers()

        process.nextTick(() => {
            act(() => {
                jest.runAllImmediates()
                wrapper.update();
            });
            expect(mockNav.go).toBeCalledWith(Pages.USER_NOT_SET_UP);
            done();
        });
    });
});
