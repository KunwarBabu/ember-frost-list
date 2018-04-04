import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-list-item-content'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Options - required
    model: PropTypes.EmberObject.isRequired,
    index: PropTypes.number.isRequired,
    onExpand: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,

    // Options - general
    onSelectionChange: PropTypes.func,
    isAnyItemExpansion: PropTypes.bool,

    // Options - sub-components
    item: PropTypes.EmberComponent.isRequired,
    itemExpansion: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.EmberComponent
    ]),
    alwaysExpanded: PropTypes.bool,
    singleSelection: PropTypes.bool
  },

  getDefaultProps () {
    return {
      isAnyItemExpansion: false
    }
  },

  // == Computed Properties ===================================================
  @readOnly
  @computed('itemExpansion', 'alwaysExpanded')
  isExpansionIconVisible (itemExpansion, alwaysExpanded) {
    return itemExpansion && !alwaysExpanded
  }

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
})
