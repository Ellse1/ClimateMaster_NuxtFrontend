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
                  <div class="row">
                    <div class="col">
                      <h4>Berechnen</h4>
                    </div>
                    <div class="col">
                      <h4>Reduzieren</h4>
                    </div>
                    <div class="col">
                      <h4>Kompensieren</h4>
                    </div>
                    <div class="col">
                      <h4>Präsentieren</h4>
                    </div>
                  </div>
              </div>

              <!-- Message, where find what -->
              <div v-if="loggedIn == true" class="rounded" style="background-color:rgba(247, 247, 247, 0.5);">
                  <span style="font-size:20px;">
                    Unter <b>Mein Profil</b> findest du alles über dein ClimateMaster Konto heraus.<br>
                    Mit unseren <b>Climadvice</b> wollen wir dir dabei helfen, klimafreundlich zu leben. <br>
                    <b>Mein Klimaschutz</b> hilft dir, noch 2020 umweltfreundlich klimaneutral zu werden. <br>
                    <b>Viel Spaß!</b>
                  </span>
              </div>

        

              <div class="row mt-5">
                  <!-- If not logged in  -->
                  <div class="col-md-4 mb-3" v-if="loggedIn === false">
                      <div class="border border-success rounded pt-4 pb-4" style="background-color:rgba(247, 247, 247, 0.3)">
                          <h4>Klimaneutral werden</h4>
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
                          <h4>Klimaneutral werden</h4>
                          <p>Dein Fortschritt verbessert die Zukunft folgender Generationen.</p>
                          <nuxt-link to="/myClimateMaster" class="btn btn-success mb-3" style="width:80%;border-radius:20px;">Mein Klimaschutz</nuxt-link> 
                      </div>
                  </div>

                  <!-- Link to climadvices and company info -->
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
                                  <nuxt-link to="/platform" class="btn btn-success" style="width:80%;border-radius:20px;">Die Plattform</nuxt-link>
                              </div>
                          </div>                
                    </div>
                  </div>
              </div>


        </client-only>


        <!-- Links to the social media platforms -->
        <div class="mx-auto mb-5 col-md-6 text-center mt-4 rounded border border-success p-2" style="background-color:rgba(247, 247, 247, 0.3)">
            <h4>Online</h4>
            <div class="row">
                <div class="col text-center">
                  <a target="_blanc" href="https://www.facebook.com/ClimateMaster-107052057423304">
                    <img src="~/static/pictures/generalPictures/facebookLogo.png" alt="Bild leider nicht gefunden" width="30px;" >
                    <h5 class="text-dark">ClimateMaster</h5>
                  </a>
                </div>
                <div class="col text-center">
                  <a target="_blanc" href="https://www.instagram.com/climatemasterandfriends">
                    <img src="~/static/pictures/generalPictures/instagramLogo.png" alt="Bild leider nicht gefunden" width="30px;" >             
                    <h5 class="text-dark">climatemasterandfriends</h5>
                  </a>
                </div>
            </div>

        </div>



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

