import {beforeEach, describe, expect, it} from 'vitest';
import {waitForMdStreamToComplete} from '../../utils/wait';
import {StandardStreamParserOutput, createMdStreamRenderer} from "@nlux-dev/core/src";

describe('No Format Tests', () => {
    let streamRenderer: StandardStreamParserOutput;
    let rootElement: HTMLElement;

    beforeEach(() => {
        rootElement = document.createElement('div');
        streamRenderer = createMdStreamRenderer(rootElement, undefined, {skipAnimation: true});
    });

    it('should render without any formatting', async () => {
        streamRenderer.next('<<<\nHello World\n<<<');
        streamRenderer.complete!();

        await waitForMdStreamToComplete();

        //require('console').error(rootElement.innerHTML);
        expect(rootElement.innerHTML).toBe('<p>Hello World</p>');
    });

    it('should render inside a proper HTML structure', async () => {
        streamRenderer.next('<<<\n```\nconst a = 1;\n```\n<<<');
        streamRenderer.complete!();
        await waitForMdStreamToComplete();

        expect(rootElement.innerHTML).toBe('<p>```\nconst a = 1;\n```</p>');
    });

});
