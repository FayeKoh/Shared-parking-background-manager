<template>
  <div class="charts" ref="charts">
  </div>
</template>
<script>
import * as echarts from 'echarts';
import axios from 'axios'
export default {
  name: 'report',
  methods: {
    drawPieChart() {
      let mycharts = echarts.init(this.$refs.charts)
      let xAxisData = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];q
      let data4 = [];
      for (let i = 1; i < 13; i++) {
        xAxisData.push(i + '月');
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5 + 50);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5 + 50);
        data3.push((Math.cos(i / 2) * (i / 5 - 10) + i / 6) * 5 + 50);
        data4.push((Math.cos(i / 4) * (i / 5 - 10) + i / 6) * 5 + 50);
      }
      mycharts.setOption({
        title: {
          text: '年度统计报表'
        },
        legend: {
          data: ['交易金额', '商户总数', '客户总数', '产品总数']
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack']
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: '交易金额',
            type: 'bar',
            data: data1,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function(idx) {
              return idx * 10;
            }
          },
          {
            name: '商户总数',
            type: 'bar',
            data: data2,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function(idx) {
              return idx * 10 + 100;
            }
          },
          {
            name: '客户总数',
            type: 'bar',
            data: data3,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function(idx) {
              return idx * 10 + 30;
            }
          },
          {
            name: '产品总数',
            type: 'bar',
            data: data4,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function(idx) {
              return idx * 10 + 70;
            }
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5;
        }

      })
    },
    async initData() {
      const url = 'http://nimiao.natapp1.cc/admin/ChaXun'
      axios
        .get(url,{}).then(res=>{
        console.log(url)
        console.log(res.data);
        var getData = [];
        console.log(res.data.length)
        for(let i=0; i<res.data.length; i++) {
          var obj = new Object();
          obj.name = res.data[i].typeName;
          obj.value = res.data[i].num;
          getData[i] = obj;
        }
        this.mycharts.setOption({
          legend: {
            data: res.data.typeName,
          },
          series:[{
            data: getData,
          }]
        });
      })
    },
    drawCharts() {
      this.drawPieChart();
    },
  },
  mounted () {
    this.initData();
    this.drawCharts();
  }
}
</script>
<style scoped>
.charts{
  width: 100%;
  height: 500px;
  box-shadow: 0 0 5px 5px #f0f0f0;
  text-align: center;
  padding: 20px;
  display: inline-block;
  margin-top: 20px;
}
</style>
