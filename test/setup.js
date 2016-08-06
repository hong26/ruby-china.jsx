import {expect} from 'chai';
import jsdom from 'jsdom';

global.expect = expect;
if (typeof document === 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}
