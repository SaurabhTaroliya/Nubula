using Microsoft.AspNetCore.Mvc;
using Nebula_Web_API.Models;

namespace Nebula_Web_API.Services
{
    public interface IUserService
    {
        List<User> GetAll();
        User GetById(string id);
        User Get(User user);
        User Create(User user);
        void Update(string id, User user);
        void Remove(string id);
        string GenerateToken(User user);
        bool IsValidEmail(string email);
        bool SendEmail(Contact contact);
    }
}
