
export default [

	{
		id: '1',
		name: 'User manager',
		icon: 'el-icon-user',
		info: 'For user lists, additions, statistics, etc...',
		childList: [
			{id: '1-1', name: 'users list', view: () => import('@/sa-view/user/user-list.vue')  },
      {id: '1-2', name: 'The user to edit', view: () => import('@/sa-view/user/user-edit.vue') },
		],   
	},
  {
  	id: '2',
  	name: 'Interest management',
  	icon: 'el-icon-user',
  	info: 'For user lists, additions, statistics, etc...',
  	childList: [
  		{id: '2-1', name: 'hobby list', view: () => import('@/sa-view/hobby/hobby-list.vue')  },
  	],   
  },

  

	


	
]

