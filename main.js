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
        },
        cellBorder: {},
        columnsWidth: {},
        rowsHeight: {},
        direction: 'rows',
        symbols: [
          {
            // TODO: сделать возможность добавления ссылок на картинки
            text: '@',
            // text: ['@'],
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

      let content = '';
      if (symbols) {
        const text = symbols.text;
        if (typeof text === 'string' && text.length){
          const textPad = text.padEnd(page.grid.colsCount, text);
          content = textPad[col];
        }
      }

      const style = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      return { style, content };
    },
  },
  data: {
    pages: [],
    pageBlank: { size: { format: 'A5', layout: 'landscape' } },
  },
});
