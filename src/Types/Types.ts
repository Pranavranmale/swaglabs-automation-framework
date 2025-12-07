import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

export interface Url {
    baseURL: string;
}

export const configs: Url = {
    baseURL: process.env.BASE_URL || ""  
}

export interface UserCredentials {
    username: string;
    password: string;
}
export const credentials: UserCredentials = {
    username: process.env.USERNAME1 || "",
    password: process.env.PASSWORD2 || ""
};

interface IFormDetails {
  firstName: string;
  lastName: string;
  postalCode: string;
}
export const formData: IFormDetails = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),
};