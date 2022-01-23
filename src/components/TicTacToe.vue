<template>
  <div id="app">
  <!--v-bind物件綁定圈叉切換-->
  <!--v-for陣列物件九宮格-->
  <!--small_number九宮格數字順序bid=block id-->
   <!--v-on click 單向綁定點擊觸發type給予翻轉變數turn包成一個action>player_go(block)-->
  <h1> {{user}} </h1>
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
     
     <h1>Player:</h1>
     <!--顯示下棋者--> 
     <div class="block_small"
      :class="{block_circle: turn == 1, block_cross: turn  == -1}"
     >
     </div> 
    
  

  </div>
</div>  
</template>


<style lang="scss" scoped>
/*設定顏色變數*/
$color_blue: #46f;
$color_red: #f35;
$color_bg: #222;

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
      turn:1
    }
	},
  mounted (){
    this.restart ()
  },
  methods: {
    //負責重啟的資料
    //用 Vue.js 的 Array 產生九個框框
    restart(){
      this.blocks=Array.from({length:9},function(){
        return {
          type: 0
        }
      })
    },
    //給一個新函數做變數處理
    player_go(block) {
      block.type = this.turn
      this.turn = -this.turn
    }
  },
  //做勝負的判斷
  computed:{
   
  }

}
</script>

