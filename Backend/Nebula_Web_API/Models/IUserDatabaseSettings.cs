namespace Nebula_Web_API.Models
{
    public interface IUserDatabaseSettings
    {
        string UserInfoCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }


    }
}
