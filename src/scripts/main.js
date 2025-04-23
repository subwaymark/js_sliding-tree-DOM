const treeOnThePage = document.getElementsByClassName('tree')[0];

const setSpanTag = function (data) {
  const hasChild = data.children.length > 0;
  const children = data.children;

  if (!hasChild) {
    return null;
  } else {
    for (const child of children) {
      const toEdit = child;
      const toNotInclude = toEdit.innerHTML.match(/(\b\w+\b *)+/)[0];

      if (child.tagName === 'LI' && child.children.length > 0) {
        toEdit.innerHTML = toEdit.innerHTML.replace(
          toNotInclude,
          `<span>\n ${toNotInclude}\n </span>\n`,
        );
      }

      setSpanTag(child);
    }

    return data;
  }
};

setSpanTag(treeOnThePage);

const pageHeaders = [...document.querySelectorAll('.tree span')];

for (const header of pageHeaders) {
  header.onclick = function (e) {
    const target = e.target;
    const isChildrenHidden =
      target.nextElementSibling.children[0].style.display === 'none';

    if (isChildrenHidden) {
      [...target.nextElementSibling.children].forEach((child) => {
        child.style.display = '';
      });
    } else {
      [...target.nextElementSibling.children].forEach((child) => {
        child.style.display = 'none';
      });
    }
  };
}
