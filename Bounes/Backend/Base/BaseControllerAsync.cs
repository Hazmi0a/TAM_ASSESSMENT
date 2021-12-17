using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Backend.Interfaces;
using Backend.Utils;

namespace Backend.Base
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseControllerAsync<TModel, TReadDto, TCreateDto, TUpdateDto> : ControllerBase
        where TModel : class
        where TReadDto : BaseDto, new()
        where TCreateDto : class
        where TUpdateDto : class
    {
        protected readonly IMapper _mapper;
        protected readonly IUnitOfWork _uof;
        protected readonly ILogger<TModel> _logger;

        public BaseControllerAsync(ILogger<TModel> logger, IMapper mapper, IUnitOfWork uof)
        {
            _mapper = mapper;
            _uof = uof;
            _logger = logger;
        }

        // GET api/Model All Model
        /*[Authorize]
        [HttpGet]
        public virtual async Task<ActionResult<IEnumerable<TReadDto>>> Get()
        {
            _logger.LogInformation(LogEvents.ListResourses, Strings.ListingResources);
            var opItems = await _uof.Repo<TModel>().GetAllAsync();
            if (opItems.Count() == 0) _logger.LogInformation(LogEvents.ListResourses, Strings.NoResouces);
            // make the repo get all usertypes to map it with Model 
            //Return a Maped the op to opDTO 
            return Ok(_mapper.Map<IEnumerable<TReadDto>>(opItems));
        }*/
        // GET api/Model/{id} One use with id
        //[Authorize]
        /*[HttpGet("{id}", Name = "[controller]/GetById")]
        public virtual async Task<ActionResult<TReadDto>> GetById(int id)
        {
            _logger.LogInformation(LogEvents.GetResourse, Strings.GettingResource(id), id);
            var opModel = await _uof.Repo<TModel>().GetByIdAsync(id);
            // if found return a user Dto
            if (!opModel.Success)
            {
                _logger.LogWarning(LogEvents.GetResourseNotFound, Strings.GettingResource(id, false), id);
                return NotFound();
            }
            // make the repo get user usertypes to map it with user 
            return Ok(_mapper.Map<TReadDto>(opModel.Model));
        }*/

        // POST api/Model
        // [Authorize]
        // [HttpPost]
        // public virtual async Task<ActionResult<TReadDto>> Create(TCreateDto CreateDto)
        // {
        //     _logger.LogInformation(LogEvents.CreateResourse, Strings.CreateResourse, CreateDto);
        //     // Map user dto to use then create it in Db and save
        //     var opModel = _mapper.Map<TModel>(CreateDto);
        //     var result = await _uof.Repo<TModel>().CreateAsync(opModel);
        //     if (!result.Success) return BadRequest(result.Message);
        //     await _uof.Repo<TModel>().SaveChangesAsync();

        //     // need to send new URI with response, so map user to TReadDto response 
        //     // then pass the id of it to nameof GetGroupById and pass it to response as well
        //     var ReadDto = _mapper.Map<TReadDto>(result.Model);
        //     // the route for the resource using the get by id action
        //     var route = this.ControllerContext.ActionDescriptor.ControllerName + "/GetById";
        //     return CreatedAtRoute(route, new { ReadDto.Id }, ReadDto);
        // }

        // POST api/Model
        /*[Authorize]
        [HttpPost("list")]
        public virtual async Task<ActionResult<TReadDto>> CreateRange(IEnumerable<TCreateDto> RangeCreateDto)
        {
            _logger.LogInformation(LogEvents.CreateResourse, Strings.CreateListResourse);
            // Map user dto to use then create it in Db and save
            List<TModel> models = new();
            foreach (TCreateDto createDto in RangeCreateDto)
            {
                var opModel = _mapper.Map<TModel>(createDto);
                models.Add(opModel);
            }

            var result = await _uof.Repo<TModel>().CreateRangeAsync(models);
            if (!result.Success) return BadRequest(result.Message);
            await _uof.Repo<TModel>().SaveChangesAsync();

            // need to send new URI with response, so map user to TReadDto response 
            // then pass the id of it to nameof GetGroupById and pass it to response as well
            var ReadDto = _mapper.Map<TReadDto>(result.Model);
            // the route for the resource using the get by id action
            var route = ControllerContext.ActionDescriptor.ControllerName + "/GetById";
            return CreatedAtRoute(route, new { ReadDto.Id }, ReadDto);
        }*/
        // PUT api/Model/{id}
        /*[Authorize]
        [HttpPut("{id}")]
        public virtual async Task<ActionResult> Update(int id, TUpdateDto UpdateDto)
        {
            _logger.LogInformation(LogEvents.UpdateResourse, Strings.UpdateResourse(id), id);
            var opModel = await _uof.Repo<TModel>().GetByIdAsync(id);
            if (opModel == null)
            {
                _logger.LogWarning(LogEvents.GetResourseNotFound, Strings.GettingResource(id, false), id);
                return NotFound();
            }

            // Map user dto to user which will update Db then save
            _mapper.Map(UpdateDto, opModel);
            var result = await _uof.Repo<TModel>().UpdateAsync(opModel.Model);
            if (!result.Success) return BadRequest(result.Message);
            await _uof.Repo<TModel>().SaveChangesAsync();

            return NoContent();
        }*/

        // PATCH api/s/{id}
        /*[Authorize]
        [HttpPatch("{id}")]
        public virtual async Task<ActionResult> PartialUpdate(int id, JsonPatchDocument<TUpdateDto> patchDoc)
        {
            _logger.LogInformation(LogEvents.UpdateResourse, Strings.UpdateResourse(id), id);
            var opModel = await _uof.Repo<TModel>().GetByIdAsync(id);
            if (opModel == null)
            {
                _logger.LogWarning(LogEvents.GetResourseNotFound, Strings.GettingResource(id, false), id);
                return NotFound();
            }

            // mapp TModel to user dto then try to apple the patch doc to it.
            var opToPatch = _mapper.Map<TUpdateDto>(opModel);
            patchDoc.ApplyTo(opToPatch, ModelState);
            if (!TryValidateModel(opModel))
            {
                return ValidationProblem(ModelState);
            }

            // Map patched user to user which will update Db then save
            _mapper.Map(opToPatch, opModel);
            var result = await _uof.Repo<TModel>().UpdateAsync(opModel.Model);
            if (!result.Success) return BadRequest(result.Message);
            await _uof.Repo<TModel>().SaveChangesAsync();

            return NoContent();
        }*/

        // DELETE api/s/{id}
        /*[Authorize]
        [HttpDelete("{id}")]
        public virtual async Task<ActionResult> Delete(int id)
        {
            _logger.LogInformation(LogEvents.DeleteResourse, Strings.DeleteResourse(id), id);
            var opModel = await _uof.Repo<TModel>().GetByIdAsync(id);
            if (opModel == null)
            {
                _logger.LogWarning(LogEvents.GetResourseNotFound, Strings.GettingResource(id, false), id);
                return NotFound();
            }

            var result = await _uof.Repo<TModel>().DeleteAsync(opModel.Model);
            if (!result.Success) return BadRequest(result.Message);
            await _uof.Repo<TModel>().SaveChangesAsync();

            return NoContent();
        }*/
    }
}
