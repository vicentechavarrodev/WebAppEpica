using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Segurity
{
    public class AuthorizeRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
