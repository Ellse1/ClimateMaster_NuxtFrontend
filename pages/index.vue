<template>
    <div>
      <div class="container text-center">


          <client-only>
              <div v-if="loggedIn == false">
                  <!-- Wir sind noch im Aufbau, unter "Wir" kannst du mehr über uns erfahren:<br>
                  <nuxt-link id="id_button_link" class="btn btn-default mt-3 pl-5 pr-5" to="/we"><span>Wir</span></nuxt-link> -->

                  <div class="rounded p-3" style="background-color:rgba(247, 247, 247, 0.5)">
                      <h2>Werde <span class="text-success">Climate</span>Master 2020</h2>
                  </div>
              </div>

              <!-- After login: last_login is already set to "now"!  So i take "last_logout". As long as the user didn't logout the first time, he will see this message -->
              <div v-if="loggedIn == true && user.last_logout == null">
                  <span style="font-size:20px;">
                    Unter <b>Mein Profil</b> findest du alles über dein ClimateMaster konto heraus.<br>
                    Mit unseren <b>Climadvice</b> wollen wir dir dabei helfen, klimafreundlich zu leben. <br>
                    <b>Mein Klimaschutz</b> hilft dir, noch 2020 umweltfreundlich klimaneutral zu werden. <br>
                    <b>Viel Spaß!</b>
                  </span>
              </div>

        

              <div class="row mt-5">
                  <!-- If not logged in  -->
                  <div class="col-md-4 mb-3" v-if="loggedIn === false">
                      <div class="border border-success rounded pt-4 pb-4" style="background-color:rgba(247, 247, 247, 0.3)">
                          <h4>Registieren und loslegen</h4>
                          <p>Registriere dich jetzt und werde 2020 umweltfreundlich klimaneutral.</p>
                          <div class="row mb-3">
                              <div class="col-6">
                                  <nuxt-link to="/account/register" class="btn btn-success" style="width:80%;border-radius:20px;">Registrieren</nuxt-link>
                              </div>
                              <div class="col-6">
                                  <nuxt-link to="/account/login" class="btn btn-success" style="width:80%;border-radius:20px;">Einloggen</nuxt-link>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- if logged in  -->
                  <div class="col-md-4 mb-3" v-if="loggedIn === true">
                      <div class="border border-success rounded pt-4 pb-4" style="background-color:rgba(247, 247, 247, 0.3)">
                          <h4>Mein ClimateMaster</h4>
                          <p>Dein Fortschritt verbessert die Zukunft folgender Generationen.</p>
                          <nuxt-link to="/myClimateMaster" class="btn btn-success mb-3" style="width:80%;border-radius:20px;">Mein Klimaschutz</nuxt-link> 
                      </div>
                  </div>

                  <div class="col-md-4 mb-3">
                    <div class="border border-success rounded pt-4 pb-4" style="background-color:rgba(247, 247, 247, 0.3)">
                        <h4>Climadvices</h4>
                        <p>Finde hier die effizientesten Möglichkeiten, umwelt- und klimafreundlich zu leben.</p>
                        <nuxt-link to="/climadvices" class="btn btn-success mb-3" style="width:80%;border-radius:20px;">Climadvices</nuxt-link>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="border border-success rounded pt-4 pb-4" style="background-color:rgba(247, 247, 247, 0.3)">
                        <h4>Wir</h4>
                        <p>Finde heraus, wer wir sind, was uns antreibt und werde Teil des ClimateMaster Teams</p>
                          <div class="row mb-3">
                              <div class="col-6">
                                  <nuxt-link to="/we" class="btn btn-success" style="width:80%;border-radius:20px;">Wir</nuxt-link>
                              </div>
                              <div class="col-6">
                                  <nuxt-link to="/blog" class="btn btn-success" style="width:80%;border-radius:20px;">Blog</nuxt-link>
                              </div>
                          </div>                
                    </div>
                  </div>
              </div>


        </client-only>
      </div>

      <!-- Link zum Impressum -->
      <div class="text-center fixed-bottom w-100" style="background-color:rgba(247, 247, 247, 0.3)">
          <small> <nuxt-link to="/we" class="">Über uns</nuxt-link></small> |
          <small> <nuxt-link to="/we" class="">Impressum</nuxt-link></small> |
          <small> <nuxt-link to="/privacyStatement" class="">Datenschutzerklärung</nuxt-link></small>
      </div>
      
    </div>
</template>

 <script>
 import fontawesome from '@fortawesome/free-solid-svg-icons';
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

