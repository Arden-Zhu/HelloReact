import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";
import { ArrayView, ClickableItem } from '../components/Clickable';


describe('ArrayView model tests', () => {
    it('should create a new ArrayView', () => {
        var app = new ArrayView();
        expect(app).toBeDefined();
        //expect(app.selectedItem.id).toBe(0);
        //expect(app.selectedItem.displayName).toBe('none');
    });
});
