import { faker } from '@faker-js/faker';

const ROLES = ['Admin', 'User', 'Guest'];

const generateRowData = (id) => ({
    id: String(id),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 60 }),
    isActive: faker.datatype.boolean(),
    role: faker.helpers.arrayElement(ROLES),
  });

export const fetchFakeData = (offset, limit) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const rows = [];
        for (let i = offset + 1; i <= offset + limit; i++) {
          rows.push(generateRowData(i));
        }
        resolve(rows);
      }, 700);
    });
  };