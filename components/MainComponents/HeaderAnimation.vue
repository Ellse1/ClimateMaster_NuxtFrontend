<template>
    <!-- Überschriften -->
    <div class="text-center">
        <h1 id="headerBig" class="display-3" style="margin-top:20px;">
          <b>         
            <span class="text-success climate">Climate</span>
            <span class="master">Master</span>
          </b>
        </h1>
        <h1 id="headerSmall" class="display-3" style="margin-top:20px;">
          <b>         
            <div class="text-success">Climate</div>
            <div class="">Master</div>
          </b>
        </h1>

        <h4>Finde hier die effizientesten Möglichkeiten klimafreundlich zu leben</h4>
    </div>

</template>
<style scoped>

.climate{
  position: relative;
  left: 10px;
  animation: gorightThenBack 30s ease forwards 2s infinite;
}
.master{
  position: relative;
  right: 10px; 
  animation: goleftThenBack 30s ease forwards 2s infinite;
}
.now{
  position: relative;
  color:black;
  opacity: 0;
  -webkit-animation:  fadeIn 30s forwards 2s infinite;
                      /* fadeOut 1s linear forwards 7s; */
  animation:  fadeIn 30s forwards 2s infinite;
              /* fadeOut 1s linear forwards 7s; */
}
/* Normaly dont show small  */
#headerSmall{
  display: none;
}

@keyframes goleftThenBack {
  0%{right: 10px;}
  10%{right: 250px;}
  20%{right: 250px;}
  30%{right: 10px;}
}
@keyframes gorightThenBack {
  0%{left: 10px;}
  10%{left: 250px;}
  20%{left: 250px;}
  30% {left:10px;}
}



@-webkit-keyframes fadeIn {
  0% {opacity: 0;}
  10%{opacity: 1;}
 30% {opacity: 0;}
 100%{opacity: 0;}
}
@keyframes fadeIn {
  0% {opacity: 0;}
  10%{opacity: 1;}
 30% {opacity: 0;}
 100%{opacity: 0;}
}


@media only screen and (max-width: 600px) {
  #headerBig{
    display: none;
  }
  #headerSmall{
    display: block;
  }
  /* @keyframes goleftThenBack {
    0%{right: 7px;}
    10%{right: 150px;}
    20%{right: 150px;}
    30%{right: 7px;}
  }
  @keyframes gorightThenBack {
    0%{left: 7px;}
    10%{left: 150px;}
    20%{left: 150px;}
    30%{left: 7px;}
  } */
}

</style>