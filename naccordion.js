(function($) {
  $.extend($.fn, {
    ///<summary>
    /// apply a accordion UI
    ///</summary>
    nAccordion: function(setting) {
      var ps = $.extend({
        //content holder(Object || css Selector)
        renderTo: $('#secondpane'),
        //menuList data
        menuList: [{ "menu_head": "Header-1", "menu_body": [{ "title": "Item-1", "href": "http://www.baidu.com" }, { "title": "Item-2" }, { "title": "Item-3" }] }, { "menu_head": "Header-2", "menu_body": [{ "title": "Item-1" }, { "title": "Item-2" }, { "title": "Item-3" }] }],
        //allow multiUnfold or not
        multiUnfold: true,
        //set menu's width
        menuWidth: 250
      }, setting);

      ps.renderTo = (typeof ps.renderTo == 'string' ? $(ps.renderTo) : ps.renderTo);

      var menuHtml = '';
      $.each(ps.menuList, function(index, menu) {
        var menuNode = '<p class="menu_head">';
        var links = '<div class="menu_body">';
        $.each(menu.menu_body, function(i, item) {
          var theLink = '<a href="#">' + item.title + '</a>';
          if (item.href && item.href != '') {
            theLink = theLink.replace('#', item.href);
          };
          links += theLink;
          //window.console.log(links);
        });
        links += '</div>';
        menuNode += (menu.menu_head + '</p>' + links);
        menuHtml += menuNode;
        //console.log(menuNode);
      });

      var menu = $(menuHtml).appendTo(ps.renderTo);

      $("div.menu_list").css({ width: ps.menuWidth });

      $("#secondpane p.menu_head").click(function() {
        var curImage = $(this).next("div.menu_body").is(":visible") ? "url(left.png)" : "url(down.png)";
        //console.log(curImage);

        if (ps.multiUnfold) {
          $(this).css({ backgroundImage: curImage }).next("div.menu_body").slideToggle(300);
        } else {
          $(this).css({
            backgroundImage: curImage
          }).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("slow");
          $(this).siblings().css({
            backgroundImage: "url(left.png)"
          });
        }
      });
    }
  });
})(jQuery);
