import Vue from 'vue';
import saMenuList from './../sa-menu-list.js';	
import sa_admin_code_util from './admin-util.js';	
import { swiper, swiperSlide } from 'vue-awesome-swiper';	
import saLogin from './../com-view/sa-login.vue';	
import sa403 from './../com-view/sa-403.vue';	
import sa404 from './../com-view/sa-404.vue';	
import sa500 from './../com-view/sa-500.vue';	

export default {
	components: {
		swiper,
		swiperSlide,
		saLogin,
		sa403,
		sa404,
		sa500
	},
	data: function() {

		var homeTab = {
			id: 'home',	
			name: 'home page',
			view: ()=> import('./../com-view/sa-home.vue'),
			hide_close: true,	
			is_rend: true,
		}
		
		return {
			version: 'v1.0.3',		
			update_time: '2020-03-05',		
			title: '', 
			logo_url: '',	
			icon_url: '',	
			github_url: '',	
			default_active: '0',	
			default_openeds: [],	
			unique_opened: true,		
			menuList: [],		
			homeTab: homeTab,		
			nativeTab: homeTab,	
			tabList: [homeTab],	
			atTitle: '',		
			atUrl: '',			
			scrollX: 0		,


			rightTab: null,	
			rightShow: false,	
			rightStyle: {		
				left: '0px',		
				top: '0px',			
				maxHeight: '0px'	
			},
			is_drag: false,			
			dragTab: null,			
			is_fold: false,			
			is_fold_right: false,	   
			is_full_screen: false	,
			user: null	,
			now_time: 'Loading in...'	,
			switchV: localStorage.getItem('switchV') || 'fade',	
			switchList: [	
				{name: 'fade-in', value: 'fade'},
				{name: 'slide', value: 'slide'},
				{name: 'diamonds', value: 'cube'},
				{name: '3Dliu', value: 'coverflow'},
				{name: '3D overturn', value: 'flip'}
			],
			themeV: localStorage.getItem('themeV') || '1',	
			themeList: [	
				{name: 'blue', value: '1', show_all: false},
				{name: 'green', value: '2', show_all: false},
				{name: 'white', value: '3', show_all: false},
				{name: 'gray', value: '4', show_all: false},
				{name: 'gray-open', value: '5', show_all: true},
				{name: 'pro', value: '6', show_all: false},
				{name: 'Precipitate black blue', value: '7', show_all: false},
				{name: 'Contracted grey blue', value: '8', show_all: false},
			],
			themeToggling: false,	
			dropList: [],	
			mySwiper: null,	
			is_show_tabbar: true,		
			breMenuList: [homeTab],			
			is_reme_open: true,			

			swiperOption:{
				autoplay: false,	
				effect: localStorage.getItem('switchV') || 'fade',	// 切换效果 
			},
			dialogTab: null	,
		}
	},
	watch: {

		is_full_screen: function(newValue) {
			if(newValue) {
				sa_admin_code_util.fullScreen();
			} else {
				sa_admin_code_util.fullScreenNormal();
			}
		},

		title: function(newValue) {
			document.querySelector('title').innerHTML = newValue;
		},

		icon_url: function(newValue) {
			var icon_url = newValue;
			var icon_target = document.querySelector('.admin-icon');
			if(icon_target) {
				icon_target.setAttribute('href', icon_url);
			}
		}
	},
	computed: {
	},
	methods: {

		init: function(option) {

			option = option || {};
			

			this.is_show_tabbar = (option.is_show_tabbar === undefined ? this.is_show_tabbar : option.is_show_tabbar);	
			this.is_reme_open = (option.is_reme_open === undefined ? this.is_reme_open : option.is_reme_open);	 

			this.initSwiper(); 
			

			if(option.printVesion !== false) {
				this.printVesion();
			}
			

			this.showTabByHash();	
			window.onresize();		
		},

		initMenu: function(show_list) {
			this.setMenuList(saMenuList, show_list);
		},

		setMenuList: function(menu_list, show_list) {

			if(show_list) {
				for (var i = 0; i < show_list.length; i++) {
					show_list[i] = show_list[i] + '';
				} 
			}
			menu_list = this.arrayToTree(menu_list);
			menu_list = this.refMenuList(menu_list, show_list);
			this.menuList = menu_list;
		},

		arrayToTree: function(menu_list) {
			for (var i = 0; i < menu_list.length; i++) {
				var menu = menu_list[i];

				if(menu.parent_id) {
					var parent_menu = this.getMenuById(menu_list, menu.parent_id);
					if(parent_menu) {
						parent_menu.childList = parent_menu.childList || [];
						parent_menu.childList.push(menu);
						menu_list.splice(i, 1);	
						i--;
					}
				}
			}
			return menu_list;
		},

		refMenuList: function(menu_list, show_list, parent_id) {
			for (var i = 0; i < menu_list.length; i++) {
				var menu = menu_list[i];
				menu.is_show = (menu.is_show === false ? false : true);
				menu.parent_id = menu.parent_id || parent_id || 0;

				// if(menu.is_show === false) {
				// 	sa_admin_code_util.arrayDelete(menu_list, menu);
				// 	i--;
				// 	continue;
				// }

				if(show_list && show_list.indexOf(menu.id) == -1) {
					// sa_admin_code_util.arrayDelete(menu_list, menu);
					// i--;
					// continue;
					menu.is_show = false;
				}

				if(menu.childList && menu.childList.length > 0){
					this.refMenuList(menu.childList, show_list, menu.id);	
				}
			}
			return menu_list;
		},
		

		show_all_menu: function() {
			var default_openeds = [];
			for (var i = 0; i < this.menuList.length; i++) {
				default_openeds.push(this.menuList[i].id);
				if(this.menuList[i].childList) {
					for (var j = 0; j < this.menuList[i].childList.length; j++) {
						default_openeds.push(this.menuList[i].childList[j].id);
					}
				}
			}
			this.default_openeds = default_openeds;
		},

		toggleTheme: function(command) {

			this.themeToggling = true;
			setTimeout(function() {
				this.themeToggling = false;
			}.bind(this), 1000);
			

			this.themeV = command + "";
			localStorage.setItem('themeV', command);
			for (var i = 0; i < this.themeList.length; i++) {
				if(this.themeList[i].value + '' == command + '') {
					if(this.themeList[i].show_all) {
						this.show_all_menu();
						this.unique_opened = false;
					} else {
						this.default_openeds = [];
						this.unique_opened = true;
					}

					if(window.dsadasdwdwawd) {
						this.$message('success，' + this.themeList[i].name);
					}
					window.dsadasdwdwawd = true;
				}
			}
		},

		toggleSwitch: function(command) {
			this.switchV = command + "";
			localStorage.setItem('switchV', command);
			
			this.$confirm('This animation effect will take effect after you refresh the page, whether or not to refresh immediately  ？', {
				confirmButtonText: 'confirm',
				cancelButtonText: 'cancel',
				type: 'warning'
			}).then(function() {
				location.reload();
			}).catch(function() {
				
			});
			
		},

		handleCommand: function(command) {
			this.dropList.forEach(function(drop) {
				if(drop.name == command) {
					drop.click();
				}
			})
		},

		login_out: function() {
			console.log('logout');
			localStorage.clear();
		},

		fold_start: function() {
			this.is_fold_right = true; 
			this.updateSlideSize(100);	

			if(this.tabList.length <= 5) {
				this.is_fold = true;
			} else {
				setTimeout(function() {
					this.is_fold = true;
				}.bind(this), 100);
			}
		},

		fold_end: function() {
			this.is_fold = false;

			setTimeout(function() {
				this.is_fold_right = false;  
				this.updateSlideSize();	
			}.bind(this), 200);
		},

		f5_breMenuList: function() {

			if(this.is_show_tabbar) {
				return;
			}
			// 
			var menu = this.getMenuById(this.menuList, this.nativeTab.id);
			if(menu == null) {	
				this.breMenuList = [{name: this.nativeTab.name}];
			} else {
				var breMenuList = [menu];
				for (var i = 0; i < breMenuList.length; i+=0) {
					var parent_id = breMenuList[0].parent_id;
					if(parent_id == 0 || parent_id == undefined) {
						break;
					}
					let menu = this.getMenuById(this.menuList, parent_id);
					breMenuList.unshift(menu);
				}
				this.breMenuList = breMenuList;
			}
		},

		right_showMenu: function(tab, event) {
			this.rightTab = tab;	
			var e = event || window.event;
			this.rightStyle.left = (e.clientX + 1) + 'px';	
			this.rightStyle.top = e.clientY + 'px';		
			this.rightShow = true;	
			this.$nextTick(function() {
				var foxHeight = document.querySelector('.right-box-2').offsetHeight;	
				this.rightStyle.maxHeight = foxHeight + 'px';	
				document.querySelector('.right-box').focus();		
			});
		},

		right_closeMenu: function() {
			this.rightStyle.maxHeight = '0px';	
			this.rightShow = false;
		},

		right_closeMenu2: function() {
			this.rightStyle.maxHeight = '0px';	
			// this.rightShow = false;
		},

		right_f5: function() {
			this.showTab(this.rightTab);	
			this.rightTab.is_rend = false;
			this.$forceUpdate();	
			this.$nextTick(function() {
				this.rightTab.is_rend = true;
			})
			
		},

		right_copy: function() {
			var tab = {id: new Date().getTime(), name: this.rightTab.name, view: this.rightTab.view};
			this.showTab(tab);
		},

		right_xf: function() {
			if(this.rightTab.id == this.homeTab.id + ''){
				this.$message({
					message: 'It does not work in full screen. Try a different card',
					type: 'warning'
				});
				return;	
			}

			this.closeTab(this.rightTab, function() {
				this.f5_breMenuList();
			}.bind(this));

			this.dialogTabShow(this.rightTab.name, this.rightTab.view, this.rightTab.params, 2);
		},

		right_close: function() {
			if(this.rightTab.id == this.homeTab.id + ''){
				this.$message({
					message: 'This can not be turned off',
					type: 'warning'
				});
				return;	
			}
			this.closeTab(this.rightTab, function() {
				this.f5_breMenuList();
			}.bind(this));
		},

		right_close_other: function() {

			this.scrollX = 0;	

			var i = 0;
			var deleteFn = function() {

				if(i >= this.tabList.length) {
					return;
				}

				var tab = this.tabList[i];
				if(tab.id + '' == this.homeTab.id + '' || tab.id + '' == this.rightTab.id){	
					i++;
					deleteFn();
				} else {
					this.closeTab(tab, function() {
						deleteFn();
					});
				}
			}.bind(this);
			deleteFn();
		},

		right_close_all: function() {

			this.scrollX = 0;	

			var i = 0;
			var deleteFn = function() {

				if(i >= this.tabList.length) {
					this.f5_breMenuList();
					return;
				}

				var tab = this.tabList[i];
				if(tab.id + '' == this.homeTab.id + ''){	
					i++;
					deleteFn();
				} else {
					this.closeTab(tab, function() {
						deleteFn();
					});
				}
			}.bind(this);
			deleteFn();
		},

		right_full: function() {

			if(this.rightTab.id != this.homeTab.id + ''){	
				this.closeTab(this.rightTab, function() {
					this.f5_breMenuList();
				}.bind(this));
			}

			this.dialogTabShow(this.rightTab.name, this.rightTab.view, this.rightTab.params, 1);
		},

		right_window_open: function() {

			if(this.rightTab.id != this.homeTab.id + ''){	
				this.closeTab(this.rightTab, function() {
					this.f5_breMenuList();
				}.bind(this));
			}
			open(this.rightTab.url);
		},

		getTabUrl: function(tab) {
			this.sss(tab);
			// var cs = '#iframe-' + tab.id;
			// var iframe = document.querySelector(cs);
			// try{
			// 	return iframe.contentWindow.location.href;
			// }catch(e){
			// 	return iframe.getAttribute('src');
			// }
		},
		

		selectMenu: function(index) {
			var menu = this.getMenuById(this.menuList, index);
			if(menu != null) {

				if(menu.click) {
					return menu.click(this, this.sa);
				}

				if(menu.is_blank) {
					return open(menu.url); 
				}
				this.showTab(menu); 
			}
		},

		showMenuById: function(id) {
			var menu = this.getMenuById(this.menuList, id);
			if(menu) {
				this.showTab(menu); 
			}
		},

		getMenuById: function(menuList, id) {
			for (var i = 0; i < menuList.length; i++) {
				var menu = menuList[i];
				if(menu.id + '' == id + '') {
					return menu;
				}

				if(menu.childList) {
					var menu2 = this.getMenuById(menu.childList, id);
					if(menu2 != null) {
						return menu2;
					}
				}
			}
			return null;
		},

		showHome: function() {
			this.showTab(this.homeTab); 
		},
		

		initTabView: function(tab) {

			if(tab.is_init_view) {
				return;
			}

			tab.params = tab.params || {};	
			tab.is_rend = true;			
			

			if(tab.url) {
				let template = '<div class="iframe-view-box"><iframe class="iframe-view" src="' + tab.url + '"></iframe></div>';
				tab.view = {template: template};
				return tab.is_init_view = true;
			}
			
	
			
			return tab.is_init_view = true;
		},

		closeTab_not_an: function(tab) {
			this.sss(tab);

		},

		closeTab: function(tab, callFn) {
			

			var div = document.querySelector('#tab-' + tab.id);
			div.style.width = div.offsetWidth + 'px';
			setTimeout(function() {
				div.style.width = '0px';
			}, 0);
			

			setTimeout(function() {
				
	
				if(tab == this.nativeTab) {
					var index = this.tabList.indexOf(tab); 
					var preTab = this.tabList[index - 1]; 
					this.showTab(preTab); 
				}
	
				sa_admin_code_util.arrayDelete(this.tabList, tab);

		
				if(callFn) {
					this.$nextTick(function() {
						callFn();
					})
				}
			}.bind(this), 150);
		},
		closeTabById: function(id, callFn) {
			var tab = this.getTabById(id);
			if(tab) {
				this.closeTab(tab, callFn);
			}
		},

		addTab: function(tab) {
			tab.is_have_en = this.is_have_en(tab.name);

			this.initTabView(tab);
			this.tabList.push(tab);

		},

		showTab: function(tab) {

			if(tab == this.nativeTab && tab != this.homeTab) {
				return;
			}

			if(this.getTabById(tab.id) == null){
				this.addTab(tab);
			}

			this.$nextTick(function() {
				
				this.gotoSlide(tab.id);

				if(!this.is_show_tabbar) {
					this.rightTab = tab;
					this.right_close_other();
					this.f5_breMenuList();
				}
				this.f5HashByNativeTab();
			})
			
			this.nativeTab = tab;
			this.default_active = tab.id + '';	
			

			this.$nextTick(function() {
				this.scrollToAuto();	
			}.bind(this))
		},

		showTabById: function(id) {
			var tab = this.getTabById(id);
			if(tab) {
				this.showTab(tab);
			}
		},

		getTabById: function(id) {
			for (var i = 0; i < this.tabList.length; i++) {
				if(this.tabList[i].id + '' == id + '') {
					return this.tabList[i];
				}
			}
			return null;
		},

		atOpen: function() {
			window.r_layer_12345 = this.layer.open({
				type: 1,
				shade: 0.5,
				title: "Add a new window", 
				content: $('.at-form-dom'), 
				cancel: function(){
					
				}
			});
		},
	
		atOk: function() {
			if(this.atTitle == '' || this.atUrl == '') {
				return;
			}

			var tab = {id: new Date().getTime(), name: this.atTitle, url: this.atUrl};

			this.showTab(tab);

			this.layer.close(window.r_layer_12345);
			this.atTitle = '';
			this.atUrl = '';
		},

		is_have_en: function(str) {
			var reg = /[a-z]/i;
			return reg.test(str);
		},

		scrollToLeft: function() {
			var width = document.querySelector('.nav-right-2').clientWidth;	
			this.scrollX += width / 2;	

			setTimeout(function() {
				if(this.scrollX > 0){
					this.scrollX = 0;
				}
			}.bind(this), 200);
		},

		scrollToRight: function() {
			var width = document.querySelector('.nav-right-2').clientWidth;	
			var tabListWidth = document.querySelector('.tab-title-box').clientWidth;	
			var rightLimit = (0 - tabListWidth + width / 2);	
			this.scrollX -= width / 2;		

			setTimeout(function() {
				if(this.scrollX < rightLimit){
					this.scrollX = rightLimit;
				}

				if(this.scrollX > 0){
					this.scrollX = 0;
				}
			}.bind(this), 200);
		},

		scrollToAuto: function() {

			try{

				var width = document.querySelector('.nav-right-2').clientWidth;	
				var left = document.querySelector('.tab-native').lastChild.offsetLeft;	

				if(left + this.scrollX > (width - 100)){
					return this.scrollToRight();
				}

				if(left + this.scrollX < 0) {
					return this.scrollToLeft();
				}
			}catch(e){

			}
		},

		tab_ondrop: function(tab) {
			this.sss(tab);
			
		},

		showTabByHash: function() {
			

			if(this.is_reme_open == false) {
				return;
			}

			var hash = location.hash;
			var id = hash.replace('#', '');
			
			if(id == '') {
				this.showHome();
				return;
			}
	
			var tab = this.getTabById(id);
			if(tab != null) {
				return this.showTab(tab);
			}

			if(id == this.homeTab.id){
				this.showHome();
			} else {
				this.showMenuById(id);
			}
		
		},

		f5HashByNativeTab: function() {

			if(this.is_reme_open == false) {
				return;
			}
			location.hash = this.nativeTab.id;
		},

		initSwiper: function(switchV) {
			this.sss(switchV);
			this.mySwiper = this.$refs.mySwiper.swiper;
			
		},

		getSlideIndexById: function(id) {
			var tab = this.getTabById(id);
			return this.tabList.indexOf(tab);
		},

		deleteSlide: function(id) {
			this.sss(id);
			
		},

		gotoSlide: function(id) {
			var slideIndex = this.getSlideIndexById(id);
			if(slideIndex != -1) {
				this.mySwiper.slideTo(slideIndex, 300);
			}
		},

		updateSlideSize: function(ms) {
			ms = ms || 1;
			setTimeout(function() {
				this.mySwiper.update();
			}.bind(this), ms);
		},

		openLogin: function() {
			this.$refs['sa-login'].isShow = true;
		},

		closeLogin: function() {
			this.$refs['sa-login'].isShow = false;
		},

		open403: function() {
			this.$refs['sa403'].isShow = true;
		},

		open404: function() {
			this.$refs['sa404'].isShow = true;
		},

		open500: function() {
			this.$refs['sa500'].isShow = true;
		},
		
	
		sss: function() {
			
		},

		getView: function(id) {
			var com = this.$refs['view-' + id];
			if(com) {
				return com[0];
			}
		},

		dialogTabShow: function(title, view, params, way) {	
			this.dialogTab = {		
				isShow: true,	
				isShow2: true,	
				title: title || 'message',	
				view: view || {template: '<div>Loading...</div>'},		
				params: params || {},	
				way: way || 1,
				beforeClose: function(done) {
					this.dialogTab.isShow2 = false;
					done();
				}.bind(this)
			};
		},
		closeDialog: function() {
			this.dialogTab.isShow = false;
		},

		openNote: function() {
			var w = (document.body.clientWidth * 0.4) + 'px';
			var h = (document.body.clientHeight * 0.6) + 'px';
			var default_content = 'A simple little note that you can use to record temporary information when you close the browser and open it again  ';
			var value = localStorage.getItem('sa_admin_note') || default_content;
			var index = this.layer.prompt({
				title: 'A simple little note', 
				value: value,
				formType: 2,
				area: [w, h],
				btn: ['save'],
				maxlength: 99999999,
			}, function(pass, index){
				this.layer.close(index)					
			}.bind(this));
			var se = '#layui-layer' + index + ' .layui-layer-input';
			var d = document.querySelector(se);
			d.oninput = function() {
				localStorage.setItem('sa_admin_note', this.value);
			}
		},

		msg: function(msg) {
			this.layer.msg(msg)
		},

		printVesion: function() {
			
		},

		initWindow: function() {
			 
			var sa_admin = this;
			
		
			Vue.prototype.sa_admin = sa_admin;
			
			window.onresize = function() {
				if(document.body.clientWidth < 800) {
					sa_admin.fold_start();
				} else {
					sa_admin.fold_end();
				}
			}
			
			
			window.onhashchange = function() {

				this.showTabByHash();
			}.bind(this)
			

			if(window.abcdefghijklmn) {
				clearInterval(window.abcdefghijklmn);
			}
			window.abcdefghijklmn = setInterval(function() {
				var da = new Date();
				var Y = da.getFullYear(); 
				var M = da.getMonth() + 1; 
				var D = da.getDate(); 
				var h = da.getHours(); 
				var sx = "wee hours";
				if (h >= 6) {
					sx = "morning"
				}
				if (h >= 12) {
					sx = "afternoon";
					if (h >= 18) {
						sx = "noon";
					}
					h -= 12;
				}
				var m = da.getMinutes(); 
				var s = da.getSeconds(); 
				var z = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][da.getDay()] ; 

				var zong = "";
		
				zong += Y + "-" + M + "-" + D + " " + sx + " " + h + ":" + m + ":" + s  + z;
				sa_admin.now_time = zong;
			}, 1000);
		
		}
	},
	mounted: function(){
		this.initWindow();
		this.SaAdminInIt(this.sa_admin, this.sa);
	},
	
};




