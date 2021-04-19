using Ducksoft.NetCore.Razor.Sitemap.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Texas.Static
{
    public static class Extensions
    {
        public static IServiceCollection ConfigureMvcRazorPages(this IServiceCollection services,
        CompatibilityVersion version, string startPageUrl = "", string startPageArea = "")
        {
            services.AddMvc()
                .SetCompatibilityVersion(version)
                .AddRazorPagesOptions(options =>
                {
                    var isSupportAreas = !string.IsNullOrWhiteSpace(startPageArea);
                    if (isSupportAreas)
                    {
                        options.Conventions.AddAreaPageRoute(startPageArea, startPageUrl, string.Empty);
                    }
                    else if (!string.IsNullOrWhiteSpace(startPageUrl))
                    {
                        options.Conventions.AddPageRoute(startPageUrl, string.Empty);
                    }
                })
                .AddRazorPagesOptions(options =>
                {
                    options.Conventions.Add(new SitemapRouteConvention());
                })
                .AddRazorPagesOptions(options =>
                {
                    options.Conventions.AddPageRoute("/Sitemap", "sitemap.xml");
                });

            return services;
        }
    }
}
