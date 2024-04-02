
export default {

	arrayDelete: function(arr, item){
		var index = arr.indexOf(item);
		if (index > -1) {
			arr.splice(index, 1);
		}
	},
	

	solveLayerBug: function(index) {
		var selected = '#layui-layer' + index;
		var height = $(selected).height();
		var title_height = $(selected).find('.layui-layer-title').height();
		$(selected).find('iframe').css('height', (height - title_height) + 'px');
		// var selected = '#layui-layer' + index;
		// var height = $(selected).height();
		// var title_height = $(selected).find('.layui-layer-title').height();
		// $(selected).find('iframe').css('height', (height - title_height) + 'px');
	},
	

	fullScreen: function(){
		if(document.documentElement.RequestFullScreen){
			document.documentElement.RequestFullScreen();
		}

		if(document.documentElement.mozRequestFullScreen){
			document.documentElement.mozRequestFullScreen();
		}

		if(document.documentElement.webkitRequestFullScreen){
			document.documentElement.webkitRequestFullScreen();
		}

		if(document.documentElement.msRequestFullscreen){
			document.documentElement.msRequestFullscreen();
		}
	},
	

	fullScreenNormal: function() {
		if(document.exitFullScreen){
			document.exitFullscreen()
		}

		//     		console.log(document.mozExitFullScreen)
		if(document.mozCancelFullScreen){
			document.mozCancelFullScreen()
		}

		if(document.webkitExitFullscreen){
			document.webkitExitFullscreen()
		}

		if(document.msExitFullscreen){
			document.msExitFullscreen()
		}
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
	
	

	refMenuList: function(menu_list) {
		for (var i = 0; i < menu_list.length; i++) {
			var menu = menu_list[i];

			if(menu.childList){
				menu.children = menu.childList;
				this.refMenuList(menu.childList);
			}
		}
		return menu_list;
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
	}
	
	
	
	
}







