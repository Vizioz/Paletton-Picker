$(document).ready(function(){

  var itemId = 0;
  var palette = [[], [], [], []];

  function submitColor(id) {
    var item = $(".palette-item[data-item-id='" + id + "']");
    var colors = item.find(".color-block[data-id]");

    for (var i = 0; i < colors.length; i++){
      var color = $(colors[i]);
      var id = color.data("id");
      var charIndex = id.lastIndexOf("-");
      var colorSetName = id.substring(0, charIndex);
      var colorNumber = parseInt(id.substring(charIndex + 1));
      var setNumber;

      if (colorSetName === "primary"){
        setNumber = 0;
      } else if (colorSetName === "secondary-1"){
        setNumber = 1;
      } else if (colorSetName === "secondary-2"){
        setNumber = 2;
      } else if (colorSetName === "complement"){
        setNumber = 3;
      }

      if (!isNaN(colorNumber) && !isNaN(setNumber)){
        palette[setNumber][colorNumber] = item.find(".color-block[data-id='" + colorSetName + "-" + colorNumber + "']").data("rgb");
      }
    }

    $("#editor-picker .add-text").hide();
    $("#editor-picker .palette-preview").show();
    $(".remove-text").show();

    preview();
  };

  function resetColor(){
    itemId = 0;
    palette = [[], [], [], []];

    $("#editor-picker .add-text").show();
    $("#editor-picker .palette-preview").hide();
    $(".remove-text").hide();

    preview();
  }

  function preview() {
    for (var i = 0; i < palette.length; i++){
      var colorSet = palette[i];

      if (i === 0){
        colorSetName = "primary";
      } else if (i === 1){
        colorSetName = "secondary-1";
      } else if (i === 2){
        colorSetName = "secondary-2";
      } else if (i === 3){
        colorSetName = "complement";
      }

      for (var j = 0; j < colorSet.length; j++) {
        $("#editor-picker .palette-preview .color-block[data-id='" + colorSetName + "-" + j + "'] .color-block-color").css("background-color", "#" + palette[i][j]);
        $("#editor-picker .palette-preview .color-block[data-id='" + colorSetName + "-" + j + "']").data("rgb", palette[i][j]);
      }
    }
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

    for (var i = 0; i < palette.length; i++){
      var colorSet = palette[i];

      if (i === 0){
        colorSetName = "primary";
      } else if (i === 1){
        colorSetName = "secondary-1";
      } else if (i === 2){
        colorSetName = "secondary-2";
      } else if (i === 3){
        colorSetName = "complement";
      }

      for (var j = 0; j < colorSet.length; j++) {
        addCSSRule(sheet, "." + colorSetName + "-" + j, "color: #" + palette[i][j] + " !important;");
        addCSSRule(sheet, ".bg-" + colorSetName + "-" + j, "background-color: #" + palette[i][j] + " !important;");
        addCSSRule(sheet, ".border-" + colorSetName + "-" + j, "border-color: #" + palette[i][j] + " !important;");
        addCSSRule(sheet, ".hover-" + colorSetName + "-" + j + ":hover", "color: #" + palette[i][j] + " !important;");
        addCSSRule(sheet, ".hover-bg-" + colorSetName + "-" + j + ":hover", "background-color: #" + palette[i][j] + " !important;");
        addCSSRule(sheet, ".hover-border-" + colorSetName + "-" + j + ":hover", "border-color: #" + palette[i][j] + " !important;");
      }
    }
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
