import { postOrderMetadata, patchOrderMetadata, deleteOrderMetadata } from '../../src/api';
import { FetchError } from '../../src/utils';

describe('Order Metadata API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // postOrderMetadata tests
  test('postOrderMetadata with valid data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await postOrderMetadata('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('postOrderMetadata with invalid data', async () => {
    const mockData = {
      errors: [{
        message: 'Invalid request',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await postOrderMetadata('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('postOrderMetadata with server error', async () => {
    fetch.mockRejectOnce();
    const res = await postOrderMetadata('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // patchOrderMetadata tests
  test('patchOrderMetadata with valid data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await patchOrderMetadata('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('patchOrderMetadata with invalid data', async () => {
    const mockData = {
      errors: [{
        message: 'Invalid request',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await patchOrderMetadata('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('patchOrderMetadata with server error', async () => {
    fetch.mockRejectOnce();
    const res = await patchOrderMetadata('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // deleteOrderMetadata tests
  test('deleteOrderMetadata with valid data', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await deleteOrderMetadata('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('deleteOrderMetadata with invalid data', async () => {
    const mockData = {
      errors: [{
        message: 'Invalid request',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await deleteOrderMetadata('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('deleteOrderMetadata with server error', async () => {
    fetch.mockRejectOnce();
    const res = await deleteOrderMetadata('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });
});
