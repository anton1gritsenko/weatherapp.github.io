;(function () {
    angular
        .module('app')
        .config(mainConfig)

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function mainConfig($stateProvider, $urlRouterProvider) {


        // $urlRouterProvider.otherwise('/home');
        $urlRouterProvider.otherwise(function ($injector) {
            let $state = $injector.get('$state');
            return $state.go('home');
        });
        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'templates/homepage/homepage.html',
                controller: 'HomepageController',
                controllerAs: 'vm',
                resolve: {
                    data: function (weather) {
                        return weather.get(weather.currentObject.name).then(function (res) {
                            return res.load(15, 0);
                        })
                    },

                }
            })

    }


})();

