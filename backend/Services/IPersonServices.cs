using CrudApi.DTOs;
using CrudApi.Models;
namespace CrudApi.Services
{
public interface IPersonService
{
Task<IEnumerable<Person>> GetAllAsync();
Task<Person?> GetByIdAsync(int id);
Task<Person> CreateAsync(PersonCreateDto dto);
Task<bool> UpdateAsync(int id, PersonUpdateDto dto);
Task<bool> DeleteAsync(int id);
}
}