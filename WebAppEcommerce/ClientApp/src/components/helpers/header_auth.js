export function authHeader() {

    return {
        'Content-Security-Policy': 'upgrade-insecure-requests',
        contentType: "application/json; charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Pragma: 'no-cache',
        Authorization: 'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYmJiNDYwNS05MTM5LTQwMWMtOTAyYS02N2MxM2JmOGRjZTgiLCJuYW1laWQiOiJhZG1pbiIsIm5vbWJyZSI6ImFkbWluIiwibmJmIjoxNjE5MTM0MDIzLCJleHAiOjE2NTA2NzAwMjMsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyJ9.d6VSGBHHrH-XGry0_Dcg1IZ4NsNrYD3781NGXJxPucw'


    }
   
}