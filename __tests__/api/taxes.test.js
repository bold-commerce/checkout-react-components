import { fetchTaxes } from '../../src/api';
import { FetchError } from '../../src/utils';

describe('Taxes API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // fetchTaxes tests
  test('fetchTaxes with valid data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await fetchTaxes('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('fetchTaxes with invalid data', async () => {
    const mockData = {
      errors: [{
        message: 'Invalid request',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await fetchTaxes('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('fetchTaxes with server error', async () => {
    fetch.mockRejectOnce();
    const res = await fetchTaxes('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });
});
