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
    it("Creates environment on button click", async (done) => {
        jest.spyOn(React, 'useEffect').mockImplementation(f => f());

        let wrapper;
        await act(async () => {
            wrapper = mount(<MockAuthProvider><MainPage nav={mockNav}/></MockAuthProvider>)
        });
        process.nextTick(() => {
            act(() => {
                wrapper.update();
                wrapper.find(Button).simulate('click');
            });
            expect(createEnvironment).toBeCalledTimes(1);
            done();
        });
    });

    it("Redirects to Setup MFA page if user does not have MFA set up", async (done) => {
        authMock.getCurrentUser.mockImplementation(() => ({preferredMFA: "NONE"}))
        const wrapper = mount(<MockAuthProvider><MainPage nav={mockNav}/></MockAuthProvider>)

        process.nextTick(() => {
            act(() => {
                wrapper.update();
            });
            expect(mockNav.go).toBeCalledWith(Pages.SETUP_MFA);
            done();
        });
    });
});
