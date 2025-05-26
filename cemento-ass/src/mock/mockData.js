import { faker } from '@faker-js/faker';

const generateData = (count = 200) => {
    const roles = ['Admin', 'User', 'Guest'];

    return Array.from({ length: count }).map((_, index) => ({
        id: String(index + 1),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 65 }),
        isActive: faker.datatype.boolean(),
        role: faker.helpers.arrayElement(roles),
    }));
};

export default generateData;