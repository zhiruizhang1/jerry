<style scoped>
	.td-img{width: 180px; height: 90px; cursor: pointer; vertical-align: middle;}
	.c-panel-add .td-img{width: 200px;}
</style>

<template>
	<div class="vue-box">
		<div class="c-panel">
			<div class="c-title">Retrieve the parameter</div>
			<el-form size="mini" :inline="true" @submit.native.prevent >
				<el-form-item label="title：">
					<el-input v-model="p.title"></el-input>
				</el-form-item>
				<el-form-item style="min-width: 0px;">
					<el-button type="primary" icon="el-icon-search" @click="p.pageNo = 1; f5()">query</el-button>
				</el-form-item>
				<br>
				<el-form-item label="sort：">
					<el-radio-group v-model="p.sort_type">
						<el-radio :label="0">Order value</el-radio>
						<el-radio :label="1">creation time</el-radio>
						<el-radio :label="2">hits</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>

			<div class="c-title">Data list</div>
			<el-table :data="dataList" size="mini">
				<el-table-column prop="id" label="number" width="70px" > </el-table-column>
				<el-table-column label="image" width="300px">
					<template slot-scope="s">
						<img :src="s.row.img_src" class="td-img" title="Click preview" @click="sa.showImage(s.row.img_src)">
						<span style="color: #666; padding-left: 0.5em;"> Click preview</span>
					</template>
				</el-table-column>
				<el-table-column label="title">
					<template slot-scope="s">
						<el-input size="mini" v-model="s.row.title" @input="s.row.is_update=true"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="sort">
					<template slot-scope="s">
						<el-input size="mini" v-model="s.row.sort" @input="s.row.is_update=true"></el-input>
					</template>
				</el-table-column>
				<el-table-column label="hints" prop="click_count" width="100px"> </el-table-column>
				<el-table-column label="state" >
					<template slot-scope="s">
						<el-switch v-model="s.row.status" :active-value="1" :inactive-value="2" @change="s.row.is_update=true"></el-switch>
						<span style="color: #999;" v-if="s.row.status==1">show</span>
						<span style="color: #999;" v-else>conceal</span>
					</template>
				</el-table-column>
				<el-table-column label="create time" width="150px">
					<template slot-scope="s">{{sa.forDate(s.row.create_time, 2)}}</template>
				</el-table-column>
				<el-table-column label="operation">
					<template slot-scope="s">
						<el-badge class="item" :is-dot="s.row.is_update" style="margin: 5px 0;">
							<el-button class="c-btn" type="primary" icon="el-icon-edit" @click="update(s.row)">update</el-button>
						</el-badge>
						<el-badge class="item" :is-dot="false" style="margin: 5px 0;">
							<el-button class="c-btn" type="danger" icon="el-icon-delete" @click="del(s.row)">delete</el-button>
						</el-badge>
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
					@current-change="f5()" 
					@size-change="f5()">
				</el-pagination>
			</div>
		</div>		

		<div class="c-panel c-panel-add">
			<h4 class="c-title">add one</h4>	
			<el-form size="mini" v-if="m" >
				<el-form-item label="image：">
					<img :src="m.img_src" class="td-img" @click="sa.showImage(m.img_src, '70%', '80%')" >
					<span class="c-remark"> Click on the image to preview</span>
				</el-form-item>
				<el-form-item label="title：">
					<el-input v-model="m.title" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="sort：">
					<el-input v-model="m.sort" style="width: 200px;" type="number"></el-input>
				</el-form-item>
				<!-- <el-form-item label="状态：">
					<el-switch v-model="m.status" :active-value="1" :inactive-value="2"></el-switch>
					<span style="color: #999;" v-if="m.status==1">显示</span>
					<span style="color: #999;" v-else>隐藏</span>
				</el-form-item> -->
				<el-form-item>
					<span class="c-label"></span>
					<el-button type="primary" size="mini" icon="el-icon-plus" @click="add" >add</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import mockData from './mock-data-list.js';
	export default {
		data() {
			return {
				p: {		
					pageNo: 1,
					pageSize: 10,
					sort_type: 0
				},
				dataCount: 0,
				dataList: [],	
				m: {		
					id: 11, 
					title: 'title',
					type: 1, 
					sort: 0,
					status:1, 
					img_src: 'http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2020/01/20/1579506071035455989950.jpeg',
					create_time: new Date(),
					click_count: 42,
					is_update: false,
				},
				curr_m: null
			}
		},
		methods: {
			
			f5: function(){
				this.sa.ajax2('/SysSwiper/getList', this.p, function(res){
					this.dataList = this.sa.listAU(res.data);	
					this.dataCount = res.dataCount;			
				}.bind(this), {res: mockData});
			},
			add: function(){
				var m = this.sa.copyJSON(this.m);
				this.sa.ajax2('/SysSwiper/add', m, function(){
					this.sa.alert('add success', function(){
						this.dataList.push(m);
					}.bind(this));
				}.bind(this))
			},
			update: function(data){
				var data2 = this.sa.copyJSON(data);
				data2.create_time = undefined;
				this.sa.ajax2('/SysSwiper/update', data2, function(){
					this.sa.ok('update success');
					data.is_update = false;
				})
			},
			del: function(data){
				this.sa.confirm('This operation cannot be undone', function(){
					this.sa.ajax2('/SysSwiper/delete?id=' + data.id, function(){
						this.sa.ok('delete success');
						this.sa.arrayDelete(this.dataList, data);
					}.bind(this))
				}.bind(this))
			}
		},
		created() {
			this.f5();
		}
	}
</script>

