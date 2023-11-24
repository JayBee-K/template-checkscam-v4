var windowWidth = document.documentElement.clientWidth;
window.addEventListener("resize", () => {
	windowWidth = document.documentElement.clientWidth;
});

let handleApplyCollapse = function ($parent, $firstItem = false, $callFunction = false) {
	let $childUl = $parent.find('> li > ul');
	if ($childUl.length === 0) {
		return;
	}

	if ($callFunction) {
		$parent.find('> li a').each(function () {
			$(this).attr('data-href', $(this).attr('href'))
		});
	}

	if (windowWidth <= 991) {

		let $objParentAttr = {};
		let $objChildrenAttr = {
			'data-bs-parent': '#' + $parent.attr('id')
		}

		if ($firstItem) {
			let $parentID = 'menu-' + Math.random().toString(36).substring(7);
			$parent.attr('id', $parentID);
			$objParentAttr = {
				'data-bs-parent': '#' + $parentID
			}

			$objChildrenAttr = {};
		}

		$childUl.each(function () {
			let $parentUl = $(this).closest('ul');
			let $parentListItem = $(this).closest('li');
			let $parentListItemAnchor = $parentListItem.children('a');

			let $parentUlID = 'menu-' + Math.random().toString(36).substring(7);

			$parentUl.addClass('collapse').attr({
				'id': 'collapse-' + $parentUlID, ...$objParentAttr, ...$objChildrenAttr
			});

			$parentListItemAnchor.replaceWith(function () {
				return `<button aria-label="${$parentListItemAnchor.attr('aria-label')}" data-href="${$parentListItemAnchor.attr('data-href')}" data-bs-toggle="collapse" data-bs-target="#${$parentUl.attr('id')}">${$parentListItemAnchor.html()}</button>`
			})

			handleApplyCollapse($parentUl, false);

			$parentUl.on('show.bs.collapse', function () {
				$parent.find('.collapse.show').not($parentUl).collapse('hide');
			});
		});
	} else {
		$parent.removeAttr('id');

		$childUl.each(function () {
			let $parentUl = $(this).closest('ul');
			let $parentListItem = $(this).closest('li');

			$parentUl.removeClass('collapse').removeAttr('data-bs-parent id');
			$parentListItem.children('a').attr('href', $parentListItem.children('a').attr('data-href'));

			$parentListItem.children('button').replaceWith(function () {
				return `<a aria-label="${$(this).attr('aria-label')}" href="${$(this).attr('data-href')}" data-href="${$(this).attr('data-href')}">${$(this).html()}</a>`
			})

			handleApplyCollapse($parentUl);
		});
	}
}

let handleCallMenu = function () {
	const $body = $('body');
	const handleBody = function ($toggle = false) {
		if ($body.hasClass('is-navigation')) {
			$body.removeClass('is-navigation');
			if ($body.hasClass('is-overflow')) {
				$body.removeClass('is-overflow');
			}

			$('#header-navigation ul').collapse('hide');
		} else {
			if ($toggle) {
				$body.addClass('is-navigation is-overflow')
			}
		}
	}

	if (windowWidth <= 991) {
		const $hamburger = $('#hamburger-button');
		if ($hamburger.length) {
			$hamburger.click(function () {
				handleBody(true)
			});
		}

		const $overlay = $('#header-overlay');
		if ($overlay.length) {
			$overlay.click(function () {
				handleBody();
			});
		}
	} else {
		handleBody();
	}
}

const handleStickHeader = function () {
	$(window).scroll(function (e) {
		if ($(document).scrollTop() > $('#header').innerHeight()) {
			$('#header').addClass('is-scroll');
		} else {
			$('#header').removeClass('is-scroll');
		}
	});
}

