namespace Nebula_Web_API.Models
{
    public class SmtpSettings : ISmtpSettings
    {
        public string MyEmail { get; set; }
        public string MyPassword { get; set; }
        public int Port { get; set; }
        public string Server { get; set; }
    }
}
