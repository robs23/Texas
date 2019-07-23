using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Ducksoft.NetCore.Razor.Sitemap.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Texas.Static;

namespace Texas
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddMvc();
            services.AddLocalization(options => options.ResourcesPath = "Resources");
            services.AddMvc()
              .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
              .AddDataAnnotationsLocalization()
              .AddSessionStateTempDataProvider();
            services.AddSession();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.ConfigureMvcRazorPages(CompatibilityVersion.Version_2_2, "/Index", "Home");
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            #if DEBUG
                env.EnvironmentName = EnvironmentName.Development;
            #endif
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
            }
            else
            {
                app.UseExceptionHandler("/Error");
                var options = new RewriteOptions().AddRedirectToHttps();
                app.UseRewriter(options);
            }
            

            var supportedCultures = new[]
            {
                new CultureInfo("en-US"),
                new CultureInfo("pl-PL")
            };

            var lo = new RequestLocalizationOptions // Localization Options
            {
                DefaultRequestCulture = new RequestCulture("en-US"),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures
            };

            var cp = lo.RequestCultureProviders.OfType<CookieRequestCultureProvider>().First(); // Culture provider
            //cp.CookieName = "Culture";

            app.UseRequestLocalization(lo);

            app.UseStaticFiles();
            app.UseSession();
            app.UseMvc();
        }
    }
}
