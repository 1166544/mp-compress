import{VantComponent}from"../common/component";VantComponent({relation:{name:"collapse-item",type:"descendant",linked:function(t){this.setData({items:this.data.items.concat([t])},function(){t.updateExpanded()})}},props:{accordion:Boolean,value:null},data:{items:[]},watch:{value:function(){this.data.items.forEach(function(t){t.updateExpanded()})},accordion:function(){this.data.items.forEach(function(t){t.updateExpanded()})}},methods:{switch:function(t,n){var a=this.data,o=a.accordion,e=a.value;t=o?n?t:"":n?e.concat(t):e.filter(function(n){return n!==t}),this.$emit("change",t),this.$emit("input",t)}}});