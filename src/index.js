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

const openModal = function(dialogId, onClose = () => {}) {
  const modal = document.getElementById(dialogId);
  modal.showModal();

  const escapeKey = ({ key }) => {
    key == 'Escape' && modal.close();
    modal.removeEventListener('keydown', escapeKey);
  };

  const listnerClick = async event => {
    event.stopPropagation();
    if (event.target == modal) {
      modal.close();
      modal.removeEventListener('click', listnerClick);
    }
  };

  modal.addEventListener('close', onClose);
  modal.addEventListener('click', listnerClick, false);
  modal.addEventListener('keydown', escapeKey);
};

const colsCount = content => content.map(v => v.length).reduce((v, s) => (v > s ? v : s), 0);

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
  computed: {
    pageStyles: function() {
      return this.pages.map(v => {
        const data = {
          margin: `margin: ${_.get(v, 'grid.margin', 0)}cm;`,
          colGap: `column-gap: ${_.get(v, 'grid.colGap', 0)}cm;`,
          rowGap: `row-gap: ${_.get(v, 'grid.rowGap', 0)}cm;`,
          format: _.get(v, 'size.format', 'A4'),
          layout: _.get(v, 'size.layout', 'portrait'),
          content: v.content && v.content.map(row => {
            if (row) {
              return row.map(col => {
                if (col) {
                  return {
                    width: `width: ${_.get(col, ['width'], 0)}cm;`,
                    height: `height: ${_.get(col, ['height'], 0)}cm;`,
                  };
                } else {
                  return [];
                }
              });
            } else {
              return [[]];
            }
          }),
        };
        return data;
      });
    },
  },
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

    rowRemove: function(page) {
      if (this.selected.pageId === page.id && !_.isUndefined(this.selected.row)) {
        const pageId = this.pages.map(v => v.id).indexOf(page.id);
        let content = _.get(page, 'content', []);
        content.splice(this.selected.row, 1);
        if (!content.length) {
          content = [];
        }
        Vue.set(this.pages[pageId], 'content', content);
        this.cellSelect();
      }
    },

    rowAdd: function(page) {
      const content = _.get(page, 'content', []);
      const colMaxIndex = colsCount(content) || 1;
      // Fill array not work
      const newRow = [];
      for (let index = 0; index < Array(colMaxIndex).length; index++) {
        newRow.push({ ...this.cellBlank });
      }
      content.push(newRow);

      const pageId = this.pages.map(v => v.id).indexOf(page.id);
      Vue.set(this.pages[pageId], 'content', content);
    },

    colRemove: function(page) {
      if (this.selected.pageId === page.id && !_.isUndefined(this.selected.col)) {
        const pageId = this.pages.map(v => v.id).indexOf(page.id);
        let content = _.get(page, 'content', []).map(v => {
          v.splice(this.selected.col, 1);
          return v;
        });
        if (!colsCount(content)) {
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
        v.push(_.clone(this.cellBlank));
        return v;
      });

      const pageId = this.pages.map(v => v.id).indexOf(page.id);
      Vue.set(this.pages[pageId], 'content', content);
    },

    cellSelect: function(page, row, col, event) {
      if (!page || _.isUndefined(row) || _.isUndefined(col)) {
        Vue.set(this, 'selected', {});
      } else {
        Vue.set(this, 'selected', { pageId: page.id, row, col, page });
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
      Vue.set(this, 'selected', {});
    },

    openModal: function(dialogId, onClose) {
      openModal(dialogId, onClose);
    },

    getModalStyle: function(drop = false) {
      if (_.isEmpty(this.selected)) {
        return;
      }

      let offsetTop = 0;
      let offsetLeft = 0;
      let offsetHeight = 0;
      let offsetWidth = 0;

      if (!drop) {
        const cellDom = document.querySelector(
          `#${this.selected.pageId} .col_${this.selected.col}.row_${this.selected.row}`,
        );
        ({ offsetTop, offsetLeft, offsetHeight, offsetWidth } = cellDom);
      }

      document.documentElement.style.setProperty('--edit-modal-top', `${offsetTop}px`);
      document.documentElement.style.setProperty('--edit-modal-left', `${offsetLeft}px`);
      document.documentElement.style.setProperty('--edit-modal-width', `${offsetWidth}px`);
      document.documentElement.style.setProperty('--edit-modal-height', `${offsetHeight}px`);
    },

    minusWidth: function() {},
    plusWidth: function() {},
    minusHeight: function() {},
    plusHeight: function() {},
    extendRight: function() {
      const content = _.get(this.selected.page, 'content', []);
      const { row, col } = this.selected;
      const cell = { ..._.get(this.selected.page, ['content', row, col], { ...this.cellBlank }) };
      const pageId = this.pages.map(v => v.id).indexOf(this.selected.page.id);

      // debugger
      let existRow = _.get(content, [row]);
      if (existRow) {
        existRow.forEach((v, i) => {
          // debugger
          if (i > row) {
            Vue.set(this.pages[pageId].content[row], col, cell);
            console.log(this.pages[pageId].content[row][col]);
            // return { ...cell };
          }
        });
      }
      // content[row] = [...existRow];
      // debugger;
    },
    extendDown: function() {},
    extendLeft: function() {},
    extendUp: function() {},
  },
  data: {
    pages: [],
    cellBlank: { text: '', width: 1, height: 1 },
    selected: {},
  },
});
