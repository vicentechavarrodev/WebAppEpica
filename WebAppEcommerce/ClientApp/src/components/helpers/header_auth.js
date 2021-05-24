export function authHeader() {

    return {
        'Content-Security-Policy': 'upgrade-insecure-requests',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Pragma: 'no-cache',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5Nzg3NDNlNy04ZDczLTQ4MjItYjU2YS1lMzBhZDY3N2Y0MzIiLCJuYW1laWQiOiJhZG1pbiIsIm5vbWJyZSI6ImFkbWluIiwibmJmIjoxNjIxODE1NDIyLCJleHAiOjE2NTMzNTE0MjIsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyJ9.Fxc5Ck6ItqixN7p3N8Pq44G-wAJaqjiqnWQ2XwHDDX8'


    }   
   
}