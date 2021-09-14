import { updateShippingAddress, validateShippingAddress } from '../../src/api';
import { FetchError } from '../../src/utils';

describe('Shipping Address API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // validateShippingAddress tests
  test('validateShippingAddress with valid address', async () => {
    fetch.mockResponse(JSON.stringify({ data: [] }));

    const res = await validateShippingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('validateShippingAddress with invalid address', async () => {
    const mockData = {
      errors: [{
        message: 'Invalid postal code',
        type: 'validation',
        field: 'postal_code',
        severity: 'validation',
        sub_type: 'postal_code',
      }],
    };

    fetch.mockResponse(JSON.stringify(mockData), { status: 422 });
    const res = await validateShippingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('validateShippingAddress with server error', async () => {
    fetch.mockRejectOnce();
    const res = await validateShippingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // updateShippingAddress tests
  test('updateShippingAddress with valid address', async () => {
    fetch.mockResponse(JSON.stringify({ data: [] }));

    const res = await updateShippingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('updateShippingAddress with invalid address', async () => {
    const mockData = {
      errors: [{
        message: 'Invalid postal code',
        type: 'validation',
        field: 'postal_code',
        severity: 'validation',
        sub_type: 'postal_code',
      }],
    };

    fetch.mockResponse(JSON.stringify(mockData), { status: 422 });
    const res = await updateShippingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('updateShippingAddress with server error', async () => {
    fetch.mockRejectOnce();
    const res = await updateShippingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });
});
