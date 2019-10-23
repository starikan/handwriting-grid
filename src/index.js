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
          content:
            v.content &&
            v.content.map(row => {
              if (row) {
                return row.map(col => {
                  if (col) {
                    return {
                      width: `width: ${_.get(col, ['width'], 0)}cm;`,
                      height: `height: ${_.get(col, ['height'], 0)}cm;`,
                      fontSize: `font-size: ${_.get(col, ['fontSize'], 0)}cm;`,
                      fontFamily: `font-family: ${_.get(col, ['fontFamily'], 0)};`,
                      opacityGrid: `opacity: ${_.get(col, ['opacityGrid'], 1)};`,
                      opacityText: `opacity: ${_.get(col, ['opacityText'], 1)};`,
                      conture: _.get(col, ['conture'], false) ? `-webkit-text-stroke: 1px black; color: white;` : '',
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
      if (this.selected.page.id === page.id && !_.isUndefined(this.selected.row)) {
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
      if (this.selected.page.id === page.id && !_.isUndefined(this.selected.col)) {
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
        const pageIndex = this.pages.map(v => v.id == page.id).indexOf(true);
        Vue.set(this, 'selected', {
          row,
          col,
          page,
          pageIndex,
          cell: page.content[row][col],
        });
      }
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    },

    isSelectedCell: function(page, row, col) {
      return {
        related:
          page.id === _.get(this.selected, 'page.id') && (row === this.selected.row || col === this.selected.col),
        main: page.id === _.get(this.selected, 'page.id') && row === this.selected.row && col === this.selected.col,
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

    setModalStyle: function(drop = false) {
      if (_.isEmpty(this.selected)) {
        return;
      }

      let offsetTop = 0;
      let offsetLeft = 0;
      let offsetHeight = 0;
      let offsetWidth = 0;

      if (!drop) {
        const cellDom = document.querySelector(
          `#${this.selected.page.id} .col_${this.selected.col}.row_${this.selected.row}`,
        );
        ({ offsetTop, offsetLeft, offsetHeight, offsetWidth } = cellDom);
      }

      document.documentElement.style.setProperty('--edit-modal-top', `${offsetTop}px`);
      document.documentElement.style.setProperty('--edit-modal-left', `${offsetLeft}px`);
      document.documentElement.style.setProperty('--edit-modal-width', `${offsetWidth}px`);
      document.documentElement.style.setProperty('--edit-modal-height', `${offsetHeight}px`);
    },

    editWidth: function(sign = 1, step = 0.1) {
      const { row, col } = this.selected;
      const width = _.get(this.selected.page, ['content', row, col, 'width'], 1);
      if (sign) {
        Vue.set(this.selected.page.content[row][col], 'width', parseFloat((width + step).toFixed(2)));
      } else {
        Vue.set(this.selected.page.content[row][col], 'width', parseFloat((width - step).toFixed(2)));
      }
      this.setModalStyle();
    },
    editHeight: function(sign = 1, step = 0.1) {
      const { row, col } = this.selected;
      const height = _.get(this.selected.page, ['content', row, col, 'height'], 1);
      if (sign) {
        Vue.set(this.selected.page.content[row][col], 'height', parseFloat((height + step).toFixed(2)));
      } else {
        Vue.set(this.selected.page.content[row][col], 'height', parseFloat((height - step).toFixed(2)));
      }
      this.setModalStyle();
    },
    extendHoriz: function(direction) {
      let content = _.get(this.selected.page, 'content', []);
      const { row, col } = this.selected;
      const cell = _.get(this.selected.page, ['content', row, col], { ...this.cellBlank });
      content[row].forEach((v, i) => {
        if (!direction) {
          Vue.set(this.selected.page.content[row], i, { ...cell });
        }
        if (i >= row && direction === 'right') {
          Vue.set(this.selected.page.content[row], i, { ...cell });
        }
        if (i <= row && direction === 'left') {
          Vue.set(this.selected.page.content[row], i, { ...cell });
        }
      });
    },
    extendVertical: function(direction) {
      let content = _.get(this.selected.page, 'content', []);
      const { row, col } = this.selected;
      const cell = _.get(this.selected.page, ['content', row, col], { ...this.cellBlank });
      content.forEach((v, i) => {
        if (!direction) {
          Vue.set(this.selected.page.content[i], col, { ...cell });
        }
        if (i <= col && direction === 'up') {
          Vue.set(this.selected.page.content[i], col, { ...cell });
        }
        if (i >= col && direction === 'down') {
          Vue.set(this.selected.page.content[i], col, { ...cell });
        }
      });
    },

    editFont: function(sign = 1, step = 0.1) {
      const { row, col } = this.selected;
      const fontSize = _.get(this.selected.page, ['content', row, col, 'fontSize'], 1);
      if (sign) {
        Vue.set(this.selected.page.content[row][col], 'fontSize', parseFloat((fontSize + step).toFixed(2)));
      } else {
        Vue.set(this.selected.page.content[row][col], 'fontSize', parseFloat((fontSize - step).toFixed(2)));
      }
    },

    setFont: function(font) {
      const { row, col } = this.selected;
      Vue.set(this.selected.page.content[row][col], 'fontFamily', font);
    },

    contureFontSwitch: function() {
      const { row, col } = this.selected;
      const conture = _.get(this.selected.page, ['content', row, col, 'conture'], false);
      Vue.set(this.selected.page.content[row][col], 'conture', !conture);
    },
  },
  data: {
    pages: [],
    cellBlank: { text: '', width: 1, height: 1, fontSize: 1, fontFamily: null },
    selected: {},
    fonts: ['China1', 'China2', 'China3', 'China4', 'China5', 'China6', 'KaiTi_GB2312', "DFPHeiW5-GB"],
    // , "FangSong_GB2312", "FZCuQian-M17S", "FZDaBiaoSong-B06S", "FZHuaLi-M14S", "FZXiaoBiaoSong-B05S", "MicrosoftYaHei", "SimHei", "STZhongsong", "MSungHKS-Bold", "MFXingHei_Noncommercial-Light"
  },
});
