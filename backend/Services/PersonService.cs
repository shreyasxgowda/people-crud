using CrudApi.Data;
using CrudApi.DTOs;
using CrudApi.Models;
using Microsoft.EntityFrameworkCore;
namespace CrudApi.Services
{
public class PersonService : IPersonService
{
private readonly AppDbContext _db;



    public PersonService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<Person>> GetAllAsync()
    {
        return await _db.People.AsNoTracking().OrderBy(p => p.Name).ToListAsync();
    }

    public async Task<Person?> GetByIdAsync(int id)
    {
        return await _db.People.FindAsync(id);
    }

    public async Task<Person> CreateAsync(PersonCreateDto dto)
    {
        var p = new Person
        {
            Name = dto.Name.Trim(),
            Address = dto.Address.Trim(),
            State = dto.State,
            District = dto.District,
            DateOfBirth = dto.DateOfBirth.Date,
            Language = dto.Language
        };
        _db.People.Add(p);
        await _db.SaveChangesAsync();
        return p;
    }

    public async Task<bool> UpdateAsync(int id, PersonUpdateDto dto)
    {
        var existing = await _db.People.FindAsync(id);
        if (existing == null) return false;

        existing.Name = dto.Name.Trim();
        existing.Address = dto.Address.Trim();
        existing.State = dto.State;
        existing.District = dto.District;
        existing.DateOfBirth = dto.DateOfBirth.Date;
        existing.Language = dto.Language;

        await _db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _db.People.FindAsync(id);
        if (existing == null) return false;
        _db.People.Remove(existing);
        await _db.SaveChangesAsync();
        return true;
    }
}
}