
const puppeteer= require("puppeteer");
const codesObj=  require("./codes.js");
let page       ;
let hackerrankLink = "https://www.hackerrank.com/auth/login";
let userName= "kartik630569@gmail.com";
let password = "kartik@2341";

(async function(){
    try
    {
        let browserInstance= await puppeteer.launch(
           {
            headless :  false, 
            defaultViewport : null,
            args : ["--start-maximized"]
           }
        )
            
        let newTab= await browserInstance.newPage();
        await newTab.goto("https://www.hackerrank.com/auth/login");
        await newTab.type("#input-1", userName , { delay: 10})
        await newTab.type( "#input-2", password, { delay : 10});
        await newTab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
        await waitAndClick('.topic-card a[data-attr1="algorithms"]', newTab);
        await waitAndClick('input[value="warmup"]', newTab);

        let questions = await newTab.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
        // console.log(questions.length);
        await solveQuestion(questions[0],codesObj.codes[0], newTab);
    }
    catch (error)
    {
        console.log(error)
    }
})()

async function waitAndClick(selector, cpage)
{
    await cpage.waitForSelector(selector);
    let selectorClicked = await cpage.click(selector);
    return selectorClicked;
}

async function solveQuestion( question, answer, cpage)
{
    try
    {
        await question.click();
        await waitAndClick('.checkbox-input', cpage)
        await cpage.waitFor(2000);
        await cpage.type('.checkbox-input', answer);
        await cpage.keyboard.down("Control");
        await cpage.keyboard.press("A");
        await cpage.keyboard.press("X");
        await waitAndClick('.lines-content.monaco-editor-background', cpage);
        await cpage.keyboard.press("A");
        await cpage.keyboard.press("V");   
        await cpage.keyboard.up("Control");
        await waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled', cpage, { delay: 3000});
    }
    catch(error)
    {
         console.log(error);
    }




}

