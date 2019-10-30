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

module.exports = { uuidv4, openModal, colsCount };
