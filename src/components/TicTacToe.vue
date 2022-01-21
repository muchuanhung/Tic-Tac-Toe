<template>

  <div class="container">
    <div class="block">   
    </div>
    
    <div class="block">
      <div class="block_circle">
      </div> 
    </div>  

    <div class="block">
      <div class="block_cross">
      </div> 
    </div>  

  </div>
</template>


<style lang="scss" scoped>
/*設定顏色變數*/
$color_blue: #46f;
$color_red: #f35;
$color_bg: #222;



.block {
  width: 150px;
  height: 150px;
  border: 1px solid ;
  position: relative;
  
}

 /*---區塊元素圈圈---*/
.block_circle{
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