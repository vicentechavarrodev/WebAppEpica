export function authHeader() {

    return {
        'Content-Security-Policy': 'upgrade-insecure-requests',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Pragma: 'no-cache',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2OTE1ZmMxYy02YjQzLTQwNjAtODViNy03ZWRmOTFmNzMxM2QiLCJuYW1laWQiOiJhZG1pbiIsIm5vbWJyZSI6ImFkbWluIiwibmJmIjoxNjIwNzg4NTU5LCJleHAiOjE2NTIzMjQ1NTksImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyJ9.81ya71aUAp-D5BVegGYZQoufsvt2RbRr8uJBWzqltEs'


    }   
   
}