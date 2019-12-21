<template>
    <div class="container">
        <div class="row mt-3">

            <div class="col">
                <div class="container border border-success rounded text-center" style="max-width:400px;margin:auto;margin-top:100px;">
                    <h4>Email Verifizierung</h4>
                    <p>Wir haben Ihnen eine E-Mail an Ihre angegebene E-Mail Adresse versendet. 
                        Bitte Schauen Sie in Ihren E-Mails nach Ihrem persönlichen Aktivierungscode
                    </p>

                    <form>
                    
                        <input type="email" class="form-control text-center" placeholder="E-Mail" disabled/>
                        
                        <input type="text" class="form-control text-center mt-3" placeholder="Code" required/>

                        <button class="btn btn-success mt-3 mb-3" >CliamteMaster Konto aktivieren</button>
                    </form>

                </div>
            </div>
        </div>
    </div>
</template>