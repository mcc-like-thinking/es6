<template>
    <d2-container>
    	<div class="panel-group flex">
    		<div class="panel flex1" :class="activeIndex===index ? 'active' : ''" v-for="(item, index) in data" @mouseover="activeIndex=index">
    			<div class="panel-hd flex alignC flexC">{{item.name}}</div>
    			<div class="panel-bd">
    				<div class="info-group flex flexC">
    					<div class="wrapper flex1">
    						<div class="info-group-hd flex alignC">
    							<i class="icon-video"></i>
    							<div class="txt">视频课件</div>
    						</div>
    						<div class="info-group-bd">
    							<div class="video-item" v-for="(citem, cindex) in item.video">
    								<div class="video-box">
    									<img :src="citem.poster">
	    								<div class="mask flex alignC flexC">
	    									<a class="icon-play" href="javascript:;" @click="openVideoModel(citem)" title="点击观看视频"></a>
	    								</div>
	    							</div>
	    							<div class="title">{{citem.name}}</div>
	    							<div class="desc">{{citem.desc}}</div>
	    							<div class="gray">{{citem.time}}</div>
    							</div>
    						</div>
    					</div>
    				</div>
    				<div class="hr"></div>
    				<div class="info-group flex flexC">
    					<div class="wrapper flex1">
    						<div class="info-group-hd flex alignC">
    							<i class="icon-file"></i>
    							<div class="txt">帮助文档</div>
    						</div>
    						<div class="info-group-bd">
    							<div class="info-block" v-for="citem in item.files">
    								<div class="title">{{citem.name}}</div>
	    							<a class="link" href="javascript:;" @click="openFileModel(citem)" title="点击查看文档">
	    								查看文档
	    								<i class="el-icon-arrow-right"></i>
	    							</a>
	    							<div class="gray">{{citem.time}}</div>
    							</div>
    						</div>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    	<div class="model video-model flex flexC alignC" v-if="videoModel.show" oncontextmenu="return false;">
    		<div class="model-mark flex flexSa"><span v-for="n in 12">{{info.name}}</span></div>
    		<div class="model-hd flex alignC flexSb">
    			<div class="name">
    				{{videoModel.name}}
    				<b class="big">（ 内部资料，请勿外传 ）</b>
    			</div>
    			<a class="el-icon-close model-close" href="javascript:;" @click="closeVideoModel" title="关闭"></a>
    		</div>
    		<div class="model-bd">
    			<div class="video-box">
    				<div class="loading" v-if="videoModel.loading">
    					<i class="el-icon-loading"></i>
    					加载中...
    				</div>
    				<video
    					v-else
	    				class="video"
	    				ref="video"
	    				preload="auto"
	    				controls
	    				controlslist="nodownload nofullscreen"
	    				disablePictureInPicture
	    				x-webkit-airplay="allow"
	    				:src="videoModel.url">
    				</video>
    			</div>
    		</div>
    	</div>
    	<div class="model file-model flex flexC" v-if="fileModel.show" oncontextmenu="return false;">
    		<div class="model-hd flex alignC flexSb">
    			<div class="name">
	    			{{fileModel.name}}
	    			<b class="big">（ 内部资料，请勿外传 ）</b>
	    		</div>
    			<a class="el-icon-close model-close" href="javascript:;" @click="closeFileModel" title="关闭"></a>
    		</div>
    		<div class="model-bd flex flexC nowrap">
    			<div class="model-cont model-cont-l">
    				<el-scrollbar>
    					<div class="title">目录</div>
	    				<el-tree
	    					node-key="id"
	                        :data="fileModel.catalog"
	                        :highlight-current="true"
	                        :expand-on-click-node="false"
	                        :default-expand-all="false"
	                        :default-expanded-keys="[3,4]"
	                        @node-click="catalogClick">
	                    </el-tree>
    				</el-scrollbar>
    			</div>
    			<div class="model-cont model-cont-r">
    				<el-scrollbar ref="scrollbar">
	    				<div class="loading" v-if="fileModel.loading">
							<i class="el-icon-loading"></i>
							加载中...
						</div>
						<div class="file-block">
							<div v-for="(item,index) in fileModel.files" :ref="'page'+index">
								<el-image class="img flex alignC flexC" fit="cover" :src="item">
					              <div slot="placeholder" class="image-slot loading">
					                <i class="el-icon-loading"></i> 加载中
					              </div>
					            </el-image>
							</div>
						</div>
	    			</el-scrollbar>
    			</div>
    		</div>
    	</div>
    </d2-container>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
	      return {
	      	activeIndex: 0,
	      	data: [
		      	{
		      		name: '市州地区资料',
		      		video: [
			      		{
			      			name: '市州版-多彩云传播控制系统应用培训视频课件',
			      			desc: '市州地区学习贵州省网络综合治理体系平台“多彩云”传播控制系统指令传播、接收、处理、反馈等应用实操以及相关规定。',
			      			time: '2020.05.20',
			      			url: require('@/assets/images/orderFAQS/city/city.mp4'),
			      			poster: 'http://117.187.131.92:8082/bh_file/file_visit/gogCMS/bh/cms_uploads/jpg/252ea19b29c3e553a3b72ff4db5348d0/1325126593282080/252ea19b29c3e553a3b72ff4db5348d0_54854.jpg'
			      		}
		      		],
		      		files: [
			      		{
			      			name: '市州版本-多彩云传播控制系统应用手册',
			      			time: '2020.05.20',
			      			catalog: [
					      		{
					      			id: 1,
					      			label: '简介',
					      			value: 4
					      		},
					      		{
					      			id: 2,
					      			label: '平台使用准备',
					      			value: 5
					      		},
					      		{
					      			id: 3,
					      			label: 'PC统一管控',
					      			value: 6,
					      			children: [
						      			{
						      				id: 31,
							      			label: '指令新建',
							      			value: 7,
							      			children: [
								      			{
								      				id: 311,
									      			label: '编辑器',
									      			value: 8
								      			},
								      			{
								      				id: 312,
									      			label: '基本设置',
									      			value: 15
								      			},
								      			{
								      				id: 313,
									      			label: '通知消息',
									      			value: 17
								      			}
							      			]
						      			},
						      			{
						      				id: 32,
							      			label: '指令审批',
							      			value: 18
						      			},
						      			{
						      				id: 33,
							      			label: '指令下达',
							      			value: 19
						      			},
						      			{
						      				id: 34,
							      			label: '指令执行',
							      			value: 21
						      			}
					      			]
					      		},
					      		{
					      			id: 4,
					      			label: 'APP统一管控',
					      			value: 23,
					      			children: [
						      			{
						      				id: 41,
							      			label: '指令新建人',
							      			value: 24,
							      			children: [
								      			{
								      				id: 411,
									      			label: '登入',
									      			value: 24
								      			},
								      			{
								      				id: 412,
									      			label: '新建',
									      			value: 28
								      			},
								      			{
								      				id: 413,
									      			label: '修改',
									      			value: 29
								      			},
								      			{
								      				id: 414,
									      			label: '考核',
									      			value: 30
								      			}
							      			]
						      			},
						      			{
						      				id: 42,
							      			label: '指令审批人',
							      			value: 31,
							      			children: [
								      			{
								      				id: 421,
									      			label: '登入',
									      			value: 31
								      			},
								      			{
								      				id: 422,
									      			label: '新建',
									      			value: 36
								      			},
								      			{
								      				id: 423,
									      			label: '修改',
									      			value: 37
								      			},
								      			{
								      				id: 424,
									      			label: '审核',
									      			value: 38
								      			},
								      			{
								      				id: 425,
									      			label: '考核',
									      			value: 40
								      			}
							      			]
						      			},
						      			{
						      				id: 43,
							      			label: '指令下达人',
							      			value: 41,
							      			children: [
								      			{
								      				id: 431,
									      			label: '登入',
									      			value: 41
								      			},
								      			{
								      				id: 432,
									      			label: '新建',
									      			value: 46
								      			},
								      			{
								      				id: 433,
									      			label: '下达',
									      			value: 47
								      			},
								      			{
								      				id: 434,
									      			label: '考核',
									      			value: 49
								      			}
							      			]
						      			},
						      			{
						      				id: 44,
							      			label: '指令执行人',
							      			value: 50,
							      			children: [
								      			{
								      				id: 441,
									      			label: '登入',
									      			value: 50
								      			},
								      			{
								      				id: 442,
									      			label: '执行',
									      			value: 53
								      			}
							      			]
						      			}
					      			]
					      		},
			      			],
			      			url: ''
			      		},
			      		{
			      			name: '市州版本-多彩云传播控制系统应用答疑手册',
			      			time: '2020.05.20',
			      			catalog: [
			      				{
					      			id: 1,
					      			label: '工作部署',
					      			value: 2
					      		},
					      		{
					      			id: 2,
					      			label: '执行说明',
					      			value: 3
					      		},
					      		{
					      			id: 3,
					      			label: '操作说明',
					      			value: 4
					      		},
					      		{
					      			id: 4,
					      			label: '安全保障',
					      			value: 8
					      		},
			      			],
			      			url: ''
			      		}
		      		]
		      	},
		      	{
		      		name: '县级地区资料',
		      		video: [
			      		{
			      			name: '县级版-多彩云传播控制系统应用培训视频课件',
			      			desc: '县级地区学习贵州省网络综合治理体系平台“多彩云”传播控制系统指令传播、接收、处理、反馈等应用实操以及相关规定。',
			      			time: '2020.05.20',
			      			url: require('@/assets/images/orderFAQS/county/county.mp4'),
			      			poster: 'http://117.187.131.92:8082/bh_file/file_visit/gogCMS/bh/cms_uploads/jpg/169a219714f8b125afbebb7329fbd15e/1325126593282080/169a219714f8b125afbebb7329fbd15e_31259_1583922092523_1590649535049.jpg'
			      		}
		      		],
		      		files: [
			      		{
			      			name: '县级版本-多彩云传播控制系统应用手册',
			      			time: '2020.05.20',
			      			catalog: [
					      		{
					      			id: 1,
					      			label: '简介',
					      			value: 3
					      		},
					      		{
					      			id: 2,
					      			label: '平台使用准备',
					      			value: 4
					      		},
					      		{
					      			id: 3,
					      			label: 'PC统一管控',
					      			value: 5,
					      			children: [
						      			{
						      				id: 31,
							      			label: '指令执行',
							      			value: 6
						      			}
					      			]
					      		},
					      		{
					      			id: 4,
					      			label: 'APP统一管控',
					      			value: 8,
					      			children: [
						      			{
						      				id: 41,
							      			label: '指令执行人',
							      			value: 9,
							      			children: [
								      			{
								      				id: 411,
									      			label: '登入',
									      			value: 9
								      			},
								      			{
								      				id: 412,
									      			label: '执行',
									      			value: 12
								      			}
							      			]
						      			}
					      			]
					      		},
			      			],
			      			url: ''
			      		},
			      		{
			      			name: '县级版本-多彩云传播控制系统应用答疑手册',
			      			time: '2020.05.20',
			      			catalog: [
			      				{
					      			id: 1,
					      			label: '工作部署',
					      			value: 2
					      		},
					      		{
					      			id: 2,
					      			label: '执行说明',
					      			value: 3
					      		},
					      		{
					      			id: 3,
					      			label: '操作说明',
					      			value: 4
					      		},
					      		{
					      			id: 4,
					      			label: '安全保障',
					      			value: 5
					      		},
			      			],
			      			url: ''
			      		}
		      		]
		      	}
	      	],

	      	message: null,
	      	videoModel: {
	      		show: false,
	      		loading: false,
	      		name: '',
	      		url: '',
	      		bufferUrl: ''
	      	},
	      	fileModel: {
	      		show: false,
	      		loading: false,
	      		name: '',
	      		catalog: [],
	      		files: []
	      	},

	      	mediaSource: null,
            sourceBuffer: null,
            mimeType: 'video/mp4;codecs="avc1.42E01E,mp4a.40.2"'
	      }
	    },
	    computed: {
		    ...mapState('user', [
		      'info'
		    ])
		},
	    mounted(){
	    	console.log('this.info', this.info, this.$store.state.user.info)

	    },
	    methods: {
	    	openFileModel(item) {
	    		this.fileModel.show = true;
	    		this.fileModel.name = item.name;
	    		this.fileModel.catalog = item.catalog;
	    	},
	    	closeFileModel() {
	    		this.fileModel.show = false;
	    		this.fileModel.name = '';
	    		this.fileModel.catalog = [];
	    	},
	    	catalogClick(data, node, elem) {
	    		const catalogEl = this.$refs['page'+data.value][0];
	    		const top = catalogEl.offsetTop;
	    		this.$refs.scrollbar.wrap.scrollTop = top;
	    	},

	    	async openVideoModel(item) {
	    		const that = this;
	    		this.videoModel.show = true;
	    		this.videoModel.name = item.name;
	    		this.videoModel.bufferUrl = item.url;

	    		// this.videoModel.loading = true;
	    		// const encryptRes = await this.urlEncrypt(item.url);
	    		// this.videoModel.url = window.URL.createObjectURL(encryptRes);
	    		// this.videoModel.loading = false;

	    		// 	this.$nextTick(function () {
	    		// 	const videoEl = this.$refs.video;
	    		// 	videoEl.play();
	    		// 	videoEl.onload = function () {
	    		// 		window.URL.revokeObjectURL(this.videoModel.url);
	    		// 	};
			    // })

	    		if ('MediaSource' in window && MediaSource.isTypeSupported(this.mimeType)) {
	    			this.$nextTick(function () {
	    				this.createMediaSource()
				    })
		        } else {
		            this.$message({message: '您的浏览器不支持MediaSource', type: 'warning'})
		        }
	    	},

	    	createMediaSource() {
		        // 创建MediaSource对象，并使用URL.createObjectURL来创建指向MediaSource对象的URL供video播放
	            this.mediaSource = new MediaSource()
	            this.$refs.video.src = window.URL.createObjectURL(this.mediaSource)
	            // 监听sourceopen
	            this.mediaSource.addEventListener('sourceopen', this.onSourceOpen)
	        },
	        onSourceOpen() {
	            let self = this
	            // 创建一个新的 SourceBuffer 对象，然后会将它追加到 MediaSource 的 SourceBuffers 列表中。
	            this.sourceBuffer = this.mediaSource.addSourceBuffer(this.mimeType)
	            // 监听buffer更新结束事件
	            this.sourceBuffer.addEventListener('updateend', () => {
		            // 停止stream
	                self.mediaSource.endOfStream()
	                // 开始播放
	                self.$refs.video.play()
	            })
	            this.urlEncryptBuffer(this.videoModel.bufferUrl)
	        },

	        requestBuffer() {
	            let self = this
	            // 请求接口去拉流
	            this.$http.get('GetStream', null, {responseType: 'arraybuffer'}).then(resp => {
		            // 拉到的流塞进sourceBuffer里。
	                self.sourceBuffer.appendBuffer(resp)
	            })
	        },

	    	closeVideoModel() {
	    		const videoEl = this.$refs.video;
	    	    videoEl.pause();
	    		this.videoModel.show = false;
	    		this.videoModel.url = '';
	    	},
	    	urlEncrypt(url) {
	    		return new Promise((resolve, reject) => {
			        window.URL = window.URL || window.webkitURL;
		    		let xhr = new XMLHttpRequest();
		    		xhr.open("GET", url, true);
		    		xhr.responseType = "blob";
		    		xhr.onload = function (e) {
			          	if (this.status == 200) {
			          		resolve(this.response)
			            } else {
			            	reject()
			            }
			        }
			        xhr.send();
			    })
	    	},
	    	urlEncryptBuffer(url) {
	    		let self = this
	    		//return new Promise((resolve, reject) => {
		    		let xhr = new XMLHttpRequest();
		    		xhr.open("GET", url, true);
		    		xhr.responseType = "arraybuffer";
		    		xhr.onload = function (e) {
		    			console.log('this.response', this.response)
		    			self.sourceBuffer.appendBuffer(this.response)
		    			// cb(xhr.response);
			          	// if (this.status == 200) {
			          	// 	resolve(this.response)
			           //  } else {
			           //  	reject()
			           //  }
			        }
			        xhr.send();
			    //})
	    	},

	    	openMessage() {
	    		this.message = this.$message({
	    			customClass: 'model-message',
		          	message: '内部机密文件，请勿外传',
		          	type: 'warning',
		          	duration: 0,
		          	showClose: true
		        });
	    	},
	    	closeMessage() {
	    		if (this.message) {
	    			this.message.close();
	    		}
	    	}
	    }
	}
