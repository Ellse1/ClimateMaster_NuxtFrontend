<template>
    <div>
        <div class="border border-dark rounded container">
            <div class="w-100 row">
                <div class="col-1">
                    <font-awesome-icon icon="calculator" class="mt-1" style="font-size:50px;"/>     
                </div>
                <div class="col-10">
                    <div class="number-class mx-auto mt-1">
                        3
                    </div>
                </div>
            </div>
            <h4>Berechnung anpassen</h4>
            <div class="container">
                <p>
                    Bevor du im nächsten Schritt <span class="text-success">Climate</span>Master wirst, hast du hier noch einmal die
                    Möglichkeit, deine CO2 Berechnung an die Realität anzupassen. Ist dir schon ein Fortschritt bei persönlichem
                    Klimaschutz gelungen?
                </p>

                <form @submit.prevent="">
                    <input class="form-control" placeholder="https://uba.co2-rechner.de/de_DE/?bookmark=kAi4dpLEzOyBIYNl (Link der angepassten Berechnung)" required>
                    <button type="submit" class="btn btn-success mt-2 mb-2">
                        Link speichern und Schritt abschließen
                        <font-awesome-icon icon="check-circle" style="font-size:20x;"/> 
                    </button>
                </form>

                <button class="btn btn-success mt-2 mb-2">
                    Ohne Anpassung weiter
                    <font-awesome-icon icon="check-circle" style="font-size:20x;"/> 
                </button>
            </div>
        </div>
    </div>
</template>