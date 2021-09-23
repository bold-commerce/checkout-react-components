import { processOrder } from '../../src/api';
import { FetchError } from '../../src/utils';

describe('Process Order API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // processOrder tests
  test('processOrder with valid data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await processOrder('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('processOrder with invalid data', async () => {
    const mockData = {
      errors: [{
        message: 'Invalid request',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await processOrder('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('processOrder with server error', async () => {
    fetch.mockRejectOnce();
    const res = await processOrder('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });
});
