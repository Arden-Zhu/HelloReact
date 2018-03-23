using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HelloReact.Models;
using Microsoft.AspNetCore.Mvc;


namespace HelloReact.Controllers
{
    [Route("api/[controller]")]
    public class SeasonController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Season> GetSeasons()
        {
            return new List<Season>
                {
                   new Season{ label = "FA1", value = 1 },
                   new Season{ label = "FA2", value = 2 },
                   new Season{ label = "FA3", value = 3 },
                };
        }
    }
}
