const puppeteer = require('puppeteer');

jest.setTimeout(30000);

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('http://localhost:3000');
});

test('main title is present', async () => {
  const mainTitleElement = '.root > h1';
  const mainTitleText = await page.$eval(mainTitleElement, e => e.innerHTML);
  await page.waitForSelector(mainTitleElement);
  expect(mainTitleText).toBe('ITA Search Widgets');
})

describe('consolidated screening list', () => {
  test('shows the title', async () => {
    const titleElement = '#consolidated_screening_list > form > h3';
    const titleText = await page.$eval(titleElement, e => e.innerHTML);
    await page.waitForSelector(titleElement);
    expect(titleText).toBe('Search the Consolidated Screening List');
  });

  test('searching returns results', async () => {
    const inputField = "#consolidated_screening_list > form > input[type='text']";
    const searchButton = "#consolidated_screening_list > form > button";
    const resultsHeader = "#consolidated_screening_list > div.resultsList > p"; // this element will be present if successful, even if it's zero results
    await page.waitForSelector(inputField);
    await page.type(inputField, "Smith");
    await page.click(searchButton);
    await page.waitForSelector(resultsHeader, 20000);
    await page.click('#clearButton');
  });
});

describe('trade leads', () => {
  test('shows title and a dropdown menu', async ()=> {
    const titleElement = "#trade_leads > form > h3";
    const dropdownMenu = "#trade_leads > form > div.Dropdown";
    await page.waitForSelector(dropdownMenu);
    const titleText = await page.$eval(titleElement, e => e.innerHTML);
    expect(titleText).toBe('Search Trade Leads');
  });

  test('searching with a text query returns results', async () => {
    const inputField = "#trade_leads > form > input[type='text']";
    const searchButton = "#trade_leads > form > button";
    const resultsHeader = "#trade_leads > div.resultsList > p";
    await page.waitForSelector(inputField);
    await page.type(inputField, "computer");
    await page.click(searchButton);
    await page.waitForSelector(resultsHeader, 20000);
    await page.click('#clearButton');
  });
});

describe('trade events', () => {
  test('shows title and a dropdown menu', async ()=> {
    const titleElement = "#trade_events > form > h3";
    const dropdownMenu = "#trade_events > form > div.Dropdown";
    const titleText = await page.$eval(titleElement, e => e.innerHTML);    
    await page.waitForSelector(dropdownMenu);
    expect(titleText).toBe('Search Trade Events');
  });

  test('searching with a text query returns results', async () => {
    const inputField = "#trade_events > form > input[type='text']";
    const searchButton = "#trade_events > form > button";
    const resultsHeader = "#trade_events > div.resultsList > p";
    await page.waitForSelector(inputField);
    await page.type(inputField, "computer");
    await page.click(searchButton);
    await page.waitForSelector(resultsHeader, 20000);
    await page.click('#clearButton');
  });
});

describe('export assistance centers', () => {
  test('shows title', async ()=> {
    const titleElement = "#export_assistance_centers > form > h3";
    const titleText = await page.$eval(titleElement, e => e.innerHTML);    
    expect(titleText).toBe('Search Export Assistance Centers');
  });

  test('searching with a zipcode returns results', async () => {
    const inputField = "#export_assistance_centers > form > input[type='text']";
    const searchButton = "#export_assistance_centers > form > button";
    const resultsHeader = "#export_assistance_centers > div.resultsList > p";
    await page.waitForSelector(inputField);
    await page.type(inputField, "99950");
    await page.click(searchButton);
    await page.waitForSelector(resultsHeader, 20000);
    await page.click('#clearButton');
  });
});

describe('international office locations', () => {
  test('shows title and a dropdown menu', async ()=> {
    const titleElement = "#international_office_locations > form > h3";
    const dropdownMenu = "#international_office_locations > form > div.Dropdown";
    const titleText = await page.$eval(titleElement, e => e.innerHTML);    
    await page.waitForSelector(dropdownMenu);
    expect(titleText).toBe('Search International Office Locations');
  });

  test('searching with a text query returns results', async () => {
    const inputField = "#international_office_locations > form > input[type='text']";
    const searchButton = "#international_office_locations > form > button";
    const resultsHeader = "#international_office_locations > div.resultsList > p";
    await page.waitForSelector(inputField);
    await page.type(inputField, "Portsmouth");
    await page.click(searchButton);
    await page.waitForSelector(resultsHeader, 20000);
    await page.click('#clearButton');
  });
});

afterAll(() => browser.close());