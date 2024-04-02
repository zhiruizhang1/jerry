<style scoped>
</style>

<template>
	<div class="vue-box">
		<div class="c-panel">
			<div class="c-title">The user to edit</div>
			<el-form size="mini" v-if="m">
				<el-form-item label="name：">
					<el-input v-model="m.username"></el-input>
				</el-form-item>
				<el-form-item label="password：">
					<el-input v-model="m.password"></el-input>
				</el-form-item>
        <el-form-item label="email：">
          <el-input v-model="m.email"></el-input>
        </el-form-item>
				<el-form-item label="phone：">
					<el-input v-model="m.tel"></el-input>
				</el-form-item>
				<el-form-item label="city：">
					<el-select v-model="m.city">
						<el-option label="please select" :value="0" disabled></el-option>
						<el-option label="beijing" :value="1"></el-option>
						<el-option label="shanghahi" :value="2"></el-option>
						<el-option label="guangzhou" :value="3"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="hobby：">
          <div v-for="item in hobbyList" :key="item.id" style="display: inline-block;">
            <el-checkbox v-model="m.hobby" :label="item.id">
                {{item.name}}
            </el-checkbox>
          </div>
        </el-form-item>
				<el-form-item label="sex：">
					<el-radio-group v-model="m.sex" size="mini">
						<el-radio :label="1">man</el-radio>
						<el-radio :label="2">woman</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item>
					<span class="c-label">&emsp;</span>
					<el-button type="primary" icon="el-icon-plus" size="mini" @click="ok">confirm</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
    created() {
    },
		data() {
			return {
				m: {	
					username: '',	
					password: '',
          email: '',
					tel: '',
					city: 0,
          hobby:[],
					sex: 1,
				},
        hobbyList:[
          {
            id:1,
            name:"table tennis"
          },
          {
            id:2,
            name:"basketball"
          }
        ]
			}
		},
		methods: {
			// ok
			ok: function() {
				this.sa.ajax2('/user/add', function(res) {
					console.log(res);
					this.sa.alert('Add data. The parameters are as follows:' + JSON.stringify(this.m));
				}.bind(this))
			}
		},
		
	}
</script>


