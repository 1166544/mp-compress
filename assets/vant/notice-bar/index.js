import{VantComponent}from"../common/component";var FONT_COLOR="#ed6a0c",BG_COLOR="#fffbe8";VantComponent({props:{text:{type:String,value:""},mode:{type:String,value:""},url:{type:String,value:""},openType:{type:String,value:"navigate"},delay:{type:Number,value:0},speed:{type:Number,value:50},scrollable:{type:Boolean,value:!0},leftIcon:{type:String,value:""},color:{type:String,value:FONT_COLOR},backgroundColor:{type:String,value:BG_COLOR}},data:{show:!0,hasRightIcon:!1,width:void 0,wrapWidth:void 0,elapse:void 0,animation:null,resetAnimation:null,timer:null},watch:{text:function(){this.setData({},this.init)}},created:function(){this.data.mode&&this.setData({hasRightIcon:!0})},destroyed:function(){var t=this.data.timer;t&&clearTimeout(t)},methods:{init:function(){var t=this;this.getRect(".van-notice-bar__content").then(function(e){e&&e.width&&(t.setData({width:e.width}),t.getRect(".van-notice-bar__content-wrap").then(function(e){if(e&&e.width){var a=e.width,i=t.data,n=i.width,o=i.speed,r=i.scrollable,l=i.delay;if(r&&a<n){var s=n/o*1e3,c=wx.createAnimation({duration:s,timeingFunction:"linear",delay:l}),u=wx.createAnimation({duration:0,timeingFunction:"linear"});t.setData({elapse:s,wrapWidth:a,animation:c,resetAnimation:u},function(){t.scroll()})}}}))})},scroll:function(){var t=this,e=this.data,a=e.animation,i=e.resetAnimation,n=e.wrapWidth,o=e.elapse,r=e.speed;i.translateX(n).step();var l=a.translateX(-o*r/1e3).step();this.setData({animationData:i.export()}),setTimeout(function(){t.setData({animationData:l.export()})},100);var s=setTimeout(function(){t.scroll()},o);this.setData({timer:s})},onClickIcon:function(){var t=this.data.timer;t&&clearTimeout(t),this.setData({show:!1,timer:null})},onClick:function(t){this.$emit("click",t)}}});