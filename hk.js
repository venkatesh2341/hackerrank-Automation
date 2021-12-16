
const puppeteer= require("puppeteer");
const codesObj=  require("./codes.js");
let page       ;
let userName= "kartik630569@gmail.com";
let password = "kartik@2341";
let browserPromise= puppeteer.launch(
    {
        headless : false,
        defaultViewport : null,
        args: ["--start-maximized"]
    }
);

browserPromise.then( function(browserObj){
            
    let newPagePromise = browserObj.newPage();
    return newPagePromise; 
}).then(function(newPage){
    page = newPage;
    let hackerrankPromise = newPage.goto("https://www.hackerrank.com/auth/login");
    return hackerrankPromise;
}).then ( function(){
    return page.waitForSelector("#input-1", { visible: true});
}).then( function(){
    return page.type("#input-1", userName , { delay: 10}); 
}).then ( function(){
    return page.waitForSelector( "#input-2", { visibel: true});
}).then (function( ){
    return page.type( "#input-2", password, { delay : 10});
}).then ( function(){
    return page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
}).then( function(){
    return waitAndClick('.topic-card a[data-attr1="algorithms"]', page);
}).then ( function(){
    return waitAndClick('input[value="warmup"]', page);
}).then(function(){
    let wait3SecPromise = page.waitFor(3000);
    return wait3SecPromise;
}).then(function(){
    let getAllQstnsPromise= page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return getAllQstnsPromise;
}).then(function(qustnsArr){
    // console.log(qustnsArr.length);
   
    let solvePromise =  questionSolver(qustnsArr[0], codesObj.codes[0]);
    return solvePromise;
    
})

function questionSolver(question, answer){

    return new Promise ( function(resolve, reject){

        let clickQuestionPromise= question.click();
        clickQuestionPromise.then(function(){
            let getToEditorPromise = waitAndClick('.lines-content.monaco-editor-background', page);
            return getToEditorPromise;
        }).then( function(){
            let getToCustomTestCasePromise = waitAndClick('.checkbox-input', page);
            return getToCustomTestCasePromise;
        }).then(function(){
            return page.waitFor(2000);
        })
        .then( function(){
            let writeCodePromise = page.type('.checkbox-input', answer);
            return writeCodePromise;
        }).then(function(){
            let downControlPromise= page.keyboard.down("Control");
            return downControlPromise;
        }).then(function(){
            let pressAPromise = page.keyboard.press("A");
            return pressAPromise;
        }).then( function(){
            let pressXPromise = page.keyboard.press("X", { delay: 1000});
            return pressXPromise
        }).then( function(){
            let upControlPromise= page.keyboard.up("Control");
            return upControlPromise;
        }).then(function(){
            let getToEditorPromise = waitAndClick('.lines-content.monaco-editor-background', page);
            return getToEditorPromise;
        }).then(function(){
            let downControlPromise= page.keyboard.down("Control");
            return downControlPromise;
        }).then(function(){
            let pressAPromise = page.keyboard.press("A");
            return pressAPromise;
        }).then( function(){
            let pressVPromise = page.keyboard.press("V", { delay: 1000});
            return pressVPromise
        }).then( function(){
            let upControlPromise= page.keyboard.up("Control");
            return upControlPromise;
        }).then( function(){
            let clickSubmitpromise = waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', page, { delay: 3000});
            return clickSubmitpromise;
        })
    }).then(function(){
        resolve();
    }).catch(function(err){
        reject();
    })  
}

function waitAndClick(selector, cpage)
{
    return new Promise( function(resolve, reject){

        let waitPromise = cpage.waitForSelector(selector);
        waitPromise.then( function()
        {
            return cpage.click (selector);
        }).then( function(){
            resolve();
            }).catch(function(err)
            {
                reject();
            })
    });
}


