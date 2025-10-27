using System.ComponentModel.DataAnnotations;
namespace CrudApi.DTOs
{
public class PersonCreateDto
{
[Required, StringLength(100)]
public string Name { get; set; } = string.Empty;


    [Required, StringLength(255)]
    public string Address { get; set; } = string.Empty;

    [Required, StringLength(100)]
    public string State { get; set; } = string.Empty;

    [Required, StringLength(100)]
    public string District { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required, RegularExpression("Kannada|Hindi|English")]
    public string Language { get; set; } = string.Empty;
}
}