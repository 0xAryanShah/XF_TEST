"use strict";

jQuery(function ($) {
  $('.burger-menu').on('click', function (e) {
    e.preventDefault()
    $('.mobile-menu').toggleClass('open')
  })

  $('.chain-select').on('click', function (e) {
    const $this = $(this)
    if (!$this.hasClass('open')) {
      $this.addClass('open')
    }
  })

  $('.chain-select .dropdown').on('click', function (e) {
    e.stopPropagation()
    $('.chain-select').toggleClass('open')
  })

  $('.chain-select .chain').on('click', function (e) {
    const $this = $(this)
    const $select = $('.chain-select')
    const chain = $this.data('chain')
    if ($select.hasClass('open')) {
      e.stopPropagation()
      if (chain == "ETH") {
        return
      }
      $('.chain-select .chain').removeClass('selected')
      $this.addClass('selected')
      $select.removeClass('open')
      localStorage.setItem("SELECTED_CHAIN", chain)
      selectChain(chain, true)
    }
  })

  $('.chain-select .currency').on('click', function (e) {
    const $this = $(this)
    const currency = $this.data('currency')

    if ($('.chain-select').hasClass('open')) {
      e.stopPropagation()
      $('.chain-select .currency').removeClass('selected')
      $this.addClass('selected')
      localStorage.setItem("SELECTED_CURRENCY", currency)
      selectCurrency(currency, true)
    }
  })
})