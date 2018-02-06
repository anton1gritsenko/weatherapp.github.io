;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomepageController', HomepageController);


    HomepageController.$inject = ['data', '$log', 'weather'];

    function HomepageController(data, $log, weather) {
        const vm = this;
        vm.isDisabled = false;
        vm.cities = allCities();
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;
        vm.loadData = loadData;
        vm.data = {
            entries: data,
            limit: 15,
            length: weather.currentObject.data.length,
            selectedItem: weather.currentObject.name,
            page: 1
        };

        vm.chart = weather.loadDataForChart();
        vm.statistic = weather.loadDataForStatistic();

        function loadData(sort) {
            let offset = (vm.data.page - 1) * vm.data.limit;
            weather.currentObject.data.sort(weather.sortByField(sort));
            vm.data.entries = weather.currentObject.data.load(vm.data.limit, offset);
        }

        /**
         * Search for cities...
         * remote dataservice call.
         */
        function querySearch(query) {
            return query ? vm.cities.filter(createFilterFor(query)) : vm.cities;
        }

        function allCities() {
            return ['hurn', 'aberporth', 'ballypatrick', 'braemar', 'cardiff'];


        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            vm.isDisabled = true;
            if (item) {
                getData(item);
            }
            vm.isDisabled = false;

        }

        function getData(city) {
            weather.get(city).then(function (res) {
                vm.data = {
                    entries: res.load(15, 0),
                    limit: 15,
                    length: weather.currentObject.data.length,
                    selectedItem: weather.currentObject.name,
                    page: 1
                };
                vm.chart = weather.loadDataForChart();
                vm.statistic = weather.loadDataForStatistic();
``
            })
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            let lowercaseQuery = angular.lowercase(query);

            return function filterFn(city) {
                return (city.indexOf(lowercaseQuery) === 0);
            };

        }

    }
})();