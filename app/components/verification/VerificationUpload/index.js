/**
*
* VerificationUpload
*
*/

import React from 'react';
// import styled from 'styled-components';
import UploadButton from 'components/basic/UploadButton';
import _ from 'lodash';
import ImageCompressor from 'image-compressor.js';
import PDFJS from 'pdfjs-dist';

import { Input } from 'react-validation/lib/build/validation.rc';

import Button from 'components/basic/Button';
import WebcamSnap from 'components/WebcamSnap';
import ModalCommon from 'components/ModalCommon';

class VerificationUpload extends React.Component { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue ? props.defaultValue : '',
            webcamModalOpen: false,
        };
        this.allowedExtensions = [
            'png', 'jpg', 'jpeg', 'gif', 'pdf'
        ];
        this.ableToCompress = [
            'png', 'jpg', 'jpeg'
        ];
    }

    componentWillReceiveProps(nextProps) {
        if ((this.state.value !== nextProps.defaultValue)) {
            _debug('Got new value: ', nextProps.defaultValue);
            this.setState({
                value: nextProps.defaultValue ? nextProps.defaultValue : '',
            });
        }
    }

    onFileFieldChange(evt) {
        if (evt.target.value) {
            const fileNameArr = evt.target.value.split('\\');
            const fileName = fileNameArr[fileNameArr.length - 1];
            const extensionArr = fileName.split('.');
            const extension = extensionArr[extensionArr.length - 1].toLowerCase();
            const file = evt.target.files[0];

            if (_.indexOf(this.allowedExtensions, extension) !== -1) {
                if (extension === 'pdf') {
                    this.convertPdf(file, fileName);
                } else {
                    this.tryToCompress(file, fileName, extension);
                }
            } else {
                this.props.showUploadError('Not supported file type. Please, upload jpg, gif, png or pdf.');
            }

            evt.target.value = '';
        }
    }
    convertPdf(file, fileName) {
        const reader = new FileReader();
        reader.onload = () => {
            PDFJS.getDocument({ data: reader.result }).then((pdf) => {
                _debug('File converted to pdf: ', pdf, pdf.numPages);
                if (pdf.numPages > 3) {
                    this.props.showUploadError('Too many pages in PDF file. Unable to convert.');
                } else {
                    this.drawPages(pdf, 1, (pages) => {
                        _debug('PDF render finish: ', pages);
                        const canvas = document.createElement('canvas');
                        let rendered = 0;

                        canvas.width = 0;
                        canvas.height = 0;

                        for (let i = 0; i < pages.length; i++) {
                            canvas.width = Math.max(canvas.width, pages[i].width);
                            canvas.height = canvas.height + pages[i].height;
                            const image = new Image();
                            const ctx = canvas.getContext('2d');

                            ((ctx, image) => {
                                const page = pages[i];
                                const dy = canvas.height - page.height;
                                image.onload = () => {
                                    ctx.drawImage(image, 0, dy, page.width, page.height);
                                    rendered++;
                                    if (rendered === pages.length) {
                                        this.tryToCompress(this.dataURLtoFile(canvas.toDataURL(), fileName + '.png'), fileName + '.png', 'png');
                                    }
                                }
                                image.src = page.data;
                            })(ctx, image);

                        }
                    }, [ ]);
                }
            });   
        };
        reader.readAsBinaryString(file);
    }
    drawPages(pdf, pageNum, callback, result) {
        if (pageNum > pdf.numPages) {
            callback(result);
        } else {
            pdf.getPage(pageNum).then((page) => {
                _debug('Page ' + pageNum + ' loaded');

                const scale = 1.5;
                const canvas = document.createElement('canvas');
                const viewport = page.getViewport(scale);
                const context = canvas.getContext('2d');

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                page.render({
                    canvasContext: context,
                    viewport: viewport,
                }).then(() => {
                    _debug('Page ' + pageNum + ' rendered');
                    result.push({
                        height: viewport.height,
                        width: viewport.width,
                        data: canvas.toDataURL(),
                    });
                    this.drawPages(pdf, pageNum + 1, callback, result);
                });
            });            
        }
    }
    dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
    tryToCompress(file, fileName, extension) {
        if (file.size > 2 * 1024 * 1024) {
            if (_.indexOf(this.ableToCompress, extension) !== -1) {
                _debug('Can compress file: ', fileName, file.size, extension);
                new ImageCompressor(file, {
                    quality: 0.6,
                    maxWidth: 2000,
                    maxHeight: 2000,
                    success: (compressedFile) => {
                        compressedFile.lastModifiedDate = new Date();
                        compressedFile.name = fileName;
                        _debug('File compressed to ', compressedFile.size);
                        if (compressedFile.size <= 2 * 1024 * 1024) {
                            this.uploadFile(compressedFile);
                        } else {
                            this.props.showUploadError('File is too big and could not be compressed with the proper quality.');
                        }
                    }
                });
            } else {
                this.props.showUploadError('File is too big and could not be compressed.');
            }
        } else {
            _debug('file size is: ', file.size, fileName);
            this.uploadFile(file);
        }        
    }
    uploadFile(file) {
        this.props.uploadFile(file, this.props.index);     
    }
    openModal(evt) {
        evt.preventDefault();
        if (!this.props.disabled) {
            this.setState({
                webcamModalOpen: true,
            });            
        }
    }
    getWebcamModalTitle(index) {
        switch (index) {
            case 'front':
                return 'Make document front side photo with your camera';
            case 'back':
                return 'Make document back side photo with your camera';
            case 'proof':
                return 'Make proof of living photo with your camera';
            case 'selfie':
                return 'Make a selfie with your document with your camera';
            default:
                return '';
        }
    }
    render() {
        return (
            <div>
                <div className="non-mobile-only">
                    <div className={this.props.className}>
                        <div className="verification__upload__input">
                            <Input
                                type="text"
                                className="form-control form-control_transparent"
                                placeholder="JPG, PDF, GIF, PNG"
                                disabled
                                name={"upload_desktop_" + this.props.index}
                                id={"upload_desktop_" + this.props.index}
                                value={ this.state.value }
                                validations={['required']}
                            />
                        </div>
                        <UploadButton
                            onChange={(e) => this.onFileFieldChange(e)}
                            disabled={this.props.disabled}
                            inputProps={{ accept: '.png, .jpg, .jpeg, .gif, .pdf' }}
                        >
                            <Button 
                                uppercase 
                                bold 
                                wide
                                transparent
                                green
                                noForm
                            >
                                Upload
                            </Button>
                        </UploadButton>
                        <Button 
                            uppercase 
                            bold 
                            transparent
                            green
                            noForm
                            className="verification__form__webcam__btn"
                            onClick={this.openModal.bind(this)}
                        >
                            Make a photo
                        </Button>
                    </div>

                    {
                        this.state.webcamModalOpen ? (
                            <ModalCommon
                                showModal={this.state.webcamModalOpen}
                                onHide={() => this.setState({ webcamModalOpen: false })}
                                className={
                                    "verification__modal" +
                                    " verification__modal-" + this.props.index
                                }
                            >
                                <h1 className="modal-security__title">{ this.getWebcamModalTitle(this.props.index) }</h1>
                                <WebcamSnap 
                                    onError={
                                        () => {
                                            this.setState({ webcamModalOpen: false });
                                        }
                                    }
                                    onSuccess={
                                        (result) => {
                                            this.tryToCompress(this.dataURLtoFile(result, 'snapshot.jpg'), 'snapshot.jpg', 'jpg');
                                            this.setState({ webcamModalOpen: false });
                                        }
                                    }
                                />                        
                            </ModalCommon>
                        ) : null
                    }

                </div>

                <div className="mobile-only">
                    <div className={this.props.className}>
                        <div className="verification__upload__input">
                            <Input
                                type="text"
                                className="form-control form-control_transparent"
                                placeholder="JPG, PDF, GIF, PNG"
                                disabled
                                name={"upload_mobile_" + this.props.index}
                                id={"upload_mobile_" + this.props.index}
                                value={this.state.value}
                                validations={['required']}
                            />
                        </div>
                        <UploadButton
                            onChange={(e) => this.onFileFieldChange(e)}
                            disabled={this.props.disabled}
                            inputProps={{ accept: '.pdf,image/*' }}
                        >
                            <Button 
                                uppercase 
                                bold 
                                green
                                noForm
                            >
                                Upload
                            </Button>
                        </UploadButton>
                    </div>
                </div>

            </div>
        );
    }
}

VerificationUpload.propTypes = {

};

export default VerificationUpload;
