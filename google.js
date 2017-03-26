/*
* Carry out a Google Search
*/

"use strict";

var webdriver = require('selenium-webdriver'),
 	By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

var url = 'https://www.google.com/webmasters/tools/crawl-errors?hl=en&siteUrl=http://xxxx.com/#t2=1';
function logTitle() {
	browser.getTitle().then(function(title) {
		console.log('Current Page Title: ' + title);
	});
}

function clickLink(link) {
	link.click();
}

function handleFailure(err) {
	console.error('Something went wrong\n', err.stack, '\n');
	closeBrowser();
}

function findTutsPlusLink() {
	return browser.findElements(webdriver.By.css('[href="http://code.tutsplus.com/"]')).then(function(result) {
		return result[0];
	});
}

function closeBrowser() {
	browser.quit();
}

browser.manage().window().setPosition(0,0);
browser.manage().window().setSize(1600,1200);

browser.get(url);
browser.manage().timeouts().implicitlyWait(60);
browser.findElement(By.name('Email')).sendKeys('xxx@xxx.com');
var b = browser.findElement(By.name('signIn'));

b.click().then(function(){
	browser.wait(function () {
	    return browser.isElementPresent(By.name('Passwd'));
	}, 1000);

	browser.findElement(By.name('Passwd')).sendKeys('xxxxxxx');
	browser.manage().timeouts().implicitlyWait(1000);
	browser.findElement(By.name('signIn')).submit();
	browser.manage().timeouts().implicitlyWait(2000);
	browser.findElement(By.xpath('//td[contains(.,"Not found")]'))
	.then(function(nf_tab){
	  nf_tab.click();
	  browser.manage().timeouts().implicitlyWait(2000);
	  browser.findElement(By.xpath("//input[@placeholder='Filter']")).sendKeys('%');
	});
});