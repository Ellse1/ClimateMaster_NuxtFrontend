<template>
    <!-- Überschriften -->
    <div class="text-center">
        <h1 id="ueberschriftGross" class="display-3" style="margin-top:200px;">
          <b>         
            <span class="master">Master</span>
            <span class="text-success climate">Climate</span>
          </b>
        </h1>
        <h1 id="ueberschriftKlein" class="display-5" style="margin-top:200px;">
          <b>         
            <span class="master">Master</span>
            <span class="text-success climate">Climate</span>
          </b>
        </h1>
        <h1 class="display-3">
            <span class="now">now!</span>
        </h1>
        <h2 class="mb-4 text-center">
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
/* Normaly dont show small  */
#ueberschriftKlein{
  display: none;
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


@media only screen and (max-width: 600px) {
  #ueberschriftGross{
    display: none;
  }
  #ueberschriftKlein{
    display: block;
  }
  @keyframes goleft {
  100% {
    right: 140px;
  }
}
@keyframes goright {
  100% {
    left: 140px;
  }
}
}

</style>