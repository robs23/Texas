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
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Texas.Static;
using Texas.TagHelpers;
using Westwind.AspNetCore.LiveReload;

namespace Texas
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(env.ContentRootPath)
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
            .AddEnvironmentVariables();
            Configuration = configuration;
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddMvc();
            services.AddLocalization(options => options.ResourcesPath = "Resources");
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSession();
            services.AddMvc(options => options.EnableEndpointRouting = false)
              .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
              .AddDataAnnotationsLocalization()
              .AddSessionStateTempDataProvider().AddRazorRuntimeCompilation();
            services.AddLiveReload();
            //services.ConfigureMvcRazorPages(CompatibilityVersion.Version_3_0, "/Index", "Home");
            // Register the Google Analytics configuration
            services.Configure<GoogleAnalyticsOptions>(options => Configuration.GetSection("GoogleAnalytics").Bind(options));

            // Register the TagHelperComponent
            services.AddTransient<ITagHelperComponent, GoogleAnalyticsTagHelperComponent>();
        }


        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            #if DEBUG
                env.EnvironmentName = Microsoft.Extensions.Hosting.Environments.Development;
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
            app.UseLiveReload();

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
            app.UseSession();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseMvc();
            
            //app.UseEndpoints(endpoints => endpoints.MapRazorPages());

        }
    }
}
