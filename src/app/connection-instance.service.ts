import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import axios, { AxiosInstance } from 'axios';

export class ConnectionInstanceService {

  private readonly client: AxiosInstance;

  constructor()
  {
    this.client = axios.create({
      baseURL: environment.apiURL
    });
  }

  setAuthToken(token: string | null) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }


}
