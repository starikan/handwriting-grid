import { attachLogger } from 'effector-logger/attach';
import { pagesDomain } from '..';

attachLogger(pagesDomain, {
  reduxDevtools: 'enabled',
  console: 'enabled',
  inspector: 'enabled',
});
