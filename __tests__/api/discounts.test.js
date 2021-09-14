import { validateDiscount, addDiscount, removeDiscount } from '../../src/api';
import { FetchError } from '../../src/utils';

describe('Discounts API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // validateDiscount tests
  test('validateDiscount with valid code', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await validateDiscount('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('validateDiscount with invalid code', async () => {
    const mockData = {
      errors: [{
        message: 'Discount code is invalid.',
        type: 'validation',
        field: 'discount',
        severity: 'validation',
        sub_type: 'discount',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await validateDiscount('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('validateDiscount with server error', async () => {
    fetch.mockRejectOnce();
    const res = await validateDiscount('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // addDiscount tests
  test('addDiscount with valid code', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await addDiscount('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('addDiscount with invalid code', async () => {
    const mockData = {
      errors: [{
        message: 'Discount code is invalid.',
        type: 'validation',
        field: 'discount',
        severity: 'validation',
        sub_type: 'discount',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await addDiscount('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('addDiscount with server error', async () => {
    fetch.mockRejectOnce();
    const res = await addDiscount('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // removeDiscount tests
  test('removeDiscount with valid code', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await removeDiscount('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('removeDiscount with invalid code', async () => {
    const mockData = {
      errors: [{
        message: 'Discount code is invalid.',
        type: 'validation',
        field: 'discount',
        severity: 'validation',
        sub_type: 'discount',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await removeDiscount('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('removeDiscount with server error', async () => {
    fetch.mockRejectOnce();
    const res = await removeDiscount('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });
});
