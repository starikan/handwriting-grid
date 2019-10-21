import _ from 'lodash';
import Vue from 'vue';
import VueRouter from 'vue-router';

import './index.scss';
import 'font-awesome/scss/font-awesome.scss';

const router = new VueRouter({
  mode: 'history',
  routes: [],
});

const range = function*(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
};

const app = new Vue({
  router,
  el: '#app',
  mounted: function() {
    this.pages = [
      {
        size: {
          format: 'A4',
          layout: 'portrait',
          // height: false,
          // width: false,
        },
        grid: {
          //     rowGap: 0.5,
          //     colGap: 0.5,
          //     padding: 0.5,
          //     rowsHeight: 2,
          //     colsWidth: 2,
        },
        //   cellBorder: {},
        //   columnsWidth: {},
        content: [],
      },
    ];
  },
  computed: {},
  watch: {},
  methods: {
    addPageAfter: function(index) {
      this.pages.splice(index + 1, 0, {});
    },

    deletePage: function(index) {
      this.pages.splice(index, 1);
    },

    getCellsCount: function(page) {
      const content = _.get(page, 'content', []);
      const colsCount = content.map(v => v.length).reduce((v, s) => (v > s ? v : s), 0);
      const rowsCount = content.length;
      const result = { range: [...range(0, colsCount * rowsCount - 1)], colsCount, rowsCount };
      console.log(result, content);
      return result;
    },

    getFormat: function(page) {
      return _.get(page, 'size.format', 'A4');
    },

    getLayout: function(page) {
      return _.get(page, 'size.layout', 'portrait');
    },

    getGridGaps: function(page) {
      const styles = {};
      const colGap = _.get(page, 'grid.colGap', 0);
      const rowGap = _.get(page, 'grid.rowGap', 0);

      styles['grid-column-gap'] = `${colGap}cm`;
      styles['grid-row-gap'] = `${rowGap}cm`;
      const stylesStr = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      const stylesObj = Object.keys(styles).reduce((t, key) => ({ ...t, ...{ [key]: `${key}: ${styles[key]};` } }), {});
      return { styles, stylesStr, stylesObj, colGap, rowGap };
    },

    getGridMainParams: function(page) {
      const styles = {};
      const padding = _.get(page, 'grid.padding', 0);
      const { colsCount, rowsCount } = this.getCellsCount(page);
      const colsWidth = _.get(page, 'grid.colsWidth', 1);
      const rowsHeight = _.get(page, 'grid.rowsHeight', 1);

      styles['padding'] = `${padding}cm`;
      const stylesStr = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      const stylesObj = Object.keys(styles).reduce((t, key) => ({ ...t, ...{ [key]: `${key}: ${styles[key]};` } }), {});
      return { styles, stylesStr, stylesObj, padding, colsWidth, rowsHeight, colsCount, rowsCount };
    },

    getGridRows: function(page) {
      const styles = {};
      const { rowsHeight, rowsCount } = this.getGridMainParams(page);
      let heigths = typeof rowsHeight === 'number' ? Array(rowsCount).fill(rowsHeight) : rowsHeight;
      styles['grid-template-rows'] = heigths.map(v => (v ? `${v}cm ` : 'auto ')).reduce((s, v) => s + v, '');
      const stylesStr = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      return { styles, stylesStr, heigths };
    },

    getGridCols: function(page) {
      const styles = {};
      const { colsWidth, colsCount } = this.getGridMainParams(page);
      let widths = typeof colsWidth === 'number' ? Array(colsCount).fill(colsWidth) : colsWidth;
      styles['grid-template-columns'] = widths.map(v => (v ? `${v}cm ` : 'auto ')).reduce((s, v) => s + v, '');
      const stylesStr = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');

      return { styles, stylesStr, widths };
    },

    getGridData: function(page) {
      let styles = {};

      const { styles: stylesGap, colGap, rowGap, verticalGap, horizontalGap } = this.getGridGaps(page);
      const { styles: stylesMain, padding, colsWidth, rowsHeight, colsCount, rowsCount } = this.getGridMainParams(page);
      const { styles: stylesRows, heigths } = this.getGridRows(page);
      const { styles: stylesCols, widths } = this.getGridCols(page);

      styles = { ...styles, ...stylesMain, ...stylesGap, ...stylesRows, ...stylesCols };

      const style = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      const data = {
        padding,
        colGap,
        rowGap,
        colsWidth,
        rowsHeight,
        colsCount,
        rowsCount,
        verticalGap,
        horizontalGap,
        heigths,
        widths,
      };
      return { style, data };
    },

    getCellData: function(page, index) {
      const { colsCount } = this.getCellsCount(page);
      const row = Math.floor(index / colsCount);
      const col = index - row * colsCount;

      const styles = {};
      styles['grid-row'] = `${row + 1} / ${row + 2}`;
      styles['grid-column'] = `${col + 1} / ${col + 2}`;

      const content = this.getCellContent(page, row, col);
      const style = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      return { style, content };
    },

    getCellContent: function(page, row, col) {
      // const {colsCount} = this.getCellsCount(page);
      // const symbols = _.get(page, ['symbols', row], []);
      // if (symbols) {
      //   const text = symbols.text;
      //   if (!text) {
      //     return '';
      //   }
      //   if (typeof text === 'object' && text.length) {
      //     const textPad = [];
      //     if (_.get(symbols, 'repeat', true)) {
      //       while (textPad.length < colsCount) {
      //         textPad.splice(textPad.length + 1, 0, ...text);
      //       }
      //     } else {
      //       textPad.splice(textPad.length + 1, 0, ...text);
      //     }
      //     return textPad[col];
      //   }
      //   if (typeof text === 'string' && text.length) {
      //     const textPad = _.get(symbols, 'repeat', true) ? text.padEnd(colsCount, text) : text;
      //     return textPad[col];
      //   }
      // }
      return _.get(page, 'content[row][col].text', '');
    },

    getLeftMenuStyle: function(page) {
      return `padding-top: ${this.getGridMainParams(page).styles['padding']};${this.getGridRows(page).stylesStr}${
        this.getGridGaps(page).stylesStr
      }`;
    },

    getTopMenuStyle: function(page) {
      return `padding-left: ${this.getGridMainParams(page).styles['padding']};${this.getGridCols(page).stylesStr}${
        this.getGridGaps(page).stylesStr
      }`;
    },

    rowRemove: function(pageId, rowId) {},

    rowAdd: function(pageId) {
      const content = _.get(this.pages[pageId], 'content', []);
      if (!content.length) {
        content.push([{}]);
      } else {
        content.push([]);
      }
    },

    colRemove: function(pageId, colId) {},

    colAdd: function(pageId) {
      const content = _.get(this.pages[pageId], 'content', []);
      if (!content.length) {
        content.push([]);
      }
      content[0].push({});
      console.log(content);
      Vue.set(this.pages[pageId], 'content', content);
    },
  },
  data: {
    pages: [],
  },
});
