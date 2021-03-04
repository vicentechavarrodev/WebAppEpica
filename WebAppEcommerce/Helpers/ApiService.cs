using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace WebAppEcommerce.Helpers
{
    public class ApiService
    {
        public static string urlBase = "https://localhost/ApiEc/";
        public async Task<Response> Get<T>(string servicePrefix, string controller, string tokenType, string accessToken,bool esListado)
        {
            try
            {

                var client = new HttpClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJuYmYiOjE1OTg4MTI4NTQsImV4cCI6MTYzMDM0ODg1NCwiaWF0IjoxNTk4ODEyODU0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MC8ifQ.QY4AVn5-koNw6a3y41yGDoCUGJ4_0_C-tgLm_gpsmAA");
                client.BaseAddress = new Uri(urlBase);
                var url = string.Format("{0}{1}", servicePrefix, controller);
                var response = await client.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    return new Response
                    {
                        IsSuccess = false,
                        Message = response.StatusCode.ToString(),
                    };
                }

                var result = await response.Content.ReadAsStringAsync();
                object elemento;
                if (esListado)
                {
                    var json = (result.Substring(1, result.Length - 2).Remove(0, result.IndexOf(":")));
                    elemento = JsonConvert.DeserializeObject<List<T>>(json);
                }
                else
                {
                    elemento = JsonConvert.DeserializeObject<T>(result);
                }


                if (typeof(T) == typeof(Response))
                {
                    return (Response)elemento;
                }
                else
                {
                    return new Response
                    {
                        IsSuccess = true,
                        Message = "Ok",
                        Result = elemento,
                    };
                }
               
            }
            catch (Exception ex)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = ex.Message,
                };
            }
        }

        public async Task<Response> Post<T,U>( string servicePrefix, string controller, T model, bool resultString = false, bool ResponseListado = false)
        {
            try
            {
                var request = JsonConvert.SerializeObject(model);
                var content = new StringContent(request, Encoding.UTF8, "application/json");
                var client = new HttpClient()
                {
                    BaseAddress = new Uri(urlBase)
                };
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJuYmYiOjE1OTg4MTI4NTQsImV4cCI6MTYzMDM0ODg1NCwiaWF0IjoxNTk4ODEyODU0LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MC8iLCJhdWQiOiJodHRwczovL2xvY2FsaG9zdDo0NDM4MC8ifQ.QY4AVn5-koNw6a3y41yGDoCUGJ4_0_C-tgLm_gpsmAA");
                var url = string.Format("{0}{1}", servicePrefix, controller);
                var response = await client.PostAsync(url, content);
                var result = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    var errorxml = await response.Content.ReadAsStringAsync();
                    var responseObject = JsonConvert.DeserializeObject<Response>(errorxml);
                    return new Response
                    {
                        IsSuccess = false,
                        Message = responseObject.Message
                    };
                }


                object elemento;
                if (resultString)
                {
                    elemento = JsonConvert.DeserializeObject<String>(result);
                }
                else
                {
                    if (ResponseListado)
                    {
                        elemento = JsonConvert.DeserializeObject<List<T>>(result);
                    }
                    else
                    {
                        elemento = JsonConvert.DeserializeObject<U>(result);
                    }



                }


                if (typeof(U) == typeof(Response))
                {
                    return (Response)elemento;
                }
                else
                {
                    return new Response
                    {
                        IsSuccess = true,
                        Message = "Ok",
                        Result = elemento,
                    };
                }
            }
            catch (Exception ex)
            {
                return new Response
                {
                    IsSuccess = false,
                    Message = ex.Message,
                };
            }
        }

    }
}
