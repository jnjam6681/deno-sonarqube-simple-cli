import { AxiosInstance } from "axios";
import { config } from '../config/config.ts';
import { axios } from '../deps.ts';

export function authentication(): AxiosInstance {
  const client = axios.create({
    baseURL: config.sonar.url,
    auth: {
      username: config.sonar.username,
      password: config.sonar.password,
    },
  });

  return client
}