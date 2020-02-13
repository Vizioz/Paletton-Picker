$(document).ready(function() {

    var widgetPosition = "top";
    var w = $(window);
    var widget = $(".side-bar-nav");

    function scrollSideNavigation() {
      if (widget.length) {
        var scrollStart = widget.parent().offset().top + 20;
        var scrollEnd = widget.parent().offset().top + widget.parent().height() - widget.height() - parseInt(widget.css("padding-top")) - parseInt(widget.css("padding-bottom")) - 40;
        var windowScroll = w.scrollTop();

        if (windowScroll < scrollStart && widgetPosition !== "top") {
          widget.css({ "position": "static", "top": "inherit", "bottom": "inherit"});
          widgetPosition = "top";
        }
        else if (windowScroll >= scrollStart && windowScroll <= scrollEnd && widgetPosition !== "fixed") {
          widget.css({ "position": "fixed", "top": "20px", "bottom": "inherit" });
          widgetPosition = "fixed";
        }
        else if (windowScroll > scrollEnd && widgetPosition !== "bottom") {
          widget.css({ "position": "absolute", "top": "inherit", "bottom": "20px" });
          widgetPosition = "bottom";
        }
      }
    }

    $(window).on("scroll resize", function () {
      scrollSideNavigation();
    });

  });
