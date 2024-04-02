<style scoped>
	.vue-box {
		background-color: #EEE;font-size: 14px;
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
	}
	.content-box {margin: 1em;padding: 1em;background-color: #FFF;color: #666;}
	.el-tag{border-radius: 1px;}

	@media(max-width: 800px) {
		.kapian {
			width: 100% !important;
			margin-right: 0px !important;
		}
		.saoma {
			display: none;
		}
	}
	.md-contetn{padding-left: 1.5em; line-height: 26px;}
</style>
<style>
	.md-contetn h4{margin-left: -0.5em;}
	.md-contetn ul,.md-contetn ol{padding-left: 1em;}
	.md-contetn pre{padding: 5px; background-color: #EEE; font-family: "times new roman";}
</style>

<template>
	<div class="vue-box">
	<friend></friend>
		
	</div>
</template>

<script>
  import friend from '../../sa-view/friend/friend.vue'
	export default {
    components:{
      friend
    },
		data() {
			return {
	
			}
		},
		methods: {
			meile: function() {
				this.$message({
					message: 'Did not also point',
					type: 'warning'
				});
			},
			openDoc: function() {
				parent.sp.selectMenu(11);
			}

		},
		mounted() {
			// document.querySelectorAll('.md-contetn').forEach(function(item) {
			// 	console.log(item.innerHTML);
				
			// 	console.log(ds);
			// 	let str = marked(ds);
			// 	item.innerHTML = str;
			// })
		}
	}
</script>

