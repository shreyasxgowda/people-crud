namespace CrudApi.DTOs
{
public class PersonReadDto
{
public int Id { get; set; }
public string Name { get; set; } = string.Empty;
public string Address { get; set; } = string.Empty;
public string State { get; set; } = string.Empty;
public string District { get; set; } = string.Empty;
public DateTime DateOfBirth { get; set; }
public string Language { get; set; } = string.Empty;
}
}