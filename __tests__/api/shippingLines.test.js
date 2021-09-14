import { setShippingLine, fetchShippingLines } from '../../src/api';
import { FetchError } from '../../src/utils';

describe('Shipping Lines API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // setShippingLine tests
  test('setShippingLine with valid data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await setShippingLine('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('setShippingLine with invalid data', async () => {
    const mockData = {
      errors: [{
        message: 'Invalid request',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await setShippingLine('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('setShippingLine with server error', async () => {
    fetch.mockRejectOnce();
    const res = await setShippingLine('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // fetchShippingLines tests
  test('fetchShippingLines with valid data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await fetchShippingLines('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('fetchShippingLines with invalid data', async () => {
    const mockData = {
      errors: [{
        message: 'Invalid request',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await fetchShippingLines('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('fetchShippingLines with server error', async () => {
    fetch.mockRejectOnce();
    const res = await fetchShippingLines('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });
});
