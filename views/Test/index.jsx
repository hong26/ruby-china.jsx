import React from 'react'
// import G2 from 'g2'
import { Stat } from 'g2';
import createG2 from 'g2-react'

const Line = createG2(chart => {
  chart.col('sold', {alias:"销售量", min:0});
  chart.col('genre', {alias:"游戏种类"})
  chart.interval().position('genre*sold').color('genre')
  chart.render();
});

let Test = React.createClass({
  getInitialState(){
    return {
      data:[
        {genre: 'Sports', sold: 275},
        {genre: 'Strategy', sold: 115},
        {genre: 'Action', sold: 120},
        {genre: 'Shooter', sold: 350},
        {genre: 'Other', sold: 150},
      ],
      width : 800,
      height : 400,
      done: false,
      defs: {
  genre: {
    type: '游戏种类' // 设置度量的类型，为分类 cat
  },
  sold: {
    type: '销售量',
    min: 0, // 设置最小值
    max: 350 // 设置最大值
  } // 如果没有具体声明字段的度量类型，G2 会根据数值的类型自己判断，这里为 linear 连续数值类型
}
    }
   },

  // componentDidMount(){
  //   this.getChart()
  // },


  // getChart(){
  //     // Step 1: 创建 Chart 对象
  //     var chart = new G2.Chart({
  //       id: this.refs.c1.id, // 指定图表容器 ID
  //       width : 800, // 指定图表宽度
  //       height : 400 // 指定图表高度
  //     });
  //     // Step 2: 载入数据源
      // chart.source(this.state.data, {
      //   genre: {
      //     alias: '游戏种类' // 列定义，定义该属性显示的别名
      //   },
      //   sold: {
      //     alias: '销售量'
      //   }
      // });
  //     // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
  //     chart.interval().position('genre*sold').color('genre',['#333','#785','#345','#666','#222','#887'])
  //     // Step 4: 渲染图表
  //     chart.render();
  // },

  onClick(){
    if(this.state.done){
        this.setState({
      data:[
        {genre: 'Sports', sold: 275,min:0},
        {genre: 'Strategy', sold: 115},
        {genre: 'Action', sold: 120},
        {genre: 'Shooter', sold: 350},
        {genre: 'Other', sold: 150},
      ],
      done: !this.state.done
    })
        }else{
      this.setState({
        data:[
          {genre: 'Sports', sold: 4},
          {genre: 'Strategy', sold: 5},
          {genre: 'Action', sold: 120},
          {genre: 'Shooter', sold: 350},
          {genre: 'Other', sold: 150},
        ],
        done: !this.state.done
      })
    }
  },

  contextTypes: {
    aaa: React.PropTypes.func
  },

  render(){
    return (
      <div>
        <Line
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
        />
      <button onClick={this.context.aaa}>1111</button>
      </div>
    )
  }
})

export default Test
