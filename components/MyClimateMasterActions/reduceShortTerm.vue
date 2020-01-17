<template>
    <div>
        <div class="border border-dark rounded container">
            <div class="header-for-action row" style="width:100%;" data-toggle="collapse" data-target="#id_div_reduceShortTerm">
                <div class="col-1">
                    <font-awesome-icon icon="thumbs-up" class="mt-1" style="font-size:30px;"/>     
                </div>
                <div class="col-10">
                    <h4>Treibhausgase einfach und effizient vermeiden</h4>
                </div>
            </div>
            <div class="collapse container" id="id_div_reduceShortTerm">
                <p>Unter Climadvices findest du besonders effiziente Möglichkeiten deinen persönlichen Ausstoß
                von Treibhausgasen zu reduzieren. Überlege welche Maßnahmen du jetzt umsetzen kannst und
                 willst, bevor du weiter machst.
                </p>
                
                <nuxt-link to="climadvices" class="btn btn-success mb-2">Climadvices</nuxt-link>
                <button class="btn btn-success mb-2">
                    Schritt abschließen
                    <font-awesome-icon icon="check-circle" style="font-size:20x;"/> 
                </button>
              
            </div>

        </div>
    </div>
</template>