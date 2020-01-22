<template>
    <div>
        <div class="border border-dark rounded container">
            <div class="w-100 row">
                <div class="col-1">
                    <font-awesome-icon icon="calculator" class="mt-1" style="font-size:50px;"/>     
                </div>
                <div class="col-10">
                    <div class="number-class mx-auto mt-1">
                        1
                    </div>
                </div>
            </div>
            <div class="text-center">
                <h4>CO2 Ausstoß berechnen</h4>
            </div>
            <div>
                <p> 
                    Klimaktiv gibt uns mit dem CO2 Rechner die Möglichkeit, deinen individuellen CO2 Ausstoß zu berechnen.
                    Mit dieser Berechnung ist es uns möglich, dir individuell effiziente Möglichkeiten für 
                    persönlichen Klimaschutz zu nennen. <b>Viel Spaß beim Berechnen!</b>
                </p>
                <a href="https://uba.co2-rechner.de/de_DE/" class="btn btn-default border">CO2 Berechnen <b>&rsaquo;&rsaquo;</b></a>
                <div>
                    <label class="mt-2">Link der Berechnung einfügen</label>

                    <form @submit.prevent="">
                        
                        <input class="form-control " placeholder="https://uba.co2-rechner.de/de_DE/?bookmark=kAi4dpLEzOyBIYNl (So ähnlich sieht dein Link aus)" required/>
                
                        <button type="submit" class="btn btn-success mt-2 mb-3">
                            Link speichern und Schritt abschließen
                            <font-awesome-icon icon="check-circle" style="font-size:20x;"/>     
                        </button>
                        
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>