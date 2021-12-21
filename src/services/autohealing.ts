import { ExecuteAutohealingBody } from 'src/types';
import axiosInstance from './axiosInstance';

const AutoHealingAPI = {
  Autohealing: {
    text(info: ExecuteAutohealingBody) {
      const config = { headers: { 'Content-Type': 'application/json' } };
      return axiosInstance.post('autohealing/text', info, config);
    },
  },
};

export { AutoHealingAPI };
