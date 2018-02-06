;(function () {
    angular.module('app',
        [
            'app.core',
            'blocks.directives',
            'blocks.directives',
            'blocks.request',
            'blocks.services',
            'blocks.filters'

        ])
        .run(runBlock);



    function runBlock() {
        Array.prototype.load = Array.prototype.load || function (limit, offset) {
            let result = [];
            offset = offset === null ? 0 : offset;
            limit = limit === null ? this.length() : limit;
            let size = limit + offset;
            for (let i = offset; i < size; i++) {
                result.push(this[i]);
            }
            return result;
        };

    }
})();
