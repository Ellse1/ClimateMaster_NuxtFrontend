<template>
    <div>
        <div class="border border-dark rounded container">
            <div class="w-100 row">
                <div class="col-1">
                    <font-awesome-icon icon="user-friends" class="mt-1" style="font-size:50px;"/>                         
                </div>
                <div class="col-10">
                    <div class="number-class mx-auto mt-1">
                        5
                    </div>
                </div>
            </div>
            <h4>Fortschritt präsentieren und Mittmenschen zu nachhaltigem Handeln bewegen</h4>
            <div class="container">
                <p>
                    Vielen Dank für deinen großen Einsatz für Klima- und Umweltschutz! Damit auch andere Personen 
                    erfahren, wie privater Klimaschutz konsequent umgesetzt werden kann, könntest du deinen Fortschritt bei persönlichem Klimaschutz
                    präsentieren. Erstelle hier ein ClimateMaster Bild und Teile es über Email, Facebook, Whatsapp oder Postkarten. 
                    <br><b>Instagram:</b> Wenn du ein ClimateMaster Bild auf Instagram hochlädst und uns über "Mein Profil" deinen Instagram Namen verrätst, 
                    folgen wir dir mit unserem offiziellen Account (climatemasterandfriends). So können sich Climatemaster noch besser vernetzen.
                    
                </p>

                <imagecreator />                

            </div>
        </div>
    </div>
</template>
<script>
import imagecreator from '~/components/MyClimateMasterActions/Resources/imagecreator';
export default {
    components:{
        imagecreator
    }
}
</script>