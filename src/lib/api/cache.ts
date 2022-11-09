import { AxiosResponse } from "axios";

export interface ICache {
  get: (queryKey: string) => any;

  add: (queryKey: string, response: AxiosResponse<any, any>) => void;
}

interface CacheProps {
  [key: string]: any;
}

class Cache implements ICache {
  private cache: CacheProps;

  constructor() {
    this.cache = {};
  }

  get(queryKey: string) {
    return this.cache[queryKey];
  }

  add(queryKey: string, response: AxiosResponse<any, any>) {
    if (!this.cache[queryKey]) {
      this.cache[queryKey] = response;
    }
  }
}

export default Cache;
