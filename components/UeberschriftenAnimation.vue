<template>
    <!-- Überschriften -->
    <div class="text-center">
        <h1 class="display-3" style="margin-top:200px;">
          <b>         
            <span class="master">Master</span>
            <span class="text-success climate">Climate</span>
          </b>
        </h1>
        <h1 class="display-3">
            <span class="now">now!</span>
        </h1>
        <h2 class="mb-4">
          Für Klimaschutz gegen Klimaerwärmung
        </h2>
    </div>

</template>
<style scoped>

.climate{
  position: relative;
  right: 0px; 
  animation: goleft 1s ease forwards 2s;
}
.master{
  position: relative;
  left: 0px;
  animation: goright 1s ease forwards 2s;
}
.now{
  position: relative;
  color:black;
  -webkit-animation: fadeOut 2s linear forwards 1s;
  animation: fadeOut 2s linear forwards 1s;
}


@keyframes goleft {
  100% {
    right: 240px;
  }
}
@keyframes goright {
  100% {
    left: 240px;
  }
}


@-webkit-keyframes fadeOut {
  100% {opacity: 0;}
}
@keyframes fadeOut {
   100% {opacity: 0;}

}


</style>