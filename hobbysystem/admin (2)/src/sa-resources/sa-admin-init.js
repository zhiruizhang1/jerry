
export default function(sa_admin, sa) {



	sa_admin.title = 'Hobby system';



	sa_admin.initMenu(); 
	

	sa_admin.$nextTick(function() {
		let username = localStorage.getItem('username')
		sa_admin.user = {
			username: username, 
			avatar: document.querySelector('.admin-logo').src  
		}
	})
	
	
	sa_admin.dropList = [ 
		{
			name: 'my profile',
			click: function() {

         sa_admin.showMenuById('1-2');
			}
		},
		
		{
			name: 'log out',
			click: function() {

				sa.confirm('log out？', function() {
					sa.ajax2('/acc/exit', function() {
						sa.alert('log out success', function() {
							sa_admin.openLogin();
						})
					}, {msg: 'logging out...'});
				});
			}
		}
	]



	sa_admin.init();
	
	



}
