function navigateByURL(url) {
    if (url.includes("http") && url.indexOf("https://xion.finance") == -1) {
        window.open(url, '_blank');
    } else {
        window.location.href = url;
    }
}

jQuery(function ($) {

    $(document).on("click", ".project-card", function () {
        if (!$(this).hasClass("no-navigate")) {
            location.href = "shop.html"
        }
    });

    $(document).on("click", "#view_live", function () {
        if (!$("#view_live").hasClass("active")) {
            $("#view_live").addClass("active");
        }
        $("#view_finish").removeClass("active");
        switchPools(true);
    });

    $(document).on("click", "#agree_share", function () {
        const modal = document.getElementById("invite_modal");
        modal.style.display = "flex";
    });

    $(document).on("click", "#close_modal", function () {
        const modal = document.getElementById("invite_modal");
        modal.style.display = "none";
    });

    $(document).on("click", "#expand_project", function () {
        $(this).text() === "SEE MORE"
            ? $(this).text("SEE LESS")
            : $(this).text("SEE MORE");
        $(this).text() === "SEE MORE"
            ? $(".hide-card").css("display", "none")
            : $(".hide-card").css("display", "inline");
    });

    window.onclick = function (event) {
        const modal = document.getElementById("invite_modal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    $(document).on("click", ".farm-item-detail", function (el) {
        const parentElement = $(this).parents(".farm-item").last();
        if (parentElement.hasClass("collapse")) {
            parentElement.removeClass("collapse");
            parentElement.addClass("expanded");
        } else if (parentElement.hasClass("expanded")) {
            parentElement.removeClass("expanded");
            parentElement.addClass("collapse");
        }
    });

    $(document).on("click", ".farm-switch-btn.small", function () {
        if (
            $(this).hasClass("disabled") ||
            $(this).hasClass("disabled-regular")
        ) {
            return;
        }
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            $(this).siblings().removeClass("active");
        }
    });

    $(document).on("click", ".shop-product-card-detail", function (el) {
        const parentElement = $(this)
            .parents(".shop-product-card-content")
            .last();
        if (parentElement.hasClass("collapse")) {
            parentElement.removeClass("collapse");
            parentElement.addClass("expanded");
        } else if (parentElement.hasClass("expanded")) {
            parentElement.removeClass("expanded");
            parentElement.addClass("collapse");
        }
    });

    $(document).on(
        "click",
        ".earn-merchant-topic-detail-marker",
        function (el) {
            const parentElement = $(this)
                .parents(".earn-merchant-topic-detail")
                .last();
            if (parentElement.hasClass("collapse")) {
                parentElement.removeClass("collapse");
                parentElement.addClass("expanded");
            }
        }
    );

    $(document).on(
        "click",
        ".earn-merchant-topic-detail-collapse",
        function (el) {
            const parentElement = $(this)
                .parents(".earn-merchant-topic-detail")
                .last();
            if (parentElement.hasClass("expanded")) {
                parentElement.removeClass("expanded");
                parentElement.addClass("collapse");
            }
        }
    );

    function closeAllSubmenu() {
        $(".sidebar-dropdown").removeClass("active");
        $(".sidebar-submenu").slideUp(200);
    }

    // Dropdown menu
    $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if ($(this).parent().hasClass("active")) {
            $(".sidebar-dropdown").removeClass("active");
            $(this).parent().removeClass("active");
        } else {
            $(".sidebar-dropdown").removeClass("active");
            $(this).next(".sidebar-submenu").slideDown(200);
            $(this).parent().addClass("active");
        }
    });

    //toggle sidebar
    $(".toggle-sidebar").click(function () {
        $(".page-wrapper").toggleClass("toggled");
        $(".page-content").toggleClass("toggled");
        if ($(".page-wrapper").hasClass("toggled")) {
            closeAllSubmenu();
        }
    });

    $("#toggle-sidebar-screen").click(function () {
        $(".page-wrapper").toggleClass("toggled");
        $(".page-content").toggleClass("toggled");
    });

    //toggle sidebar
    $("#more").click(function () {
        if (!$("page-wrapper").hasClass("toggled")) {
            $(".page-wrapper").addClass("toggled");
            $(".page-content").addClass("toggled");
        }
    });
    $("#explorers").click(function () {
        if (!$("page-wrapper").hasClass("toggled")) {
            $(".page-wrapper").addClass("toggled");
            $(".page-content").addClass("toggled");
        }
    });
    $("#farm_menu").click(function () {
        if (!$("page-wrapper").hasClass("toggled")) {
            $(".page-wrapper").addClass("toggled");
            $(".page-content").addClass("toggled");
        }
    });
    $(".board").click(function () {
        if (!$("page-wrapper").hasClass("toggled") && screen.width >= 1024) {
            $(".page-wrapper").removeClass("toggled");
            $(".page-content").removeClass("toggled");
            closeAllSubmenu();
        }
    });

    // bind hover if pinned is initially enabled
    if ($(".page-wrapper").hasClass("pinned")) {
        $("#sidebar").hover(
            function () {
                $(".page-wrapper").addClass("sidebar-hovered");
            },
            function () {
                $(".page-wrapper").removeClass("sidebar-hovered");
            }
        );
    }

    //Pin sidebar
    $("#pin-sidebar").click(function () {
        if ($(".page-wrapper").hasClass("pinned")) {
            // unpin sidebar when hovered
            $(".page-wrapper").removeClass("pinned");
            $(".page-content").removeClass("pinned");
            $("#sidebar").unbind("hover");
        } else {
            $(".page-wrapper").addClass("pinned");
            $(".page-content").addClass("pinned");
            $("#sidebar").hover(
                function () {
                    $(".page-wrapper").addClass("sidebar-hovered");
                },
                function () {
                    $(".page-wrapper").removeClass("sidebar-hovered");
                }
            );
        }
    });

    //toggle sidebar overlay
    $("#overlay").click(function () {
        $(".page-wrapper").toggleClass("toggled");
    });

    //switch between themes
    var themes =
        "default-theme legacy-theme chiller-theme ice-theme cool-theme light-theme";
    $("[data-theme]").click(function () {
        $("[data-theme]").removeClass("selected");
        $(this).addClass("selected");
        $(".page-wrapper").removeClass(themes);
        $(".page-wrapper").addClass($(this).attr("data-theme"));
    });

    // switch between background images
    var bgs = "bg1 bg2 bg3 bg4";
    $("[data-bg]").click(function () {
        $("[data-bg]").removeClass("selected");
        $(this).addClass("selected");
        $(".page-wrapper").removeClass(bgs);
        $(".page-wrapper").addClass($(this).attr("data-bg"));
    });

    // toggle background image
    $("#toggle-bg").change(function (e) {
        e.preventDefault();
        $(".page-wrapper").toggleClass("sidebar-bg");
    });

    // toggle border radius
    $("#toggle-border-radius").change(function (e) {
        e.preventDefault();
        $(".page-wrapper").toggleClass("boder-radius-on");
    });

    // //custom scroll bar is only used on desktop
    // if (
    //   !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    //     navigator.userAgent
    //   )
    // ) {
    //   $('.sidebar-content').mCustomScrollbar({
    //     axis: 'y',
    //     autoHideScrollbar: true,
    //     scrollInertia: 300,
    //   });
    //   $('.sidebar-content').addClass('desktop');
    // }

    $(document).on("click", "#view_finish", function () {
        if (!$("#view_finish").hasClass("active")) {
            $("#view_finish").addClass("active");
        }
        $("#view_live").removeClass("active");
        switchPools(false);
    });

    var playerList = [
        {
            name: 'rookie',
            link: 'https://drive.google.com/uc?id=1i1FBQr6_UdAOSo6C2tG7FAXzG3TdNFj_',
            description: 'The Rookie Astronaut is teleported into new metaverse dimensions alongside his space drone. He then commands his space drone to search nearby vessels and space debris, to drop energy seeds that’ll generate XGT uranium. With every seed, new land and start-up opportunities are created to build countless metaverse stores. As of now, the Rookie looks up to the Legend’s battle station, but in time can upgrade himself to become that which he aspires to be.'
        },
        {
            name: 'veteran',
            link: 'https://drive.google.com/uc?id=1gK2jdy8pvnr68ZNjHIQ3tFH7AKgT-TKx',
            description: 'The Veteran Astronaut uses his RX-7 Scanner in search for meteoroids that can be transformed into XGT uranium mines. It takes just 1 second and he’s got a lock on all the meteoroids he desires to turn rock into XGT uranium generating machines. As time passes he’ll claim enough XGT uranium to start his very own metaverse business.'
        },
        {
            name: 'elite',
            link: 'https://drive.google.com/uc?id=1SnCE-WSrwIaLUgy0EILw0bae1cQYtSCj',
            description: 'The Elite Astronaut is always strapped with his XGT energy yielding zap pistol. In quick succession, he fires two shots at each astroid to turn silicate rocks into metaverse businesses. As his collection of asteroids grow, so does his XGT uranium that can be claimed to power his ongoing start-up journey.'
        },
        {
            name: 'pro',
            link: 'https://drive.google.com/uc?id=19p9Ca1dnvlwsbJ1IPzOd0xgVP7LcLxh9',
            description: 'The Pro Astronaut scours the different metaverses with his Mark 3 Droid. Together they land on different comets to start metaverse businesses in zero gravity. Every business generates XGT uranium that the Pro can claim to fuel their next entrepreneurial mission. '
        },
        {
            name: 'master',
            link: 'https://drive.google.com/uc?id=1n7BLbx66MqfnV69P9M-Qt9OaMay7kMSk',
            description: 'The Master Astronaut suddenly appears from hyperspace in his NX75 Transport. He readies himself with his Jet Propelled Subsystem to shoot guided rockets at any dwarf planets in his path. With every rocket, his NX75 transport tracks the impact zone to instantly spawn metaverse stores that generate XGT uranium from the depths below.'
        },
        {
            name: 'legend',
            link: 'https://drive.google.com/uc?id=10P6XIFUuNCxm8dQTh0XvdkllYN3Uq9ld',
            description: 'The Legend Astronaut has arrived in his entrepreneurial battle station. Just one click on his wrist & massive XGT beams are fired at an entire planet. As the XGT beam enters the planets atmosphere… metaverse stores, delivery vehicles & XGT uranium immediately rises from the ashes. He now decends with his jet propelled subsystem to claim his new profound riches.'
        },
    ];

    var currentIndex = 5;

    function increaseScale(element) {
        var scale = 0;
        var timer = setInterval(function () {
            if (scale >= 1) clearInterval(timer);
            element.style.transform = "scale(" + scale + ")";
            scale += scale * 0.2 || 0.2;
        }, 75);
    }

    function loadVideo() {
        const selectedVideo = playerList[currentIndex];
        document.getElementById('aline_video_tag').setAttribute('poster', 'images/' + selectedVideo.name + '_preview.png');
        document.getElementById('aline_video_text').setAttribute('src', 'images/' + selectedVideo.name + '_text.svg');
        document.getElementById('aline_video_text').setAttribute('alt', selectedVideo.name);
        document.getElementById('aline_video_description').innerText = selectedVideo.description;
        document.getElementById('aline_video_source').setAttribute('src', selectedVideo.link);

        let videoTag = document.getElementById('aline_video_tag');
        videoTag.load();

        increaseScale(videoTag);

    }


    $(document).on("click", "#view_prev_video", function () {
        currentIndex = ((currentIndex + 6) - 1) % 6;
        loadVideo();
    });

    $(document).on("click", "#view_next_video", function () {
        currentIndex = ((currentIndex + 6) + 1) % 6;
        loadVideo();
    });
});
