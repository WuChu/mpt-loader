var lutils = require("loader-utils");

module.exports = function (source) {
    this.cacheable && this.cacheable();
    var query = lutils.parseQuery(this.query);
    var queryList = [];
    var uiWidth = 720;
    var baseWidth = 320;

    source = source || '';
    if (query.queryList) {
        queryList = JSON.parse(query.queryList);
    }
    if (query.uiWidth) {
        uiWidth = ~~query.uiWidth || uiWidth;
    }
    if (query.baseWidth) {
        baseWidth = ~~query.baseWidth || baseWidth;
    }

    return require('./lib/mpt')({
        source: source,
        queryList: queryList,
        uiWidth: uiWidth,
        baseWidth: baseWidth
    });
};
