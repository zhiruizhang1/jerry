<template>
	<div class="vue-box">
		<div class="c-panel">
			<div class="c-title">Users with the same hobbies</div>
      <el-form size="mini" :inline="true" @submit.native.prevent >
        <el-form-item label="hobby：">
          <div v-for="item in hobbylist" :key="item.id" style="display: inline-block;">
			<el-radio-group v-model="p.id">
				<el-radio :label="item.id">{{item.name}}</el-radio>
			</el-radio-group>
          </div>
        </el-form-item>
        
        <el-form-item style="min-width: 0px;">
          <el-button type="primary" icon="el-icon-search" @click="p.pageNo = 1; f5()">query</el-button>
        </el-form-item>
      </el-form>
			<el-table :data="dataList" size="mini">
				<el-table-column label="serial number" prop="id" width="70px" > </el-table-column>
				<el-table-column label="username" prop="username" width="200px"></el-table-column>
				<el-table-column label="email" prop="email"> </el-table-column>
				<el-table-column label="city" prop="city"></el-table-column>
        <el-table-column label="hobby" prop="hobbyString"></el-table-column>
				<el-table-column prop="address" label="operation">
					<template slot-scope="s">
						<el-button class="c-btn" type="success"  icon="el-icon-view" @click="addFriend(s.row)">addFriend</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page-box">
				<el-pagination background
					layout="total, prev, pager, next, sizes, jumper" 
					:current-page.sync="p.pageNo" 
					:page-size.sync="p.pageSize" 
					:total="dataCount" 
					:page-sizes="[1, 10, 20, 30, 40, 50, 100]" 
					@current-change="f5(true)" 
					@size-change="f5(true)">
				</el-pagination>
			</div>
		</div>
	

	</div>
</template>

<script>

	export default {
		data() {
			return {
				p: {	
					city: '',
					id: '',
					ageMin:"",
					ageMax:''
				},
				dataCount: 1422,
				dataList: [],
				hobbylist:[]
			}
		},
		methods: {
			f5: function() {
				this.axios.get('/selectUserByHobby?hobby='+this.p.id
				).then((response) => {
					console.log(response.data)
					this.dataList = response.data.data
					this.dataCount = response.data.data.length
			})
			},
			f4: function() {
				this.axios.get('/selectAllHobbies').then((response)=>{
					this.hobbylist = response.data.data
				})
			},

			addFriend: function(data){
				let oneID = localStorage.getItem('id')
				if (data.id == oneID){
					alert("You cannot add yourself as a friend")
					return
				}
				this.axios.get('/addFriend?oneID='+oneID+'&twoID='+data.id).then((response)=>{
					alert("Friend added successfully")
				})
			},
		
      
		},
		created: function(){
			this.f5();
			this.f4();
		}
	}
</script>

<style>
</style>
