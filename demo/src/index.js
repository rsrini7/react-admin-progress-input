/* eslint react/jsx-key: off */
import 'babel-polyfill';
import React from 'react';
import { Admin, Resource } from 'react-admin'; // eslint-disable-line import/no-unresolved
import { render } from 'react-dom';
import dataProvider from './dataProvider';
import i18nProvider from './i18nProvider';
import posts from './posts';

render(
  <Admin
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    title="RA - datagrid with progress field"
    locale="en"
  >
    <Resource name="posts" {...posts} />
    <Resource name="tags" />
  </Admin>,
  document.getElementById('root'),
);
