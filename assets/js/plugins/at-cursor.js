(function ($) {
    "use strict";

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var isTouchOrSmall = window.matchMedia &&
        window.matchMedia("(max-width: 991.98px), (hover: none), (pointer: coarse)").matches;

    if (reduceMotion || isTouchOrSmall || !$("body").hasClass("at-magic-cursor")) {
        $("#magic-cursor").remove();
        return;
    }

    var $cursor = $("#magic-cursor");
    var $ball = $("#ball");

    if (!$cursor.length || !$ball.length) return;

    var mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var pos = { x: mouse.x, y: mouse.y };
    var ratio = 0.18;
    var active = false;
    var baseSize = 14;

    $ball.css({
        width: baseSize,
        height: baseSize,
        opacity: 1
    });

    document.addEventListener("mousemove", function (event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        $cursor.css("opacity", 1);
    }, { passive: true });

    function setBall(x, y) {
        $ball.css("transform", "translate3d(" + x + "px," + y + "px,0) translate(-50%, -50%)");
    }

    function animateCursor() {
        if (!active) {
            pos.x += (mouse.x - pos.x) * ratio;
            pos.y += (mouse.y - pos.y) * ratio;
            setBall(pos.x, pos.y);
        }

        window.requestAnimationFrame(animateCursor);
    }

    animateCursor();

    $(".at-magnetic-item").each(function () {
        var $item = $(this);

        if (!$item.parent().hasClass("at-magnetic-wrap")) {
            $item.wrap('<div class="at-magnetic-wrap"></div>');
        }
    });

    $(".at-magnetic-wrap").on("mousemove", function (event) {
        var rect = this.getBoundingClientRect();
        var relX = event.clientX - rect.left;
        var relY = event.clientY - rect.top;
        var moveX = ((relX - rect.width / 2) / rect.width) * 25;
        var moveY = ((relY - rect.height / 2) / rect.height) * 25;
        var ballX = rect.left + rect.width / 2 + (relX - rect.width / 2) / 2;
        var ballY = rect.top + rect.height / 2 + (relY - rect.height / 2) / 2;

        pos.x = ballX;
        pos.y = ballY;
        setBall(pos.x, pos.y);
        $(this).find(".at-magnetic-item").css("transform", "translate3d(" + moveX + "px," + moveY + "px,0)");
    }).on("mouseenter", function () {
        active = true;
        $ball.css({
            width: baseSize * 2,
            height: baseSize * 2,
            opacity: 1
        });
    }).on("mouseleave", function () {
        active = false;
        $ball.css({
            width: baseSize,
            height: baseSize,
            opacity: 1
        });
        $(this).find(".at-magnetic-item").css("transform", "");
    });

    $("[data-cursor]").each(function () {
        $(this).addClass("not-hide-cursor");
    }).on("mouseenter", function () {
        var text = $(this).attr("data-cursor");

        $ball.addClass("with-blur").css({
            width: 110,
            height: 110,
            backgroundColor: "rgba(255, 255, 255, .82)",
            mixBlendMode: "normal"
        }).html('<div class="ball-view">' + text + '</div>');

        $ball.find(".ball-view").css({
            opacity: 1,
            visibility: "visible",
            transform: "scale(1)"
        });
    }).on("mouseleave", function () {
        $ball.removeClass("with-blur").empty().css({
            width: baseSize,
            height: baseSize,
            backgroundColor: "",
            mixBlendMode: ""
        });
    });

    $("a, button").not(".cursor-hide, .not-hide-cursor").on("mouseenter", function () {
        $ball.css({
            width: 0,
            height: 0,
            opacity: 0
        });
    }).on("mouseleave", function () {
        $ball.css({
            width: baseSize,
            height: baseSize,
            opacity: 1
        });
    });

    $("body").on("mouseleave", function () {
        $cursor.css("opacity", 0);
    }).on("mouseenter", function () {
        $cursor.css("opacity", 1);
    });
})(jQuery);
