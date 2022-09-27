
export async function post(url: string, request: object) {
    const body = JSON.stringify(request);
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body });
    return response;
}

export async function put(url: string, request: object) {
    const body = JSON.stringify(request);
    const response = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: body });
    return response;
}

export async function delete_(url: string, request?: object) {
    const body = JSON.stringify(request);
    const response = await fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: body });
    return response;
}

