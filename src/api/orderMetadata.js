export const deleteOrderMetadata = async (csrf, apiPath) => {
    try {
        const response = await fetch(`${apiPath}/meta_data`, {
            mode: 'cors',
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf,
            },
        });
        return response.json();
    } catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
};

export const postOrderMetadata = async (csrf, apiPath, newOrderMetadata) => {
    try {
        const response = await fetch(`${apiPath}/meta_data`, {
            mode: 'cors',
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf,
            },
            body: JSON.stringify(
                newOrderMetadata,
            ),
        });
        return response.json();
    } catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
};

export const patchOrderMetadata = async (csrf, apiPath, requestBody) => {
    try {
        const response = await fetch(`${apiPath}/meta_data`, {
            mode: 'cors',
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf,
            },
            body: JSON.stringify(
                requestBody,
            ),
        });
        return response.json();
    } catch (e) {
        console.error(e);
        return Promise.reject(e);
    }
};