let form;
let currency = 'PLN';
let $input, $counterElement;
let $overlayContents, $sendOverlay;
let $calculatorContainer;

let priceListFixed = {

    'development': [2500, 1000],
    'panel': [1000, 800],
    'redesign': [1000, 1000],
    'redesign-multi': [2000, 1000],
    'gallery': [300, 100],
    'gallery-multi': [500, 150],
    'contact-form': [400, 100],
    'contact-form-multi': [500, 150],
    'parallax': [300, 150],
    'parallax-multi': [300, 150],
    'blog-multi': [800, 400]

};
let priceListVariable = {

    pages: [[2500, 250], [1000, 250]],
    streaming: [[100, 50], [100, 50]],
    'streaming-multi': [[100, 50], [100, 50]],
    'animations': [[100, 80], [50, 50]],
    'animations-multi': [[100, 80], [50, 50]]

};

let $sendForm, validator;

function getFixedPrice(type, currency) {

    if (currency === 'PLN') return priceListFixed[type][0];
    if (currency === 'EUR') return priceListFixed[type][1];
    return 0;
}

function getVariablePrice(type, currency, inputElement, currentValue, operator) {

    let counterValue = parseInt($counterElement.text());
    currentValue = parseInt(currentValue);

    if (currency === 'PLN') {

        if (counterValue === 0) {
            currentValue = 0
        }

        if (counterValue === 1) {
            if (operator === 'plus') currentValue += priceListVariable[type][0][0];
            if (operator === 'minus') currentValue -= priceListVariable[type][0][1];
        }

        if (counterValue > 1) {
            if (operator === 'plus') currentValue += priceListVariable[type][0][1];
            if (operator === 'minus') currentValue -= priceListVariable[type][0][1];
        }
    }

    if (currency === 'EUR') {

        if (counterValue === 0 ) {
            currentValue = 0
        }

        if (counterValue === 1 ) {
            if (operator === 'plus') currentValue += priceListVariable[type][1][0];
            if (operator === 'minus') currentValue -= priceListVariable[type][1][1];
        }
        if (counterValue > 1 ) {
            if (operator === 'plus') currentValue += priceListVariable[type][1][1];
            if (operator === 'minus') currentValue -= priceListVariable[type][1][1];
        }
    }

    return currentValue;

}

function getSummary(colNumber) {

    let arr = Array.from($(`tbody td:nth-of-type(${colNumber}) input.price`));
    let prices = [];

    if (arr.length > 0) {
        arr.forEach(input => {
            prices.push(parseInt(input.value))
        });

        return prices.reduce((a, price) => {
            return a+= price;
        } );
    }

    return 0;
}

function updateSummary(colNumber, value) {

    let $summaryElement = $(`tfoot td:nth-of-type(${colNumber}) .sum`);
    $summaryElement.text(`${currency} ${value}`);

}

function calculateFeature(ev) {

    ev.preventDefault();
    ev.stopPropagation();

    let $target = $(this);
    let $parent = $target.parent();

    $counterElement = $parent.next('td');
    $input = $parent.find('input');

    let currentCounterValue = parseInt($counterElement.text());


    let operator = $target[0].className;
    if (operator === 'plus') {
        currentCounterValue++;
    }

    if (operator === 'minus') {
        currentCounterValue--;
    }

    if (currentCounterValue < 0) currentCounterValue = 0;

    $counterElement.text(currentCounterValue);

    $input[0].value = getVariablePrice($input[0].name, 'PLN', $input[0], $input[0].value, operator);

    updateSummary(2, getSummary(2))
    updateSummary(4, getSummary(4))

}

function sendQuote(ev) {

    ev.preventDefault();
    ev.stopPropagation();

    // Show send overlay

    $sendOverlay = $('section#calculator .overlay-container.send');
    $overlayContents = $('section#calculator .overlay-contents');

    $sendOverlay.fadeIn(200);
    $overlayContents.fadeIn({
        duration: 150,
        start: function () {
            this.style.display = 'flex';
        },
        complete: function () {

            document.body.style.overflowY = 'hidden';

            // Init validator
            validator = $sendForm.validate({
                messages: {
                    email: {
                        required: 'Adres e-mail nie może być pusty.',
                        email: 'Wpisany adres e-mail jest niepoprawny.'
                    }
                }
            });
        }
    });

    $('button.send.send-quote').on('click', () => {

        $sendForm.validate();

        if ($sendForm.valid()) {
            //TODO: Sending emails must be implemented (email API on the server)
            $overlayContents.fadeOut(150);
            $sendOverlay.fadeOut({
                duration: 200,
                complete: function () {
                    $(document.body).removeAttr('style');
                    resetForm();
                }
            });

        }

    });
}

function switchButton(ev) {

    ev.preventDefault();

    let $target = $(this);
    let $parent = $(this).parent();
    let $input = $($parent).find('input');
    let currentVisibleClassName = $($parent).find('button:visible')[0].className;

    // Blog feature requires admin panel

    let $panelAddButton = $('#js-panel-add-button');
    let $blogRemoveButton = $('#js-blog-remove-button');

    let isBlogAddButton = $target.attr('id') === 'js-blog-add-button';
    let isPanelRemoveButton = $target.attr('id') === 'js-panel-remove-button';

    if (isBlogAddButton) $panelAddButton.trigger('click');
    if (isPanelRemoveButton && ! $blogRemoveButton.is(':hidden')) {
        $blogRemoveButton.trigger('click');
    }

    //

    if (currentVisibleClassName === "add") $input[0].value = getFixedPrice($input[0].name, 'PLN');
    else $input[0].value = 0;

    $($parent).find('button').removeClass('hidden');
    $target.addClass('hidden');

    updateSummary(2, getSummary(2))
    updateSummary(4, getSummary(4))

}


export function initCalculator() {

    $calculatorContainer = $('.calculator-container');

    if (window.innerWidth < 1024) {

        $calculatorContainer.hide();
        $calculatorContainer.attr('id', '');
        $('.calculator-info-text').hide();

        $('button.add, button.remove').off('click', switchButton);
        $('button.plus, button.minus').off('click', calculateFeature);
        $('button.send').off('click', sendQuote);
    }

    if (window.innerWidth >= 1024) {
        $('#calculator').attr('id', 'calculator');
        $calculatorContainer.show();
        $('.calculator-info-text').show();
    }
        if (window.innerHeight < 1024) $('#calculator').css('height', 'auto');

        form = $('form')[0];
        $('button.add, button.remove').on('click', switchButton)
        $('button.plus, button.minus').on('click', calculateFeature)
        $('button.send').on('click', sendQuote);

        // Tooltips
        $('.tooltip').tooltipster({
            theme: 'tooltipster-light',
            side: 'top',
            delay: 0,
            timer: 0
        });
        $('.tooltip-left').tooltipster({
            theme: 'tooltipster-light',
            side: ['right'],
            delay: 0,
            timer: 0,
            maxWidth: 300,
            contentCloning: true,
            contentAsHTML: true
        });
    // }

}