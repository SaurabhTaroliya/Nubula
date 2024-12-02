using Microsoft.AspNetCore.Mvc;
using Nebula_Web_API.Services;
using System.Reflection;
using Nebula_Web_API.Services;
using Nebula_Web_API.Models;
using Microsoft.AspNetCore.Authorization;

using MailKit.Net.Smtp;
using MimeKit;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Nebula_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        // GET: api/<UserController>
        [HttpGet("GetAll")]
        public ActionResult<List<User>> GetAll()
        {
            return userService.GetAll();
        }

        // GET api/<UserController>/5
        [HttpGet("GetBy/{id}")]
        public ActionResult<User> GetById(string id)
        {
            var User = userService.GetById(id);
            if (User == null)
            {
                return NotFound($"User with Id = {id} not founf");
            }
            return User;
        }

        [AllowAnonymous] // No need to validate, For allow without token authentication
        [HttpPost("Login")]
        public IActionResult Get([FromBody] User user) {
            IActionResult response = Unauthorized();
            var user_ = userService.Get(user);
            if (user_ != null)
            {
                var token = userService.GenerateToken(user_);
                response = Ok(new { token = token });
            }
            return response;
        }

        // POST api/<UserController>
        [AllowAnonymous] // No need to validate, For allow without token authentication
        [HttpPost("SignUp")]
        public ActionResult<User> Post([FromBody] User user)
        {
            var createdUser = userService.Create(user);
            if (createdUser == null)
            {
                return Conflict(new { message = "User with this email already exists." });
            }
            return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);

        }

        // PUT api/<UserController>/5
        [HttpPut("Update/{id}")]
        public ActionResult<User> Put(string id, [FromBody] User user)
        {
            var existingUser = userService.GetById(id);
            if (existingUser == null)
            {
                return NotFound($"User with Id = {id} not found");
            }
            userService.Update(id, user);
            return userService.GetById(id);
            // return NoContent();
        }

        // DELETE api/<UserController>/5
        [HttpDelete("Delete/{id}")]
        public ActionResult Delete(string id)
        {
            var user = userService.GetById(id);

            if (user == null)
            {
                return NotFound($"User with Id = {id} not found");
            }

            userService.Remove(user.Id);
            return Ok($"User with Id = {id} deleted");
        }


        [HttpPost("Contact")]
        //[Route("api/sendemail")]
        public IActionResult SendEmail([FromBody] Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!userService.IsValidEmail(contact.Email))
            {
                return BadRequest("Invalid email address.");
            }
            var result = userService.SendEmail(contact);

            if (result)
            {
                return Ok("Email sent successfully.");
            }
            else
            {
                return StatusCode(500, "An error occurred while sending the email.");
            }
        }

}
}






