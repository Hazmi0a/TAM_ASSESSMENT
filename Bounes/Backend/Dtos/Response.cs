using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Base;
using Backend.Models;

namespace Backend.Dtos
{

    public class Response<TModel> : BaseResponse
        where TModel : class
    {
        public TModel Model { get; private set; }
        public IEnumerable<TModel> Models { get; private set; }

        private Response(bool success, string message) : base(success, message)
        {
        }
        private Response(bool success, string message, TModel model) : base(success, message)
        {
            Model = model;
        }
        private Response(bool success, string message, IEnumerable<TModel> models) : base(success, message)
        {
            Models = models;
        }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="model">Saved category.</param>
        /// <returns>Response.</returns>
        public Response(TModel model) : this(true, string.Empty, model)
        { }

        /// <summary>
        /// Creates a success response.
        /// </summary>
        /// <param name="models">Saved category.</param>
        /// <returns>Response.</returns>
        public Response(IEnumerable<TModel> models) : this(true, string.Empty, models)
        { }

        /// <summary>
        /// Creates am error response.
        /// </summary>
        /// <param name="message">Error message.</param>
        /// <returns>Response.</returns>
        public Response(string message) : this(false, message)
        { }
    }
}