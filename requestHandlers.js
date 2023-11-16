function wordQuery(searchString, response) {

//    var addon = require('bindings')('zal-web.node');
//    const addon = require("/home/konstantin/Zal-Web-New/build/Debug/zal-web.node")

///    var obj = new addon.ZalWeb();
//    var sDbPath = "/home/konstantin/Zal-Web/data/ZalData_Master_Full.db3";
//    obj.setDbPath(sDbPath);

    obj.clear();


    var lexeme = {
        lexemeId : '',
        sourceForm : '',
        homonyms : [],
        contexts : [],
        spryazhSm : false,
        mainSymbol : '',
        inflectionSymbol : '',
        comment : '',
        headwordComment : '',
        isPluralOf : false,
        pluralOf : '',
        usage : '',
        seeRef : '',
        trailingComment : '',
        restrictedContexts : '',
        section : -1,
        fleetingVowel : false,
        hasYoAlternation : false,
        noComparative : false,
        assumedForms : false,
        hasIrregularForms : false,
        hasIrregularVariants : false,
        noLongForms : false,
        difficultForms : false,
        secondPart : false,
        inflections: []
    };

    var inflection = {
        inflectionId : '',
        inflectionType : -1,
        accentType1 : '',
        accentType2 : '',
        shorFormsRestricted : false,
        shorFormsIncomplete : false,
        commonDeviations : [],
        aspectPair : '',
        altAspectPair : '',
        stemAugment : -1,
        hasFleetingVowel : false,
        pastParticipleRestricted : false,
        noPastParticiple : false
    };

    response.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });

    try {
        var bLexemeFound = obj.getLexemesByInitialForm(searchString);
        if (!bLexemeFound) {
            console.log("Lexeme %s not found.", searchString);
            response.write("Lexeme not found");
            response.end();
            return;
        }
    }
    catch (exc) {
        console.log("NodeJS exception: %s", exc.message);
    }

    do {
        var bLexemeLoaded = obj.loadFirstLexeme();
        if (!bLexemeLoaded) {
            console.log("loadFirstLexeme() failed");
            response.write("Internal error");
            response.end();
            return;
        }

        lexeme.lexemeId = obj.getLexemeProperty("lexemeId");
        lexeme.sourceForm = obj.getLexemeProperty("sourceForm");
        lexeme.homonyms = obj.getLexemeProperty("homonyms");
        lexeme.contexts = obj.getLexemeProperty("contexts");
        lexeme.spryazhSm = obj.getLexemeProperty("spryazhSm");
        lexeme.mainSymbol = obj.getLexemeProperty("mainSymbol");
        lexeme.inflectionSymbol = obj.getLexemeProperty("inflectionSymbol");
        lexeme.comment = obj.getLexemeProperty("comment");
        lexeme.headwordComment = obj.getLexemeProperty("headwordComment");
        lexeme.isPluralOf = obj.getLexemeProperty("isPluralOf");
        lexeme.pluralOf = obj.getLexemeProperty("pluralOf");
        lexeme.usage = obj.getLexemeProperty("usage");
        lexeme.seeRef = obj.getLexemeProperty("seeRef");
        lexeme.trailingComment = obj.getLexemeProperty("trailingComment");
        lexeme.restrictedContexts = obj.getLexemeProperty("restrictedContexts");
        lexeme.section = obj.getLexemeProperty("section");
        lexeme.hasYoAlternation = obj.getLexemeProperty("hasYoAlternation");
        lexeme.noComparative = obj.getLexemeProperty("noComparative");
        lexeme.assumedForms = obj.getLexemeProperty("assumedForms");
        lexeme.hasIrregularForms = obj.getLexemeProperty("hasIrregularForms");
        lexeme.hasIrregularVariants = obj.getLexemeProperty("hasIrregularVariants");
        lexeme.noLongForms = obj.getLexemeProperty("noLongForms");
        lexeme.difficultForms = obj.getLexemeProperty("difficultForms");
        lexeme.secondPart = obj.getLexemeProperty("secondPart");
        
        var bInflectionLoaded = obj.loadFirstInflection();
        if (!bInflectionLoaded) {
            console.log("loadFirstInflection() failed");
            response.write("Internal error");
            response.end();
            return;
        }

        inflection.inflectionId = obj.getInflectionProperty("inflectionId");
        inflection.inflectionType = obj.getInflectionProperty("inflectionType");
        inflection.accentType1 = obj.getInflectionProperty("accentType1");
        inflection.accentType2 = obj.getInflectionProperty("accentType2");
        inflection.aspectPair = obj.getInflectionProperty("aspectPair");
        inflection.altAspectPair = obj.getInflectionProperty("altAspectPair");
        inflection.stemAugment = obj.getInflectionProperty("stemAugment");
        inflection.commonDeviations = obj.getInflectionProperty("commonDeviations");
        inflection.hasFleetingVowel = obj.getInflectionProperty("hasFleetingVowel");
        inflection.shortFormsRestricted = obj.getInflectionProperty("shortFormsRestricted");
        inflection.shortFormsIncomplete = obj.getInflectionProperty("shortFormsIncomplete");
        inflection.pastParticipleRestricted = obj.getInflectionProperty("pastParticipleRestricted");
        inflection.noPassivePastParticiple = obj.getInflectionProperty("noPassivePastParticiple");

        lexeme.inflections.push(inflection);

        var json = JSON.stringify(lexeme);
        console.log(JSON.parse(json));
        response.write(json);

        import ("uuid");
    
    } while (obj.loadNextLexeme());
   
    response.end();

}   // wordQuery()

