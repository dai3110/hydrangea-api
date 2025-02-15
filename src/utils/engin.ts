import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { htmlDocType } from '~/const/app';

export const createEngine = () => {
  return (path: string, options: object, callback: (error: any, rendered: string) => void): void => {
    try {
      const component = require(path).default as React.ComponentType<any>;
      const content = ReactDOMServer.renderToStaticMarkup(
        React.createElement(component, options)
      );
      return callback(null, `${htmlDocType}\n${content}`);
    } catch (e) {
      return callback(e, '');
    }
  };
};
