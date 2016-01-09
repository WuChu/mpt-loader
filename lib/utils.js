var css = require('css');

var getOptions = function (settings) {
    settings = settings || {};
    if (!settings.queryList) {
        settings.queryList = [];
    }
    var source = settings.source || '';
    var sortedQueryList = settings.queryList.sort();
    var uiWidth = settings.uiWidth || 720;
    var baseWidth = settings.baseWidth || 320;

    sortedQueryList = sortedQueryList.filter(function (v) {
        return ~~v !== ~~baseWidth;
    });

    return {
        source: source,
        sortedQueryList: sortedQueryList,
        uiWidth: uiWidth,
        baseWidth: baseWidth
    };
};

var createMediaAST = function (list) {
    return css.parse(list.map(function (val) {
        return '@media screen and (min-width: ' + val + 'px) {}';
    }).join(''));
};

var createOriginAST = function (source) {
    return css.parse(source);
};

var makeMediaQuery = function (originAST, mediaAST, options) {
    var sortedQueryList = options.sortedQueryList;
    var uiWidth = options.uiWidth;
    var baseWidth = options.baseWidth;
    var regexp = /(\d+)mpt/g;
    var needToUpdate = false;

    originAST.stylesheet.rules.forEach(function (rule) {
        if (!rule.declarations) {
            return;
        }
        var decls = [];
        rule.declarations.forEach(function (decl) {
            if (regexp.test(decl.value)) {
                needToUpdate = true;
                decls.push(sortedQueryList.map(function (val) {
                    var value = decl.value.replace(regexp, function (s, matched) {
                        return ~~(matched * val / uiWidth) + 'px';
                    });
                    return {
                        type: 'declaration',
                        property: decl.property,
                        value: value
                    };
                }));
                decl.value = decl.value.replace(regexp, function (s, matched) {
                    return ~~(matched * baseWidth / uiWidth) + 'px';
                });
            }
        });

        if (decls.length <= 0) {
            return;
        }

        mediaAST.stylesheet.rules.forEach(function (media, i) {
            var declarations = decls.map(function (v) {
                return v[i];
            });
            media.rules.push({
                type: 'rule',
                selectors: rule.selectors,
                declarations: declarations
            });
        });
    });

    return needToUpdate;
};

var generateSource = function (originAST, mediaAST, needToUpdate) {
    if (needToUpdate) {
        mediaAST.stylesheet.rules.forEach(function (media) {
            originAST.stylesheet.rules.push(media);
        });
    }

    return css.stringify(originAST);
};

module.exports = {
    getOptions: getOptions,
    createOriginAST: createOriginAST,
    createMediaAST: createMediaAST,
    makeMediaQuery: makeMediaQuery,
    generateSource: generateSource
};
