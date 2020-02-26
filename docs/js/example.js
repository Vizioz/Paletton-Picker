$(document).ready(function(){

  var itemId = 0;
  var palette = [[], []];

  function submitColor(id) {
    var item = $(".palette-item[data-item-id='" + id + "']");

    palette[0][0] = item.find(".color-block[data-id='primary-0']").data("rgb");
    palette[0][1] = item.find(".color-block[data-id='primary-1']").data("rgb");
    palette[0][2] = item.find(".color-block[data-id='primary-2']").data("rgb");
    palette[0][3] = item.find(".color-block[data-id='primary-3']").data("rgb");
    palette[0][4] = item.find(".color-block[data-id='primary-4']").data("rgb");

    palette[1][0] = item.find(".color-block[data-id='secondary-1-0']").data("rgb");
    palette[1][1] = item.find(".color-block[data-id='secondary-1-1']").data("rgb");
    palette[1][2] = item.find(".color-block[data-id='secondary-1-2']").data("rgb");
    palette[1][3] = item.find(".color-block[data-id='secondary-1-3']").data("rgb");
    palette[1][4] = item.find(".color-block[data-id='secondary-1-4']").data("rgb");

    palette[2][0] = item.find(".color-block[data-id='secondary-2-0']").data("rgb");
    palette[2][1] = item.find(".color-block[data-id='secondary-2-1']").data("rgb");
    palette[2][2] = item.find(".color-block[data-id='secondary-2-2']").data("rgb");
    palette[2][3] = item.find(".color-block[data-id='secondary-2-3']").data("rgb");
    palette[2][4] = item.find(".color-block[data-id='secondary-2-4']").data("rgb");

    palette[3][0] = item.find(".color-block[data-id='complement-0']").data("rgb");
    palette[3][1] = item.find(".color-block[data-id='complement-1']").data("rgb");
    palette[3][2] = item.find(".color-block[data-id='complement-2']").data("rgb");
    palette[3][3] = item.find(".color-block[data-id='complement-3']").data("rgb");
    palette[3][4] = item.find(".color-block[data-id='complement-4']").data("rgb");

    $("#editor-picker .add-text").hide();
    $("#editor-picker .palette-preview").show();
    $(".remove-text").show();

    preview();
  };

  function resetColor(){
    itemId = 0;
    palette = [[], []];

    $("#editor-picker .add-text").show();
    $("#editor-picker .palette-preview").hide();
    $(".remove-text").hide();

    preview();
  }

  function preview() {
    $("#editor-picker .palette-preview .color-block[data-id='primary-0'] .color-block-color").css("background-color", "#" + palette[0][0]);
    $("#editor-picker .palette-preview .color-block[data-id='primary-1'] .color-block-color").css("background-color", "#" + palette[0][1]);
    $("#editor-picker .palette-preview .color-block[data-id='primary-2'] .color-block-color").css("background-color", "#" + palette[0][2]);
    $("#editor-picker .palette-preview .color-block[data-id='primary-3'] .color-block-color").css("background-color", "#" + palette[0][3]);
    $("#editor-picker .palette-preview .color-block[data-id='primary-4'] .color-block-color").css("background-color", "#" + palette[0][4]);

    $("#editor-picker .palette-preview .color-block[data-id='secondary-1-0'] .color-block-color").css("background-color", "#" + palette[1][0]);
    $("#editor-picker .palette-preview .color-block[data-id='secondary-1-1'] .color-block-color").css("background-color", "#" + palette[1][1]);
    $("#editor-picker .palette-preview .color-block[data-id='secondary-1-2'] .color-block-color").css("background-color", "#" + palette[1][2]);
    $("#editor-picker .palette-preview .color-block[data-id='secondary-1-3'] .color-block-color").css("background-color", "#" + palette[1][3]);
    $("#editor-picker .palette-preview .color-block[data-id='secondary-1-4'] .color-block-color").css("background-color", "#" + palette[1][4]);

    $("#editor-picker .palette-preview .color-block[data-id='secondary-2-0'] .color-block-color").css("background-color", "#" + palette[2][0]);
    $("#editor-picker .palette-preview .color-block[data-id='secondary-2-1'] .color-block-color").css("background-color", "#" + palette[2][1]);
    $("#editor-picker .palette-preview .color-block[data-id='secondary-2-2'] .color-block-color").css("background-color", "#" + palette[2][2]);
    $("#editor-picker .palette-preview .color-block[data-id='secondary-2-3'] .color-block-color").css("background-color", "#" + palette[2][3]);
    $("#editor-picker .palette-preview .color-block[data-id='secondary-2-4'] .color-block-color").css("background-color", "#" + palette[2][4]);

    $("#editor-picker .palette-preview .color-block[data-id='complement-0'] .color-block-color").css("background-color", "#" + palette[3][0]);
    $("#editor-picker .palette-preview .color-block[data-id='complement-1'] .color-block-color").css("background-color", "#" + palette[3][1]);
    $("#editor-picker .palette-preview .color-block[data-id='complement-2'] .color-block-color").css("background-color", "#" + palette[3][2]);
    $("#editor-picker .palette-preview .color-block[data-id='complement-3'] .color-block-color").css("background-color", "#" + palette[3][3]);
    $("#editor-picker .palette-preview .color-block[data-id='complement-4'] .color-block-color").css("background-color", "#" + palette[3][4]);
  }

  function getSheet() {
    $("#style-palette").remove();

    var style = document.createElement("style");
    style.setAttribute("id", "style-palette");
    style.appendChild(document.createTextNode(""));
    document.head.appendChild(style);
    return style.sheet;
  };

  function addCSSRule(sheet, selector, rules, index) {
    if("insertRule" in sheet) {
      sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else if("addRule" in sheet) {
      sheet.addRule(selector, rules, index);
    }
  }

  function removeStyles() {
    $("#style-palette").remove();
  }

  function applyStyles() {
    var sheet = getSheet();

    addCSSRule(sheet, ".primary-0", "color: #" + palette[0][0] + " !important;");
    addCSSRule(sheet, ".bg-primary-0", "background-color: #" + palette[0][0] + " !important;");
    addCSSRule(sheet, ".border-primary-0", "border-color: #" + palette[0][0] + " !important;");
    addCSSRule(sheet, ".hover-primary-0:hover", "color: #" + palette[0][0] + " !important;");
    addCSSRule(sheet, ".primary-1", "color: #" + palette[0][1] + " !important;");
    addCSSRule(sheet, ".bg-primary-1", "background-color: #" + palette[0][1] + " !important;");
    addCSSRule(sheet, ".border-primary-1", "border-color: #" + palette[0][1] + " !important;");
    addCSSRule(sheet, ".hover-primary-1:hover", "color: #" + palette[0][1] + " !important;");
    addCSSRule(sheet, ".primary-2", "color: #" + palette[0][2] + " !important;");
    addCSSRule(sheet, ".bg-primary-2", "background-color: #" + palette[0][2] + " !important;");
    addCSSRule(sheet, ".border-primary-2", "border-color: #" + palette[0][2] + " !important;");
    addCSSRule(sheet, ".hover-primary-2:hover", "color: #" + palette[0][2] + " !important;");
    addCSSRule(sheet, ".primary-3", "color: #" + palette[0][3] + " !important;");
    addCSSRule(sheet, ".bg-primary-3", "background-color: #" + palette[0][3] + " !important;");
    addCSSRule(sheet, ".border-primary-3", "border-color: #" + palette[0][3] + " !important;");
    addCSSRule(sheet, ".hover-primary-3:hover", "color: #" + palette[0][3] + " !important;");
    addCSSRule(sheet, ".primary-4", "color: #" + palette[0][4] + " !important;");
    addCSSRule(sheet, ".bg-primary-4", "background-color: #" + palette[0][4] + " !important;");
    addCSSRule(sheet, ".border-primary-4", "border-color: #" + palette[0][4] + " !important;");
    addCSSRule(sheet, ".hover-primary-4:hover", "color: #" + palette[0][4] + " !important;");

    addCSSRule(sheet, ".secondary-1-0", "color: #" + palette[1][0] + " !important;");
    addCSSRule(sheet, ".bg-secondary-1-0", "background-color: #" + palette[1][0] + " !important;");
    addCSSRule(sheet, ".border-secondary-1-0", "border-color: #" + palette[1][0] + " !important;");
    addCSSRule(sheet, ".hover-secondary-1-0:hover", "color: #" + palette[1][0] + " !important;");
    addCSSRule(sheet, ".secondary-1-1", "color: #" + palette[1][1] + " !important;");
    addCSSRule(sheet, ".bg-secondary-1-1", "background-color: #" + palette[1][1] + " !important;");
    addCSSRule(sheet, ".border-secondary-1-1", "border-color: #" + palette[1][1] + " !important;");
    addCSSRule(sheet, ".hover-secondary-1-1:hover", "color: #" + palette[1][1] + " !important;");
    addCSSRule(sheet, ".secondary-1-2", "color: #" + palette[1][2] + " !important;");
    addCSSRule(sheet, ".bg-secondary-1-2", "background-color: #" + palette[1][2] + " !important;");
    addCSSRule(sheet, ".border-secondary-1-2", "border-color: #" + palette[1][2] + " !important;");
    addCSSRule(sheet, ".hover-secondary-1-2:hover", "color: #" + palette[1][2] + " !important;");
    addCSSRule(sheet, ".secondary-1-3", "color: #" + palette[1][3] + " !important;");
    addCSSRule(sheet, ".bg-secondary-1-3", "background-color: #" + palette[1][3] + " !important;");
    addCSSRule(sheet, ".border-secondary-1-3", "border-color: #" + palette[1][3] + " !important;");
    addCSSRule(sheet, ".hover-secondary-1-3:hover", "color: #" + palette[1][3] + " !important;");
    addCSSRule(sheet, ".secondary-1-4", "color: #" + palette[1][4] + " !important;");
    addCSSRule(sheet, ".bg-secondary-1-4", "background-color: #" + palette[1][4] + " !important;");
    addCSSRule(sheet, ".border-secondary-1-4", "border-color: #" + palette[1][4] + " !important;");
    addCSSRule(sheet, ".hover-secondary-1-4:hover", "color: #" + palette[1][4] + " !important;");

    addCSSRule(sheet, ".secondary-2-0", "color: #" + palette[2][0] + " !important;");
    addCSSRule(sheet, ".bg-secondary-2-0", "background-color: #" + palette[2][0] + " !important;");
    addCSSRule(sheet, ".border-secondary-2-0", "border-color: #" + palette[2][0] + " !important;");
    addCSSRule(sheet, ".hover-secondary-2-0:hover", "color: #" + palette[2][0] + " !important;");
    addCSSRule(sheet, ".secondary-2-1", "color: #" + palette[2][1] + " !important;");
    addCSSRule(sheet, ".bg-secondary-2-1", "background-color: #" + palette[2][1] + " !important;");
    addCSSRule(sheet, ".border-secondary-2-1", "border-color: #" + palette[2][1] + " !important;");
    addCSSRule(sheet, ".hover-secondary-2-1:hover", "color: #" + palette[2][1] + " !important;");
    addCSSRule(sheet, ".secondary-2-2", "color: #" + palette[2][2] + " !important;");
    addCSSRule(sheet, ".bg-secondary-2-2", "background-color: #" + palette[2][2] + " !important;");
    addCSSRule(sheet, ".border-secondary-2-2", "border-color: #" + palette[2][2] + " !important;");
    addCSSRule(sheet, ".hover-secondary-2-2:hover", "color: #" + palette[2][2] + " !important;");
    addCSSRule(sheet, ".secondary-2-3", "color: #" + palette[2][3] + " !important;");
    addCSSRule(sheet, ".bg-secondary-2-3", "background-color: #" + palette[2][3] + " !important;");
    addCSSRule(sheet, ".border-secondary-2-3", "border-color: #" + palette[2][3] + " !important;");
    addCSSRule(sheet, ".hover-secondary-2-3:hover", "color: #" + palette[2][3] + " !important;");
    addCSSRule(sheet, ".secondary-2-4", "color: #" + palette[2][4] + " !important;");
    addCSSRule(sheet, ".bg-secondary-2-4", "background-color: #" + palette[2][4] + " !important;");
    addCSSRule(sheet, ".border-secondary-2-4", "border-color: #" + palette[2][4] + " !important;");
    addCSSRule(sheet, ".hover-secondary-2-4:hover", "color: #" + palette[2][4] + " !important;");

    addCSSRule(sheet, ".complement-0", "color: #" + palette[3][0] + " !important;");
    addCSSRule(sheet, ".bg-complement-0", "background-color: #" + palette[3][0] + " !important;");
    addCSSRule(sheet, ".border-complement-0", "border-color: #" + palette[3][0] + " !important;");
    addCSSRule(sheet, ".hover-complement-0:hover", "color: #" + palette[3][0] + " !important;");
    addCSSRule(sheet, ".complement-1", "color: #" + palette[3][1] + " !important;");
    addCSSRule(sheet, ".bg-complement-1", "background-color: #" + palette[3][1] + " !important;");
    addCSSRule(sheet, ".border-complement-1", "border-color: #" + palette[3][1] + " !important;");
    addCSSRule(sheet, ".hover-complement-1:hover", "color: #" + palette[3][1] + " !important;");
    addCSSRule(sheet, ".complement-2", "color: #" + palette[3][2] + " !important;");
    addCSSRule(sheet, ".bg-complement-2", "background-color: #" + palette[3][2] + " !important;");
    addCSSRule(sheet, ".border-complement-2", "border-color: #" + palette[3][2] + " !important;");
    addCSSRule(sheet, ".hover-complement-2:hover", "color: #" + palette[3][2] + " !important;");
    addCSSRule(sheet, ".complement-3", "color: #" + palette[3][3] + " !important;");
    addCSSRule(sheet, ".bg-complement-3", "background-color: #" + palette[3][3] + " !important;");
    addCSSRule(sheet, ".border-complement-3", "border-color: #" + palette[3][3] + " !important;");
    addCSSRule(sheet, ".hover-complement-3:hover", "color: #" + palette[3][3] + " !important;");
    addCSSRule(sheet, ".complement-4", "color: #" + palette[3][4] + " !important;");
    addCSSRule(sheet, ".bg-complement-4", "background-color: #" + palette[3][4] + " !important;");
    addCSSRule(sheet, ".border-complement-4", "border-color: #" + palette[3][4] + " !important;");
    addCSSRule(sheet, ".hover-complement-4:hover", "color: #" + palette[3][4] + " !important;");
  }

  vm = {
      edit: function() {
        $(".umb-editor__overlay").show();
        $(".umb-editors").css("visibility", "visible");
        $(".umb-editors").css("opacity", "1");
        $(".umb-editors .umb-editor").css("transform", "translateX(0)");
      },
      remove: function(){
        resetColor();
      },
      close: function() {
        $(".umb-editor__overlay").hide();
        $(".umb-editors .umb-editor").css("transform", "translateX(500px)");
        setTimeout(function(){
            $(".umb-editors").css("visibility", "hidden");
            $(".umb-editors").css("opacity", "0");
          }, 300);
      },
      select: function(el) {
        $(".palette-item").removeClass("selected");
        $(el).addClass("selected");
        itemId = $(el).data("item-id");
      },
      submit: function() {
        $(".umb-editor__overlay").hide();
        $(".umb-editors .umb-editor").css("transform", "translateX(500px)");
        setTimeout(function(){
            $(".umb-editors").css("visibility", "hidden");
            $(".umb-editors").css("opacity", "0");
          }, 300);
        submitColor(itemId);
      },
      savePublish: function() {
        if (itemId === 0) {
          removeStyles();
        } else {
          applyStyles();
        }
      }
    };

    $(".color-block").mouseover(function(ev){
        if (!$(this).find(".umb-tooltip").length){
          var id = $(this).data("id");
          var rgb = $(this).data("rgb");
          var tooltip = $("<div class=\"umb-tooltip shadow-depth-2\"><span><span class=\"color-block-id\">" + id + "</span><br/><span class=\"color-block-rgb\">#" + rgb + "</span></span></div>");
          tooltip.css("top", (ev.pageY - window.pageYOffset) + "px");
          tooltip.css("left", (ev.pageX - window.pageXOffset) + "px");
          $(this).append(tooltip);
        }
      });

      $(".color-block").mouseleave(function(){
        var tooltip = $(this).find(".umb-tooltip");
        tooltip.remove();
      });
});
