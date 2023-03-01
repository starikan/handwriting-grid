import { attachLogger } from 'effector-logger/attach';
import { documentsDomain, pagesDomain } from '..';

if (process.env['NODE_ENV'] === 'development' && typeof window !== 'undefined') {
  attachLogger(pagesDomain, {
    reduxDevtools: 'enabled',
    console: 'enabled',
    inspector: 'disabled',
  });

  attachLogger(documentsDomain, {
    reduxDevtools: 'enabled',
    console: 'enabled',
    inspector: 'disabled',
  });
}
