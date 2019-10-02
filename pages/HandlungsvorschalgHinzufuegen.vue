<template>
    <div class="container">
        <h2 class="mt-5 mb-5">Eine Handlungsmöglichkeit hinzufügen:</h2>
        <form>
            <div class="form-group mt-3">
                <label for="titel" class="">Titel</label>
                <input type="text" class="form-control col-md-6" id="titel" name="titel" placeholder="Titel"/>
            </div>
            <div class="form-group mt-3">
                <label for="kurzbeschreibung" class="">Kurzbeschreibung</label>
                <input type="text" class="form-control" id="kurzbeschreibung" name="kurzbeschreibung" placeholder="Kurzbeschreibung"/>
            </div>
            <div class="form-group mt-3">
                <label for="detailbeschreibung" class="">Detailbeschreibung (Langer text der bei Klick angezeigt wird)</label>
                <input type="text" class="form-control" id="detailbeschreibung" name="detailbeschreibung" placeholder="Detailbeschreibung"/>
            </div>
            <div class="form-group mt-3">
                <label for="vorschlagIcon" class="">Vorschlag Icon, welches bei diesem Vorschlag angezeigt wird</label>
                <input type="file" class="form-control col-md-6" id="vorschlagIcon" name="vorschlagIcon"/>
            </div>
            <input type="submit" class="btn btn-default border" value="speichern und anzeigen"/>
        </form>
    </div>
</template>