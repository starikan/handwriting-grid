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
          colsCount: 8,
          rowsCount: 3,
          rowGap: 0.5,
          colGap: 0.5,
          padding: 0.5,
          rowsHeight: 2,
          colsWidth: 2,
          // direction: 'columns',
        },
        cellBorder: {},
        columnsWidth: {},
        symbols: [
          {
            // TODO: сделать возможность добавления ссылок на картинки
            text: ['熊', '猫'],
            repeat: true,
          },
          { text: '鼠标' },
          { text: '狗' },
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
      const colsCount = _.get(page, 'grid.colsCount', 0);
      const rowsCount = _.get(page, 'grid.rowsCount', 0);

      return [...range(0, colsCount * rowsCount - 1)];
    },

    getFormat: function(page) {
      return _.get(page, 'size.format', 'A4');
    },

    getLayout: function(page) {
      return _.get(page, 'size.layout', 'portrait');
    },

    getDirection: function(page) {
      return _.get(page, 'grid.direction', 'rows');
    },

    getGridData: function(page) {
      const styles = {};
      const padding = _.get(page, 'grid.padding', 0);
      const direction = _.get(page, 'grid.direction', 'rows');
      const colGap = _.get(page, 'grid.colGap', 0);
      const rowGap = _.get(page, 'grid.rowGap', 0);
      const colsWidth = _.get(page, 'grid.colsWidth', 1);
      const rowsHeight = _.get(page, 'grid.rowsHeight', 1);
      const colsCount = _.get(page, 'grid.colsCount', 0);
      const rowsCount = _.get(page, 'grid.rowsCount', 0);

      styles['padding'] = `${padding}cm`;

      const verticalGap = direction === 'columns' ? colGap : rowGap;
      const horizontalGap = direction === 'columns' ? rowGap : colGap;
      styles['grid-column-gap'] = `${verticalGap}cm`;
      styles['grid-row-gap'] = `${horizontalGap}cm`;

      let heigths = direction === 'columns' ? rowsHeight : colsWidth;
      let widths = direction === 'columns' ? colsWidth : rowsHeight;

      if (typeof widths === 'number') {
        const count = direction === 'columns' ? rowsCount : colsCount;
        widths = Array(count).fill(widths);
      }
      if (typeof heigths === 'number') {
        const count = direction === 'columns' ? colsCount : rowsCount;
        heigths = Array(count).fill(heigths);
      }
      styles['grid-template-rows'] = heigths.map(v => (v ? `${v}cm ` : 'auto ')).reduce((s, v) => s + v, '');
      styles['grid-template-columns'] = widths.map(v => (v ? `${v}cm ` : 'auto ')).reduce((s, v) => s + v, '');

      const style = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      console.log(direction, styles, heigths, widths);
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
      const colsCount = _.get(page, 'grid.colsCount', 0);
      const row = Math.floor(index / colsCount);
      const col = index - row * colsCount;

      const styles = {};
      if (this.getDirection(page) === 'columns') {
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
      const colsCount = _.get(page, 'grid.colsCount', 0);
      const symbols = _.get(page, ['symbols', row], []);
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
    pageBlank: {},
  },
});
