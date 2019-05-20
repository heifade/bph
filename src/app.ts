import { Config } from './config';

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};


Config.pagination.pageSize = 20;
