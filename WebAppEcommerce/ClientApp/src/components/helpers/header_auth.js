export function authHeader() {

    return {
        'Content-Security-Policy': 'upgrade-insecure-requests',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Pragma: 'no-cache',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkM2RmZWQ0Ny1hZmNjLTRhMjMtYjA2Yy0yNmZkOGE5MmZhMDEiLCJuYW1laWQiOiJhZG1pbiIsIm5vbWJyZSI6ImFkbWluIiwibmJmIjoxNjIyMjQzODM0LCJleHAiOjE2NTM3Nzk4MzQsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzgwLyJ9.EolLsWjONCSk4Vpe8v-TEs0DFXdNW1Gq4yQuS-zUhQ0'


    }   
   
}