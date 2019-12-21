<template>
    <div>
      <div class="container text-center">
        <h4>Schön, dass du Interesse an konkretem, umweltfreundlichem Klimaschutz hast!</h4>
        Wir sind noch im Aufbau, unter "Wir" kannst du mehr über uns erfahren:<br>
        <nuxt-link id="id_button_link" class="btn btn-default mt-3 pl-5 pr-5 mb-5" to="/we"><span>Wir</span></nuxt-link>
      </div>
    </div>
</template>

 <script>
export default {
  layout: 'indexLayout',
}
 </script>

<style>

#id_button_link{
  font-size: 26px;
  border-color: black;
  border-width: 2px;
}
#id_button_link:hover{
  border-color:#28a745;
}
#id_button_link span{
  display: inline-block;
  position: relative;
  transition:0.5s;
}

#id_button_link span::after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
  color: #28a745;
}
#id_button_link:hover span {
  padding-right: 25px;
}

#id_button_link:hover span:after {
  opacity: 1;
  right: 0;
}


</style>

