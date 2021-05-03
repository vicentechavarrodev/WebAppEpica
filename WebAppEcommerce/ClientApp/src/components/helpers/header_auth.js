export function authHeader() {

    return {
        'Content-Security-Policy': 'upgrade-insecure-requests',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Pragma: 'no-cache',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2MTk1NDlkOS0zZDZhLTQ0YjktOGJhZS1lZDI1NWZlN2FjNTYiLCJuYW1laWQiOiJhZG1pbiIsIm5vbWJyZSI6ImFkbWluIiwibmJmIjoxNjIwMDcwMDAxLCJleHAiOjE2NTE2MDYwMDEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyJ9.HdtGMWvFmMjqu1-nJLzzd4tH4AUj99_au23vV33IchI'


    }   
   
}