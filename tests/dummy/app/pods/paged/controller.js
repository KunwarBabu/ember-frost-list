/**
 * TODO
 */

import Ember from 'ember'
const {isEmpty} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {sort} from 'ember-frost-sort'

export default Ember.Controller.extend({

  // == Dependencies ==========================================================

  // == Properties ============================================================

  itemsPerPage: 10,
  page: 0,
  scrollTop: 0,
  selectedItems: [],
  sortOrder: ['id'],
  sortingProperties: [
    { label: 'Id', value: 'id' },
    { label: 'Label', value: 'label' }
  ],
  totalItems: 100, // Typically extracted from meta on the request

  // == Computed Properties ===================================================

  @readOnly
  @computed('model.[]', 'sortOrder.[]')
  items (model, sortOrder) {
    if (isEmpty(model)) {
      return []
    }
    return sort(model, sortOrder) // Client side sorting
  },

  // == Functions =============================================================

  fetchPage (page) {
    this.store.unloadAll('list-item')
    this.store.query('list-item', {
      pageSize: this.get('itemsPerPage'),
      start: (page * this.get('itemsPerPage'))
    }).then(() => {
      this.set('model', this.store.peekAll('list-item'))
    })
  },

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    onPaginationChange (page) {
      this.setProperties({
        page,
        scrollTop: 0
      })
      this.fetchPage(page)
    },

    onSelectionChange (selectedItems) {
      this.get('selectedItems').setObjects(selectedItems)
    },

    onSortingChange (sortOrder) {
      this.get('sortOrder').setObjects(sortOrder)
    }
  }
})
