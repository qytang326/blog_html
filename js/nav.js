    /* 来自nav.html */
    /* Drop Bootstarp low-performance Navbar  Use customize navbar with high-quality material design animation in high-perf jank-free CSS3 implementation */
    var $body   = document.body;
    var $toggle = document.querySelector('.navbar-toggle');
    var $navbar = document.querySelector('#Quanyinblog_navbar');
    var $collapse = document.querySelector('.navbar-collapse');

    var __QuanyinNav__ = {
        close: function(){
            $navbar.className = " ";
            /* wait until animation end. */
            setTimeout(function(){
                /* prevent frequently toggle */
                if($navbar.className.indexOf('in') < 0) {
                    $collapse.style.height = "0px"
                }
            },400)
        },
        open: function(){
            $collapse.style.height = "auto";
            $navbar.className += " in";
        }
    };

    /* Bind Event */
    $toggle.addEventListener('click', function(e){
        if ($navbar.className.indexOf('in') > 0) {
            __QuanyinNav__.close()
        }else{
            __QuanyinNav__.open()
        }
    });

    /**
     * Since Fastclick is used to delegate 'touchstart' globally
     * to hack 300ms delay in iOS by performing a fake 'click',
     * Using 'e.stopPropagation' to stop 'touchstart' event from 
     * $toggle/$collapse will break global delegation.
     * 
     * Instead, we use a 'e.target' filter to prevent handler
     * added to document close QuanyinNav.  
     *
     * Also, we use 'click' instead of 'touchstart' as compromise
     */
    document.addEventListener('click', function(e){
        if(e.target == $toggle) return;
        if(e.target.className == 'icon-bar') return;
        __QuanyinNav__.close();
    });