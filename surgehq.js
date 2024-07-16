const mainScript = () => {
  window.scrollTo(0, 0);
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(Observer);
  //Utils
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= -rect.height &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) +
          rect.height &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  const lerp = (x, y, a) => x * (1 - a) + y * a;

  //End Utils

  $("html").css("scroll-behavior", "auto");
  $("html").css("height", "auto");

  let lenis = new Lenis({});

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  lenis.on("scroll", function (inst) {
    if (inst.scroll > $(".header").height() * 1.5) {
      if (inst.direction >= 1) {
        $(".header").addClass("on-hide");
      } else {
        $(".header").removeClass("on-hide");
      }
      $(".header").addClass("on-scroll");
    } else {
      $(".header").removeClass("on-scroll");
      $(".header").removeClass("on-hide");
    }
  });
  $(".home-header-toggle").on("click", function () {
    $(".header").toggleClass("active");
    if ($(".header").hasClass("active")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });
  function debounce(func, delay = 100) {
    let timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, delay, event);
    };
  }
  function refreshOnBreakpoint() {
    let initialViewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    // portrait mobile viewport initial, any change refresh
    if (initialViewportWidth < 480) {
      $(window).on(
        "resize",
        debounce(function () {
          newViewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          if (newViewportWidth > 479) {
            location.reload();
          }
        })
      );
    }
    // landscape mobile viewport initial, any change refresh
    else if (initialViewportWidth < 768) {
      $(window).on(
        "resize",
        debounce(function () {
          newViewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          if (newViewportWidth > 767) {
            location.reload();
          }
        })
      );
    }
    // tablet viewport initial, any change refresh
    else if (initialViewportWidth > 767 && initialViewportWidth < 992) {
      $(window).on(
        "resize",
        debounce(function () {
          newViewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          if (newViewportWidth < 768 || newViewportWidth > 991) {
            location.reload();
          }
        })
      );
    }
    // web viewport initial, any change refresh
    else if (initialViewportWidth > 991) {
      $(window).on(
        "resize",
        debounce(function () {
          newViewportWidth =
            window.innerWidth || document.documentElement.clientWidth;
          if (newViewportWidth < 992) {
            location.reload();
          }
        })
      );
    }
  }
  if ($(window).width() < 991) {
    $(".footer-menu-list-title-wrap").on("click", function () {
      $(".footer-menu-list-inner")
        .not($(this).siblings(".footer-menu-list-inner"))
        .slideUp()
        .removeClass("active");
      var submenu = $(this).siblings(".footer-menu-list-inner");
      submenu.toggleClass("active");

      $(this).toggleClass("active");

      if (!submenu.hasClass("active")) {
        submenu.slideUp();
      } else {
        submenu.slideDown();
      }
    });
  }
  refreshOnBreakpoint();

  const SCRIPT = {};

  function globalScript() {}

  SCRIPT.homeScript = () => {
    function globalMarquee() {
      let marquee_inner = $(".global-marquee-inner");
      let globalMarquee = $(".global-marquee");

      globalMarquee.each(function (index, item) {
        $(item).append(marquee_inner.clone());
      });

      const tlMarquee = gsap.timeline({
        repeat: -1,
      });
      tlMarquee.to(".global-marquee-inner", {
        xPercent: -100,
        duration: 200,
        ease: "power1.inout",
      });

      $(".global-marquee").on("pointerenter", function (e) {
        gsap.to(tlMarquee, {
          timeScale: 0,
          duration: 1,
          ease: "none",
        });
      });
      $(".global-marquee").on("pointerleave", function (e) {
        gsap.to(tlMarquee, {
          timeScale: 1,
          duration: 1,
          ease: "none",
        });
      });
    }

    function homeHero() {
      function slider() {
        let titArray = [];
        $(".home-hero-tab-content-txt > .home-hero-content-tab-item")
          .each(function (index, item) {
            var txt = $(this).text();
            titArray.push(txt);
            console.log(titArray);
            this.remove();
          })
          .promise()
          .done(function () {
            $(".home-hero-tab-content-txt").append(
              `<span class="home-hero-content-tab-list"></span>`
            );

            let swiper = new Swiper(".home-hero-tab", {
              loop: true,
              slidesPerView: 1,
              centeredSlides: true,
              centeredSlidesBounds: true,
              simulateTouch: false,
              allowSwipeToNext: false,
              allowSwipeToPrev: false,
              speed: 800,
              autoplay: {
                delay: 5000,
                disableOnInteraction: false,
              },
              effect: "fade",
              fadeEffect: {
                crossFade: true,
              },
              pagination: {
                el: ".home-hero-content-tab-list",
                clickable: "true",
                type: "bullets",
                renderBullet: (index, className) => {
                  let tabItem;
                  if (
                    index != titArray.length - 2 &&
                    index != titArray.length - 1
                  ) {
                    tabItem = `<span class="${className} txt txt-12 txt-med home-hero-content-tab-item home-hero-content-tab-item-comma"><span class="bar"></span><span class="sub-bar"></span><span>${titArray[index]}</span></span>`;
                  } else if (index == titArray.length - 1) {
                    tabItem = `<span class="${className} txt txt-12 txt-med home-hero-content-tab-item home-hero-content-tab-item-last"><span class="bar"></span><span class="sub-bar"></span><span>${titArray[index]}</span></span>`;
                  } else {
                    tabItem = `<span class="${className} txt txt-12 txt-med home-hero-content-tab-item"><span class="bar"></span><span class="sub-bar"></span><span>${titArray[index]}</span></span>`;
                  }
                  return tabItem;
                },
              },
            });
          });
      }

      slider();
    }

    function homeAbout() {
      const textInfor = new SplitType(".home-about-content", {
        wordClass: "split-word",
        types: "words",
      });

      gsap.set([...textInfor.words], { color: "rgba(255, 255, 255, 0.15)" });

      gsap.to(textInfor.words, {
        color: "#E7CCFF",
        ease: "power4.inOut",
        duration: 3,
        stagger: 0.4,
        scrollTrigger: {
          trigger: ".home-about-wrap",
          start: "top 70%",
          end: "bottom center",
          scrub: true,
        },
      });
    }

    function homePaper() {
      const $card = document.querySelectorAll(".home-paper-item");
      let bounds;

      function rotateToMouse(event, element) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
          x: leftX - bounds.width / 2,
          y: topY - bounds.height / 2,
        };

        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

        gsap.to(element, {
          rotationX: (center.y / 100) * (Math.log(distance) / 1.7),
          rotationY: (-center.x / 100) * (Math.log(distance) / 1.7),
          duration: 0.05,
          ease: "power2.in",
        });

        // element.style.transform = `
        //   scale3d(1.02, 1.02, 1.02)
        //   rotate3d(
        //     ${center.y / 100},
        //     ${-center.x / 100},
        //     0,
        //     ${Math.log(distance) / 1.7}deg
        //   )
        // `;

        let gradient = {
            value: `
          radial-gradient(
            circle at
            ${center.x * 2 + bounds.width / 2}px
            ${center.y * 2 + bounds.height / 2}px,
            #6f00ff,
            #9f71ff
          )
        `,
          },
          target = element.querySelector(".home-paper-item-bg-hover");

        gsap.to(gradient, {
          value: `
          radial-gradient(
            circle at
            ${center.x * 2 + bounds.width / 2}px
            ${center.y * 2 + bounds.height / 2}px,
            #6f00ff,
            #9f71ff
          )
        `,
          ease: "power1.inOut",
          delay: 0.15,
          onUpdate: () => (target.style.backgroundImage = gradient.value),
        });
        // element.querySelector(
        //   ".home-paper-item-bg-hover"
        // ).style.backgroundImage = `
        //   radial-gradient(
        //     circle at
        //     ${center.x * 2 + bounds.width / 2}px
        //     ${center.y * 2 + bounds.height / 2}px,
        //     #6f00ff,
        //     #9f71ff
        //   )
        // `;
      }

      $card.forEach(function (item) {
        item.addEventListener("mouseenter", () => {
          bounds = item.getBoundingClientRect();
          item.addEventListener("mousemove", function (e) {
            rotateToMouse(e, item);
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            rotationX: 0,
            rotationY: 0,
            backgroundImage: "",
            duration: 0.05,
            ease: "power3.out",
          });
        });
      });

      function pickColorLineCard() {
        let $colorLine = document.querySelectorAll(
          ".home-paper-item-line-def-color"
        );

        $colorLine.forEach((item) => {
          if (!item.style.backgroundColor) {
            item.style.display = "none";
          }
        });
      }

      pickColorLineCard();
    }

    function homeBlog() {
      const homeBlogSwiper = new Swiper(".home-blog-main", {
        spaceBetween: parseRem(18),
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0,
          slideShadows: true,
        },
        slidesPerView: 1,
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: parseRem(16),
          },
          991: {
            slidesPerView: 4,
            spaceBetween: parseRem(20),
          },
        },
        navigation: {
          prevEl: ".home-blog-nav-prev",
          nextEl: ".home-blog-nav-next",
        },
      });
    }

    function homeCaseStudy() {
      let mainSwiper = new Swiper(".home-casestudy-gallery-slider-cms", {
        slidesPerView: 1,
        initialSlide: 1,
        breakpoints: {
          768: {
            initialSlide: 3,
          },
        },
        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },
      });
      mainSwiper.detachEvents();

      let thumbSwiper = new Swiper(".home-casestudy-gallery-thumbs-cms", {
        initialSlide: 1,
        // loop: true,
        slidesPerView: 5,
        centeredSlides: false,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        breakpoints: {
          768: {
            slidesPerView: 7,
            initialSlide: 3,
            centeredSlides: true,
          },
        },
        navigation: {
          nextEl: ".home-casestudy-nav-next",
          prevEl: ".home-casestudy-nav-prev",
        },
        on: {
          realIndexChange: function (swiper) {
            mainSwiper.slideTo(swiper.realIndex);
          },
        },
      });
    }
    function homeCustomer() {
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
      }
      let marquee_col = $(".customer-marquee-col");
      let marquee_item = $(".customer-marquee-item");
      let marquee_arr = [];
      marquee_item.each(function (index, item) {
        marquee_arr.push($(item).clone());
      });
      marquee_col.each(function (index, item) {
        let marquee_arr_shuff = shuffleArray(marquee_arr);
        let listContainer = $(item).find(".customer-marquee-list");
        let list1 = listContainer.clone().empty().append(marquee_arr_shuff);
        let list2 = list1.clone();
        let list3 = list1.clone();
        let innerContainer = $(item).find(".customer-marquee-inner");
        innerContainer.empty();
        // $(item).find('.customer-marquee-inner').append(list2);
        $(item).find(".customer-marquee-inner").append(list2).append(list3);
      });
    }
    // let isRunning = true;
    // function homeTesti() {
    //   const scrollingText = gsap.utils.toArray(".home-testi-slider-item");

    //   const tl = verticalLoop(scrollingText, {
    //     repeat: -1,
    //     paddingBottom: parseRem(20),
    //   });

    //   const testiSlider = document.querySelector(".home-testi-slider");

    //   Observer.create({
    //     target: testiSlider,
    //     onChangeY(self) {
    //       let factor = 2.5;
    //       if (self.deltaY < 0) {
    //         factor *= -1;
    //       }
    //       gsap
    //         .timeline({
    //           defaults: {
    //             ease: "none",
    //           },
    //         })
    //         .to(tl, { timeScale: factor * 2.5, duration: 0.2 })
    //         .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
    //     },
    //   });

    //   function verticalLoop(items, config) {
    //     items = gsap.utils.toArray(items);
    //     config = config || {};
    //     let tl = gsap.timeline({
    //       repeat: config.repeat,
    //       paused: config.paused,
    //       defaults: { ease: "none" },
    //       onReverseComplete: () =>
    //         tl.totalTime(tl.rawTime() + tl.duration() * 100),
    //     }),
    //       length = items.length,
    //       startY = items[0].offsetTop,
    //       times = [],
    //       heights = [],
    //       yPercents = [],
    //       curIndex = 0,
    //       pixelsPerSecond = (config.speed || 1) * 100,
    //       snap =
    //         config.snap === false
    //           ? (v) => v
    //           : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    //       totalHeight,
    //       curY,
    //       distanceToStart,
    //       distanceToLoop,
    //       item,
    //       i;
    //     gsap.set(items, {
    //       // convert "x" to "xPercent" to make things responsive, and populate the heights/yPercents Arrays to make lookups faster.
    //       yPercent: (i, el) => {
    //         let w = (heights[i] = parseFloat(
    //           gsap.getProperty(el, "height", "px")
    //         ));
    //         yPercents[i] = snap(
    //           (parseFloat(gsap.getProperty(el, "y", "px")) / w) * 100 +
    //           gsap.getProperty(el, "yPercent")
    //         );
    //         return yPercents[i];
    //       },
    //     });
    //     gsap.set(items, { y: 0 });
    //     totalHeight =
    //       items[length - 1].offsetTop +
    //       (yPercents[length - 1] / 100) * heights[length - 1] -
    //       startY +
    //       items[length - 1].offsetHeight *
    //       gsap.getProperty(items[length - 1], "scaleY") +
    //       (parseFloat(config.paddingBottom) || 0);
    //     for (i = 0; i < length; i++) {
    //       item = items[i];
    //       curY = (yPercents[i] / 100) * heights[i];
    //       distanceToStart = item.offsetTop + curY - startY;
    //       distanceToLoop =
    //         distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");
    //       tl.to(
    //         item,
    //         {
    //           yPercent: snap(((curY - distanceToLoop) / heights[i]) * 100),
    //           duration: distanceToLoop / pixelsPerSecond,
    //         },
    //         0
    //       )
    //         .fromTo(
    //           item,
    //           {
    //             yPercent: snap(
    //               ((curY - distanceToLoop + totalHeight) / heights[i]) * 100
    //             ),
    //           },
    //           {
    //             yPercent: yPercents[i],
    //             duration:
    //               (curY - distanceToLoop + totalHeight - curY) /
    //               pixelsPerSecond,
    //             immediateRender: false,
    //           },
    //           distanceToLoop / pixelsPerSecond
    //         )
    //         .add("label" + i, distanceToStart / pixelsPerSecond);
    //       times[i] = distanceToStart / pixelsPerSecond;
    //     }
    //     function toIndex(index, vars) {
    //       vars = vars || {};
    //       Math.abs(index - curIndex) > length / 2 &&
    //         (index += index > curIndex ? -length : length); // always go in the shortest direction
    //       let newIndex = gsap.utils.wrap(0, length, index),
    //         time = times[newIndex];
    //       if (time > tl.time() !== index > curIndex) {
    //         // if we're wrapping the timeline's playhead, make the proper adjustments
    //         vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
    //         time += tl.duration() * (index > curIndex ? 1 : -1);
    //       }
    //       curIndex = newIndex;
    //       vars.overwrite = true;
    //       return tl.tweenTo(time, vars);
    //     }
    //     tl.next = (vars) => toIndex(curIndex + 1, vars);
    //     tl.previous = (vars) => toIndex(curIndex - 1, vars);
    //     tl.current = () => curIndex;
    //     tl.toIndex = (index, vars) => toIndex(index, vars);
    //     tl.times = times;
    //     tl.progress(1, true).progress(0, true); // pre-render for performance
    //     if (config.reversed) {
    //       tl.vars.onReverseComplete();
    //       tl.reverse();
    //     }
    //     return tl;
    //   }
    //   if(isRunning){
    //     requestAnimationFrame(homeTesti);
    //   }
    // }
    // function startHomeTesti() {
    //   isRunning = true;
    //   homeTesti();
    // }

    function stopHomeTesti() {
      isRunning = false;
    }
    function homeTestiNew() {
      if ($(window).width() < 768) {
        $(".home-testi-slider").addClass("swiper");
        $(".home-testi-slider-list").addClass("swiper-wrapper");
        $(".home-testi-slider-item").addClass("swiper-slide");

        $(
          ".home-testi-slider"
        ).innerHtml += `<div class="swiper-pagination"></div>`;

        let swiper = new Swiper(".home-testi-slider", {
          slidesPerView: 1,
          grabCursor: true,
          spaceBetween: parseRem(18),
          pagination: {
            el: ".home-testi-slider-pagination",
            clickable: true,
          },
        });
      } else {
        let centerGap =
          ($(window).height() - $(".home-testi-main-outer").height()) / 2;
        let top =
          $(".home-testi-main-outer").offset().top -
          $(".home-testi-wrap").offset().top;
        let topGap = centerGap - top;
        let bot =
          $(".home-testi-service").outerHeight(true) +
          $(".home-testi-marquee").outerHeight(true) -
          centerGap;

        let distance =
          $(".home-testi-slider-list").outerHeight() -
          $(".home-testi-slider").height();
        $(".home-testi").css("top", `${topGap}px`);
        let tlScroll = gsap.timeline({
          scrollTrigger: {
            trigger: ".home-testi-wrap",
            start: `top+=${top - centerGap}px top`,
            end: `bottom-=${bot}px bottom`,
            scrub: true,
          },
        });
        tlScroll.to(".home-testi-slider-list", { y: -distance, ease: "none" });

        $(window).on("resize", function () {
          centerGap =
            ($(window).height() - $(".home-testi-main-outer").height()) / 2;
          top =
            $(".home-testi-main-outer").offset().top -
            $(".home-testi-wrap").offset().top;
          topGap = centerGap - top;
          bot =
            $(".home-testi-service").outerHeight(true) +
            $(".home-testi-marquee").outerHeight(true) -
            centerGap;
          $(".home-testi").css("top", `${topGap}px`);
          tlScroll.scrollTrigger.start = `top+=${top - centerGap}px top`;
          tlScroll.scrollTrigger.end = `bottom-=${bot}px bottom`;
          tlScroll.scrollTrigger.refresh();
        });
      }
    }

    function homePaperMob() {
      $(".home-paper-cms").addClass("swiper");
      $(".home-paper-control-number-txt-toggle").text(
        $(".home-paper-item-wrap").length
      );
      $(".home-paper-list").addClass("swiper-wrapper");
      $(".home-paper-item-wrap").addClass("swiper-slide");
      var swiperPaper = new Swiper(".home-paper-cms", {
        slidesPerView: 1,
        spaceBetween: parseRem(16),
        on: {
          slideChange: function () {
            $(".home-paper-control-number-txt-active").text(
              swiperPaper.realIndex + 1
            );
          },
        },
      });
      $(".home-paper-nav-prev").on("click", function () {
        swiperPaper.slidePrev();
      });
      $(".home-paper-nav-next").on("click", function () {
        swiperPaper.slideNext();
      });
    }
    homeHero();
    homeAbout();
    homePaper();
    homeCaseStudy();
    homeCustomer();
    // homeTesti();
    homeTestiNew();
    homeBlog();
    globalMarquee();
    if ($(window).width() < 767) {
      homePaperMob();
    }
  };

  lenis.scrollTo(0, {
    duration: 0.001,
    onComplete: () => {
      console.log("first scroll");
      window.scrollTo("0", "0");
      globalScript();
      const pageName = $(".main").attr("name-space");
      if (pageName) {
        SCRIPT[`${pageName}Script`]();
      }
    },
  });
};
window.document.addEventListener("DOMContentLoaded", mainScript);
