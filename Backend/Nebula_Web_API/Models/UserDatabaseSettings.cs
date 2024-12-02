namespace Nebula_Web_API.Models
{
    public class UserDatabaseSettings : IUserDatabaseSettings
    {
        public string UserInfoCollectionName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;

    }
}
