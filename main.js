var router = new VueRouter({
  mode: 'history',
  routes: [],
});

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
        columnsCount: 0,
        rowsCount: 0,
        cellBorder: {},
        columnsWidth: {},
        rowsHeight: {},
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
      { size: { format: 'A5', layout: 'landscape' } },
    ];
  },
  computed: {},
  watch: {},
  data: {
    pages: [],
  },
});
