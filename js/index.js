$(function() {

  function init() {
    addMouseOut();
  }

  function debounce(func, wait, immediate) {

    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };


  function calculateLayout() {
    var rightVal = -390;

    rightVal = (rightVal * -1) - 390;
    $("nav").addClass("nav-modal");
    $("#modal").animate({
      right: rightVal + 'px'
    }, {
      queue: false,
      duration: 800
    }, "swing");
  }

  var myDebounce = debounce(calculateLayout, 1000, true)
  var addEvent = function(obj, evt, fn) {
    if (obj.addEventListener) {
      obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
      obj.attachEvent("on" + evt, fn);
    }
  };


  function handleMouseOut(event) {

    event = event ? event : window.event;

    var from = event.relatedTarget || event.toElement;

    if ((!from || from.nodeName == "HTML") && event.clientY <= 0) {
      myDebounce();
    }
  }


  function addMouseOut() {
    addEvent(document, "mouseout", handleMouseOut);
  }

  $(".modal-exit-button").click(() => {
    $("nav").removeClass("nav-modal");
    $("#modal").animate({
      right: '-400px'
    }, {
      queue: false,
      duration: 800
    });

    var ourTime = function randomInterval(min, max) {
      min = Math.ceil(20000);
      max = Math.floor(10000);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    document.removeEventListener("mouseout", handleMouseOut);
    //setting a delay so that the action doesn't fire too often.
    setTimeout(() => {
      addMouseOut();
    }, ourTime());
  });

  init();

});