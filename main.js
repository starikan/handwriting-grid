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
        columnsCount: 7,
        rowsCount: 3,
        cellBorder: {},
        columnsWidth: {},
        rowsHeight: {},
        verticalGap: 0.5,
        horizontalGap: 0.5,
        direction: 'rows',
        symbols: [
          {
            // TODO: сделать возможность добавления ссылок на картинки
            text: ['@'],
            split: false,
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
      return [...range(0, page.columnsCount * page.rowsCount - 1)];
    },
    getCellStyle: function(page, index) {
      const row = Math.floor(index / page.columnsCount);
      const col = index - row * page.columnsCount;
      const styles = {};
      if (page.direction === 'columns') {
        styles['grid-column'] = `${row + 1} / ${row + 2}`;
        styles['grid-row'] = `${col + 1} / ${col + 2}`;
      } else {
        styles['grid-row'] = `${row + 1} / ${row + 2}`;
        styles['grid-column'] = `${col + 1} / ${col + 2}`;
      }

      const concatStyle = Object.keys(styles).reduce((t, key) => t + `${key}: ${styles[key]};`, '');
      return concatStyle;
    },
  },
  data: {
    pages: [],
    pageBlank: { size: { format: 'A5', layout: 'landscape' } },
  },
});
