import { addLineItem, updateLineItem, removeLineItem } from '../../src/api';
import { FetchError } from '../../src/utils';

describe('Line Items API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  // addLineItem tests
  test('addLineItem with valid sku', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await addLineItem('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('addLineItem with invalid sku', async () => {
    const mockData = {
      errors: [{
        message: 'SKU is invalid.',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await addLineItem('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('addLineItem with server error', async () => {
    fetch.mockRejectOnce();
    const res = await addLineItem('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // updateLineItem tests
  test('updateLineItem with valid sku', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await updateLineItem('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('updateLineItem with invalid sku', async () => {
    const mockData = {
      errors: [{
        message: 'SKU is invalid.',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await updateLineItem('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('updateLineItem with server error', async () => {
    fetch.mockRejectOnce();
    const res = await updateLineItem('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });

  // removeLineItem tests
  test('removeLineItem with valid sku', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: [] }));

    const res = await removeLineItem('abcd', 'https://api.com', {});

    expect(res.success).toBe(true);
  });

  test('removeLineItem with invalid sku', async () => {
    const mockData = {
      errors: [{
        message: 'SKU is invalid.',
        type: 'validation',
        severity: 'validation',
      }],
    };

    fetch.mockResponseOnce(JSON.stringify(mockData), { status: 422 });
    const res = await removeLineItem('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error).toBeInstanceOf(FetchError);
    expect(res.error.status).toBe(422);
  });

  test('removeLineItem with server error', async () => {
    fetch.mockRejectOnce();
    const res = await removeLineItem('abcd', 'https://api.com', {});

    expect(res.success).toBe(false);
    expect(res.error.status).toBe(500);
  });
});
