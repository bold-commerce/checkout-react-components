import { updateBillingAddress, validateBillingAddress } from '../../src/api';
import { FetchError } from '../../src/utils';

describe('Billing Address API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // validateBillingAddress tests
  test('validateBillingAddress with valid address', async () => {
    fetch.mockResponse(JSON.stringify({ data: [] }));

    const res = await validateBillingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('validateBillingAddress with invalid address', async () => {
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
    const res = await validateBillingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('validateBillingAddress with server error', async () => {
    fetch.mockRejectOnce();
    const res = await validateBillingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // updateBillingAddress tests
  test('updateBillingAddress with valid address', async () => {
    fetch.mockResponse(JSON.stringify({ data: [] }));

    const res = await updateBillingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('updateBillingAddress with invalid address', async () => {
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
    const res = await updateBillingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('updateBillingAddress with server error', async () => {
    fetch.mockRejectOnce();
    const res = await updateBillingAddress('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });
});
