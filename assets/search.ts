import { get, render } from './swaps';

let tag = document.currentScript;
let $ = document.querySelector.bind(document);

let dataset = tag && tag.dataset;
let { index, key, filters } = dataset || {};


function loaded() {
  let element = $('#DocsSearch--input') || $('#SiteSearch--input');

  let algolia = window.docsearch({
    indexName: index,
    apiKey: key,
    algoliaOptions: {
      facetFilters: filters || ''
    },

    inputSelector: '#' + element.id,

    autocompleteOptions: {
      // https://github.com/algolia/autocomplete.js#global-options
      autoselect: true,
      openOnFocus: true,
      clearOnSelected: false,
      tabAutocomplete: false,

      appendTo: '.' + element.parentNode.className,
      hint: false,

      autoselectOnBlur: matchMedia('(pointer: course)').matches
    },

    // https://docsearch.algolia.com/docs/behavior
    handleSelected(input, event, suggestion, datasetNumber, context) {
      console.log('~> HANDLE SELECTED', { input, event, suggestion, datasetNumber, context });
      let ctx = new URL(suggestion.url);

      algolia.input.autocomplete.setVal('');
      algolia.input[0].blur();

      // no scroll if is H1 tag
      let req = get(ctx.pathname);
      let toScroll = !suggestion.isLvl0;

      req.onload = () => {
        if (req.status < 400) {
          render(ctx, req.responseText!);

          let header = toScroll && document.querySelector(ctx.hash);
          if (header) (header as HTMLElement).focus();
        } else {
          console.log('[TODO] 4xx fetch error', ctx.pathname);
        }
      };
    },

    transformData(hits) {
      // Remove empty results
      for (let len = hits.length; len-- > 0;) {
        let info = hits[len].hierarchy;
        if (!info.lvl0 && !info.lvl1) {
          hits.splice(len, 1);
        }
      }
    }
  });

  let input = algolia.input[0];
  let wrapper = algolia.autocomplete.autocomplete.getWrapper();

  algolia.autocomplete.on('autocomplete:shown', () => {
    wrapper.setAttribute('data-expanded', true);
  });

  algolia.autocomplete.on('autocomplete:closed', () => {
    wrapper.setAttribute('data-expanded', false);
  });

  addEventListener('keydown', ev => {
    if (ev.target === input) return;

    let key = ev.which;

    // is '/' or SHIFT+'s'
    if (key === 191 || (ev.shiftKey && key === 83)) {
      ev.preventDefault();
      window.scrollTo(0, 0);
      input.focus();
    }
  });
}

// init
(function check() {
  console.log('~> checking');
  if (!index || !key) return;
  if (window.docsearch) loaded();
  else setTimeout(check, 25);
})();