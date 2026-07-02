/* =========================================================================
   OZON БАНК · B2B ЛЕЯУТ — логика панели управления
   Управляет состоянием контейнера, тумблерами блоков и настройками страницы.
   Ничего из этого файла не является частью самого макета — это «пульт».
   ========================================================================= */

(function () {
  'use strict';

  var readyCallbacks = [];

  /* Публичный хук для дизайнеров: код анимаций пишем здесь.
     Пример (после подключения GSAP в index.html):
       Layout.onReady(function () {
         gsap.from('.content-container', { opacity: 0, y: 20, duration: 0.4 });
       });
  */
  window.Layout = {
    onReady: function (cb) { readyCallbacks.push(cb); }
  };

  document.addEventListener('DOMContentLoaded', function () {

    /* ---- 1. Состояние контейнера (дропдаун) ---- */
    var stateSelect = document.getElementById('stateSelect');
    var states = document.querySelectorAll('#contentContainer .state');
    stateSelect.addEventListener('change', function () {
      states.forEach(function (el) {
        el.classList.toggle('is-active', el.dataset.state === stateSelect.value);
      });
    });

    /* ---- 2. Тумблеры блоков (data-toggle="id элемента") ---- */
    document.querySelectorAll('[data-toggle]').forEach(function (input) {
      input.addEventListener('change', function () {
        var target = document.getElementById(input.dataset.toggle);
        if (target) target.hidden = !input.checked;
      });
    });

    /* ---- 3. Заголовок страницы ---- */
    var titleInput = document.getElementById('titleInput');
    var pageTitle = document.getElementById('pageTitle');
    titleInput.addEventListener('input', function () {
      pageTitle.textContent = titleInput.value || '[Страница]';
    });

    /* ---- 3b. Кнопки острова: тексты и сторона вторичной ---- */
    var btnPrimary = document.getElementById('btnPrimary');
    var btnSecondary = document.getElementById('btnSecondary');
    var btnPrimaryInput = document.getElementById('btnPrimaryInput');
    var btnSecondaryInput = document.getElementById('btnSecondaryInput');
    var secondarySideSelect = document.getElementById('secondarySideSelect');
    var islandButtons = document.getElementById('islandButtons');

    btnPrimaryInput.addEventListener('input', function () {
      btnPrimary.textContent = btnPrimaryInput.value;
    });
    btnSecondaryInput.addEventListener('input', function () {
      btnSecondary.textContent = btnSecondaryInput.value;
    });
    secondarySideSelect.addEventListener('change', function () {
      islandButtons.dataset.secondarySide = secondarySideSelect.value;
    });

    /* ---- 4. Ширина страницы ---- */
    var widthSelect = document.getElementById('widthSelect');
    var app = document.getElementById('app');
    widthSelect.addEventListener('change', function () {
      app.dataset.pageWidth = widthSelect.value;
    });

    /* ---- 5. Сайдбар настроек (открытие/закрытие) ---- */
    var fab = document.getElementById('settingsFab');
    var drawer = document.getElementById('drawer');
    var backdrop = document.getElementById('drawerBackdrop');
    var closeBtn = document.getElementById('drawerClose');

    function openDrawer() {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.hidden = false;
      requestAnimationFrame(function () { backdrop.classList.add('is-open'); });
    }
    function closeDrawer() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.classList.remove('is-open');
      setTimeout(function () { backdrop.hidden = true; }, 250);
    }

    fab.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    /* ---- 6. Запуск пользовательских хуков (анимации и т.п.) ---- */
    readyCallbacks.forEach(function (cb) {
      try { cb(); } catch (e) { console.error('Layout.onReady error:', e); }
    });
  });
})();
