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
    palette[1][0] = item.find(".color-block[data-id='complement-0']").data("rgb");
    palette[1][1] = item.find(".color-block[data-id='complement-1']").data("rgb");
    palette[1][2] = item.find(".color-block[data-id='complement-2']").data("rgb");
    palette[1][3] = item.find(".color-block[data-id='complement-3']").data("rgb");
    palette[1][4] = item.find(".color-block[data-id='complement-4']").data("rgb");

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
    $("#editor-picker .palette-preview .color-block[data-id='complement-0'] .color-block-color").css("background-color", "#" + palette[1][0]);
    $("#editor-picker .palette-preview .color-block[data-id='complement-1'] .color-block-color").css("background-color", "#" + palette[1][1]);
    $("#editor-picker .palette-preview .color-block[data-id='complement-2'] .color-block-color").css("background-color", "#" + palette[1][2]);
    $("#editor-picker .palette-preview .color-block[data-id='complement-3'] .color-block-color").css("background-color", "#" + palette[1][3]);
    $("#editor-picker .palette-preview .color-block[data-id='complement-4'] .color-block-color").css("background-color", "#" + palette[1][4]);
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
    addCSSRule(sheet, ".complement-0", "color: #" + palette[1][0] + " !important;");
    addCSSRule(sheet, ".bg-complement-0", "background-color: #" + palette[1][0] + " !important;");
    addCSSRule(sheet, ".border-complement-0", "border-color: #" + palette[1][0] + " !important;");
    addCSSRule(sheet, ".hover-complement-0:hover", "color: #" + palette[1][0] + " !important;");
    addCSSRule(sheet, ".complement-1", "color: #" + palette[1][1] + " !important;");
    addCSSRule(sheet, ".bg-complement-1", "background-color: #" + palette[1][1] + " !important;");
    addCSSRule(sheet, ".border-complement-1", "border-color: #" + palette[1][1] + " !important;");
    addCSSRule(sheet, ".hover-complement-1:hover", "color: #" + palette[1][1] + " !important;");
    addCSSRule(sheet, ".complement-2", "color: #" + palette[1][2] + " !important;");
    addCSSRule(sheet, ".bg-complement-2", "background-color: #" + palette[1][2] + " !important;");
    addCSSRule(sheet, ".border-complement-2", "border-color: #" + palette[1][2] + " !important;");
    addCSSRule(sheet, ".hover-complement-2:hover", "color: #" + palette[1][2] + " !important;");
    addCSSRule(sheet, ".complement-3", "color: #" + palette[1][3] + " !important;");
    addCSSRule(sheet, ".bg-complement-3", "background-color: #" + palette[1][3] + " !important;");
    addCSSRule(sheet, ".border-complement-3", "border-color: #" + palette[1][3] + " !important;");
    addCSSRule(sheet, ".hover-complement-3:hover", "color: #" + palette[1][3] + " !important;");
    addCSSRule(sheet, ".complement-4", "color: #" + palette[1][4] + " !important;");
    addCSSRule(sheet, ".bg-complement-4", "background-color: #" + palette[1][4] + " !important;");
    addCSSRule(sheet, ".border-complement-4", "border-color: #" + palette[1][4] + " !important;");
    addCSSRule(sheet, ".hover-complement-4:hover", "color: #" + palette[1][4] + " !important;");
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
});