function paradigmQuery(inflectionId, response) {

    var wordForm = {
        wordForm : '',
        stem : '',
        ending : '',
        partOfSpeech : '',
        case : '',
        subParadigm : '',
        number : '',
        gender : '',
        person : '',
        animacy : '',
        reflexivity : '',
        aspect : '',
        status : '',
        isIrregular : false,
        isVariant : false,
        isDifficult : false,
        leadComent : '',
        trailingComment : ''
    };

    var paradigm = {
        wordForms : []
    };

    response.writeHead(200, { "Content-Type": "text/json; charset=utf-8" });

    try {
        var bGenerated = obj.generateParadigm(inflectionId);
        if (!bGenerated) {
            console.log("Failed to generate paradigm for inflection ID %s.", inflectionId);
            response.write("Failed to generate paradigm.");
            response.end();
            return;
        }

        var bWordFormLoaded = obj.loadFirstWordForm();
        if (!bWordFormLoaded) {
            console.log("loadFirstWordForm() failed.");
            response.write("Internal error.");
            response.end();
            return;
        }

        do {
            wordForm.wordForm = obj.getWordFormProperty("wordForm");
            wordForm.stem = obj.getWordFormProperty("stem");
            wordForm.ending = obj.getWordFormProperty("ending");
            wordForm.partOfSpeech = obj.getWordFormProperty("partOfSpeech");
            wordForm.case = obj.getWordFormProperty("case");
            wordForm.subParadigm = obj.getWordFormProperty("subParadigm");
            wordForm.number = obj.getWordFormProperty("number");
            wordForm.gender = obj.getWordFormProperty("gender");
            wordForm.person = obj.getWordFormProperty("person");
            wordForm.animacy = obj.getWordFormProperty("animacy");
            wordForm.reflexivity = obj.getWordFormProperty("reflexivity");
            wordForm.aspect = obj.getWordFormProperty("aspect");
            wordForm.status = obj.getWordFormProperty("status");
            wordForm.isIrregular = obj.getWordFormProperty("isIrregular");
            wordForm.isVariant = obj.getWordFormProperty("isVariant");
            wordForm.isDifficult = obj.getWordFormProperty("isDifficult");
            wordForm.leadComent = obj.getWordFormProperty("leadComment");
            wordForm.trailingComment = obj.getWordFormProperty("trailingComment");

            paradigm.wordForms.push(JSON.parse(JSON.stringify(wordForm)));
            
        } while (obj.loadNextWordForm());

        var json = JSON.stringify(paradigm);
        console.log(JSON.parse(json));
        response.write(json);               
        response.end();
    }
    catch (exc) {
        console.log("NodeJS exception: %s", exc.message);
    }
}   // paradigmQuery()

function wordParse(response) {
    console.log("Request handler 'wordParse' was called.");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("============================== wordParse");
    response.end();
}

var addon = require('bindings')('zal-web.node');
var obj = new addon.ZalWeb();
var sDbPath = "/home/konstantin/Zal-Web/data/ZalData_Master_Full.db3";
obj.setDbPath(sDbPath);

exports.wordQuery = wordQuery;
exports.paradigmQuery = paradigmQuery;
//exports.wordParse = wordParse;
