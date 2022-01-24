<template>
  <div id="app" class="app">
  <!--v-bind物件綁定圈叉切換-->
  <!--v-for陣列物件九宮格-->
  <!--small_number九宮格數字順序bid=block id-->
   <!--v-on click 單向綁定點擊觸發type給予翻轉變數turn包成一個action>player_go(block)-->
 
    <div class="block_area">
        <div class="block"
        v-for="(block,bid) in blocks"
        :key="block.id"
        :class="{block_circle: block.type == 1, block_cross:block.type == -1}"
        @click="player_go(block)"
        > 
          <div class="small_number">
          {{bid+1}}
          </div>
        </div>
    </div>

     <!--顯示下棋者--> 
     <h1> {{win_text}} </h1>
     <div class="block_small"
      :class="{block_circle: turn == 1, block_cross: turn  == -1}"
     >
     </div>

    <!--重新開始按鈕--> 
    <h2
      @click="restart"
      v-if="win_text.lenght!=0"
    >
      Restart
    </h2> 

  </div>  
</template>


<style lang="scss" scoped>
/*設定顏色變數*/
$color_blue: #46f;
$color_red: #f35;
$color_bg: #222;

.app{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222;
  flex-direction: column;
}

h1 {
  margin-top: 20px;
}

h2 {
   margin-top: 10px;
  cursor: pointer;
}

.block_small{
   margin-top: 10px;
}

.block_area{
  width: 450px;
  height: 450px;
  display: flex;
  flex-wrap: wrap;
}

.block{
  width: 150px;
  height: 150px;
  border: 1px solid rgba($color: white, $alpha: 0.2);
  position: relative;
  box-sizing: border-box;
}

.small_number{
  color: white;
  opacity: 0.2;
}

 /*---區塊元素圈圈---*/
  .block_circle{
   /*block-共同樣式*/
  width: 150px;
  height: 150px;
  border: 1px solid rgba($color: white, $alpha: 0.2);
  position: relative;
   box-sizing: border-box;
    /*添加偽元素*/
    &:after,&:before{
      content: "";
      display: block;  
      border-radius: 50%;
      /*區塊元素垂直置中*/
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.5s;
   }
   &:before{
     width: 135px;
     height: 135px;
     background-color: $color_red;
   }
   &:after{
     width: 90px;
     height: 90px;
     background-color: $color_bg;
   }
}

 /*---區塊元素叉叉---*/
.block_cross{
   /*block-共同樣式*/
  width: 150px;
  height: 150px;
  border: 1px solid rgba($color: white, $alpha: 0.2);
  position: relative;
   box-sizing: border-box;
  /*添加偽元素*/
  &:after,&:before{
    content: "";
    display: block;  
    border-radius: 0px;
    /*區塊元素垂直置中*/
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.5s;
  }
    &:before{
      width: 135px;
      height: 22.5px;
      background-color: $color_blue;
      transform: translate(-50%, -50%) rotate(45deg)
  }
    &:after{
      width: 135px;
      height: 22.5px;
      background-color: $color_blue;
      transform: translate(-50%, -50%) rotate(-45deg)
  }
}


</style>

<script>
export default {
	data() {
		return {
      //宣告這集數為一個變數
      blocks:[],
      turn:-1
    }
	},
  mounted (){
    this.restart ()
  },
  methods: {
    //負責重啟的資料
    //用 Vue.js 的 Array 產生九個框框
    //給陣列block+上id屬性
    restart(){
      this.blocks=Array.from({length:9},function(d,i){
        return {
          id: i+1, //新增序號
          type: 0
        }
      })
    },
    //給一個新函數做變數處理
    //加入[防止每格內的重複點擊]機制
    player_go(block) {
      if (block.type == 0){
      block.type = this.turn
      this.turn = -this.turn
      } else {
        alert("Not allow")
      }
    }
  },
  //做勝負的判斷
  computed:{
      pattern_data(){
      var verify_list = "123,456,789,147,258,369,159,357"
      var result = verify_list.split(",")
      //用map-vtext來代表每一個驗證的組合
      //用filter篩選id
        .map((vtext)=>{
      var add = this.blocks
      .filter((d, i) => vtext.indexOf(i + 1) != -1)
      .map((d) => d.type)
      .reduce((a, b) => (a + b), 0);
      //知道哪一條線條件成立
      return { rule: vtext, value: add }
    })
      result = result.filter((obj) => Math.abs(obj.value) == 3)
      return result
    },
      //在畫面上顯示贏家一開始初始值-1
      //承接pattern data所傳遞的資料
      //用三元式寫
      win_text() {
      var winner = -1
      if (this.pattern_data.length > 0) {
      winner = this.pattern_data[0].value
    }

      if (winner == 3) {
      return 'O wins'
    } else if (winner == -3) {
      return 'X wins'
    }
      return (this.turn == -1 ? 'X' : 'O') + " turn"
    }
  }

}
</script>

