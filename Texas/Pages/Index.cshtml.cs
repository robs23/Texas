﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Texas.Models;

namespace Texas.Pages
{
    public class IndexModel : PageModel
    {
        [BindProperty]
        [Required]
        [MinLength(2)]
        public string Name { get; set; }
        [BindProperty]
        [Required]
        [MinLength(4)]
        public string Mail { get; set; }
        [BindProperty]
        [Required]
        [MinLength(5)]
        public string Message { get; set; }
        [BindProperty]
        public string UserCulture { get; set; }

        public void OnGet()
        {

        }

        public async Task<IActionResult> OnGetSetCultureAsync(string culture)
        {
            HttpContext.Response.Cookies.Append("Culture", "c=" + culture + "|uic=" + culture,
                new Microsoft.AspNetCore.Http.CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddMonths(3)
                });
            var returnUrl = Request.Headers["Referer"].ToString();
            if (returnUrl.Contains("?culture="))
            {
                var url = returnUrl.Substring(0, returnUrl.IndexOf("?culture="));
                return Redirect(url + "?culture=" + culture);
            }
            else
            {
                return Redirect(returnUrl + "?culture=" + culture);
            }
        }

        public IActionResult OnPostSendMailAsync()
        {
            //Name = Request.Form["Name"];
            Mail mail = new Mail();
            string textBody =  Name + " przesyła wiadomość: " + Message + ". Możesz odpowiedzieć na adres: " + Mail;
            string htmlBody = string.Format("<p><b>{0}</b> przesyła wiadomość: <br><br>{1}<br><br>Możesz odpowiedzieć na adres: {2}</p>",Name,Message,Mail);
            mail.Send(Static.Secrets.ContactMeMail, "Nowa wiadomość na Twojej stronie!", textBody, htmlBody);
            TempData["MessageSent"] = "Sent!";
            return RedirectToPage();
        }
    }
}
