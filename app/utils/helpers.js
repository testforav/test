import React from 'react';

/**
* Выводит ошибку валидации с кастомным текстом
*/
function showApiValidateError(text) {
    return (value, components) => {
        return (
            <label className="error-hint is-visible">
                {text}
            </label>
        );
    };
}

/**
* Чекает доступность вебкамеры
*/
function checkCameraStatus(successCb, errorCb, errorNoSupportCb) {
  if (navigator && navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(mediaStream) {
      // webcam is available

      mediaStream.getVideoTracks()[0].stop();
      successCb();
    })
    .catch(function(err) {
      // webcam is not available
      errorCb();
    });

    return true;
  } else if (navigator && (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)) {
    navigator.getMedia = (navigator.getUserMedia || // use the proper vendor prefix
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia({video: true}, function(stream) {
      // webcam is available

      stream.getVideoTracks()[0].stop();
      successCb();
    }, function() {
      // webcam is not available
      errorCb();
    });

    return true;
  } else {
    //console.warn('No camera API support by browser');
    errorNoSupportCb();
    return false;
  }
}

export {
    showApiValidateError,
    checkCameraStatus
};
