var utils = require('./utils');

module.exports = function (settings) {
    var options = utils.getOptions(settings);
    var source = options.source;

    var originAST = utils.createOriginAST(source);
    var mediaAST = utils.createMediaAST(options.sortedQueryList);

    var needToUpdate = utils.makeMediaQuery(originAST, mediaAST, options);

    return utils.generateSource(originAST, mediaAST, needToUpdate);
};
