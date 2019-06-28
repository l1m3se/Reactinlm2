export function authHeader() {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('token'));
    

    if (token) {
        return { 
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}

export default authHeader