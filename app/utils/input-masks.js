import { createNumberMask, createTextMask } from 'redux-form-input-masks';

export const phoneMask = createTextMask({
    pattern: '+99999999999999999999',
    guide: false,
    stripMask: true,
});
