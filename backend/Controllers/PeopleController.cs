using CrudApi.DTOs;
using CrudApi.Services;
using Microsoft.AspNetCore.Mvc;
namespace CrudApi.Controllers
{
[ApiController]
[Route("api/[controller]")]
public class PeopleController : ControllerBase
{
private readonly IPersonService _service;
private readonly ILogger<PeopleController> _logger;


    public PeopleController(IPersonService service, ILogger<PeopleController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PersonReadDto>>> GetAll()
    {
        var people = await _service.GetAllAsync();
        var result = people.Select(p => new PersonReadDto
        {
            Id = p.Id,
            Name = p.Name,
            Address = p.Address,
            State = p.State,
            District = p.District,
            DateOfBirth = p.DateOfBirth,
            Language = p.Language
        });
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PersonReadDto>> GetById(int id)
    {
        var p = await _service.GetByIdAsync(id);
        if (p == null) return NotFound(new { message = "Person not found" });

        return Ok(new PersonReadDto
        {
            Id = p.Id,
            Name = p.Name,
            Address = p.Address,
            State = p.State,
            District = p.District,
            DateOfBirth = p.DateOfBirth,
            Language = p.Language
        });
    }

    [HttpPost]
    public async Task<ActionResult<PersonReadDto>> Create([FromBody] PersonCreateDto dto)
    {
        if (dto.DateOfBirth.Date > DateTime.UtcNow.Date)
            ModelState.AddModelError(nameof(dto.DateOfBirth), "Date of birth cannot be in the future.");
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        try
        {
            var created = await _service.CreateAsync(dto);
            var read = new PersonReadDto
            {
                Id = created.Id,
                Name = created.Name,
                Address = created.Address,
                State = created.State,
                District = created.District,
                DateOfBirth = created.DateOfBirth,
                Language = created.Language
            };
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, read);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating person");
            return Problem("An error occurred while creating the record.");
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] PersonUpdateDto dto)
    {
        if (dto.DateOfBirth.Date > DateTime.UtcNow.Date)
            ModelState.AddModelError(nameof(dto.DateOfBirth), "Date of birth cannot be in the future.");
        if (!ModelState.IsValid) return ValidationProblem(ModelState);

        try
        {
            var success = await _service.UpdateAsync(id, dto);
            if (!success) return NotFound(new { message = "Person not found" });
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating person");
            return Problem("An error occurred while updating the record.");
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var success = await _service.DeleteAsync(id);
            if (!success) return NotFound(new { message = "Person not found" });
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting person");
            return Problem("An error occurred while deleting the record.");
        }
    }
}
}