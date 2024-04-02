<style scoped>
	.c-panel{margin: 0px; padding: 0px 20px;}
</style>

<template>
	<el-dialog
		v-if="m"
		:title="m.id == 0 ? 'Add data' : 'Modify data'"
		:visible.sync="isShow"
		width="400px"
		top="25vh"
		:append-to-body="true"
		:destroy-on-close="true"
		:close-on-click-modal="false"
		custom-class="full-dialog"
		>
		<div class="vue-box">
			<div class="c-panel">
				<br>
				<el-form size="mini">
					<el-form-item label="number：">
						<el-input v-model="m.id" disabled></el-input>
					</el-form-item>
					<el-form-item label="name：">
						<el-input v-model="m.name"></el-input>
					</el-form-item>
					<el-form-item label="password：">
						<el-input v-model="m.password"></el-input>
					</el-form-item>
          <el-form-item label="email：">
            <el-input v-model="m.email"></el-input>
          </el-form-item>
          <el-form-item label="city：">
            <el-select v-model="m.city">
              <el-option label="please select" :value="0" disabled></el-option>
              <el-option label="beijing" :value="1"></el-option>
              <el-option label="shanghai" :value="2"></el-option>
              <el-option label="guangzhou" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="hobby：">
            <div v-for="item in m.hobbyList" :key="item.id" style="display: inline-block;">
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
					<el-form-item label="state：">
						<el-radio-group v-model="m.status">
							<el-radio :label="1">normal</el-radio>
							<el-radio :label="2">forbidden</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="isShow = false">cancel</el-button>
			<el-button size="small" type="primary" @click="ok()">confirm</el-button>
		</span>
	</el-dialog>
</template>

<script>

	export default {
		data() {
			return {
				isShow: false,
				id: 0,
				m: null
			}
		},
		methods: {
			open: function(id) {
        console.log(id)
				this.isShow = true;
				if(id == 0){	
					this.m = this.create_m();
				} else {
					this.sa.ajax2('/data/getById', {id: id}, function(res) {
						this.m = res.data;
					}.bind(this), {res: this.getMockData(id)});
				}
			},
	
			ok: function() {
			
				let self = this;
				if(this.m.id == 0) {
					this.sa.ajax2('/data/add', this.m, function() {
						self.sa.alert('add success', function() {
							self.$parent.f5();	   
							self.isShow = false;
						}); 
					});
				} else {
					this.sa.ajax2('/data/update', this.m, function(){
						self.sa.alert('update success', function(){
							self.$parent.f5();	   
							self.isShow = false;
						}); 
					});
				}
			},
			create_m: function() {
				return {
					username: '', 
					tel: '',
					email: '', 
					city: 0,
					hobbyList: [{id:1,name:"table tennis"},{id:2,name:"basketball"}],
          hobby:[],
          sex:1,
          status:1,
				}
			},
			getMockData: function(id) {
				var data = null;
				mockDataList.data.forEach(function(item) {
					if(item.id == id) {
						data = item;
					}
				})
				var mockData = {
					code: 200,
					msg: 'ok',
					data: data
				}
				return mockData;
			}
		},
		created: function(){
			
		}
	}
</script>
