import { AxiosInstance, AxiosRequestConfig } from "axios";
import Cache, { ICache } from "./cache";

interface IAPI {
  fetch: (
    url: string,
    queryKey: string,
    config?: AxiosRequestConfig
  ) => Promise<any>;
}

class API implements IAPI {
  private instance: AxiosInstance;
  private cache: ICache;

  constructor(instance: AxiosInstance) {
    this.cache = new Cache();
    this.instance = instance;
  }

  async fetch(url: string, queryKey: string, config?: AxiosRequestConfig) {
    const cache = this.cache.get(queryKey);

    if (cache) {
      return cache;
    }

    const response = await this.instance.get(url, {
      ...config,
      headers: {
        ...config?.headers
      }
    });
    console.info("calling api");

    this.cache.add(queryKey, response);

    return response;
  }
}

export default API;
