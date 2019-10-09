var router = new VueRouter({
  mode: 'history',
  routes: [],
});

const range = function*(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
};

var app = new Vue({
  router,
  el: '#app',
  mounted: function() {
    this.pages = [
      {
        size: {
          format: 'A4',
          layout: 'portrait',
          height: false,
          width: false,
        },
        grid: {
          colsCount: 7,
          rowsCount: 3,
          rowGap: 3,
          colGap: 0.5,
          padding: 0.5,
          rowsHeight: [2, 2, 2],
          colsWidth: [2, 2, 2, 3, 0, 0.5],
          // direction: 'columns',
        },
        cellBorder: {},
        columnsWidth: {},
        symbols: [
          {
            // TODO: сделать возможность добавления ссылок на картинки
            // text: '@',
            text: ['@', '6'],
            // repeat: false,
          },
          { text: 'W' },
        ],
      },
    ];
  },
  computed: {},
  watch: {},
  methods: {
    addPageAfter: function(index) {
      this.pages.splice(index + 1, 0, this.pageBlank);
    },

    deletePage: function(index) {
      this.pages.splice(index, 1);
    },

    getCellsCount: function(page) {
      return [...range(0, page.grid.colsCount * page.grid.rowsCount - 1)];
    },

    getGridData: function(page) {
      const styles = {};
      styles['padding'] = `${page.grid.padding}cm`;

      const direction = _.get(page, 'grid.direction', 'row');

      let verticalGap = page.grid.colGap;
      let horizontalGap = page.grid.rowGap;
      if (direction === 'columns') {
        verticalGap = page.grid.rowGap;
        horizontalGap = page.grid.colGap;
      }
      styles['grid-column-gap'] = `${verticalGap}cm`;
      styles['grid-row-gap'] = `${horizontalGap}cm`;

      let heigths = _.get(page, 'grid.rowsHeight', []);
      let widths = _.get(page, 'grid.colsWidth', []);
      if (direction === 'columns') {
        heigths = _.get(page, 'grid.colsWidth', []);
        widths = _.get(page, 'grid.rowsHeight', []);
      }
      styles['grid-template-rows'] = heigths.map(v => (v ? `${v}cm ` : 'auto ')).reduce((s, v) => s + v, '');
      styles['grid-template-columns'] = widths.map(v => (v ? `${v}cm ` : 'auto ')).reduce((s, v) => s + v, '');

      const style = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      return { style };
    },

    changeDirection: function(page, pageId) {
      if (this.pages[pageId].grid.direction !== 'columns') {
        Vue.set(this.pages[pageId].grid, 'direction', 'columns');
      } else {
        Vue.set(this.pages[pageId].grid, 'direction', 'rows');
      }
    },

    getCellData: function(page, index) {
      const colsCount = page.grid.colsCount;
      const row = Math.floor(index / colsCount);
      const col = index - row * colsCount;

      const styles = {};
      if (page.grid.direction === 'columns') {
        styles['grid-column'] = `${row + 1} / ${row + 2}`;
        styles['grid-row'] = `${col + 1} / ${col + 2}`;
      } else {
        styles['grid-row'] = `${row + 1} / ${row + 2}`;
        styles['grid-column'] = `${col + 1} / ${col + 2}`;
      }
      const content = this.getCellContent(page, row, col);
      const style = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      return { style, content };
    },

    getCellContent: function(page, row, col) {
      const colsCount = page.grid.colsCount;
      const symbols = page.symbols[row];
      if (symbols) {
        const text = symbols.text;
        if (!text) {
          return '';
        }
        if (typeof text === 'object' && text.length) {
          const textPad = [];
          if (_.get(symbols, 'repeat', true)) {
            while (textPad.length < colsCount) {
              textPad.splice(textPad.length + 1, 0, ...text);
            }
          } else {
            textPad.splice(textPad.length + 1, 0, ...text);
          }
          return textPad[col];
        }
        if (typeof text === 'string' && text.length) {
          const textPad = _.get(symbols, 'repeat', true) ? text.padEnd(colsCount, text) : text;
          return textPad[col];
        }
      }
      return '';
    },
  },
  data: {
    pages: [],
    pageBlank: { size: { format: 'A5', layout: 'landscape' } },
  },
});
