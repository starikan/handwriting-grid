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

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const app = new Vue({
  router,
  el: '#app',
  mounted: function() {
    let pages;
    try {
      pages = JSON.parse(localStorage.getItem('pages'));
    } catch (error) {}

    this.pages = pages || [
      {
        id: uuidv4(),
        size: {
          format: 'A4',
          layout: 'portrait',
          // height: false,
          // width: false,
        },
        grid: {
          rowGap: 0.5,
          colGap: 0.5,
          margin: 0.5,
        },
        content: [
          [{ text: 1, width: 1, height: 1 }, { text: 2, width: 2, height: 1 }],
          [{ text: 1, width: 2, height: 1 }, { text: 2, width: 1, height: 1 }],
        ],
      },
    ];
  },
  computed: {},
  watch: {
    pages: {
      handler: function(curr) {
        localStorage.setItem('pages', JSON.stringify(curr));
      },
      deep: true,
    },
  },
  methods: {
    addPageAfter: function(index = 0) {
      this.pages.splice(index + 1, 0, { id: uuidv4() });
    },

    deletePage: function(index) {
      this.pages.splice(index, 1);
    },

    getCellsCount: function(page, content) {
      content = (page && _.get(page, 'content', [])) || content;
      const colsCount = content.map(v => v.length).reduce((v, s) => (v > s ? v : s), 0);
      const rowsCount = content.length;
      const rowsRange = [...range(0, rowsCount)];
      const colsRange = [...range(0, colsCount)];
      return { colsCount, rowsCount, rowsRange, colsRange };
    },

    getGridStyles: function(page, row = 0, col = 0) {
      const margin = `margin: ${_.get(page, 'grid.margin', 0)}cm;`;
      const colGap = `grid-column-gap: ${_.get(page, 'grid.colGap', 0)}cm;`;
      const rowGap = `grid-row-gap: ${_.get(page, 'grid.rowGap', 0)}cm;`;
      const format = _.get(page, 'size.format', 'A4');
      const layout = _.get(page, 'size.layout', 'portrait');
      const width = `width: ${_.get(page, ['content', row, col, 'width'], 0)}cm;`;
      const height = `height: ${_.get(page, ['content', row, col, 'height'], 0)}cm;`;
      return { colGap, rowGap, format, layout, margin, width, height };
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

    rowRemove: function(page) {
      if (this.selected.pageId === page.id && !_.isUndefined(this.selected.row)) {
        const pageId = this.pages.map(v => v.id).indexOf(page.id);
        let content = _.get(page, 'content', []);
        content.splice(this.selected.row, 1);
        const rowsCount = this.getCellsCount(null, content).rowsCount;
        if (!rowsCount) {
          content = [];
        }
        Vue.set(this.pages[pageId], 'content', content);
        this.cellSelect();
      }
    },

    rowAdd: function(page) {
      const content = _.get(page, 'content', []);
      const colMaxIndex = this.getCellsCount(page).colsCount || 1;
      content.push(new Array(colMaxIndex).fill(this.cellBlank));
    },

    colRemove: function(page) {
      if (this.selected.pageId === page.id && !_.isUndefined(this.selected.col)) {
        const pageId = this.pages.map(v => v.id).indexOf(page.id);
        let content = _.get(page, 'content', []).map(v => {
          v.splice(this.selected.col, 1);
          return v;
        });
        const colsCount = this.getCellsCount(null, content).colsCount;
        if (!colsCount) {
          content = [];
        }
        Vue.set(this.pages[pageId], 'content', content);
        this.cellSelect();
      }
    },

    colAdd: function(page) {
      let content = _.get(page, 'content', []);
      if (!content.length) {
        content.push([]);
      }
      content = content.map(v => {
        v.push(this.cellBlank);
        return v;
      });

      const pageId = this.pages.map(v => v.id).indexOf(page.id);
      Vue.set(this.pages[pageId], 'content', content);
    },

    cellSelect: function(page, row, col, event) {
      if (!page || _.isUndefined(row) || _.isUndefined(col)) {
        Vue.set(this, 'selected', {});
      } else {
        Vue.set(this, 'selected', { pageId: page.id, row, col });
      }
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    },

    isSelectedCell: function(page, row, col) {
      return {
        related: page.id === this.selected.pageId && (row === this.selected.row || col === this.selected.col),
        main: page.id === this.selected.pageId && row === this.selected.row && col === this.selected.col,
      };
    },

    clearPage: function(page) {
      const pageId = this.pages.map(v => v.id).indexOf(page.id);
      Vue.set(this.pages[pageId], 'content', []);
    },
  },
  data: {
    pages: [],
    cellBlank: { text: ' ', width: 1, height: 1 },
    selected: {},
  },
});
