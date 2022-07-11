import mongoose from 'mongoose';
import request from 'supertest';
import App from '../src/app';
import CustomerRoute from '../src/routes/customer.route';
import axios from 'axios';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Customer', () => {
  describe('[POST] /customer/account-funding', () => {
    it('should create a transaction', async () => {
      const customersRoute = new CustomerRoute();
      const customers = customersRoute.customerController.customerService.customers;

      customers.findOne = jest.fn().mockReturnValue({
        _id: '627cc7f4de4d2c2872595c40',
        firstName: 'John',
        lastName: 'Doe',
      });

      jest.spyOn(axios, 'post').mockImplementation(() =>
        Promise.resolve({
          message: 'Success',
          status: true,
          data: {
            customerId: '62cb8676765dc60fd31f0279',
            amount: 100,
          },
        }),
      );
      const payload = { customerId: '62cb8676765dc60fd31f0279', amount: 100 };
      const app = new App([customersRoute]);
      const response = await request(app.getServer()).post(`${customersRoute.path}/account-funding`).send(payload).expect(200);
      const result = response.body;
      expect(result.message).toBe('Success');
      expect(result.status).toBe(true);
      expect(result.data.customerId).toBe(payload.customerId);
      expect(result.data.amount).toBe(payload.amount);
    });

    it('should throe validation error for missing field', async () => {
      const customersRoute = new CustomerRoute();

      const payload = { amount: 100 };
      const app = new App([customersRoute]);
      const response = await request(app.getServer()).post(`${customersRoute.path}/account-funding`).send(payload).expect(400);
      const result = response.body;

      expect(result.message).toBe('Validation Error');
      expect(result.status).toBe(false);
      expect(result.data[0].field).toBe('customerId');
      expect(JSON.stringify(result.data[0].validations)).toBe(JSON.stringify(['customerId must be a mongodb id', 'customerId must be a string']));
    });
  });
});
