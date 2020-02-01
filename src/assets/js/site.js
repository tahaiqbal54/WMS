    function sideNav() {
        $(".side-nav .side-nav-menu li a").click(function(e) {
            $(this).parent().hasClass("open") ? $(this).parent().children(".dropdown-menu").slideUp(200, function() {
                $(this).parent().removeClass("open")
            }) : ($(this).parent().parent().children("li.open").children(".dropdown-menu").slideUp(200),
            $(this).parent().parent().children("li.open").children("a").removeClass("open"),
            $(this).parent().parent().children("li.open").removeClass("open"),
            $(this).parent().children(".dropdown-menu").slideDown(200, function() {
                $(this).parent().addClass("open")
            }))
        });
    } 
    function sideNavToggle() {
        $(".side-nav-toggle").on("click", function(e) {
            $(".app").toggleClass("is-collapsed"),
            e.preventDefault();
            if($(".app").is(".is-collapsed"))
            {
                $(".nav-right").css("margin-right","5px");
                $("table.dataTable.no-footer").width($("table.dataTable.no-footer").width()-210);
            }
            else
            {
                $(".nav-right").css("margin-right","69px");
                $("table.dataTable.no-footer").width($("table.dataTable.no-footer").width()+210)
            }
        })
    }
    function sidePanelToggle() {
        $(".side-panel-toggle").on("click", function(e) {
            $(".side-panel").toggleClass("side-panel-open"),
            e.preventDefault()
        })
    }
    function chatToggle() {
        $(".chat-toggle").on("click", function(e) {
            $(".chat").toggleClass("open"),
            e.preventDefault()
        })
    }
    function todoToggle() {
        $(".todo-toggle").on("click", function(e) {
            $(".todo-wrapper").toggleClass("open"),
            e.preventDefault()
        })
    }
    function searchToggle() {
        $(".search-toggle").on("click", function(e) {
            $(".search-box, .search-input").toggleClass("active"),
            $(".search-input input").focus(),
            e.preventDefault()
        })
    }
    function advanceSearch() {
        $(".search-input input").on("keyup", function() {
            $(this).val().length > 0 ? $(".advanced-search").addClass("active") : $(".advanced-search").removeClass("active"),
            $(".serach-text-bind").html($(this).val())
        })
    }
    function themeConfig() {
        $(".theme-toggle, .config-close").on("click", function(e) {
            $(".theme-configurator").toggleClass("theme-config-open"),
            e.preventDefault()
        })
    }
    function perfectSB() {
        $(".scrollable").perfectScrollbar()
    }
    function cardPortletCtrl() {
        $("[data-toggle=card-refresh]").on("click", function(e) {
            var cardRefreshSelector = $(this).parents(".card");
            cardRefreshSelector.addClass("card-refresh"),
            window.setTimeout(function() {
                cardRefreshSelector.removeClass("card-refresh")
            }, 2e3),
            e.preventDefault(),
            e.stopPropagation()
        }),
        $("[data-toggle=card-delete]").on("click", function(e) {
            var cardDeleteSelector = $(this).parents(".card");
            cardDeleteSelector.addClass("animated zoomOut"),
            cardDeleteSelector.bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function() {
                cardDeleteSelector.remove()
            }),
            e.preventDefault(),
            e.stopPropagation()
        })
    }
    function themeColorConfig() {
        $(".header-default input").change(function() {
            $(".app").removeClass("header-primary header-info header-success header-danger header-dark")
        }),
        $(".header-info input").change(function() {
            $(".app").addClass("header-info"),
            $(".app").removeClass("header-primary header-success header-danger header-dark")
        }),
        $(".header-primary input").change(function() {
            $(".app").addClass("header-primary"),
            $(".app").removeClass("header-info header-success header-danger header-dark")
        }),
        $(".header-success input").change(function() {
            $(".app").addClass("header-success"),
            $(".app").removeClass("header-info header-primary header-danger header-dark")
        }),
        $(".header-danger input").change(function() {
            $(".app").addClass("header-danger"),
            $(".app").removeClass("header-info header-primary header-success header-dark")
        }),
        $(".header-dark input").change(function() {
            $(".app").addClass("header-dark"),
            $(".app").removeClass("header-info header-primary header-success header-danger")
        }),
        $(".theme-colors.side-nav-dark input").change(function() {
            $(".app").addClass("side-nav-dark"),
            $(".app").removeClass("side-nav-default")
        }),
        $(".theme-colors.sidenav-default input").change(function() {
            $(".app").addClass("side-nav-default"),
            $(".app").removeClass("side-nav-dark")
        }),
        $("#rtl-toogle").on("click", function(e) {
            $(".app").toggleClass("rtl"),
            e.preventDefault()
        })
    }

    $(function() {
        sideNav();
        sideNavToggle();
        sidePanelToggle();
        chatToggle();
        todoToggle();
        searchToggle();
        advanceSearch();
        themeConfig();
        perfectSB();
        cardPortletCtrl();
        themeColorConfig();
    });
