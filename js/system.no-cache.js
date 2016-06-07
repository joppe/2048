/*global System*/

(function () {
    var systemLocate = System.locate;

    System.locate = function(load) {
        var System = this;

        return Promise.resolve(systemLocate.call(this, load)).then(function (address) {
            return address + System.cacheBust;
        });
    };

    System.cacheBust = '?bust=' + Date.now();
}());
