<template>
	<div class="vue-box">
		<div class="c-panel">
			<div class="c-title">Userlist</div>
      <el-form size="mini" :inline="true" @submit.native.prevent >
        <el-form-item label="city：">
          <el-input v-model="p.city" />
        </el-form-item>
        <el-form-item label="age：">
          <el-input v-model="p.ageMin" />  ~  <el-input v-model="p.ageMax" />
        </el-form-item>
        
        <el-form-item style="min-width: 0px;">
          <el-button type="primary" icon="el-icon-search" @click="p.pageNo = 1; f5()">query</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="add()">add</el-button>
        </el-form-item>
      </el-form>
			<el-table :data="dataList" size="mini">
				<el-table-column label="number" prop="id" width="70px" > </el-table-column>
				<el-table-column label="username" prop="username" width="200px"></el-table-column>
				<el-table-column label="email" prop="email"> </el-table-column>
				<el-table-column label="city" prop="city"></el-table-column>
        <el-table-column label="hobby" prop="hobbyString"></el-table-column>

				<el-table-column prop="address" label="operation">
					<template slot-scope="s">
						<el-button class="c-btn" type="success"  icon="el-icon-view" @click="get(s.row)">details</el-button>
            <el-button class="c-btn" type="primary" icon="el-icon-edit" @click="update(s.row)">update</el-button>
						<el-button class="c-btn" type="danger" icon="el-icon-delete" @click="del(s.row)">delete</el-button>
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
	
    <add-or-update ref="add-or-update"></add-or-update>
	</div>
</template>

<script>
	import addOrUpdate from './user-add.vue';
	export default {
    components: {
      addOrUpdate
    },
		data() {
			return {
				p: {	
					city: '',
					  ageMin:"",
					  ageMax:''
				},
				dataCount: 1422,
				dataList: []
			}
		},
		methods: {
			f5: function() {
				this.axios.get('/selectUserByAge?startAge='+this.p.ageMin+'&endAge='+this.p.ageMax+"&city="+this.p.city).then((response) => {
					console.log(response.data)
					this.dataList = response.data.data
					this.dataCount = response.data.data.length
			})
			},
			f4: function() {
				this.axios.get('/selectAllUser').then((response) => {
					console.log(response.data)
					this.dataList = response.data.data
					this.dataCount = response.data.data.length
			})
			},
			
			del: function(data) {
				this.sa.confirm('This operation cannot be undone', function() {
					this.sa.ajax2('/user/delete?id=' + data.id, function() {
						this.sa.arrayDelete(this.dataList, data);
						this.sa.ok('delete success');
					}.bind(this))
				}.bind(this));
			},
			
			get: function(data) {
				var str = '<div>';
				str += '<p>number：' + data.id + '</p>';
				str += '<p>username：' + data.username + '</p>';
        str += '<p>email：' + data.email + '</p>';
        str += '<p>city：' + data.city + '</p>';
        str += '<p>hobby：' + data.hobbyString + '</p>';
				str += '<p>current state：<b>' + (data.status == 1 ? 'normal' : 'forbidden') + '</b></p>';
				str += '<p>register time：' + data.create_time + '</p>';
				str += '</div>';
				this.sa.alert(str);
			},
      add: function () {
        this.$refs['add-or-update'].open(0);
      },
      update: function (data) {
        this.$refs['add-or-update'].open(data.id);
      },
		},
		created: function(){
			this.f4();
		}
	}
</script>

<style>
</style>
