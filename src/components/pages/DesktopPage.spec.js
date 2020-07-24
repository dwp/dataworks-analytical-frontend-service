import React from "react";
import {mount} from "enzyme";
import DesktopPage from "./DesktopPage";

describe("<DesktopPage/>", () => {
    it("Displays an iframe pointing to the passed in url", () => {
        jest.spyOn(document, 'querySelector').mockImplementation(() => ({clientHeight: 30, style: {display: 'block'}}))
        const desktopUrl = "http://test.url?token=token";
        const wrapper = mount(<DesktopPage desktopUrl={desktopUrl}/>)

        const iframe = wrapper.find("iframe")
        expect(iframe).toExist()
        expect(iframe.props().src).toEqual(desktopUrl)
    })
})
