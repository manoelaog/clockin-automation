const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');
const ndjsonParser = require('ndjson-parse');
const messages = fs.readFileSync(path.join(__dirname, '../json/cucumber-messages.ndjson'), 'utf8');
const testData = ndjsonParser(messages);

var today = new Date();
var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
var time = today.getHours() + 'h' + today.getMinutes() + 'm' + today.getSeconds() + 's';
var dateTime = date + '_' + time;

let data = fs.readFileSync(path.join(__dirname, '../report-data.json'), { encoding: 'utf8', flag: 'a+' });
if (!data) {
  data = {
    linha: '',
    url: '',
    metadata: [
      { 'name': 'Browser', 'value': undefined },
      { 'name': 'Versão', 'value': undefined },
      { 'name': 'Plataforma', 'value': undefined },
    ],
  };
}

data = typeof data != 'object' ? JSON.parse(data) : data;
report.generate({
  jsonDir: './report/json/',
  reportPath: './report/html/Report_' + dateTime + '.html',
  openReportInBrowser: true,
  pageTitle: 'Relatório E2E',
  reportName: 'Testes End-to-end Portal Meu RH',
  displayReportTime: false,
  displayDuration: true,
  customMetadata: true,
  metadata: data.metadata,
  customData: {
    title: 'Informações',
    data: [
      { label: 'Portal Meu RH', value: 'Meu RH' },
      { label: 'Linha', value: data.linha },
      { label: 'Url do Produto', value: data.url },
      {
        label: 'Início da Execução',
        value: new Date(testData[0].testRunStarted.timestamp.seconds * 1000).toLocaleString(),
      },
      {
        label: 'Fim da Execução',
        value: new Date(testData[testData.length - 1].testRunFinished?.timestamp.seconds * 1000).toLocaleString(),
      },
    ],
  },
});
