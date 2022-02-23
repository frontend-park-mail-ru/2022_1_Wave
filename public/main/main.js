const expandBtnOnClick = (e) => {
  console.log(e.currentTarget);
  const sidebar = document.getElementsByClassName('sidebar')[0];
  console.log(sidebar);
  const expandBtn = e.currentTarget;
  if (sidebar.classList.contains('sidebar_collapsed')) {
    sidebar.classList.toggle('sidebar_collapsed');
    console.log(sidebar.classList, sidebar.classList.toggle('sidebar_collapsed'));
    expandBtn.classList.remove('fa-angle-right');
    expandBtn.classList.add('fa-angle-left');
  }
  sidebar.classList.add('sidebar_collapsed');
  expandBtn.classList.remove('fa-angle-left');
  expandBtn.classList.add('fa-angle-right');
};

document.getElementsByClassName('sidebar__control__expand-btn')[0]
  .addEventListener('click', expandBtnOnClick);