const handleSliderHero = function () {
	if ($('#slider-hero').length > 0) {
		new Swiper('#slider-hero .swiper', {
			slidesPerView: 1,
			navigation: {
				nextEl: "#slider-hero .slider-button_next",
				prevEl: "#slider-hero .slider-button_prev",
			},
			autoplay: {
				delay: 6000,
				disableOnInteraction: true,
			},
			speed: 800,
			loop: true,
			pagination: {
				el: "#slider-hero .slider-pagination",
				clickable: true
			}
		});
	}
}

const handleCopyValue = function () {
	const copyButtons = document.querySelectorAll('.button-copy');
	if (copyButtons) {
		copyButtons.forEach(function (copyButton) {
			copyButton.addEventListener('click', function () {
				const valueToCopy = copyButton.getAttribute('data-value');

				const tempTextArea = document.createElement('textarea');
				tempTextArea.style.cssText = 'position: absolute; left: -99999px';
				tempTextArea.setAttribute("id", "textareaCopy");
				document.body.appendChild(tempTextArea);

				let textareaElm = document.getElementById('textareaCopy');
				textareaElm.value = valueToCopy;
				textareaElm.select();
				textareaElm.setSelectionRange(0, 99999);
				document.execCommand('copy');

				document.body.removeChild(textareaElm);

				if (copyButton.getAttribute('data-bs-toggle') === 'tooltip') {
					copyButton.setAttribute('title', 'Đã sao chép');

					const tooltip = bootstrap.Tooltip.getInstance(copyButton);
					tooltip.setContent({'.tooltip-inner': 'Đã sao chép'})
				}
			});
		})
	}
}

const handleInitFancybox = function () {
	if ($('.initFancybox').length) {
		$('.initFancybox').each(function () {
			let elm = $(this);
			Fancybox.bind(`[data-fancybox=${elm.attr('data-fancybox')}]`, {
				thumbs: {
					autoStart: true,
				},
			});
		});
	}
}

const handleInitTaleArticle = function () {
	if ($('#article-content table').length > 0) {
		$('#article-content table').map(function () {
			$(this).addClass('table table-bordered');
			$(this).wrap('<div class="table-responsive"></div>');
		})
	}
}

const handleViewPass = function () {
	$(document).on('click', '.buttonViewPassword', function () {
		let elm = $(this),
			elmID = elm.attr('data-id');
		if (elm.hasClass('is-show')) {
			elm.html('<i class="fal fa-eye">');
			elm.removeClass('is-show');
			$('#' + elmID).attr('type', 'password');
		} else {
			elm.html('<i class="fal fa-eye-slash">');
			elm.addClass('is-show');
			$('#' + elmID).attr('type', 'text');
		}
	});
}

