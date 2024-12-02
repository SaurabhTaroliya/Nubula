using Nebula_Web_API.Models;
using MongoDB.Driver;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.Linq;
using System.Text.Json.Serialization;
using MongoDB.Bson.IO;
using NewtonsoftJson = Newtonsoft.Json.JsonConvert;

using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MimeKit;

namespace Nebula_Web_API.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _Users;

        private IConfiguration _Config;
        private readonly ISmtpSettings _smtpSettings;
        //public UserService(IUserDatabaseSettings settings, IMongoClient mongoClient, IConfiguration configuration, IOptions<SmtpSettings> smtpSettings)
        //{
        //    var database = mongoClient.GetDatabase(settings.DatabaseName);
        //    _Users =  database.GetCollection<User>(settings.UserInfoCollectionName);
        //    _Config = configuration;
        //    _smtpSettings = smtpSettings.Value;
        //}

        public UserService(IUserDatabaseSettings settings, IMongoClient mongoClient, IConfiguration configuration, IOptions<ISmtpSettings> smtpSettings)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _Users = database.GetCollection<User>(settings.UserInfoCollectionName);
            _Config = configuration;
            _smtpSettings = smtpSettings.Value;
        }

        public List<User> GetAll()
        {
            return _Users.Find(user => true).ToList();
        }
        public User GetById(string id)
        {
            return _Users.Find(user => user.Id == id).FirstOrDefault();
        }
        public User Create(User user)
        {
            var res = _Users.Find(us => us.Email == user.Email).FirstOrDefault();
            if (res == null)
            {
                _Users.InsertOne(user);
                return user;
            }
            return null;
        }
        public void Update(string id, User user)
        {
            _Users.ReplaceOne(user => user.Id == id, user);
        }
        public void Remove(string id)
        {
            _Users.DeleteOne(user =>  user.Id == id); 
        }

        public User Get(User user)
        {
            return _Users.Find(us => us.Email == user.Email && us.Password == user.Password).FirstOrDefault();
        }

        public string GenerateToken(User user)
        {
            // Signature
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256); //signature

            // Payload
            var claims = new[]
            {
                new Claim("id", user.Id),
                new Claim("firstName", user.Firstname),
                new Claim("lastName", user.Lastname),
                new Claim("email", user.Email),
                //new Claim ("password", user.Password),
                //new Claim("gender", user.Gender),
                //new Claim("dateOfJoining", user.DateOfJoining.ToString("dd-MM-yyyy")),
                //new Claim("userPromptHistory", NewtonsoftJson.SerializeObject(user.UserPromptHistory)),
                //new Claim("imageUrl", user.ImageUrl),
                //new Claim("github", user.Github),
                //new Claim("linkedIn", user.LinkedIn),
                //new Claim("bio", user.Bio),
                //new Claim("phoneNumber", user.PhoneNumber),
                //new Claim("address",user.Address)
            };

            var token = new JwtSecurityToken(
                issuer: _Config["Jwt:Issuer"],
                audience: _Config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }


        public bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }


        public bool SendEmail2(Contact contact)
        {

            //var toAddress = _smtpSettings.MyEmail;
            var subject = "New Contact Form Submission";
            var body = $"Name: {contact.Name}\nMessage: {contact.Message}";

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress("User", contact.Email));
            email.To.Add(new MailboxAddress("Nebula", _smtpSettings.MyEmail));
            email.Subject = subject;
            email.Body = new TextPart("plain") { Text = body };

            try
            {
                using (var client = new SmtpClient())
                {
                    client.Connect(_smtpSettings.Server, _smtpSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                    client.Authenticate(_smtpSettings.MyEmail, _smtpSettings.MyPassword);
                    client.Send(email);
                    client.Disconnect(true);
                }

                return true;
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                System.Console.WriteLine("---------------------------------HEllo--------------------------------------------");
                Console.WriteLine($"Error sending email: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");

                return false;
            }



        }

        public bool SendEmail(Contact contact)
        {
            if (contact == null) throw new ArgumentNullException(nameof(contact));
            if (string.IsNullOrEmpty(contact.Email)) throw new ArgumentNullException(nameof(contact.Email));
            if (string.IsNullOrEmpty(contact.Message)) throw new ArgumentNullException(nameof(contact.Message));

            var subject = "New Contact Form Submission";
            var body = $"Name: {contact.Name}\nEmail: {contact.Email}\nMessage: {contact.Message}";

            //var email = new MimeMessage();
            //email.From.Add(new MailboxAddress("User", contact.Email));
            //email.To.Add(new MailboxAddress("Nebula", _smtpSettings.MyEmail));
            //email.Subject = subject;
            //email.Body = new TextPart("plain") { Text = body };

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(contact.Name, _smtpSettings.MyEmail)); // Your email as the sender
            email.To.Add(new MailboxAddress("Nebula", _smtpSettings.MyEmail)); // Your email as the recipient
            email.ReplyTo.Add(new MailboxAddress(contact.Name, contact.Email)); // User's email for replies
            email.Subject = subject;
            email.Body = new TextPart("plain") { Text = body };

            try
            {
                using (var client = new SmtpClient())
                {
                    client.Connect(_smtpSettings.Server, _smtpSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                    client.Authenticate(_smtpSettings.MyEmail, _smtpSettings.MyPassword);
                    client.Send(email);
                    client.Disconnect(true);
                }

                return true;
            }
            catch (Exception ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"Error sending email: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");

                return false;
            }
        }



    }
}
