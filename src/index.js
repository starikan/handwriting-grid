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
  for (let i = start; i < end; i++) {
    yield i;
  }
};

const app = new Vue({
  router,
  el: '#app',
  mounted: function() {
    this.pages = [
      {
        id: '123321',
        size: {
          format: 'A4',
          layout: 'portrait',
          // height: false,
          // width: false,
        },
        grid: {
          rowGap: 0.5,
          colGap: 0.5,
          padding: 0.5,
        },
        content: [
          [{ text: 1, width: 1, height: 1 }, { text: 2, width: 2, height: 1 }],
          [{ text: 1, width: 2, height: 1 }, { text: 2, width: 1, height: 1 }],
        ],
      },
    ];
  },
  computed: {},
  watch: {},
  methods: {
    addPageAfter: function(index = 0) {
      this.pages.splice(index + 1, 0, {});
    },

    deletePage: function(index) {
      this.pages.splice(index, 1);
    },

    getCellsCount: function(page) {
      const content = _.get(page, 'content', []);
      const colsCount = content.map(v => v.length).reduce((v, s) => (v > s ? v : s), 0);
      const rowsCount = content.length;
      const rowsRange = [...range(0, rowsCount)];
      const colsRange = [...range(0, colsCount)];
      return { colsCount, rowsCount, rowsRange, colsRange };
    },

    getGridStyles: function(page, row = 0, col = 0) {
      const padding = `padding: ${_.get(page, 'grid.padding', 0)}cm;`;
      const colGap = `grid-column-gap: ${_.get(page, 'grid.colGap', 0)}cm;`;
      const rowGap = `grid-row-gap: ${_.get(page, 'grid.rowGap', 0)}cm;`;
      const format = _.get(page, 'size.format', 'A4');
      const layout = _.get(page, 'size.layout', 'portrait');
      const width = `width: ${_.get(page, ['content', row, col, 'width'], 0)}cm;`;
      const height = `height: ${_.get(page, ['content', row, col, 'height'], 0)}cm;`;
      return { colGap, rowGap, format, layout, padding, width, height };
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

    getCellData: function(page, row, col) {
      const styles = {};
      styles['grid-row'] = `${row + 1} / ${row + 2}`;
      styles['grid-column'] = `${col + 1} / ${col + 2}`;

      const content = _.get(page, ['content', row, col, 'text'], '');
      const style = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      return { style, content };
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

    rowAdd: function(page) {
      const content = _.get(page, 'content', []);
      const colMaxIndex = this.getCellsCount(page).colsCount || 1;
      content.push(new Array(colMaxIndex).fill(this.cellBlank));
    },

    colRemove: function(pageId, colId) {},

    colAdd: function(page) {
      let content = _.get(page, 'content', [])
      if (!content.length) {
        content.push([]);
      }
      content = content.map(v => {v.push(this.cellBlank); console.log(v);return v;});

      const pageId = this.pages.map(v => v.id).indexOf(page.id);
      Vue.set(this.pages[pageId], 'content', content);
    },

    cellClick: function(page, row, col) {
      console.log(row, col);
    },
  },
  data: {
    pages: [],
    cellBlank: { text: ' ', width: 1, height: 1 },
  },
});
