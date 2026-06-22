import compose from 'compose-function/module';
import { withGoogle } from './with-google';
import { withQuery } from './with-query';
import { withRouter } from './with-router';

export const withProviders = compose(withQuery, withRouter, withGoogle);
