using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.AspNetCore.Razor.Runtime.TagHelpers;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace Texas.TagHelpers
{
    // You may need to install the Microsoft.AspNetCore.Razor.Runtime package into your project
    [HtmlTargetElement("feature-gif", Attributes = "id, play-tooltip, stop-tooltip")]
    public class FeatureGifTagHelper : TagHelper
    {
        [HtmlAttributeName("id")]
        public string Id { get; set; }
        [HtmlAttributeName("play-tooltip")]
        public string PlayTooltip { get; set; }
        [HtmlAttributeName("stop-tooltip")]
        public string StopTooltip { get; set; }
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            output.TagName = "div";
            output.AddClass("feature-gif", HtmlEncoder.Default);
            output.Content.SetHtmlContent($@"<img src=""/images/{Id}.png"" id=""{Id}"" class=""feature-img"" />
                <span class=""play-gif-container"">
	                <span>
		                <i class=""fa fa-play-circle feature-btn player tooltip-container"" onclick=""changeImage2GifWithButton('{Id}')"">
			                <span class=""tooltiptext"">{PlayTooltip}</span>
		                </i>
		                <i class=""fa fa-stop-circle feature-btn stopper tooltip-container isActive"" onclick=""changeGif2ImageWithButton('{Id}')"">
			                <span class=""tooltiptext"">{StopTooltip}</span>
		                </i>
	                </span>
                </span>");
            output.TagMode = TagMode.StartTagAndEndTag;
        }
    }
}
