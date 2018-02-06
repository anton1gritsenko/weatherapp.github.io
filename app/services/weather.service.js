;(function () {

    'use strict';

    angular.module('service.weather', []).service('weather', weather);


    weather.$inject = ['http', 'url'];

    function weather(http, url) {
        const cities = ['hurn', 'aberporth', 'ballypatrick', 'braemar', 'cardiff'];
        const model = {};
        model.get = get;
        model.cities = cities;
        model.sortByField = sortByField;
        model.loadDataForChart = loadDataForChart;
        model.loadDataForStatistic = loadDataForStatistic;
        model.currentObject = {
            name: "hurn",
            data: []
        };
        return model;


        function get(city) {
            return http.get(url.baseUrl + city + 'data.txt').then(function (res) {
                model.currentObject.name = city;
                return transformData(res);
            });

        }


        function transformData(res) {
            let tmpArr = res.split("\n");
            let result = [];
            tmpArr.forEach(function (element, index) {
                let row = element.replace(/  +/g, ' ').replace(/^\s*/, '');
                if (!isNaN(parseInt(row))) {
                    let arrOfRow = row.split(' ');
                    let tmpObject = {};
                    tmpObject.year = arrOfRow[0];
                    tmpObject.month = arrOfRow[1];
                    tmpObject.tmax = arrOfRow[2];
                    tmpObject.tmin = arrOfRow[3];
                    tmpObject.af = arrOfRow[4];
                    tmpObject.rain = arrOfRow[5];
                    tmpObject.sun = arrOfRow[6];
                    result.push(tmpObject);
                }
            });
            model.currentObject.data = result;
            return model.currentObject.data;
        }

        function sortByField(property) {
            let sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                if (a[property] === "" || b[property] === "") {
                    debugger;
                }
                let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }

        }

        function loadDataForChart() {
            let labels = [];
            let data = [
                [], []
            ];
            let tminSum = 0;
            let tmaxSum = 0;
            let monthCount = 0;
            model.currentObject.data.forEach(function (element, index, arr) {
                let lastIndex = index - 1 >= 0 ? index - 1 : index;
                if (element.year === arr[lastIndex].year) {
                    tmaxSum += isNaN(parseFloat(element.tmax)) ? 0 : parseFloat(element.tmax);
                    tminSum += isNaN(parseFloat(element.tmin)) ? 0 : parseFloat(element.tmin);
                    monthCount++;
                }
                else {
                    let tmpLabel = element.year;
                    labels.push(tmpLabel);
                    let tmaxAverage = (tmaxSum / monthCount).toFixed(2);
                    let tminAverage = (tminSum / monthCount).toFixed(2);
                    data[0].push(tmaxAverage);
                    data[1].push(tminAverage);
                    tminSum = 0;
                    tmaxSum = 0;
                    monthCount = 0;
                }

            });
            return {
                labels: labels,
                data: data,
                series: ['max average', 'min average']
            }
        }

        function loadDataForStatistic() {
            let result = {
                tmax: {
                    label: 'Max temperature (degC)',
                    date: '',
                    value: 0
                },
                tmin: {
                    label: 'Min temperature (degC)',
                    date: '',
                    value: 0
                },
                af: {
                    label: 'Max quantity days of air frost (days)',
                    date: '',
                    value: 0
                },
                rain: {
                    label: 'Max of rain (mm)',
                    date: '',
                    value: 0
                },
                sun: {
                    label: 'Max of sunshine duration (hours)',
                    date: '',
                    value: 0
                }
            };
            model.currentObject.data.forEach(function (element) {
                if (!isNaN(element.tmax) && element.tmax > result.tmax.value) {
                    result.tmax.date = element.month + "/" + element.year;
                    result.tmax.value = element.tmax;
                }
                if (!isNaN(element.tmin) && element.tmin < result.tmin.value) {
                    result.tmin.date = element.month + "/" + element.year;
                    result.tmin.value = element.tmin;
                }
                if (!isNaN(element.af) && element.af > result.af.value) {
                    result.af.date = element.month + "/" + element.year;
                    result.af.value = element.af;
                }
                if (!isNaN(element.rain) && element.rain > result.rain.value) {
                    result.rain.date = element.month + "/" + element.year;
                    result.rain.value = element.rain;
                }
                if (!isNaN(element.sun) && element.sun > result.sun.value) {
                    result.sun.date = element.month + "/" + element.year;
                    result.sun.value = element.sun;
                }
            });
            return result;
        }
    }
})();