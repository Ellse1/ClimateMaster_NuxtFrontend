<template>
    <div>
        <div class="border border-dark rounded container">
            <div class="header-for-action row" style="width:100%;" data-toggle="collapse" data-target="#id_div_reduceLongTerm">
               <div class="col-1">
                    <font-awesome-icon icon="globe" class="mt-1" style="font-size:30px;"/>                         
               </div>
               <div class="col-10">
                    <h4>Langfristige Maßnahmen einleiten</h4>
               </div>
            </div>
            <div class="collapse" id="id_div_reduceLongTerm">
                <p>
                    Es ist wirklich sehr bemerkenswert, wie du dich für konsequenten Klimaschutz einsetzt.
                    Unter "Climadvices" findest du noch einmal die effizientesten Möglichkeiten, Umweltfreundlich
                    zu leben. Kannst in diesem Jahr vielleicht eine Sache realisieren?
                </p>

                <nuxt-link to="climadvices" class="btn btn-success mb-2">Climadvices</nuxt-link>

            </div>
        </div>
    </div>
</template>