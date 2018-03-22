using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HelloReact.Models;
using Microsoft.AspNetCore.Mvc;


namespace HelloReact.Controllers
{
    [Route("api/[controller]")]
    public class StyleController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<Style> Styles(int seasonId)
        {
            if (seasonId == 454393)
            {
                return new List<Style>
                {
                   new Style{ style = "FA1" },
                   new Style{ style = "FA2" },
                   new Style{ style = "FA3" }
                };
            }
            else
            {
                return new List<Style>
                {
                   new Style{ style = "PF1" },
                   new Style{ style = "PF2" },
                };
            }
        }
    }
}
