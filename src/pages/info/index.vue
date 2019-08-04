<template>
  <view class="index-page">
    <view class="header">
      <view class="image-box">
      </view>
    </view>
    <view class="search-bar">
      <view class="weui-search-bar__form" @tap="search()">
        <view class="weui-search-bar__box">
          <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
          <input type="text" disabled class="weui-search-bar__input" placeholder="请输入编号" />
        </view>
      </view>
    </view>

    <view :class=" isIpx?'example ipx-ex':'example'">
      <view class="icon-box">
      </view>
      <view class="text">模拟多包导入导致Vender包过大情况</view>
    </view>

  </view>
</template>

<script>

// 模拟大量第三方包调用
import { JSEncrypt } from '../../../static/jsencrypt';
import { timeout } from 'q';
import md5 from 'js-md5';
import data1 from '../../../test/test-data1';

export default {
	data() {
		return {
			inputVal: '',
			searchVal: '',
			searchKeyShow: true,
			noListShow: true,
			active: 0,
			isIpx: false
		};
	},
	computed: {
		// hole
	},
	mounted() {
		this.active = 0;
		console.log(this.memberEncrypt());
		console.log(md5('test').toUpperCase());
		console.log(data1, timeout);
	},
	methods: {
		memberEncrypt(text = 'abcd') {
			const publicKey = 'MIGfMAzwIDAQAB';

			const encrypt = new JSEncrypt();
			encrypt.setPublicKey(publicKey);
			const encrypted = encrypt.encrypt(text);

			return encrypted;
		}
	},
	onLoad: async function(option) {
		// hole
	},
	created() {},
	onUnload() {}
};
</script>

<style lang="less" scoped>
.index-page {
	background: #fff;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	/deep/ .van-tabbar-item__icon {
		margin-bottom: 0;
	}
	.icon {
		width: 30px;
		height: 30px;
	}
	.header {
		background: #ffa545;
	}
	.image-box {
		width: 100%;
		height: 220px;
		display: block;
		padding-top: 70px;
	}
	.image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.list-item {
		position: relative;
		padding: 8px 0;
		color: #999;
	}
	.list-item:active {
		background-color: #eee;
	}

	.list-box {
		background-color: #fff;
		overflow: hidden;
		margin-top: -1px;
		padding: 0;
		text-align: center;
	}

	.list-label {
		display: block;
		margin: 10px 20px;
		position: relative;
		text-align: center;
	}
	.list-label .label {
		font-size: 14px;
		color: #999;
		text-align: center;
		position: relative;
		z-index: 2;
		background-color: #fff;
		display: inline-block;
		margin: 0 auto;
		padding: 0 10px;
	}
	.list-label .line {
		position: absolute;
		border-top: 1px dashed #999;
		width: 100%;
		bottom: 10px;
		z-index: 1;
	}

	.search-bar {
		background-color: #fff;
		position: relative;
		padding: 8px 20px;
		display: flex;
		box-sizing: border-box;
		border-top: 1rpx solid #fff;
		border-bottom: 1rpx solid #fff;
	}

	.weui-search-bar__form {
		position: relative;
		flex: auto;
		background: #f9f9f9;
		border: 1rpx solid #e6e6ea;
		border-radius: 0;
		border-radius: 5px;
	}

	.weui-search-bar__input {
		height: 36px;
		line-height: 36px;
		font-size: 14px;
	}

	.weui-icon-search_in-box {
		position: absolute;
		left: 10px;
		top: 12px;
	}

	.link-label {
		color: @primary-color;
		font-size: 14px;
		text-align: right;
		margin: 0 20px;
		display: flex;
	}

	.link-label .text {
		flex: 1;
	}
	.link-label .icon-box {
		max-width: 14px;
		max-height: 14px;
		flex: 1;
		margin: 3px 0 0 8px;
	}
	.example {
		position: fixed;
		bottom: 50px;
		width: 100%;
		background-color: #fff;
		text-align: center;
		line-height: 50px;
		// border-top: 1px solid #f9f9f9;
		&:active {
			background-color: #eee;
		}
		.text {
			font-size: 14px;
			color: @primary-color;
			display: inline;
		}
		.icon-box {
			width: 20px;
			height: 20px;
			position: relative;
			display: inline-block;
			margin-right: 4px;
			.image {
				width: 100%;
				position: absolute;
				top: 5px;
			}
		}
	}
	.ipx-ex {
		height: 85px;
	}
}
.tabbar-isIpx {
	/deep/ .van-tabbar {
		height: 85px;
	}
	/deep/ ._van-tabbar-item {
		margin-bottom: 35px;
	}
}
</style>