</script>

<style lang="scss" scoped>
	.panel-group {
		margin: 0 -10px;
		min-height: 100%;
		.icon-video,
		.icon-file {
			margin-right: 10px;
			width: 26px;
			height: 26px;
			background-position: center center;
			background-repeat: no-repeat;
			background-size: 100% auto;
		}
		.icon-video {
			background-image: url('~@/assets/images/orderFAQS/video.png');
		}
		.icon-file {
			background-image: url('~@/assets/images/orderFAQS/file.png');
		}
		.icon-play {
			width: 80px;
			height: 80px;
			background: url('~@/assets/images/orderFAQS/play.png') center center no-repeat;
			background-size: 100% auto;
		}
	}
	.panel {
		position: relative;
		margin: 0 10px;
		background-color: #fff;
		&:after {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			content: none;
			background-color: rgba(0,0,0,.5);
		}
		&.active {
			&:after {
				content: none;
			}
			// .panel-hd {
			// 	background-color: #135A98; // #0D3F6A
			// }
		}
	}
	.panel-hd {
		line-height: 45px;
		height: 45px;
		font-size: 22px;
		color: #fff;
		background-color: #135A98;
	}
	.panel-bd {
		padding: 12px 20px;
	}
	.hr {
		margin: 20px 0;
		border-bottom: 1px solid #EAEFF3;
	}

	.info-group-hd,
	.info-group-bd {
		padding: 12px 0;
	}
	.info-group-hd {
		font-size: 20px;
		color: #000;
		line-height: 1;
	}
	.info-group {
		.wrapper {
			max-width: 600px;
		}
		.title {
			font-size: 15px;
			font-weight: bold;
		}
		.desc {
			margin-top: 5px;
		}
		.video-box {
			position: relative;
			margin-bottom: 15px;
			img {
				display: block;
				width: 100%;
				height: auto;
			}
			.mask {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,.5);
			}
		}
		.gray {
			font-size: 12px;
			color: #929797;
		}
		.link {
			font-size: 12px;
			color: #2752D0 !important;
		}
		.info-block {
			margin-bottom: 20px;
		}
	}

	.model {
		position: fixed;
		top: 0;
		left: 0;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		z-index: 999;
		background-color: rgba(0,0,0,0.9);
		user-select: none;
		overflow: hidden;
		.model-mark {
			position: absolute;
			top: 0;
			left: -50%;
			width: 200%;
			z-index: 1;
			font-size: 24px;
			color: rgba(0,0,0,0.1);
			span {
				transform: rotate(-45deg);
			    text-shadow: 0 150px, 0 300px, 0 450px, 0 600px, 0 750px, 0 900px, 0 1050px, 0 1200px, 0 1350px, 0 1500px;
			}
			
		}
		.model-hd {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 2;
			box-sizing: border-box;
			padding: 0 30px;
			width: 100%;
			height: 60px;
			line-height: 60px;
			background-color: #181818;
			font-size: 16px;
			color: #fff;
			.model-close {
				font-size: 26px;
				color: #d1d1d1 !important;
			}
			.big {
				font-size: 22px;
			}
		}
		.loading {
			font-size: 16px;
			color: #fff;
			text-align: center;
		}
	}
	.video-model {
		.video {
			display: block;
			max-width: 960+250px;
			&::-webkit-media-controls-fullscreen-button {
				display: none;
			}
		}
	}
	.file-model {
		padding-top: 60px;
		.model-bd,
		.model-cont,
		.el-scrollbar {
			height: 100%;
			/deep/ .el-scrollbar__bar.is-vertical {
				width: 14px;
				border-radius: 0;
			}
			/deep/ .el-scrollbar__wrap {
				overflow-x: hidden!important;
			}
			/deep/ .el-tree-node__expand-icon {
				font-size: 14px;
			}
		}
		.model-cont {
			background-color: #fff;
		}
		.model-cont-l {
			box-sizing: border-box;
			padding: 20px;
			width: 250px;
			border-right: 1px solid #EAEFF3;
			.title {
				margin-bottom: 20px;
				padding-left: 10px;
				font-weight: bold;
				line-height: 1.2;
				border-left: 3px solid #2752D0;
			}
		}
		.model-cont-r {
			min-width: 500px;
		}
		.img {
			margin-bottom: 3px;
			max-width: 960px;
			min-height: 100px;
			border-bottom: 3px solid #f1f1f1;
			&:last-child {
				border-bottom: none;
			}
		}
	}
</style>
<style type="text/css">
	.model-message {
		top: 7px !important;
	}
</style>