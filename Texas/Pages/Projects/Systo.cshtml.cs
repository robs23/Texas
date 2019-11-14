using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Texas.Pages
{
    public class SystoModel : PageModel
    {
        public readonly IHostingEnvironment hostingEnvironment;
        public string WebRootPath
        {
            get
            {
                return hostingEnvironment.WebRootPath;
            }
        }

        public SystoModel(IHostingEnvironment environment)
        {
            this.hostingEnvironment = environment;
        }

        public void OnGet()
        {

        }
    }
}