using Api.Segurity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private readonly IConfiguration configuration;
        public AuthorizeController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Authenticate(AuthorizeRequest auth)
        {
            var _userInfo = AutenticarUsuarioAsync(auth.Username, auth.Password);

            if (auth == null)
                return Unauthorized();

            var isUserValid = (auth.Username == "admin" && auth.Password == "PazziSoftware*");
            if (isUserValid)
            {
                return Ok(new { token = GenerarTokenJWT(_userInfo) });
            }
            return Unauthorized();

        }
        private AuthorizeRequest AutenticarUsuarioAsync(string usuario, string password)
        {
            return new AuthorizeRequest()
            {
                Username = usuario,
                Password = password
            };
        }
        private string GenerarTokenJWT(AuthorizeRequest usuarioInfo)
        {
            var _symmetricSecurityKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(configuration["JWT:JWT_SECRET_KEY"])
                );
            var _signingCredentials = new SigningCredentials(
                    _symmetricSecurityKey, SecurityAlgorithms.HmacSha256
                );
            var _Header = new JwtHeader(_signingCredentials);

            var _Claims = new[] {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.NameId, usuarioInfo.Username.ToString()),
                new Claim("nombre", usuarioInfo.Username),
            };

            var _Payload = new JwtPayload(
                    issuer: configuration["JWT:JWT_ISSUER_TOKEN"],
                    audience: configuration["JWT:JWT_AUDIENCE_TOKEN"],
                    claims: _Claims,
                    notBefore: DateTime.UtcNow,
                    // Expira a la 365 dias.
                    expires: DateTime.UtcNow.AddDays(Convert.ToInt32(configuration["JWT:JWT_EXPIRE_MINUTES"]))
                );

            var _Token = new JwtSecurityToken(
                    _Header,
                    _Payload
                );

            return new JwtSecurityTokenHandler().WriteToken(_Token);
        }
    }
}
