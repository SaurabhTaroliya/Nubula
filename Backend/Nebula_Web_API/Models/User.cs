using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections;

namespace Nebula_Web_API.Models
{
    [BsonIgnoreExtraElements]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("firstname")]
        public string? Firstname { get; set; } = string.Empty;

        [BsonElement("lastname")]
        public string? Lastname { get; set; } = string.Empty;

        [BsonElement("email")]
        public string? Email { get; set; } = string.Empty;

        [BsonElement("password")]
        public string? Password { get; set;} = string.Empty;

        [BsonElement("gender")]
        public string? Gender { get; set; } = string.Empty;

        [BsonElement("dateOfJoining")]
        public DateTime? DateOfJoining { get; set; } = DateTime.Now;

        [BsonElement("userPromptHistory")]
        public List<string>? UserPromptHistory { get; set; } = new List<string>();

        [BsonElement("github")]
        public string? Github { get; set; } = string.Empty;

        [BsonElement("address")]
        public string? Address { get; set; } = string.Empty;

        [BsonElement("linkedIn")]
        public string? LinkedIn { get; set; } = string.Empty;

        [BsonElement("bio")]
        public string? Bio { get; set; } = string.Empty;

        [BsonElement("phoneNumber")]
        public string? PhoneNumber { get; set; } = string.Empty;

        [BsonElement("imageUrl")]
        public string? ImageUrl { get; set; } = string.Empty;
    }
}
