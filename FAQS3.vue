<!--
 * @Descripttion: 指令帮助中心
 * @version: 
 * @Author: mhh
 * @Date: 2020-06-01 10:36:18
 * @LastEditors: mhh
 * @LastEditTime: 2020-06-01 10:36:18
 -->
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
	    									<a class="icon-play" href="javascript:;" @click="openVideoModel(citem, item.type)" title="点击观看视频"></a>
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
    					<i class="icon el-icon-loading"></i>
    					正在解析，解析比较耗时，可能需要2-3分钟，请耐心等待...
    				</div>
    				<video
    				 	v-show="!videoModel.loading"
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
							<i class="icon el-icon-loading"></i>
							正在解析，解析比较耗时，可能需要2-3分钟，请耐心等待...
						</div>
						<div class="file-block">
							<div class="img-box" v-for="(item,index) in fileModel.files" :ref="'page'+index">
								<el-image class="img flex alignC flexC" fit="cover" :src="item" @load="manualLoad(item)">
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
	import util from '@/libs/util.js'
	import { mapState } from 'vuex'
	import { getSource, getEncryptUrl} from "@/api/orderFAQS"
	export default {
		data() {
	      return {
	      	activeIndex: 0,
	      	data: [
		      	{
		      		type: 0,
		      		name: '市州地区资料',
		      		video: [
			      		{
			      			name: '市州版-多彩云传播控制系统应用培训视频课件',
			      			desc: '市州地区学习贵州省网络综合治理体系平台“多彩云”传播控制系统指令传播、接收、处理、反馈等应用实操以及相关规定。',
			      			time: '2020.05.20',
			      			// url: require('@/assets/images/orderFAQS/city.mp4'),
			      			url: getSource('city','.mp4'),
			      			poster: require('@/assets/images/orderFAQS/city-poster.jpg')
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
			      			url: getSource('city-use-manual-','.jpg',54)
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
			      			url: getSource('city-fqa-manual-','.jpg',11)
			      		}
		      		]
		      	},
		      	{
		      		type: 1,
		      		name: '县级地区资料',
		      		video: [
			      		{
			      			name: '县级版-多彩云传播控制系统应用培训视频课件',
			      			desc: '县级地区学习贵州省网络综合治理体系平台“多彩云”传播控制系统指令传播、接收、处理、反馈等应用实操以及相关规定。',
			      			time: '2020.05.20',
			      			// url: require('@/assets/images/orderFAQS/county.mp4'),
			      			url: getSource('county','.mp4'),
			      			poster: require('@/assets/images/orderFAQS/county-poster.jpg')
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
			      			url: getSource('county-use-manual-','.jpg',13)
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
			      			url: getSource('county-fqa-manual-','.jpg',8)
			      		}
		      		]
		      	}
	      	],

	      	message: null,
	      	videoModel: {
	      		show: false,
	      		loading: false,
	      		type: '',
	      		name: '',
	      		url: '',
	      		primitUrl: '',
	      		testUrl: [
	      			require('@/assets/images/orderFAQS/hd.mp4'),
	      			require('@/assets/images/orderFAQS/hd2.mp4'),
	      			require('@/assets/images/orderFAQS/county.mp4')
	      		]
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
	    methods: {
	    	async openFileModel(item) {
	    		window.URL = window.URL || window.webkitURL;

	    		this.fileModel.show = true;
	    		this.fileModel.name = item.name;
	    		this.fileModel.catalog = item.catalog;

	    		const fileTmp = item.url.map(async (url, index) => {
				    const encryptRes = await getEncryptUrl(url);
				    const encryptUrl = window.URL.createObjectURL(encryptRes);
				    return encryptUrl;
				});
				for (const tmpItem of fileTmp) {
				    const res = await tmpItem;
				    this.fileModel.files.push(res)
				}
	    	},
	    	closeFileModel() {
	    		this.fileModel.show = false;
	    		this.fileModel.name = '';
	    		this.fileModel.catalog = [];
	    		this.fileModel.files = [];
	    	},
	    	catalogClick(data, node, elem) {
	    		const catalogEl = this.$refs['page'+data.value][0];
	    		const top = catalogEl.offsetTop;
	    		this.$refs.scrollbar.wrap.scrollTop = top;
	    	},
	    	manualLoad(item) {
	    		window.URL = window.URL || window.webkitURL;
	    		window.URL.revokeObjectURL(item);
	    	},

	    	async openVideoModel(item, type) {
	    		const that = this;
	    		this.videoModel.show = true;
	    		this.videoModel.name = item.name;
	    		this.videoModel.type = type;

	    		this.videoModel.loading = true;
			    this.videoModel.primitUrl = item.url;
			    if ('MediaSource' in window && MediaSource.isTypeSupported(this.mimeType)) {
	    			this.$nextTick(function () {
	    				this.createMediaSource()
				    })
		        } else {
		            this.$message({message: '您的浏览器不支持MediaSource', type: 'warning'})
		        }
	    	},
	    	closeVideoModel() {
	    		const videoEl = this.$refs.video;
	    		if (videoEl) {
	    			videoEl.pause();
	    		}

	    	    window.URL = window.URL || window.webkitURL;
	    		window.URL.revokeObjectURL(this.videoModel.url);

	    		this.videoModel.url = '';
	    		this.videoModel.show = false;
	    	},
	    	createMediaSource() {
	            const mediaSource = new MediaSource()
	            this.$refs.video.src = window.URL.createObjectURL(mediaSource)
	            mediaSource.addEventListener('sourceopen', this.onSourceOpen)
	        },
	        async onSourceOpen(e) {
	        	const urls = this.videoModel.testUrl;
	        	const mediaSource = e.target;
	            const self = this;

	            let i = 0;
	            
	            let sourceBuffer = mediaSource.addSourceBuffer(this.mimeType)
	            sourceBuffer.addEventListener('updateend', async () => {
	            	if (i === 0) {
						self.$refs.video.play()
					}

					i++;
					if (i === 3) {
						mediaSource.endOfStream()
					}
				    if (i < 3) {
		      			sourceBuffer.timestampOffset = 210
				        const arrayBuffer = await self.urlEncryptBuffer(urls[i])
				        sourceBuffer.appendBuffer(arrayBuffer)
				    }
	            })
	            
	    		const encryptRes = await this.urlEncryptBuffer(urls[0])
	    		sourceBuffer.appendBuffer(encryptRes)
	    		this.videoModel.loading = false;

	            // const videoResource = util.db.get('orderFAQSVideo').value()[this.videoModel.type];
	            // const encryptRes = await videoResource;
	            // self.sourceBuffer.appendBuffer(encryptRes)
	            // this.videoModel.loading = false;
	        },

	        urlEncryptBuffer(url) {
	        	console.log('urlEncryptBuffer', url)
	    		let self = this
	    		return new Promise((resolve, reject) => {
		    		let xhr = new XMLHttpRequest();
		    		xhr.open("GET", url, true);
		    		// xhr.setRequestHeader("Range", "bytes=0-" + 100000);
		    		xhr.responseType = "arraybuffer";
		    		xhr.onload = function (e) {
		    			// console.log('this.response', this.response)
		    			//self.sourceBuffer.appendBuffer(new Uint8Array(xhr.response))
		    			// cb(xhr.response);
		    			console.log('this.response', this.response)
			          	if (this.status == 200) {
			          		resolve(this.response)
			            } else {
			            	reject()
			            }
			        }
			        xhr.send();
			    })
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
			color: rgba(0,0,0,0.15);
			span {
				transform: rotate(30deg);
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
			.icon {
				font-size: 18px;
			}
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
				top: 10px;
				bottom: 10px;
				width: 14px;
				border-radius: 0;
				.el-scrollbar__thumb {
					background-color: rgba(144, 147, 153, 0.8);
				}
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
			box-sizing: border-box;
			padding: 10px 3px;
			min-width: 500px;
			.file-block {
				padding: 10px 22px;
			}
		}
		.img-box {
			margin-bottom: 15px;
			&:last-child {
				margin-bottom: 0;
			}
		}
		.img {
			max-width: 960px;
			box-shadow: 0 0 5px rgba(0,0,0,0.2);
			/deep/ {
				.el-image__inner, .el-image__placeholder, .el-image__error {
					min-height: 100px;
				}
			}
		}
	}
</style>
<style type="text/css">
	.model-message {
		top: 7px !important;
	}
</style>