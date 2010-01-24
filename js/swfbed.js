/*
swfBEDs | Swf Background Encapuslation Dynamics | www.swfbed.com
(C)2009 Kev Zettler  http://www.callmekev.com
GNU GENERAL PUBLIC LICENSE
*/
(function($){
 $.fn.swfbed = function() {
    
    var options = {
      swfUrl : 'swfbed.swf'
    };
    
    function getFlashStyle($obj){
      //check the obj. for padding and borders
      var padding_top = parseInt($obj.css('padding-top'), 10);
      var padding_bottom = parseInt($obj.css('padding-bottom'), 10);
      var padding_left = parseInt($obj.css('padding-left'), 10);
      var padding_right = parseInt($obj.css('padding-right'), 10);
      
      /*Lets not worry about borders for now
      var border_top = parseInt($obj.css('border-top-width'), 10);
      var border_bottom = parseInt($obj.css('border-bottom-width'), 10);
      var border_left = parseInt($obj.css('border-left-width'), 10);
      var border_right = parseInt($obj.css('border-right-width'), 10);
      */
      
      var total_left = padding_left;// + border_left;
      var total_right = padding_right;// + border_right;
      var total_top = padding_top;// + border_top;
      var total_bottom = padding_bottom;// + border_bottom;
      
      var extra_width = total_left + total_right;
      var extra_height = total_top + total_bottom;
      
      var style = { 
        position: 'relative',
        height: $obj.find('.swfbed_content').height() + extra_height,
        width: $obj.width() + extra_width,
        bottom : total_top,
        right : total_left
      }
      
      
      return style;
    }
    
    return this.each(function() {
      var $obj = $(this);
      
      //make a container div to put the exisiting content in
      var swfbed_content = $('<div class="swfbed_content" />');
      swfbed_content.css({
        'font-weight': 'bold',
        position: 'absolute',
        'z-index': 9001
      });
      $obj.wrapInner(swfbed_content);
      
      var swfbed_flash = $('<div class="swfbed_flash" />').appendTo($obj);
      var rendered_content = swfbed_flash.prev();
      $obj.data('rendered_content', rendered_content);
      swfbed_flash.css(getFlashStyle($obj));
      
      var swfbed_container = $('<div class="swfbed" />');
      swfbed_container.css({
        position: 'relative',
        height: rendered_content.height()
      });
      $obj.wrapInner(swfbed_container);
      
      //Once all the peices have been added, and hopefully rendered we can grab them
      var rendered_swfbed_container = $obj.find('.swfbed');
      var rendered_swfbed_content = $obj.find('.swfbed_content');
      var rendered_swfbed_flash = $obj.find('.swfbed_flash');
      
      //Add an event on the window resize to adjust heights and stuff accordingly. 
      //This is kind of like a make shift browser reflow but for the swfbed
      var resizeTimer = null;
      $(window).bind('resize', function() {
          if($.browser.msie){
            if (resizeTimer) clearTimeout(resizeTimer);
              resizeTimer = setTimeout(function(){
              swfbed_flash.css(getFlashStyle($obj));
              rendered_swfbed_container.parent().css({height : rendered_content.height()});
            }, 100);
          }else{
            swfbed_flash.css(getFlashStyle($obj));
            //refactor to much DOM crawling
            rendered_swfbed_container.css({height : rendered_swfbed_content.height()});
          }
      });
      
      //drop the flash in
      swfbed_flash.flash({
        swf : options.swfUrl,
        width: '100%',
        height: '100%',
        //height: swfbed_content_rendered_height,
        params:{
          wmode: 'transparent',
          flashVars : {
            name1 : 'test',
            name2 : 'omg'
          }
        }
      });
      
    });
 };
})(jQuery);