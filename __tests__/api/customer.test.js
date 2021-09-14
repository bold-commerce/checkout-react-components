import { updateCustomer, validateCustomer } from '../../src/api';
import { FetchError } from '../../src/utils';

describe('Customer API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // validateCustomer tests
  test('validateCustomer with valid email', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await validateCustomer('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('validateCustomer with invalid email', async () => {
    const mockData = {
      errors: [{
        message: 'Email format is invalid.',
        type: 'validation',
        field: 'email',
        severity: 'validation',
        sub_type: 'email',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await validateCustomer('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('validateCustomer with server error', async () => {
    fetch.mockRejectOnce();
    const res = await validateCustomer('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // updateCustomer tests
  test('updateCustomer with valid email', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await updateCustomer('abcd', 'https://api.com', {}, 'POST');

    expect(res.success).toBe(true);
  });

  test('updateCustomer with invalid email', async () => {
    const mockData = {
      errors: [{
        message: 'Email format is invalid.',
        type: 'validation',
        field: 'email',
        severity: 'validation',
        sub_type: 'email',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await updateCustomer('abcd', 'https://api.com', {}, 'POST');

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('updateCustomer with server error', async () => {
    fetch.mockRejectOnce();
    const res = await updateCustomer('abcd', 'https://api.com', {}, 'POST');

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });
});
