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
          rowGap: 0.5,
          colGap: 0.5,
          padding: 0.5,
          rowsHeight: [2, 2, 2],
          colsWidth: [2, 2, 2, 3, 0, 0.5],
        },
        cellBorder: {},
        columnsWidth: {},
        direction: 'rows',
        symbols: [
          {
            // TODO: сделать возможность добавления ссылок на картинки
            // text: '@',
            text: ['@', '6'],
            repeat: true,
          },
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
      styles['grid-column-gap'] = `${page.grid.colGap}cm`;
      styles['grid-row-gap'] = `${page.grid.rowGap}cm`;
      styles['padding'] = `${page.grid.padding}cm`;
      styles['grid-template-rows'] = _.get(page, 'grid.rowsHeight', [])
        .map(v => (v ? `${v}cm ` : 'auto '))
        .reduce((s, v) => s + v, '');
      styles['grid-template-columns'] = _.get(page, 'grid.colsWidth', [])
        .map(v => (v ? `${v}cm ` : 'auto '))
        .reduce((s, v) => s + v, '');
      const style = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      return { style };
    },
    getCellData: function(page, index) {
      const row = Math.floor(index / page.grid.colsCount);
      const col = index - row * page.grid.colsCount;
      const symbols = page.symbols[row];
      const styles = {};
      if (page.direction === 'columns') {
        styles['grid-column'] = `${row + 1} / ${row + 2}`;
        styles['grid-row'] = `${col + 1} / ${col + 2}`;
      } else {
        styles['grid-row'] = `${row + 1} / ${row + 2}`;
        styles['grid-column'] = `${col + 1} / ${col + 2}`;
      }
      const content = this.getCellContent(page, symbols, col);
      const style = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      return { style, content };
    },

    getCellContent: function(page, symbols, col){
      if (symbols) {
        const text = symbols.text;
        if (typeof text === 'object' && text.length) {
          const textPad = [];
          if (symbols.repeat) {
            while (textPad.length < page.grid.colsCount) {
              textPad.splice(textPad.length + 1, 0, ...text);
            }
          } else {
            textPad.splice(textPad.length + 1, 0, ...text);
          }
          return textPad[col];
        }
        if (typeof text === 'string' && text.length) {
          const textPad = symbols.repeat ? text.padEnd(page.grid.colsCount, text) : text;
          return textPad[col];
        }
      }
      return '';
    }
  },
  data: {
    pages: [],
    pageBlank: { size: { format: 'A5', layout: 'landscape' } },
  },
});
