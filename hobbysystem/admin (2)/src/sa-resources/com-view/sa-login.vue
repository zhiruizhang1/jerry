<style scoped>
	.view-box{position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 1000; }
	/* EAEFF3 */
	.bg-1{height: 50%; background: linear-gradient(to bottom right, #0466c5, #3496F5);}
	.bg-2{height: 50%; background-color: #EAEFF3;}
	
	.login-box{width: 400px; height: 400px; position: absolute; left: calc(50% - 200px); top: calc(50% - 250px); }
	/* .login-box{} */
	
	
	/* logo */
	.login-top{margin-bottom: 40px; text-align: center; }
	.logo-img{width: 50px; height: 50px; vertical-align: middle;border-radius: 50%; margin-left: -10px; margin-right: 20px;}
	.logo-img{ position: relative; top: -5px; }
	.admin-title{font-size: 28px; color: #FFF; font-weight: 700;}
	
	.from-box{padding: 20px 50px; background-color: #FFF;}
	.from-box{ border-radius: 1px; box-shadow: 1px 1px 2px #666;}
	.from-title{margin-top: 20px; margin-bottom: 30px; text-align: center;}
	
</style>
<template>
	<div class="view-box" v-if="isShow">
		<div class="bg-1"></div>
		<div class="bg-2"></div>
		<div class="login-box">
			<div class="login-box-2">
				<div class="login-top">
					<img src="./../index/admin-logo.png" class="logo-img">
					<span class="admin-title">Hobby applications</span>
				</div>
				<div class="from-box">
					<h3 class="from-title">To login</h3>
					<el-form size="small" label-position="left" label-width="0px">
						<el-form-item>
							<el-input prefix-icon="el-icon-user" v-model="m.username" placeholder="Please enter your account number"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input prefix-icon="el-icon-unlock" v-model="m.password" type="password" placeholder="enter your PIN" @keyup.native.enter="ok()"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" size="small" style="width: 100%;" @click="ok()">login</el-button>
						</el-form-item>
						<el-form-item>
							<el-link style="float: right; color: #999;" @click="isShow=false">Temporarily not login</el-link>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
		<div style="position: absolute; bottom: 40px; width: 100%; text-align: center; color: #666;">
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'sa-login',
		data() {
			return {
				isShow: false,	
				m: {
					username: '',
					password: ''
				}
			}
		},
		methods: {

			ok() {
 
				if(this.m.username == '' || this.m.password == '' ) {
					return this.sa.error2('Please enter complete');
				}

				this.axios.get('/login?username='+this.m.username+'&password='+this.m.password).then((response)=>{
					if(response.data.msg=='ok'){
						this.sa.ok2('Login success, welcome you:' + this.m.username);
						this.isShow = false
						localStorage.setItem('id',response.data.id)
						localStorage.setItem('username',response.data.username)
						console.log(response.data.username)
					}
				})
			}
		}
	}
</script>

