import { faker } from "@faker-js/faker";

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