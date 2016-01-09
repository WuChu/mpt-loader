# webpack loader 移动端多分辨率自适应

#### 安装
```shell
npm install mpt-loader --save-dev
```

### query配置

#### queryList
需要支持的分辨率宽度，不包括baseWidth，默认[]

#### uiWidth
UE给到标注的PSD宽度，默认720

#### baseWidth
基础支持的分辨率宽度，默认320

### 示例
```css
/* 输入src/test.css */
/* 自定义单位: mpt */
/* UE标准最佳分辨率宽度720 */
/* 前端基本最佳分辨率宽度320 */
/* 前端需要支持的其他最佳分辨率宽度列表：360, 414 */
/* 单位换算公式: 实际像素 = (输入规则值mpt / 720) * 最佳分辨率宽度 */

.container {
    width: 720mpt;
    border: 1px solid #eee;
}
.navigator {
    width: 720mpt;
    height: 120mpt;
}

/* 输出dist/test.css */
/* 生成单位: px */
.container {
    width: 320px; /* (720 / 720) * 320 */
    border: 1px solid #eee;
}
.navigator {
    width: 320px; /* (720 / 720) * 320 */
    height: 53px; /* (120 / 720) * 320 */
}
@media screen and min-width(360px) {
    .container {
        width: 360px; /* (720 / 720) * 360 */
    }
    .navigator {
        width: 360px; /* (720 / 720) * 360 */
        height: 60px; /* (120 / 720) * 360 */
    }
}
@media screen and min-width(414px) {
    .container {
        width: 414px; /* (720 / 720) * 414 */
    }
    .navigator {
        width: 414px; /* (720 / 720) * 414 */
        height: 69px; /* (120 / 720) * 414 */
    }
}
```
