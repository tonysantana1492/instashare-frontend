import { TOKEN_ENV } from "constants";
import { baseUrl } from "constants";
import JwtService from "services/jwtService";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    patch: request('PATCH')
};

function request(method) {
    return (url, body) => {

        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.headers['Access-Control-Allow-Origin'] = '*';
            requestOptions.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

function authHeader(url) {
    
    const token = authToken();
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(baseUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

function authToken() {
    return localStorage.getItem(TOKEN_ENV);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            
            if ([401, 403].includes(response.status)) {                
                JwtService.setSession(null);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }       
        
        
        return data;
    });
}