const handleInitPopoverContent = function () {
	if ($('.initPopoverContent').length) {
		$('.initPopoverContent').each(function () {
			const htmlContent = `<span style="font-size: 22px"><b><span style="color: rgb(97, 189, 109)">Chia sẻ cho ae tool download toàn bộ kênh tiktok, douyin, youtube</span></b></span><br>
                                <br>
                                Có thể download reel nhưng chỉ download từng link, ko down từ link kênh được<br>
                                Còn lại các nền tảng khác vẫn down được toàn bộ kênh<br>
                                <br>
                                Tool miễn phí nhiều chức năng, ae đăng nhập mới có thể sử dụng nhé<br>
                                Tool miễn phí nên mình chỉ hỗ trợ khi rảnh, lưu ý cần đăng nhập mới có thể sử dụng nhé`;
			$(this).popover({
				placement: 'top',
				fallbackPlacements: ['top', 'bottom'],
				html: true,
				trigger: 'manual',
				delay: {"show": 500, "hide": 100},
				template: `<div class="theme-popover theme-popover_default popover"><div class="popover-arrow"></div><div class="popover-body"></div></div>`,
				content: htmlContent
			}).on("mouseenter", function () {
				var _this = this;
				$(this).popover("show");
				$(".theme-popover_default.show").on("mouseleave", function () {
					$(_this).popover('hide');
				});
			}).on("mouseleave", function () {
				var _this = this;
				setTimeout(function () {
					if (!$(".theme-popover_default.show:hover").length) {
						$(_this).popover("hide");
					}
				}, 100);
			});
		})
	}
}
const handleInitPopoverUser = function () {
	if ($('.initPopoverUser').length) {
		$('.initPopoverUser').each(function () {

			const htmlContent = `<div class="user-popover">
                                    <div class="user-header hstack gap-10px">
                                        <div class="user-avatar flex-shrink-0">
                                            <a href="" class="d-block ratio ratio-1x1">
                                                <img src="./assets/images/user.jpg" class="img-fluid" alt="">
                                            </a>
                                        </div>
                                        <div class="user-content">
                                            <a href="" class="user-name limit">
                                                hophudat
                                            </a>
                                            <div class="user-sub">
                                                Senior · 38
                                            </div>
                                            <div class="user-meta">
                                                <div class="user-meta_item">
                                                    <span>Joined:</span> May 18, 2012
                                                </div>
                                                <div class="user-meta_item">
                                                    <span>Last seen:</span> Today at 10.30 AM · Viewing thread <a href="">Shiba Ini: 1,4 tỷ SHIB bị đốt
                                                    trong tháng 10</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="user-body hstack gap-5px justify-content-between">
                                        <div class="user-item">
                                            Message
                                            <a class="user-item_color" href="">
                                                509
                                            </a>
                                        </div>
                                        <div class="user-item">
                                            Reactions
                                            <span class="user-item_color">
                                                1.754
                                            </span>
                                        </div>
                                        <div class="user-item">
                                            MR
                                            <a class="user-item_color" href="">
                                                43.288
                                            </a>
                                        </div>
                                    </div>
                                </div>`;

			$(this).popover({
				placement: 'top',
				fallbackPlacements: ['top', 'bottom'],
				html: true,
				trigger: 'manual',
				delay: {"show": 500, "hide": 100},
				template: `<div class="theme-popover theme-popover_user popover"><div class="popover-arrow"></div><div class="popover-body p-0"></div></div>`,
				content: htmlContent
			}).on("mouseenter", function () {
				var _this = this;
				$(this).popover("show");
				$(".theme-popover_user.show").on("mouseleave", function () {
					$(_this).popover('hide');
				});
			}).on("mouseleave", function () {
				var _this = this;
				setTimeout(function () {
					if (!$(".theme-popover_user.show:hover").length) {
						$(_this).popover("hide");
					}
				}, 100);
			});
		})
	}
}

const handleChangeContentButtonCollapse = function () {
	if ($('#latest-footerCollapse').length > 0) {
		$('#latest-footerCollapse').click(function () {
			if ($(this).hasClass('collapsed')) {
				$(this).html(`<i class="fal fa-plus"></i>Show Stats`);
			} else {
				$(this).html(`<i class="fal fa-minus"></i>Hide Stats`);
			}
		});
	}
}

const handleSetOffsetTopStickySidebarForum = function () {
	if ($('#forum-sticky').length) {
		const offsetTop = $('#header').innerHeight() + 5;
		$('#forum-sticky').css('top', offsetTop);
	}
}

$(function () {
	handleApplyCollapse($('#header-navigation > ul'), true, true);
	handleCallMenu();
	$(window).resize(function () {
		handleApplyCollapse($('#header-navigation > ul'));
		handleCallMenu();
	});
	handleStickHeader();

	handleSliderHero();

	if ($('[data-bs-toggle="tooltip"]').length) {
		$('[data-bs-toggle="tooltip"]').tooltip({
			trigger: 'hover',
		});
	}

	handleCopyValue();
	handleInitFancybox();
	handleInitTaleArticle();
	handleViewPass();


	handleInitPopoverContent();
	handleInitPopoverUser();
	handleChangeContentButtonCollapse();
	handleSetOffsetTopStickySidebarForum();
});
